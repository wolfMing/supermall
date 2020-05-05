import {ADD_COUNTER,ADD_TO_CART} from "./mutation-types";

export default {
  // addCart({state,mutations},payload) {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
        //查找cartList中原本是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        //验证是否有新的值
        if (oldProduct) {   /*商品数量+1*/
          context.commit(ADD_COUNTER,oldProduct)
          resolve('商品的数量+1')
        }else { /*添加新的商品*/
          payload.count = 1
          context.commit(ADD_TO_CART,payload)
          resolve('添加了新的商品')
        }
    })
  },
}
