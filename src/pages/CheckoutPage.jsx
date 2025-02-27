import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Plus, Edit2, Trash2, ArrowRight } from 'lucide-react';
import api from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

const STEPS = {
  ADDRESS: 'address',
  PAYMENT: 'payment'
};

const CheckoutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);
  const { user } = useSelector(state => state.client);
  const [currentStep, setCurrentStep] = useState(STEPS.ADDRESS);
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
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/user/address');
        setAddresses(response.data);
      } catch (error) {
        toast.error('Adresler yüklenirken bir hata oluştu');
      }
    };

    fetchAddresses();
  }, []);

  // Adres seçimi kontrolü
  const canProceedToPayment = () => {
    if (!selectedDeliveryAddress) {
      toast.error('Please select a delivery address');
      return false;
    }
    
    if (!sameAsDelivery && !selectedBillingAddress) {
      toast.error('Please select a billing address');
      return false;
    }
    
    return true;
  };

  // Sonraki adıma geç
  const handleProceedToPayment = () => {
    if (canProceedToPayment()) {
      setCurrentStep(STEPS.PAYMENT);
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

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${currentStep === STEPS.ADDRESS ? 'text-[#23A6F0]' : 'text-gray-500'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                1
              </div>
              <span className="ml-2">Address</span>
            </div>
            <div className="w-16 h-[2px] mx-4 bg-gray-200" />
            <div className={`flex items-center ${currentStep === STEPS.PAYMENT ? 'text-[#23A6F0]' : 'text-gray-500'}`}>
              <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                2
              </div>
              <span className="ml-2">Payment</span>
            </div>
          </div>
        </div>

        {currentStep === STEPS.ADDRESS ? (
          // Adres seçim içeriği
          <div className="space-y-6 lg:flex lg:gap-8 lg:space-y-0">
            {/* Sol Taraf - Adresler */}
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
                      className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors
                        ${selectedDeliveryAddress?.id === address.id ? 'border-[#23A6F0] bg-blue-50' : 'hover:border-gray-400'}`}
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
                        className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-colors
                          ${selectedBillingAddress?.id === address.id ? 'border-[#23A6F0] bg-blue-50' : 'hover:border-gray-400'}`}
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
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t lg:static lg:p-0 lg:bg-transparent lg:border-0">
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full lg:w-auto py-3 px-6 bg-[#23A6F0] text-white rounded-full hover:bg-[#1a7ab3] transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Ödeme adımı içeriği
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
              {/* Ödeme formu buraya gelecek */}
            </div>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default CheckoutPage; 