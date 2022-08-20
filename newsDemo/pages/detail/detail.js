// pages/detail/detail.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;//获取页面跳转来时的携带数据
    var article = wx.getStorageSync(id)
    if(article!=''){
      this.setData({
        article:article,
        isAdd:true
      })
    }
    else{
      let result = common.getNewsDetail(id)
      //获取到新闻内容
      if (result.code == '200') {
        this.setData({
          article: result.news,
          isAdd:false
        })
      }
    }
    
  },
  addFavorites: function (options) {
    let article = this.data.article;//获取当前新闻
    wx.setStorageSync(article.id, article);//添加到本地缓存
    this.setData({ isAdd: true });//更新按钮显示
  },
  //取消收藏
  cancelFavorites: function () {
    let article = this.data.article;//获取当前新闻
    wx.removeStorageSync(article.id);//从本地缓存删除
    this.setData({ isAdd: false });//更新按钮显示
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  goToDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  }
})