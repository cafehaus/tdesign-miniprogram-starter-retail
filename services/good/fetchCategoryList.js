import { config } from '../../config/index';
import { getGoodsCategory } from '../api'

/** 获取商品列表 */
function mockFetchGoodCategory() {
  const { delay } = require('../_utils/delay');
  const { getCategoryList } = require('../../model/category');
  return delay().then(() => getCategoryList());
}

/** 获取商品列表 */
export function getCategoryList() {
  if (config.useMock) {
    // return mockFetchGoodCategory();
  }
  return new Promise(async (resolve) => {
    // groupId: '24948',
    //   name: '女装',
    //   thumbnail:
    //     'https://cdn-we-retail.ym.tencent.com/miniapp/category/category-default.png',
    //   children
    const res = await getGoodsCategory()
    const list = fmtData(res?.resp?.tree?.level_1 || [])
    console.log("list==================");
    console.log(res?.resp?.tree?.level_1);
    console.log(list);
    resolve(list);
  });
}

/**
 * 格式化分类树数据
 * 
 * @param {*} arr 
 * @param {*} parentId 
 */
function fmtData(arr, parentId) {
  return arr.map(m => {
    // 查询分类对应的商品列表时需要父级 id
    m.levelId = parentId ? `${parentId}_${m.id}` : m.id

    m.groupId = m.id
    m.name = m.name
    m.thumbnail = 'https://cdn-we-retail.ym.tencent.com/tsr/classify/img-3.png'
    const childrenKey = Object.keys(m).find(k => k.startsWith('level_'))
    const children = m[childrenKey]
    if (children && children.length) {
      m.children = fmtData(children, m.levelId)
    }

    return m
  })
}