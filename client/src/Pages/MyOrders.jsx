import { useSelector } from "react-redux";
import NoneData from "../Companents/NoneData";

const MyOrders = () => {
  const orders = useSelector((state) => state.order.orderList);

  console.log("Order Items", orders);

  return (
    <div>
      <div className="bg-white shadow-md p-3 font-semibold">
        <h1>Orders</h1>
      </div>
      {!orders.length && <NoneData />}
      {orders.map((order, index) => (
        <div
          key={order.orderId || index}
          className="border border-neutral-400 rounded p-4 mt-2 text-sm"
        >
          <p>Order No: {order.orderId}</p>
          <p>Payment Status: {order.payment_status}</p>
          <p>Total Amount: ${order.totalAmt}</p>
          <div className="mt-2">
            {order.product.map((item, idx) => (
              <div key={idx} className="flex gap-3 border-t pt-2 mt-2">
                <img src={item.image[0]} className="w-14 h-14" alt={item.name} />
                <p className="font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
