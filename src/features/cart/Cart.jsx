import Button from "../../Components/UI/Button";

const Cart = () => {
  return (
    <div className="px-4 py-3 h-full overflow-y-auto overflow-x-hidden scrollbar-hidden pb-10">
      <h2 className="font-[700] text-[1.2rem] mb-3">Current Order</h2>
      <section>
        <ul className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((itm, i) => (
            <li
              key={i}
              className="flex items-center bg-gray-100 rounded-md py-2 px-3 gap-3"
            >
              <div className="w-[60px] h-[60px]">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <h3 className="font-[600]">Burger</h3>
                <div className="flex items-center justify-between">
                  <h5 className="font-[700] text-primary-500">$15.90</h5>
                  <div className="flex items-center gap-2">
                    <button className="border-2 rounded-md px-2 border-primary-500 hover:bg-primary-500 hover:text-primary-100">
                      &minus;
                    </button>
                    <span className="font-[700]">4</span>
                    <button className="border-2 rounded-md px-2 border-primary-500 hover:bg-primary-500 hover:text-primary-100">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="absolute bottom-0 w-full bg-white border-t-2 py-4 pr-5 z-30 flex flex-col gap-5">
        <div className="flex justify-between font-[700] px-3">
          <span>Total:</span>
          <span>$88.80</span>
        </div>
        <div className="flex justify-between px-3">
          <Button variant="dark">Send to Kitchen</Button>
          <Button variant="dark">Print Invoice</Button>
        </div>
      </section>
    </div>
  );
};

export default Cart;
