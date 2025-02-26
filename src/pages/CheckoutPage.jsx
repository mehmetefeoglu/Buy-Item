import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const { cart } = useSelector(state => state.shoppingCart);
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form - Sol Taraf */}
        <div className="flex-[2] space-y-6">
          {/* Shipping Information */}
          <div className="bg-white p-6 rounded border">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="flex-1 p-2 border rounded"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="flex-1 p-2 border rounded"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-2 border rounded"
              />
              <input 
                type="text" 
                placeholder="Address" 
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white p-6 rounded border">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Card Number" 
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-4">
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="flex-1 p-2 border rounded"
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  className="flex-1 p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary - Sağ Taraf */}
        <div className="flex-1 bg-gray-50 p-6 rounded h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
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
          <button 
            className="w-full mt-6 bg-[#E77C40] text-white py-3 rounded hover:bg-[#d16c34] transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 