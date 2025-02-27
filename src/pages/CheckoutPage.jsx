import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowRight, CreditCard, X } from 'lucide-react';
import api from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

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

  // Toplam tutarı hesapla
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  // Token kontrolü
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }
    
    // API istekleri için token'ı ayarla
    api.defaults.headers.common['Authorization'] = token;
  }, [history]);

  // Adresleri getir
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adresleri getir
        const addressResponse = await api.get('/user/address');
        setAddresses(addressResponse.data);
        
        // Kartları getir
        const cardResponse = await api.get('/user/card');
        setCards(cardResponse.data);
      } catch (error) {
        toast.error('Bilgiler yüklenirken bir hata oluştu');
      }
    };

    fetchData();
  }, []);

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
    
    return true;
  };

  // Sipariş tamamlama
  const handlePlaceOrder = () => {
    if (canPlaceOrder()) {
      // Sipariş tamamlama işlemleri...
      toast.success('Order placed successfully!');
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

  // Form submit işleyicisini güncelleyelim
  const handleSubmit = async (e) => {
    e.preventDefault();
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

  // Kart formu submit
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingCard) {
        await api.put('/user/card', {
          id: editingCard.id,
          ...cardFormData
        });
        toast.success('Kart güncellendi');
      } else {
        await api.post('/user/card', cardFormData);
        toast.success('Yeni kart eklendi');
      }

      // Kartları yeniden yükle
      const response = await api.get('/user/card');
      setCards(response.data);
      resetCardForm();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
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
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Delivery Address</h2>
                <button
                  onClick={() => {
                    setShowAddressForm(true);
                    setEditingAddress(null);
                  }}
                  className="flex items-center gap-2 text-[#23A6F0] hover:text-[#1a7ab3] text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Add New Address</span>
                </button>
              </div>

              {/* Adres Listesi */}
              <div className="space-y-3">
                {addresses.map(address => (
                  <div 
                    key={address.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors
                      ${selectedDeliveryAddress?.id === address.id ? 'border-[#E77C40] bg-orange-50' : 'hover:border-gray-400'}`}
                    onClick={() => setSelectedDeliveryAddress(address)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{address.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.name} {address.surname}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.neighborhood}, {address.district}, {address.city}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                          className="p-1 text-gray-400 hover:text-[#23A6F0]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(address.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-500"
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
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Billing Address</h2>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsDelivery}
                    onChange={(e) => setSameAsDelivery(e.target.checked)}
                    className="rounded border-gray-300 text-[#23A6F0] focus:ring-[#23A6F0]"
                  />
                  <span>Same as delivery address</span>
                </label>
              </div>

              {!sameAsDelivery && (
                <div className="space-y-3">
                  {addresses.map(address => (
                    <div 
                      key={address.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors
                        ${selectedBillingAddress?.id === address.id ? 'border-[#E77C40] bg-orange-50' : 'hover:border-gray-400'}`}
                      onClick={() => setSelectedBillingAddress(address)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium">{address.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.name} {address.surname}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {address.neighborhood}, {address.district}, {address.city}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{address.phone}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditAddress(address);
                            }}
                            className="p-1 text-gray-400 hover:text-[#23A6F0]"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAddress(address.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-500"
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Payment Method</h2>
                <button
                  onClick={() => {
                    setShowCardForm(true);
                    setEditingCard(null);
                  }}
                  className="flex items-center gap-2 text-[#E77C40] hover:text-[#d16c34]"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add New Card</span>
                </button>
              </div>

              <div className="space-y-4">
                {cards.map(card => (
                  <div
                    key={card.id}
                    className={`relative p-6 border rounded-lg cursor-pointer transition-colors
                      ${selectedCard?.id === card.id 
                        ? 'border-[#E77C40] bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setSelectedCard(card)}
                  >
                    {/* Kart Başlığı */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{card.name_on_card}</h3>
                        <p className="text-sm text-gray-500 mt-1">Credit Card</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCard(card);
                            setCardFormData(card);
                            setShowCardForm(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-[#E77C40] rounded-full hover:bg-orange-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCard(card.id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Kart Detayları */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Card Number</p>
                        <p className="text-sm font-medium">
                          **** **** **** {card.card_no.slice(-4)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Expires</p>
                        <p className="text-sm font-medium">
                          {String(card.expire_month).padStart(2, '0')}/{card.expire_year}
                        </p>
                      </div>
                    </div>

                    {/* Seçili İşareti */}
                    {selectedCard?.id === card.id && (
                      <div className="absolute top-4 right-4 w-5 h-5 bg-[#E77C40] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {cards.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No saved cards yet</p>
                    <p className="text-sm text-gray-400 mt-1">Add a new card to continue</p>
                  </div>
                )}
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
              
              {/* Place Order butonu */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:static lg:p-0 lg:bg-transparent lg:border-0">
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
                  onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                  className="w-full p-3 border rounded"
                  required
                />
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    className="flex-1 p-3 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Surname"
                    value={formData.surname}
                    onChange={(e) => setFormData(prev => ({...prev, surname: e.target.value}))}
                    className="flex-1 p-3 border rounded"
                    required
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  className="w-full p-3 border rounded"
                  required
                />

                <select
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                  className="w-full p-3 border rounded"
                  required
                >
                  <option value="">Select City</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="ankara">Ankara</option>
                  <option value="izmir">İzmir</option>
                </select>

                <input
                  type="text"
                  placeholder="District"
                  value={formData.district}
                  onChange={(e) => setFormData(prev => ({...prev, district: e.target.value}))}
                  className="w-full p-3 border rounded"
                  required
                />

                <input
                  type="text"
                  placeholder="Neighborhood"
                  value={formData.neighborhood}
                  onChange={(e) => setFormData(prev => ({...prev, neighborhood: e.target.value}))}
                  className="w-full p-3 border rounded"
                  required
                />

                <textarea
                  placeholder="Detailed Address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({...prev, address: e.target.value}))}
                  className="w-full p-3 border rounded h-24"
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
                    value={cardFormData.card_no}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 16) {
                        setCardFormData(prev => ({...prev, card_no: value}));
                      }
                    }}
                    className="w-full p-3 border rounded"
                    placeholder="1234 5678 9012 3456"
                    maxLength="16"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={cardFormData.name_on_card}
                    onChange={(e) => setCardFormData(prev => ({...prev, name_on_card: e.target.value}))}
                    className="w-full p-3 border rounded"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Month
                    </label>
                    <select
                      value={cardFormData.expire_month}
                      onChange={(e) => setCardFormData(prev => ({...prev, expire_month: Number(e.target.value)}))}
                      className="w-full p-3 border rounded"
                      required
                    >
                      <option value="">Month</option>
                      {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Year
                    </label>
                    <select
                      value={cardFormData.expire_year}
                      onChange={(e) => setCardFormData(prev => ({...prev, expire_year: Number(e.target.value)}))}
                      className="w-full p-3 border rounded"
                      required
                    >
                      <option value="">Year</option>
                      {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
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