import { config } from '../../config/index';
import { getGoodsDetail } from '../api'

/** 获取商品列表 */
function mockFetchGood(ID = 0) {
  const { delay } = require('../_utils/delay');
  const { genGood } = require('../../model/good');
  return delay().then(() => genGood(ID));
}

/** 获取商品列表 */
export function fetchGood(ID = 0) {
  if (config.useMock) {
    // return mockFetchGood(ID);
  }
  return new Promise(async (resolve) => {
    const res = await getGoodsDetail(ID)
    const item = res?.product || {}
    resolve({
      ...item,
      spuId: item.product_id,
      images: item.head_imgs, // 头图
      minSalePrice: item.min_price, // 售价
      categoryIds: (item.cats || []).map(m => m.cat_id), // 分类 id
      desc: item?.desc_info?.imgs || [], // 描述
      spuTagList: (item.attrs || []).map(s => {
        return {
          ...s,
          id: s.attr_value,
          title: s.attr_key
        }
      }),
      skuList: (item.skus || []).map(m => {
        return {
          ...m,
          skuId: m.sku_id,
          skuImage: m.thumb_img,
          specInfo: (m.sku_attrs || []).map(s => {
            return {
              ...s,
              specId: s.attr_key,
              specValueId: s.attr_value
            }
          }),
          stockInfo: {
            stockQuantity: m.stock_num
          },
          priceInfo: [
            { priceType: 1, price: m.sale_price, priceTypeName: null },
          ]
        }
      }), // 库存
      specList: (item.skus || []).map(m => {
        return {
          ...m,
          specId: m.sku_id,
          title: m?.sku_attrs[0]?.sku_key,
          specValueList: (m.sku_attrs || []).map(s => {
            return {
              ...s,
              specValueId: s.attr_value,
              specValue: s.attr_value
            }
          })
        }
      })
    });
  });
}
