// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordList:[]
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
    this.getMyRecords();
  },
  getMyRecords: function () {
    let info = wx.getStorageSync('accountArr');
    info = info.sort((a,b)=>{return a.timestamp - b.timestamp});
    //更新列表
    this.setData({
      recordList: info
    });
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
  onShow: function () {
    if(getApp().globalData.loginFlag){
      this.getMyInfo()
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

  },
  getRecordList: function(e) {
    let info = e.detail.userInfo;
    this.setData({
      isLogin: true,
      src: info.avatarUrl,
      nickName: info.nickName
    })
  }
})