import { useState } from "react";

function OrderForm({ onSubmit, foodItems }) {
  const [customerName, setCustomerName] = useState("");
  const [selectedItems, setSelectedItems] = useState({});

  const handleQuantityChange = (itemId, increment) => {
    setSelectedItems((prev) => {
      const currentQty = prev[itemId] || 0;
      const newQty = increment ? currentQty + 1 : Math.max(0, currentQty - 1);
      return { ...prev, [itemId]: newQty };
    });
  };

  const calculateTotal = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = foodItems.find((item) => item.id === itemId);
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }
    if (Object.values(selectedItems).every((qty) => qty === 0)) {
      alert("Please select at least one item");
      return;
    }
    onSubmit({
      customerName,
      items: selectedItems,
      total: calculateTotal(),
    });
    setCustomerName("");
    setSelectedItems({});
  };

  return (
    <div className="bg-[rgba(89,86,86,0.4)] rounded-lg p-6 h-[calc(100vh_-_130px)]">
      <h2 className="text-xl font-bold mb-1">CREATE ORDER</h2>
      <p className="text-gray-400 text-sm mb-4">
        Accurately fulfill customer orders based on a precise understanding of
        their requirements.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Customer Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full bg-gray-700 bg-opacity-50 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FF602C] transition-all duration-300"
            placeholder="Enter customer name"
          />
        </div>

        {/* Choose Items */}
        <div className="mb-4 ">
          <label className="block text-sm font-medium mb-2">Choose Items</label>
          <div className="items-container space-y-3 max-h-[calc(100vh-450px)] overflow-y-auto custom-scrollbar pr-2">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 bg-opacity-30 rounded-md p-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 flex items-center justify-center mr-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-xs text-gray-400">BDT {item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item.id, false)}
                    className="w-8 h-8 bg-gray-800 hover:bg-[#FF602C] rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50"
                    disabled={!selectedItems[item.id]}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <span className="w-6 text-center">
                    {selectedItems[item.id] || 0}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(item.id, true)}
                    className="w-8 h-8 bg-gray-800 hover:bg-[#FF602C] rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          className="w-full bg-[#FF602C] hover:bg-opacity-90 text-white font-medium py-3 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        >
          Place Order (BDT {calculateTotal()})
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
