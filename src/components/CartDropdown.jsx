import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { updateCartItem, removeFromCart } from '../store/actions/shoppingCartActions';

const CartDropdown = ({ onClose }) => {
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.shoppingCart);
  
  // Toplam tutarı hesapla
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Count 0 olduğunda ürünü kaldır
  const handleUpdateCount = (productId, newCount) => {
    if (newCount <= 0) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateCartItem(productId, newCount));
    }
  };

  return (
    <div ref={dropdownRef} className="absolute right-0 top-full mt-2 w-80 bg-white shadow-lg rounded-md z-50">
      {cart.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          Your cart is empty
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.product.id} className="p-4 border-b">
              <div className="flex items-center gap-4">
                <img 
                  src={item.product.images[0].url} 
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.count} x ${item.product.price}
                  </p>
                  {/* Ürün Kontrolleri */}
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                      onClick={() => handleUpdateCount(item.product.id, item.count - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-sm">{item.count}</span>
                    <button 
                      onClick={() => handleUpdateCount(item.product.id, item.count + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="p-1 hover:bg-gray-100 rounded ml-auto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Total ve Butonlar */}
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            {/* İki butonlu yeni tasarım */}
            <div className="flex gap-2">
              <Link 
                to="/cart"
                className="flex-1 bg-white border-2 border-[#23A6F0] text-[#23A6F0] text-center py-2 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
                onClick={onClose}
              >
                Sepete Git
              </Link>
              <Link 
                to="/checkout"
                className="flex-1 bg-[#E77C40] text-white text-center py-2 rounded hover:bg-[#d16c34] transition-colors text-sm font-medium"
                onClick={onClose}
              >
                Siparişi Tamamla
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown; 