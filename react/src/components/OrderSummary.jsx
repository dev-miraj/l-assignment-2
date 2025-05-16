function OrderSummary({ total = 0, pending = 0, delivered = 0 }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Total Orders */}
        <div className="bg-[rgba(89,86,86,0.4)] rounded-lg p-4 relative overflow-hidden hover:bg-[rgba(89,86,86,0.5)] transition-all duration-300">
          <div className="text-5xl font-bold text-yellow-500 mb-2 animate-fade-in">{total}</div>
          <div className="bg-yellow-800 bg-opacity-50 text-yellow-200 text-xs font-medium px-3 py-1 rounded-full inline-block">
            Total Order
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-[rgba(89,86,86,0.4)] rounded-lg p-4 relative overflow-hidden hover:bg-[rgba(89,86,86,0.5)] transition-all duration-300">
          <div className="text-5xl font-bold text-red-500 mb-2 animate-fade-in">{pending}</div>
          <div className="bg-red-800 bg-opacity-50 text-red-200 text-xs font-medium px-3 py-1 rounded-full inline-block">
            Pending
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-[rgba(89,86,86,0.4)] rounded-lg p-4 relative overflow-hidden hover:bg-[rgba(89,86,86,0.5)] transition-all duration-300">
          <div className="text-5xl font-bold text-green-500 mb-2 animate-fade-in">{delivered}</div>
          <div className="bg-green-800 bg-opacity-50 text-green-200 text-xs font-medium px-3 py-1 rounded-full inline-block">
            Delivered
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;