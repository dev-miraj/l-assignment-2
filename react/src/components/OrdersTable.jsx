function OrdersTable({ orders, onDeliver, onDelete, filter, onFilterChange }) {
  const filteredOrders = orders.filter((order) => {
    if (filter === "Pending") return !order.delivered;
    if (filter === "Delivered") return order.delivered;
    return true; 
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Order Reports</h2>

        <div className="flex gap-4 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-funnel-icon"
          >
            <path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" />
          </svg>
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="appearance-none bg-cardbg text-white pr-8 pl-3 py-2 rounded-lg focus:ring-0 border-0 outline-0"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Delivered</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#36343c]  rounded-lg p-4">
        <div className="reports-container">
          <table className="min-w-full reports-container">
            <thead>
              <tr className="text-left text-sm border-b border-gray-700 sticky top-0 bg-cardbg">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer Name</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-gray-700 hover:bg-[rgba(89,86,86,0.2)] transition-colors duration-200"
                >
                  <td className="py-3">{order.id}</td>
                  <td className="py-3">{order.customerName}</td>
                  <td className="py-3">
                    {Object.entries(order.items).map(([itemId, quantity]) => {
                      const item = order.foodItems.find(
                        (food) => food.id === itemId
                      );
                      return (
                        quantity > 0 && (
                          <div
                            key={itemId}
                            className="flex items-center gap-1 text-gray-300"
                          >
                            <span>{item?.name}</span>
                            <span className="text-gray-500">×</span>
                            <span>{quantity}</span>
                          </div>
                        )
                      );
                    })}
                  </td>
                  <td className="py-3">BDT {order.total}</td>
                  <td className="py-3">
                    <span
                      className={
                        order.delivered
                          ? "bg-green-500/20 text-green-500 px-2 py-1 rounded"
                          : "bg-orange-500/20 text-orange-500 px-2 py-1 rounded"
                      }
                    >
                      {order.delivered ? "Delivered" : "Pending"}
                    </span>
                  </td>
                  <td className="py-3 space-x-2">
                    <button
                      onClick={() => onDelete(order.id)}
                      className="bg-red-500/20 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      Delete
                    </button>
                    {!order.delivered && (
                      <button
                        onClick={() => onDeliver(order.id)}
                        className="bg-green-500/20 text-green-500 px-3 py-1 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersTable;
