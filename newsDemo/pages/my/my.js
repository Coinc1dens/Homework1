// pages/my/my.js
var common = require('../../utils/common.js') //引用公共JS文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:'未登录',
    src:'/images/index.png',
    newsList:[],
    num:0
  },
  getMyInfo: function (e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        console.log(res)
        this.setData({
          isLogin: true,
          src: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    });
    this.getMyFavorites();
  },
  getMyFavorites: function () {
    let info = wx.getStorageInfoSync();//读取本地缓存信息
    let keys = info.keys;//获取全部key信息
    let num = keys.length;//获取收藏新闻数量

    let myList = [];
    for (var i = 0; i < num; i++) {
      let obj = wx.getStorageSync(keys[i]);
      myList.push(obj);//将新闻添加到数组中
    }
    //更新收藏列表
    this.setData({
      newsList: myList,
      num: num
    });
  },
  goToDetail: function (e) {
    //获取携带的data-id数据
    let id = e.currentTarget.dataset.id;
    //携带新闻id进行页面跳转
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if(this.data.isLogin){
      this.getMyFavorites()
    }
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

  }
})