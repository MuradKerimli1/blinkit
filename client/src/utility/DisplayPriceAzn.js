const displayPrice = (price) => {
  const formattedPrice = new Intl.NumberFormat("az-AZ", {
    style: "currency",
    currency: "AZN",
  }).format(price);

  return formattedPrice;
};
export default displayPrice;
