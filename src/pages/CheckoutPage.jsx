import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowRight, CreditCard, X } from 'lucide-react';
import api from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import { clearCart } from '../store/actions/shoppingCartActions';

const CheckoutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);
  const { user } = useSelector(state => state.client);
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [sameAsDelivery, setSameAsDelivery] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    address: ''
  });

  // Kart state'leri
  const [cards, setCards] = useState([]);
  const [showCardForm, setShowCardForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [cardFormData, setCardFormData] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: ''
  });

  // Form state'ini güncelleyelim
  const [formErrors, setFormErrors] = useState({});

  // State'e cardFormErrors ekleyelim
  const [cardFormErrors, setCardFormErrors] = useState({});

  // Yeni state ekle
  const [orderCvv, setOrderCvv] = useState('');
  const [orderCvvError, setOrderCvvError] = useState('');

  const cities = [
    'Adana', 'Ankara', 'Antalya', 'Bursa', 'Denizli', 'Diyarbakır', 
    'Eskişehir', 'Gaziantep', 'İstanbul', 'İzmir', 'Kayseri', 'Konya', 
    'Malatya', 'Mersin', 'Samsun', 'Trabzon', 'Van'
  ];

  // Toplam tutarı hesapla
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  // Token kontrolü ve veri yükleme
  useEffect(() => {
    // Token kontrolü
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      history.push('/login');
      toast.error('Please login to continue checkout');
      return;
    }

    // Component mount olduğunda state'leri sıfırla
    setSelectedDeliveryAddress(null);
    setSelectedBillingAddress(null);
    setSelectedCard(null);
    setSameAsDelivery(true);
    
    // Form state'lerini temizle
    setCardFormData({
      card_no: '',
      expire_month: '',
      expire_year: '',
      name_on_card: ''
    });

    // Adres ve kart verilerini getir
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Adresleri getir
        const addressResponse = await api.get('/user/address');
        setAddresses(addressResponse.data || []);
        
        // Kartları getir
        const cardResponse = await api.get('/user/card');
        setCards(cardResponse.data || []);

      } catch (error) {
        console.error('Veri yükleme hatası:', error);
        
        // 401 kontrolü
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          history.push('/login');
          toast.error('Please login to continue checkout');
          return;
        }
        
        toast.error('Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [history]);

  // Sepet boşsa ana sayfaya yönlendir
  useEffect(() => {
    if (cart.length === 0) {
      history.push('/');
      toast.error('Your cart is empty');
    }
  }, [cart, history]);

  // sameAsDelivery değiştiğinde fatura adresini güncelle
  useEffect(() => {
    if (sameAsDelivery) {
      setSelectedBillingAddress(selectedDeliveryAddress);
    } else {
      setSelectedBillingAddress(null);
    }
  }, [sameAsDelivery, selectedDeliveryAddress]);

  // Sipariş tamamlama kontrolü
  const canPlaceOrder = () => {
    if (!selectedDeliveryAddress) {
      toast.error('Please select a delivery address');
      return false;
    }
    
    if (!sameAsDelivery && !selectedBillingAddress) {
      toast.error('Please select a billing address');
      return false;
    }

    if (!selectedCard) {
      toast.error('Please select a payment method');
      return false;
    }

    if (!orderCvv) {
      setOrderCvvError('Please enter CVV');
      return false;
    }

    // CVV sadece 3 veya 4 haneli olabilir
    if (!/^[0-9]{3,4}$/.test(orderCvv)) {
      setOrderCvvError('CVV must be 3 or 4 digits');
      return false;
    }

    // CVV sıfır olamaz
    if (parseInt(orderCvv) === 0) {
      setOrderCvvError('Invalid CVV');
      return false;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return false;
    }
    
    return true;
  };

  // Sipariş tamamlama
  const handlePlaceOrder = async () => {
    if (!canPlaceOrder()) {
      return;
    }

    try {
      setIsLoading(true);

      const orderData = {
        address_id: selectedDeliveryAddress.id,
        order_date: new Date().toISOString(),
        card_no: parseInt(selectedCard.card_no),
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        card_ccv: parseInt(orderCvv),
        price: total,
        products: cart.map(item => ({
          product_id: item.product.id,
          count: item.count,
          detail: `${item.product.color} - ${item.product.size}`
        }))
      };

      console.log('Order Data:', orderData); // Kontrol için

      // Siparişi oluştur
      const response = await api.post('/order', orderData);

      // Backend'den gelen cevabı kontrol et
      if (response.data.status === 'error') {
        if (response.data.message.toLowerCase().includes('cvv') || 
            response.data.message.toLowerCase().includes('card')) {
          setOrderCvvError(response.data.message);
          return;
        }
        throw new Error(response.data.message);
      }

      // Başarılı mesaj göster
      toast.success('Order placed successfully! Thank you for your purchase.');

      // Sepeti temizle
      dispatch(clearCart());

      // Ana sayfaya yönlendir
      history.push('/');

    } catch (error) {
      console.error('Order error:', error);
      console.log('Error response:', error.response); // Hata detayını görelim
      
      if (error.response?.data?.message) {
        if (error.response.data.message.toLowerCase().includes('cvv') || 
            error.response.data.message.toLowerCase().includes('card')) {
          setOrderCvvError(error.response.data.message);
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error('Failed to place order');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Düzenleme için adres seçildiğinde form verilerini güncelle
  const handleEditAddress = (address) => {
    setFormData({
      title: address.title || '',
      name: address.name || '',
      surname: address.surname || '',
      phone: address.phone || '',
      city: address.city || '',
      district: address.district || '',
      neighborhood: address.neighborhood || '',
      address: address.address || ''
    });
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  // Form validasyon fonksiyonu
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.surname.trim()) errors.surname = 'Surname is required';
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.district.trim()) errors.district = 'District is required';
    if (!formData.neighborhood.trim()) errors.neighborhood = 'Neighborhood is required';
    if (!formData.address.trim()) errors.address = 'Address is required';

    // Telefon numarası formatı kontrolü
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Invalid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submit fonksiyonunu güncelleyelim
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please check form fields');
      return;
    }

    setIsLoading(true);

    try {
      if (editingAddress) {
        // Adres güncelleme - ID'yi ekleyelim
        await api.put('/user/address', {
          id: editingAddress.id,
          ...formData
        });
        toast.success('Adres güncellendi');
      } else {
        // Yeni adres ekleme
        await api.post('/user/address', formData);
        toast.success('Yeni adres eklendi');
      }

      // Adresleri yeniden yükle
      const response = await api.get('/user/address');
      setAddresses(response.data);
      
      // Formu temizle ve kapat
      resetForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  // Form resetleme fonksiyonu
  const resetForm = () => {
    setFormData({
      title: '',
      name: '',
      surname: '',
      phone: '',
      city: '',
      district: '',
      neighborhood: '',
      address: ''
    });
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  // Adres silme
  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      try {
        await api.delete(`/user/address/${addressId}`);
        setAddresses(addresses.filter(addr => addr.id !== addressId));
        toast.success('Adres silindi');
      } catch (error) {
        toast.error('Adres silinirken bir hata oluştu');
      }
    }
  };

  // Kart validasyon fonksiyonunu güncelleyelim
  const validateCardForm = () => {
    const errors = {};
    
    // Kart numarası kontrolü
    if (!cardFormData.card_no) {
      errors.card_no = 'Card number is required';
    } else if (cardFormData.card_no.length !== 16) {
      errors.card_no = 'Card number must be 16 digits';
    }
    
    // İsim kontrolü
    if (!cardFormData.name_on_card.trim()) {
      errors.name_on_card = 'Name is required';
    }
    
    // Ay kontrolü
    if (!cardFormData.expire_month) {
      errors.expire_month = 'Expiry month is required';
    }
    
    // Yıl kontrolü
    if (!cardFormData.expire_year) {
      errors.expire_year = 'Expiry year is required';
    }
    
    setCardFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Kart numarası formatlama fonksiyonu
  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  // handleCardSubmit fonksiyonunu güncelleyelim
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCardForm()) {
      toast.error('Please check card information');
      return;
    }

    setIsLoading(true);

    try {
      // API'ye gönderilecek veriyi hazırla
      const cardData = {
        card_no: cardFormData.card_no,
        expire_month: parseInt(cardFormData.expire_month),
        expire_year: parseInt(cardFormData.expire_year),
        name_on_card: cardFormData.name_on_card
      };

      console.log('Sending card data:', cardData); // Kontrol için eklendi

      if (editingCard) {
        await api.put('/user/card', {
          id: editingCard.id,
          ...cardData
        });
        toast.success('Kart güncellendi');
      } else {
        await api.post('/user/card', cardData);
        toast.success('Yeni kart eklendi');
      }

      // Kartları yeniden yükle
      const response = await api.get('/user/card');
      setCards(response.data);
      resetCardForm();
    } catch (error) {
      console.error('Card save error:', error); // Hata detayını görelim
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  // Düzenleme için kart seçildiğinde form verilerini güncelle
  const handleEditCard = (card) => {
    setCardFormData({
      card_no: card.card_no || '',
      expire_month: card.expire_month || '',
      expire_year: card.expire_year || '',
      name_on_card: card.name_on_card || ''
    });
    setEditingCard(card);
    setShowCardForm(true);
  };

  // Kart silme
  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
      try {
        await api.delete(`/user/card/${cardId}`);
        setCards(cards.filter(card => card.id !== cardId));
        toast.success('Kart silindi');
      } catch (error) {
        toast.error('Kart silinirken bir hata oluştu');
      }
    }
  };

  // Kart form resetleme
  const resetCardForm = () => {
    setCardFormData({
      card_no: '',
      expire_month: '',
      expire_year: '',
      name_on_card: ''
    });
    setShowCardForm(false);
    setEditingCard(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="space-y-6 lg:flex lg:gap-8 lg:space-y-0">
          {/* Sol Taraf - Adres ve Ödeme Bilgileri */}
          <div className="flex-1 space-y-6">
            {/* Teslimat Adresi */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Delivery Address</h3>
                <button
                  onClick={() => {
                    setShowAddressForm(true);
                    setEditingAddress(null);
                  }}
                  className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Address</span>
                </button>
              </div>
              <div className="grid gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      selectedDeliveryAddress?.id === address.id ? 'border-[#E77C40] bg-orange-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedDeliveryAddress(address)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{address.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.name} {address.surname}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.neighborhood}, {address.district}, {address.city}
                        </p>
                        <p className="text-sm text-gray-600">{address.address}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="p-2 text-gray-600 hover:text-[#E77C40]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="p-2 text-gray-600 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fatura Adresi */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Billing Address</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sameAsDelivery}
                    onChange={(e) => setSameAsDelivery(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Same as delivery address</span>
                </label>
              </div>

              {!sameAsDelivery && (
                <div className="grid gap-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedBillingAddress?.id === address.id ? 'border-[#E77C40] bg-orange-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedBillingAddress(address)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{address.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.neighborhood}, {address.district}, {address.city}
                          </p>
                          <p className="text-sm text-gray-600">{address.address}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="p-2 text-gray-600 hover:text-[#E77C40]"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="p-2 text-gray-600 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ödeme Yöntemi */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Payment Method</h3>
                  <button
                    onClick={() => {
                      setShowCardForm(true);
                      setEditingCard(null);
                    }}
                    className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Card</span>
                  </button>
                </div>

                <div className="grid gap-4">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCard(card)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedCard?.id === card.id ? 'border-[#E77C40] bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-5 h-5 text-gray-600" />
                            <span className="font-medium">
                              {formatCardNumber(card.card_no)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{card.name_on_card}</p>
                          <p className="text-sm text-gray-600">
                            Expires: {card.expire_month.toString().padStart(2, '0')}/{card.expire_year}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCard(card);
                            }}
                            className="p-2 text-gray-600 hover:text-[#E77C40]"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCard(card.id);
                            }}
                            className="p-2 text-gray-600 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="lg:w-[380px]">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.count}</span>
                    <span>${(item.product.price * item.count).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* CVV Input - Seçili kart varsa göster */}
              {selectedCard && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Security Code (CVV)
                  </label>
                  <input
                    type="text"
                    value={orderCvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 4) {
                        setOrderCvv(value);
                        setOrderCvvError('');
                      }
                    }}
                    className={`w-full p-3 border rounded ${
                      orderCvvError ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter CVV"
                    maxLength="4"
                  />
                  {orderCvvError && (
                    <p className="mt-1 text-sm text-red-500">{orderCvvError}</p>
                  )}
                </div>
              )}
              
              {/* Place Order butonu */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:static lg:p-0 lg:bg-transparent lg:border-0 mt-4">
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 px-6 bg-[#E77C40] text-white rounded-full hover:bg-[#d16c34] transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Adres Formu */}
        {showAddressForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-6">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Address Title"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData(prev => ({...prev, title: e.target.value}));
                    setFormErrors(prev => ({...prev, title: ''}));
                  }}
                  className={`w-full p-3 border rounded ${
                    formErrors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {formErrors.title && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
                )}
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({...prev, name: e.target.value}));
                      setFormErrors(prev => ({...prev, name: ''}));
                    }}
                    className={`flex-1 p-3 border rounded ${
                      formErrors.name ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={(e) => {
                      setFormData(prev => ({...prev, surname: e.target.value}));
                      setFormErrors(prev => ({...prev, surname: ''}));
                    }}
                    className={`flex-1 p-3 border rounded ${
                      formErrors.surname ? 'border-red-500' : ''
                    }`}
                    required
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData(prev => ({...prev, phone: e.target.value}));
                    setFormErrors(prev => ({...prev, phone: ''}));
                  }}
                  className={`w-full p-3 border rounded ${
                    formErrors.phone ? 'border-red-500' : ''
                  }`}
                  required
                />

                <select
                  value={formData.city}
                  onChange={(e) => {
                    setFormData(prev => ({...prev, city: e.target.value}));
                    setFormErrors(prev => ({...prev, city: ''}));
                  }}
                  className={`w-full p-3 border rounded ${
                    formErrors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city.toLowerCase()} value={city.toLowerCase()}>
                      {city}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="District"
                  value={formData.district}
                  onChange={(e) => {
                    setFormData(prev => ({...prev, district: e.target.value}));
                    setFormErrors(prev => ({...prev, district: ''}));
                  }}
                  className={`w-full p-3 border rounded ${
                    formErrors.district ? 'border-red-500' : ''
                  }`}
                  required
                />

                <input
                  type="text"
                  placeholder="Neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => {
                    setFormData(prev => ({...prev, neighborhood: e.target.value}));
                    setFormErrors(prev => ({...prev, neighborhood: ''}));
                  }}
                  className={`w-full p-3 border rounded ${
                    formErrors.neighborhood ? 'border-red-500' : ''
                  }`}
                  required
                />

                <textarea
                  placeholder="Detailed Address"
                  value={formData.address}
                  onChange={(e) => {
                    setFormData(prev => ({...prev, address: e.target.value}));
                    setFormErrors(prev => ({...prev, address: ''}));
                  }}
                  className={`w-full p-3 border rounded h-24 ${
                    formErrors.address ? 'border-red-500' : ''
                  }`}
                  required
                />

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-[#23A6F0] text-white rounded-full hover:bg-[#1a7ab3] disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Kart Ekleme/Düzenleme Modal */}
        {showCardForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingCard ? 'Edit Card' : 'Add New Card'}
                </h3>
                <button
                  onClick={resetCardForm}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formatCardNumber(cardFormData.card_no)}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 16) {
                        setCardFormData(prev => ({...prev, card_no: value}));
                        setCardFormErrors(prev => ({...prev, card_no: ''}));
                      }
                    }}
                    className={`w-full p-3 border rounded ${
                      cardFormErrors.card_no ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                  {cardFormErrors.card_no && (
                    <p className="mt-1 text-sm text-red-500">{cardFormErrors.card_no}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={cardFormData.name_on_card}
                    onChange={(e) => {
                      setCardFormData(prev => ({...prev, name_on_card: e.target.value}));
                      setCardFormErrors(prev => ({...prev, name_on_card: ''}));
                    }}
                    className={`w-full p-3 border rounded ${
                      cardFormErrors.name_on_card ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                  {cardFormErrors.name_on_card && (
                    <p className="mt-1 text-sm text-red-500">{cardFormErrors.name_on_card}</p>
                  )}
                </div>
                
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Month
                    </label>
                    <select
                      value={cardFormData.expire_month}
                      onChange={(e) => {
                        setCardFormData(prev => ({...prev, expire_month: Number(e.target.value)}));
                        setCardFormErrors(prev => ({...prev, expire_month: ''}));
                      }}
                      className={`w-full p-3 border rounded ${
                        cardFormErrors.expire_month ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    {cardFormErrors.expire_month && (
                      <p className="mt-1 text-sm text-red-500">{cardFormErrors.expire_month}</p>
                    )}
                  </div>
                  
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Year
                    </label>
                    <select
                      value={cardFormData.expire_year}
                      onChange={(e) => {
                        setCardFormData(prev => ({...prev, expire_year: Number(e.target.value)}));
                        setCardFormErrors(prev => ({...prev, expire_year: ''}));
                      }}
                      className={`w-full p-3 border rounded ${
                        cardFormErrors.expire_year ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    {cardFormErrors.expire_year && (
                      <p className="mt-1 text-sm text-red-500">{cardFormErrors.expire_year}</p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={resetCardForm}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-3 px-4 bg-[#E77C40] text-white rounded-full hover:bg-[#d16c34] disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : (editingCard ? 'Update Card' : 'Add Card')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage; 