import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronDown, ChevronUp, Package, Calendar, DollarSign, MapPin, Trash2, X, Eye, EyeOff, Settings } from 'lucide-react';
import api from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
import * as types from '../store/actions/actionTypes';
import { fetchProducts } from '../store/actions/productActions';
import { useHistory } from 'react-router-dom';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [hiddenOrders, setHiddenOrders] = useState(() => {
    // LocalStorage'dan gizli siparişleri al
    const saved = localStorage.getItem('hiddenOrders');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHiddenPanel, setShowHiddenPanel] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);
  const history = useHistory();

  // Siparişleri getir
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order');
        
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid order data received');
        }

        const ordersWithDetails = response.data.map(order => ({
          ...order,
          products: order.products.map(item => {
            // Sipariş verirken kaydedilen ürün bilgilerini kullan
            if (item.product?.name) {
              return {
                ...item,
                product: {
                  ...item.product,
                  image_url: item.product?.images?.[0]
                }
              };
            }
            
            // Eğer products varsa Redux store'dan bul
            if (products?.length > 0) {
              const productDetails = products.find(p => p.id === item.product_id);
              if (productDetails) {
                return {
                  ...item,
                  product: {
                    id: item.product_id,
                    name: productDetails.name,
                    price: productDetails.price,
                    description: productDetails.description,
                    image_url: productDetails.images?.[0]
                  }
                };
              }
            }
            
            // Hiçbiri yoksa basit bilgileri göster
            return {
              ...item,
              product: {
                id: item.product_id,
                name: 'Product Name Not Available',
                price: 0,
                image_url: null
              }
            };
          })
        }));

        setOrders(ordersWithDetails);
        setLoading(false);
      } catch (error) {
        console.error('Sipariş getirme hatası:', error);
        if (error.response?.status === 401) {
          history.push('/login');
        }
        setError(error.message || 'Failed to fetch orders');
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [history]);

  // Products'ı ayrı bir useEffect'te yükle
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  // Yardımcı fonksiyon
  const fetchProductDetails = async (productId) => {
    try {
      const response = await api.get(`/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  };

  // Tarih formatla
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Panel açma/kapama işlemini basitleştirelim
  const toggleOrderDetails = (orderId) => {
    console.log('Tıklanan sipariş ID:', orderId);
    console.log('Mevcut açık panel:', expandedOrder);
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Sipariş silme işlemi
  const handleDeleteOrder = async () => {
    try {
      setIsDeleting(true);
      setDeleteError('');

      // Backend'e silme isteği gönder
      await api.delete(`/order/${selectedOrderId}`, {
        data: {
          password: password
        }
      });

      // Başarılı silme
      setOrders(orders.filter(order => order.id !== selectedOrderId));
      setShowDeleteModal(false);
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Delete order error:', error);
      // Backend'den gelen hata mesajını göster
      const errorMessage = error.response?.data?.message || 'Failed to delete order';
      setDeleteError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  // Sipariş gizleme/gösterme toggle fonksiyonu
  const toggleOrderVisibility = (orderId) => {
    try {
      let newHiddenOrders;
      if (hiddenOrders.includes(orderId)) {
        // Eğer sipariş gizliyse göster
        newHiddenOrders = hiddenOrders.filter(id => id !== orderId);
        toast.success('Order is now visible');
      } else {
        // Eğer sipariş görünürse gizle
        newHiddenOrders = [...hiddenOrders, orderId];
        toast.success('Order hidden successfully');
      }
      
      // LocalStorage'ı güncelle
      localStorage.setItem('hiddenOrders', JSON.stringify(newHiddenOrders));
      
      // State'i güncelle
      setHiddenOrders(newHiddenOrders);
    } catch (error) {
      console.error('Error toggling order visibility:', error);
      toast.error('Failed to update order visibility');
    }
  };

  // Siparişleri filtrele
  const visibleOrders = orders.filter(order => !hiddenOrders.includes(order.id));

  // Tüm siparişleri göster
  const showAllOrders = () => {
    setHiddenOrders([]);
    localStorage.setItem('hiddenOrders', JSON.stringify([]));
    toast.success('All orders are now visible');
  };

  // Loading durumu
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E77C40]"></div>
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="text-[#E77C40] hover:text-[#d16c34]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Boş sipariş durumu
  if (!visibleOrders || visibleOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500">When you place an order, it will appear here.</p>
          </div>
        </div>

        {/* Hidden Orders Panel - Her durumda göster */}
        <div 
          className="fixed bottom-4 left-4 flex flex-col items-start z-40"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setShowHiddenPanel(false);
          }}
        >
          <button
            onClick={() => setShowHiddenPanel(!showHiddenPanel)}
            className="bg-white p-3 rounded-full shadow-lg flex items-center gap-2 text-gray-700 hover:text-[#E77C40] transition-colors mb-2"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm font-medium hidden md:inline">Hidden Orders</span>
            {hiddenOrders.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E77C40] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {hiddenOrders.length}
              </span>
            )}
          </button>

          {(showHiddenPanel || isHovering) && (
            <div className="bg-white rounded-lg shadow-lg p-4 w-[280px] md:w-[320px] max-h-[60vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-900">Hidden Orders</h3>
                {hiddenOrders.length > 0 && (
                  <button
                    onClick={showAllOrders}
                    className="text-sm text-[#E77C40] hover:text-[#d16c34] font-medium"
                  >
                    Show All
                  </button>
                )}
              </div>

              {hiddenOrders.length === 0 ? (
                <p className="text-gray-500 text-sm">No hidden orders</p>
              ) : (
                <div className="space-y-2">
                  {orders
                    .filter(order => hiddenOrders.includes(order.id))
                    .map(order => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                      >
                        <div>
                          <p className="text-sm font-medium">Order #{order.id}</p>
                          <p className="text-xs text-gray-500">
                            {formatDate(order.order_date)}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleOrderVisibility(order.id)}
                          className="p-2 text-gray-400 hover:text-[#E77C40]"
                          title="Show Order"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

        {/* Sipariş listesi veya boş durum mesajı */}
        {!visibleOrders || visibleOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500">When you place an order, it will appear here.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Tablo Başlığı */}
            <div className="hidden md:grid md:grid-cols-4 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-500">
              <div>Order Details</div>
              <div>Date</div>
              <div>Total Amount</div>
              <div>Status</div>
            </div>

            {/* Sipariş Listesi */}
            <div className="divide-y divide-gray-200">
              {visibleOrders.map((order) => {
                // Null check ekleyelim
                if (!order) return null;

                return (
                  <div key={order.id} className="group">
                    {/* Sipariş Özeti */}
                    <div 
                      className="p-4 hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleOrderDetails(order.id)}
                    >
                      <div className="md:grid md:grid-cols-4 gap-4">
                        <div className="mb-2 md:mb-0">
                          <p className="text-sm font-medium text-[#E77C40]">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {order.products?.length || 0} items
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mb-2 md:mb-0">
                          <Calendar className="w-4 h-4 text-gray-400 md:hidden" />
                          <span className="text-sm text-gray-900">
                            {formatDate(order.order_date)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-2 md:mb-0">
                          <DollarSign className="w-4 h-4 text-gray-400 md:hidden" />
                          <span className="text-sm font-medium text-gray-900">
                            ${(order.price || 0).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between md:justify-end">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Delivered
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 text-gray-400 hover:text-[#E77C40] transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleOrderVisibility(order.id);
                              }}
                              title={hiddenOrders.includes(order.id) ? "Show Order" : "Hide Order"}
                            >
                              {hiddenOrders.includes(order.id) ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              className="text-gray-400 hover:text-gray-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleOrderDetails(order.id);
                              }}
                            >
                              {expandedOrder === order.id ? (
                                <ChevronUp className="w-5 h-5" />
                              ) : (
                                <ChevronDown className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detay Paneli */}
                    {expandedOrder === order.id && order.products && (
                      <div className="border-t bg-gray-50 p-4">
                        {/* Ürün Listesi */}
                        <div className="space-y-4 mb-6">
                          <h4 className="font-medium text-gray-900">Order Items</h4>
                          <div className="grid gap-4">
                            {order.products.map((item, index) => (
                              <div 
                                key={`${order.id}-${item.product_id || index}`} 
                                className="flex items-center gap-4 bg-white p-4 rounded-lg"
                              >
                                {/* Ürün Görseli */}
                                <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                  {item.product?.image_url ? (
                                    <img
                                      src={item.product.image_url}
                                      alt={item.product?.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                      <Package className="w-8 h-8 text-gray-400" />
                                    </div>
                                  )}
                                </div>

                                {/* Ürün Bilgileri */}
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-medium text-gray-900 truncate">
                                    {item.product?.name || 'Product Name Not Available'}
                                  </h5>
                                  <div className="mt-1 space-y-1">
                                    <p className="text-sm text-gray-500">
                                      Quantity: {item.count || 0}
                                    </p>
                                    {item.product?.description && (
                                      <p className="text-sm text-gray-500 line-clamp-2">
                                        {item.product.description}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Fiyat Bilgileri */}
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">
                                    ${((item.product?.price || 0) * (item.count || 0)).toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    ${(item.product?.price || 0).toFixed(2)} each
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Teslimat ve Ödeme Bilgileri */}
                        <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                          {/* Teslimat Adresi */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-4">Delivery Address</h4>
                            <div className="bg-white p-4 rounded-lg">
                              {(order.address || order.delivery_address) ? (
                                <>
                                  <p className="font-medium text-gray-900">
                                    {order.address?.name || order.delivery_address?.name} {order.address?.surname || order.delivery_address?.surname}
                                  </p>
                                  <p className="text-gray-500 mt-2">
                                    {order.address?.neighborhood || order.delivery_address?.neighborhood}, 
                                    {order.address?.district || order.delivery_address?.district}
                                    <br />
                                    {order.address?.city || order.delivery_address?.city}
                                  </p>
                                  <p className="text-gray-500 mt-2">
                                    {order.address?.phone || order.delivery_address?.phone}
                                  </p>
                                </>
                              ) : (
                                <p className="text-gray-500">Address details not available</p>
                              )}
                            </div>
                          </div>

                          {/* Ödeme Özeti */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-4">Payment Summary</h4>
                            <div className="bg-white p-4 rounded-lg space-y-3">
                              <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>${(order.price || 0).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-gray-500">
                                <span>Shipping</span>
                                <span>Free</span>
                              </div>
                              <div className="border-t pt-3 flex justify-between font-medium text-gray-900">
                                <span>Total</span>
                                <span>${(order.price || 0).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Hidden Orders Panel - Her zaman görünür */}
      <div 
        className="fixed bottom-4 left-4 flex flex-col items-start z-40"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setShowHiddenPanel(false);
        }}
      >
        <button
          onClick={() => setShowHiddenPanel(!showHiddenPanel)}
          className="bg-white p-3 rounded-full shadow-lg flex items-center gap-2 text-gray-700 hover:text-[#E77C40] transition-colors mb-2"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium hidden md:inline">Hidden Orders</span>
          {hiddenOrders.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#E77C40] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {hiddenOrders.length}
            </span>
          )}
        </button>

        {(showHiddenPanel || isHovering) && (
          <div className="bg-white rounded-lg shadow-lg p-4 w-[280px] md:w-[320px] max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-900">Hidden Orders</h3>
              {hiddenOrders.length > 0 && (
                <button
                  onClick={showAllOrders}
                  className="text-sm text-[#E77C40] hover:text-[#d16c34] font-medium"
                >
                  Show All
                </button>
              )}
            </div>

            {hiddenOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No hidden orders</p>
            ) : (
              <div className="space-y-2">
                {orders
                  .filter(order => hiddenOrders.includes(order.id))
                  .map(order => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                    >
                      <div>
                        <p className="text-sm font-medium">Order #{order.id}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(order.order_date)}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleOrderVisibility(order.id)}
                        className="p-2 text-gray-400 hover:text-[#E77C40]"
                        title="Show Order"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 