// pages/welcome/welcome.js
const app = getApp();
console.log(app);
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  gotoStuInfoDetail: function () {
    // 第一次进入这个页面 则需要完善个人信息
      wx.redirectTo({
        url: "/freshman/pages/freshman/" + (
          app.globalData.userDetail == '' ||
          app.globalData.userDetail == null
            ? "inputInfo/inputInfo?isHidden=flex"
            : "stuInfoDetail/stuInfoDetail"
        )
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
