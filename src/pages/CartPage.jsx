import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            to="/shop" 
            className="inline-block bg-[#23A6F0] text-white px-6 py-2 rounded hover:bg-[#1a7ab3] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Cart Table */}
          <div className="w-full overflow-x-auto">
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
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-left">Actions</th>
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
                    <td className="p-4">
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
                    <td className="p-4">${(item.product.price * item.count).toFixed(2)}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        className="p-1 hover:bg-gray-100 rounded text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan="4" className="p-4 text-right font-medium">Selected Total:</td>
                  <td className="p-4 font-bold">${selectedTotal.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Continue Shopping ve Checkout Buttons */}
          <div className="flex justify-between items-center">
            <Link 
              to="/shop"
              className="px-6 py-2 border-2 border-[#23A6F0] text-[#23A6F0] rounded hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/checkout"
              className="px-6 py-2 bg-[#E77C40] text-white rounded hover:bg-[#d16c34] transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 