import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, Trash2 } from 'lucide-react';
import { updateCartItem, removeFromCart } from '../store/actions/shoppingCartActions';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);
  
  // Seçili ürünlerin toplam tutarı
  const selectedTotal = cart
    .filter(item => item.checked)
    .reduce((sum, item) => sum + (item.product.price * item.count), 0);

  // Ürün seçme/seçimi kaldırma
  const handleToggleCheck = (productId) => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
      dispatch(updateCartItem(productId, item.count, !item.checked));
    }
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-xl mb-6 font-bold sm:text-2xl sm:mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            to="/shop" 
            className="inline-block bg-[#23A6F0] text-white px-4 py-2 text-sm rounded-full hover:bg-[#1a7ab3] transition-colors sm:px-6"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          {/* Sol taraf - Cart Table ve Mobile Controls */}
          <div className="flex-1">
            {/* Cart Table */}
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-[640px] px-4 sm:px-0">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-4 text-left">
                        <input 
                          type="checkbox" 
                          checked={cart.every(item => item.checked)}
                          onChange={() => {
                            const allChecked = cart.every(item => item.checked);
                            cart.forEach(item => {
                              dispatch(updateCartItem(item.product.id, item.count, !allChecked));
                            });
                          }}
                          className="rounded border-gray-300"
                        />
                      </th>
                      <th className="p-4 text-left">Product</th>
                      <th className="p-4 text-left">Price</th>
                      <th className="hidden sm:table-cell p-4 text-left">Quantity</th>
                      <th className="hidden sm:table-cell p-4 text-left">Total</th>
                      <th className="p-4 text-center">
                        <span className="hidden sm:inline">Actions</span>
                        <span className="sm:hidden">Price</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cart.map(item => (
                      <tr key={item.product.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            checked={item.checked}
                            onChange={() => handleToggleCheck(item.product.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-4">
                            <img 
                              src={item.product.images[0].url} 
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h3 className="font-medium">{item.product.name}</h3>
                              <p className="text-sm text-gray-500">{item.product.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">${item.product.price}</td>
                        <td className="hidden sm:table-cell p-4">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => dispatch(updateCartItem(item.product.id, Math.max(1, item.count - 1), item.checked))}
                              className={`p-1 rounded transition-colors ${
                                item.count > 1 
                                  ? 'text-[#E77C40] hover:bg-[#fff4ef]' 
                                  : 'text-gray-300 cursor-not-allowed'
                              }`}
                              disabled={item.count <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center">{item.count}</span>
                            <button 
                              onClick={() => dispatch(updateCartItem(item.product.id, item.count + 1, item.checked))}
                              className="p-1 text-[#E77C40] hover:bg-[#fff4ef] rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                        <td className="hidden sm:table-cell p-4">
                          ${(item.product.price * item.count).toFixed(2)}
                        </td>
                        <td className="p-4 text-center">
                          <span className="sm:hidden">${item.product.price}</span>
                          <button 
                            onClick={() => dispatch(removeFromCart(item.product.id))}
                            className="hidden sm:inline p-1 hover:bg-red-50 rounded text-red-500 hover:text-red-600 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quantity Controls - Mobile */}
            <div className="sm:hidden mt-6 mb-6">
              {cart.map(item => (
                <div key={item.product.id} className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.product.images[0].url} 
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <span className="text-sm font-medium">{item.product.name}</span>
                      <div className="text-sm text-gray-600 mt-1">
                        Total: ${(item.product.price * item.count).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => dispatch(updateCartItem(item.product.id, Math.max(1, item.count - 1), item.checked))}
                        className={`p-1 rounded transition-colors ${
                          item.count > 1 
                            ? 'text-[#E77C40] hover:bg-[#fff4ef]' 
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                        disabled={item.count <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.count}</span>
                      <button 
                        onClick={() => dispatch(updateCartItem(item.product.id, item.count + 1, item.checked))}
                        className="p-1 text-[#E77C40] hover:bg-[#fff4ef] rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="p-1 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ taraf - Order Summary */}
          <div className="w-full sm:w-[510px] lg:w-[380px] mx-auto lg:mx-0">
            <div className="bg-gray-50 p-6 rounded sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              {/* Subtotal */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${selectedTotal.toFixed(2)}</span>
                </div>
                
                {/* Shipping */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>

                {/* Discount */}
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-$0.00</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Promo Code"
                  className="flex-1 p-2.5 text-sm border rounded"
                />
                <button className="px-4 py-2.5 text-sm font-medium bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors">
                  Apply
                </button>
              </div>

              {/* Grand Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Grand Total</span>
                  <span className="text-xl font-bold">${selectedTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Create Order ve Continue Shopping butonları */}
              <div className="space-y-4">
                <button 
                  className="w-full py-3 px-4 text-sm font-medium bg-[#E77C40] text-white rounded-full hover:bg-[#d16c34] transition-colors"
                >
                  Create Order
                </button>

                <Link 
                  to="/shop"
                  className="w-full py-3 px-4 text-sm font-medium text-center border-2 border-[#23A6F0] text-[#23A6F0] rounded-full hover:bg-gray-50 transition-colors lg:hidden"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 