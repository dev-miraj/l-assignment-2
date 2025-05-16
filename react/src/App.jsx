import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import OrderForm from "./components/OrderForm";
import OrderSummary from "./components/OrderSummary";
import OrdersTable from "./components/OrdersTable";
import  Chicken  from "./assets/chicken.svg";
import Burger from "./assets/hamburger.svg"
import Submarin from "./assets/submarine.svg"
import Pizza from "./assets/pizza.svg";
// Initial food items data
const initialFoodItems = [
  { id: "1", 
    name: "Hamburger", 
    price: 300, 
    image: `${Burger}` 
  },
  {
    id: "2",
    name: "Chicken Nuggets",
    price: 300,
    image: `${Chicken}`,
  },

  
  {
    id: "3",
    name: "Submarine Sandwich",
    price: 300,
    image: `${Submarin}`,
  },
  { id: "4", 
    name: "Pizza slices", 
    price: 300, 
    image: `${Pizza}` 
  },
];

function App() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  // Calculate order statistics
  const orderStats = useMemo(() => {
    const total = orders.length;
    const delivered = orders.filter((order) => order.delivered).length;
    const pending = total - delivered;
    return { total, delivered, pending };
  }, [orders]);

  // Handle placing a new order
  const handlePlaceOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      ...orderData,
      delivered: false,
      foodItems: initialFoodItems, // Include for reference in OrdersTable
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // Handle delivering an order
  const handleDeliver = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, delivered: true } : order
      )
    );
  };

  // Handle deleting an order
  const handleDelete = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <div className="h-screen bg-[#1F1D2B] text-white p-4 md:p-8">
      <div className="">
        <Navbar />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Create Order Section */}
          <div className="md:sticky md:top-4 h-fit">
            <OrderForm
              onSubmit={handlePlaceOrder}
              foodItems={initialFoodItems}
            />
          </div>

          {/* Order Summary and Reports Section */}
          <div className="md:col-span-2 space-y-6 ">
            <OrderSummary
              total={orderStats.total}
              pending={orderStats.pending}
              delivered={orderStats.delivered}
            />
            <OrdersTable
              orders={orders}
              onDeliver={handleDeliver}
              onDelete={handleDelete}
              filter={filterStatus}
              onFilterChange={setFilterStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
