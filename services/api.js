import http from './_utils/http'
import { config } from '../config/index'

const domain = config.domain
const wp = `https://${domain}/wp-json/wp/v2/`
const wm = `https://${domain}/wp-json/minapper/v1/`

// ===================================================== 商品
// 获取商品详情
export const getGoodsDetail = id => http.get(`${wm}wechatshop/product/${id}`)

// 获取商品列表
export const getGoodsList = params => http.get(`${wm}wechatshop/product/getlist`, params)

// 获取商品分类
export const getGoodsCategory = params => http.get(`${wm}wechatshop/classificationtree`)

// 获取分类对应的商品列表
export const getCategoryGoodsList = params => http.get(`${wm}wechatshop/classificationtree/product`, params)

// 获取精选商品和热销商品
export const getHotGoodsList = params => http.get(`${wm}wechatshop/extptions`, params)