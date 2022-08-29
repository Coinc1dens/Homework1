
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nickName:'未登录',
    src:'/images/index1.png',
    date: '',
    costs: 0.00,
    recordList: []
  },
  getMyInfo: function (e) {
    if(getApp().globalData.loginFlag == false){
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
      getApp().globalData.loginFlag=true;
    }
    
    this.getMyRecords();
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
  sortArray: function(field) {
    return function(obj1, obj2) {
        return obj1[field] > obj2[field];
    }
  },
  getMyRecords: function (info=wx.getStorageSync('accountArr') || []) {
    let today = this.getPresentTime();
    //更新列表
    info = info.sort((a,b)=>{return a.timestamp - b.timestamp});
    let formatInfo = [];
    for (let v of info){
      if(v.time['year'] != today['year'] || v.time['month'] != today['month'] || v.time['day'] != today['day']){
        break;
      }
      formatInfo.push(v);
    }
    info = formatInfo;
    let cost = 0.00;
    for (let v of info){
      v.money = Number(v.money).toFixed(2);
      cost -= v.money;
    }
    cost = cost.toFixed(2);
    this.setData({
      recordList: info,
      date: today['year']+'-'+today['month']+'-'+today['day'],
      costs: -cost
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(getApp().globalData.loginFlag){
      this.getMyInfo()
    }
    else{
      this.getMyRecords([])
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})