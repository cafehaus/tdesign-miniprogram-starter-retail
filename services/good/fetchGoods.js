import { config } from '../../config/index';
import { getGoodsList } from '../api'

/** 获取商品列表 */
function mockFetchGoodsList(pageIndex = 1, pageSize = 20) {
  const { delay } = require('../_utils/delay');
  const { getGoodsList } = require('../../model/goods');
  return delay().then(() =>
    getGoodsList(pageIndex, pageSize).map((item) => {
      return {
        spuId: item.spuId,
        thumb: item.primaryImage,
        title: item.title,
        price: item.minSalePrice,
        originPrice: item.maxLinePrice,
        tags: item.spuTagList.map((tag) => tag.title),
      };
    }),
  );
}

/** 获取商品列表 */
// export function fetchGoodsList(pageIndex = 1, pageSize = 20) {
//   if (config.useMock) {
//     return mockFetchGoodsList(pageIndex, pageSize);
//   }
//   return new Promise((resolve) => {
//     resolve('real api');
//   });
// }
export function fetchGoodsList(params) {
  return new Promise(async (resolve) => {
    const res = await getGoodsList(params)
    console.log(res);
    res.productList.map(item => {
      item.spuId = item.product_id
      item.thumb = item.head_imgs[0]
      item.title = item.title
      item.price = item.min_price
      item.originPrice = item.maxLinePrice
      // item.tags = item.spuTagList.map((tag) => tag.title)
    })
    resolve(res);
  });
}