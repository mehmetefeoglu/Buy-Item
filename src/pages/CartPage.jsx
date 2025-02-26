import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart } = useSelector(state => state.shoppingCart);
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

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
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items - Sol 2 Sütun */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex gap-4 p-4 border rounded">
                <img 
                  src={item.product.images[0].url} 
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price} x {item.count}</p>
                  <p className="font-medium">Total: ${(item.product.price * item.count).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - Sağ Sütun */}
          <div className="bg-gray-50 p-4 rounded h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
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
            <Link
              to="/checkout"
              className="block w-full bg-[#E77C40] text-white text-center py-3 rounded hover:bg-[#d16c34] transition-colors"
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