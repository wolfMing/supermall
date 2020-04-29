import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  }).catch(err => err)
}
//评论数据
export function getRecommend() {
  return request({
    url: '/recommend'
  }).catch(err => err)
}

//详情数据
export class Goods {
  constructor(itemInfo, columns, service) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.service = service;
  }
}
// 店铺数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}
// 尺寸数据
export class GoodsParam {
  constructor(info, rule) {
    //images可能没有值(有些商品有值，有些没有)
    this.image = info.image ? info.image[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
