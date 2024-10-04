/* eslint-disable no-param-reassign */
import { config } from '../../config/index';
import { getCategoryGoodsList } from '../api'

/** 获取商品列表 */
function mockFetchGoodsList(params) {
  const { delay } = require('../_utils/delay');
  const { getSearchResult } = require('../../model/search');

  const data = getSearchResult(params);

  if (data.spuList.length) {
    data.spuList.forEach((item) => {
      item.spuId = item.spuId;
      item.thumb = item.primaryImage;
      item.title = item.title;
      item.price = item.minSalePrice;
      item.originPrice = item.maxLinePrice;
      item.desc = '';
      if (item.spuTagList) {
        item.tags = item.spuTagList.map((tag) => tag.title);
      } else {
        item.tags = [];
      }
    });
  }
  return delay().then(() => {
    return data;
  });
}

/** 获取商品列表 */
export function fetchGoodsList(params) {
  if (config.useMock) {
    // return mockFetchGoodsList(params);
  }
  return new Promise(async (resolve) => {
    const res = await getCategoryGoodsList(params)
    console.log(res);
    res.products.map(item => {
      item.spuId = item.product_id
      item.thumb = item.head_imgs[0]
      item.title = item.title
      item.price = item.min_price
      item.originPrice = item.maxLinePrice
    })
    resolve(res);
  });
}
