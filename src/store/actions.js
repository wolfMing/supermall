import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
  // addCart({state,mutations},payload) {
  addCart(context,payload) {
    //查找cartList中原本是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    //验证是否有新的值
    if (oldProduct) {
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      payload.count = 1
      context.commit(ADD_TO_CART,payload)
    }
  },
}
