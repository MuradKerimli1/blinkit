export const baseUrl = import.meta.env.VITE_API_URL;

const summaryApi = {
  register: {
    url: "user/register",
    method: "post",
  },
  login: {
    url: "user/login",
    method: "post",
  },
  forgot_password: {
    url: "user/forgot-password",
    method: "put",
  },
  forgot_password_verification: {
    url: "user/verify-forgot-password-otp",
    method: "put",
  },
  reset_password: {
    url: "user/reset-password",
    method: "put",
  },
  refresh_token: {
    url: "user/refresh-token",
    method: "post",
  },
  user_details: {
    url: "user/user-details",
    method: "get",
  },
  logout: {
    url: "user/logout",
    method: "get",
  },
  upload_avatar: {
    url: "user/upload-avatar",
    method: "put",
  },
  update_user_details: {
    url: "user/update-user-details",
    method: "put",
  },
  add_category: {
    url: "category/create",
    method: "post",
  },
  uploadImage: {
    url: "file/upload",
    method: "post",
  },
  get_category: {
    url: "category/getCategory",
    method: "get",
  },
  update_category: {
    url: "category/editCategory",
    method: "put",
  },
  delete_category: {
    url: "category/deleteCategory",
    method: "delete",
  },
  add_subcategory: {
    url: "subCategory/create",
    method: "post",
  },
  get_subcategory: {
    url: "subCategory/get",
    method: "get",
  },
  edit_subcategory: {
    url: "subCategory/edit",
    method: "put",
  },
  delete_subcategory: {
    url: "subCategory/delete",
    method: "delete",
  },
  add_product: {
    url: "product/create",
    method: "post",
  },
  get_product: {
    url: "product/get",
    method: "post",
  },
  get_product_by_category: {
    url: "product/getProductByCategory",
    method: "post",
  },
  get_product_by_category_and_subcategory: {
    url: "product/getProductByCategoryAndSubCategory",
    method: "post",
  },
  get_product_details: {
    url: "product/getProductDetails",
    method: "post",
  },
  edit_product: {
    url: "product/productEdit",
    method: "put",
  },
  deleteProduct: {
    url: "product/deleteProduct",
    method: "delete",
  },
  searchProduct: {
    url: "product/searchProduct",
    method: "post",
  },
  addCartItem: {
    url: "cart/addCardItem",
    method: "post",
  },
  getCartItem: {
    url: "cart/getCards",
    method: "get",
  },
  updateCartItem: {
    url: "cart/updateCart",
    method: "put",
  },
  deleteCartItem: {
    url: "cart/deleteCart",
    method: "delete",
  },
  addAddress: {
    url: "address/create",
    method: "post",
  },
  getAddress: {
    url: "address/get",
    method: "get",
  },
  updateAddress: {
    url: "address/update",
    method: "put",
  },
  deleteAddress: {
    url: "address/delete",
    method: "delete",
  },
  cashOrder: {
    url: "order/cash-order",
    method: "post",
  },
  orderDetails: {
    url: "order/orderList",
    method: "get",
  },
};

export default summaryApi;
