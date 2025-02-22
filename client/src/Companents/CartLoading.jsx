import React from "react";

const CartLoading = () => {
  return (
    <div className="border border-neutral-300 shadow-md overflow-hidden p-2 lg:p-3 flex flex-col gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white animate-pulse">
      <div className="h-24 w-full bg-blue-50 rounded"></div>
      <div className="h-4 bg-blue-50 rounded w-20"></div>
      <div className="h-4 bg-blue-50 rounded"></div>
      <div className="h-4 bg-blue-50 rounded w-14"></div>

      <div className="flex items-center justify-between gap-3">
        <div className="h-4 bg-blue-50 rounded w-20"></div>
        <div className="h-4 bg-blue-50 rounded w-20"></div>
      </div>
    </div>
  );
};

export default CartLoading;
