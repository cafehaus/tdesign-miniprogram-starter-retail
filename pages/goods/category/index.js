import { getCategoryList } from '../../../services/good/fetchCategoryList';
Page({
  data: {
    list: [],
  },
  async init() {
    try {
      const result = await getCategoryList();
      this.setData({
        list: result,
      });
    } catch (error) {
      console.error('err:', error);
    }
  },

  onShow() {
    this.getTabBar().init();
  },
  onChange(e) {
    const { item } = e.detail
    wx.navigateTo({
      url: `/pages/goods/list/index?levelId=${item.levelId}`,
    });
  },
  onLoad() {
    this.init(true);
  },
});
