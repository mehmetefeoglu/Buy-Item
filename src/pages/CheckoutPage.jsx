import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const { cart } = useSelector(state => state.shoppingCart);
  const total = cart.reduce((sum, item) => sum + (item.product.price * item.count), 0);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-xl mb-6 font-bold sm:text-2xl sm:mb-8">Checkout</h1>
      
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Form */}
        <div className="w-full">
          {/* Shipping Information */}
          <div className="bg-white p-4 rounded border mb-6 sm:p-6">
            <h2 className="text-lg font-semibold mb-4 sm:text-xl">Shipping Information</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full p-2.5 text-sm border rounded sm:flex-1"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full p-2.5 text-sm border rounded sm:flex-1"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-2.5 text-sm border rounded"
              />
              <input 
                type="text" 
                placeholder="Address" 
                className="w-full p-2.5 text-sm border rounded"
              />
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white p-4 rounded border sm:p-6">
            <h2 className="text-lg font-semibold mb-4 sm:text-xl">Payment Information</h2>
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Card Number" 
                className="w-full p-2.5 text-sm border rounded"
              />
              <div className="flex flex-col gap-4 sm:flex-row">
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  className="w-full p-2.5 text-sm border rounded sm:flex-1"
                />
                <input 
                  type="text" 
                  placeholder="CVC" 
                  className="w-full p-2.5 text-sm border rounded sm:flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded sm:p-6">
          <h2 className="text-lg font-bold mb-4 sm:text-xl">Order Summary</h2>
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
            className="w-full mt-6 py-2.5 px-4 text-sm font-medium bg-[#E77C40] text-white rounded-full hover:bg-[#d16c34] transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 