// pages/add/add.js
import info from '../../utils/common';
Page({
  
  data: {
    category: info.classes.map((item) => item.name),
    money: 0,
    index: 0
  },
  onAmountChange(e) {
    const money = e.detail.value;

    this.setData({
      money: money
    });
  },
  getPresentTime: function() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const minutes = today.getMinutes();
    const hours = today.getHours();
    return {
        year,
        month,
        day,
        minutes,
        hours
    }
  },
  onClassChange(e) {
    this.setData({
        index: e.detail.value
    })
  },
  saveBtn() {
    const today = new Date();
    const { money, index } = this.data;
    if (index === 0 || !money) return;
    let accountArr = wx.getStorageSync('accountArr') || [];
    accountArr.push({
        money: money,
        category: info.classes[index].name,
        time: this.getPresentTime(),
        categoryImage: info.classes[index].pic,
        timestamp: -today.getTime()
    });

    wx.setStorageSync('accountArr', accountArr);
    wx.navigateBack();
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

  }
})