import { Link } from "react-router-dom";

import AddCartButton from "./AddCartButton";

const CartProduct = ({ data }) => {
  const url = `/product/${data.name.replaceAll(" ", "-")}-${data.id}`;

  return (
    <Link
      to={url}
      className={`border relative min-h-66 max-h-66 h-full border-neutral-200 shadow-sm overflow-hidden p-2 lg:p-3 flex flex-col gap-1 lg:gap-2 rounded cursor-pointer 
    ${
      data?.stock == 0
        ? " bg-[rgba(255, 255, 255, 0.6)] opacity-50"
        : " bg-white"
    }`}
    >
      <div className="w-full h-25 overflow-hidden flex justify-center items-center">
        <img
          src={data.image[0]}
          alt="productImage"
          className="w-full h-full object-scale-down"
        />
      </div>
      <div className="rounded text-sm w-fit p-[2px] text-green-600 bg-green-50">
        10 min
      </div>

      <div className="font-semibold text-ellipsis line-clamp-1">
        {data.name}
      </div>
      <div className="w-fit">{data.unit}</div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex flex-col text-[12px] font-semibold">
          <div>
            {data?.discount
              ? ((data?.price * (100 - data?.discount)) / 100).toFixed(2)
              : data?.price}{" "}
            AZN
          </div>
          {Boolean(data?.discount) && (
            <div className="line-through text-gray-500">{data?.price} AZN</div>
          )}
        </div>

        <div>
          {data?.stock == 0 ? (
            <p className="bg-black  p-[2px] text-[10px]  font-medium text-white rounded  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              Out of stock
            </p>
          ) : (
            <AddCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default CartProduct;
