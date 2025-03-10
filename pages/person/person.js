// pages/person/person.js
const app = getApp();
const commonUrl = app.globalData.commonUrl;
const requestUtils = require('../../utils/requestUtils');
const promisify = require('../../utils/promisifyUtils');
const wxLogin = promisify(wx.login);
var wxCode = "";

const setUserData = (t, data) => t.setData({
  nickName: data.nickName,
  avater: data.userAvatar,
  isLogin: data.isLogin,
  isStudent: data.isStudent
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconUrl: {
      wrong: "/asset/icon/wrong.png",
      right: "/asset/icon/right.png"
    }
  },

  /**
   * 返回获取用户实名认证请求的Promise
   * @return {Promise}
   */
  getIdentityPromise: () => {
    let url = `${commonUrl}/user/${app.globalData.uid}/identity`;
    let data = {};
    let header = {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${app.globalData.token}`
    };
    return requestUtils.doGET(url, data, header);
  },

  /**
   * 返回Post Session请求的Promise
   * @return {Promise}
   */
  postSessionPromise: () => {
    let url = `${commonUrl}/session`;
    let header = {
      "content-type": "application/x-www-form-urlencoded"
    };
    let data = {
      loginType: 0,
      wxCode
    };
    return requestUtils.doPOST(url, data, header);
  },

  /**
   * 返回PostUser请求的Promise
   * @param {Object} wxUserInfo 微信提供的用户信息
   * @return {Promise}
   */
  postUserPromise: wxUserInfo => {
    console.log('postUserPromise 调用注册逻辑');
    let url = `${commonUrl}/user`
    let header = { "content-type": "application/x-www-form-urlencoded" };
    let data = wxUserInfo;
    return requestUtils.doPOST(url, data, header);
  },

  /**
   * 返回PostAuthentication请求的Promise
   * @param {Object} res postUser的response
   * @return {Promise}
   */
  postUserAuthPromise: () => {
    let url = `${commonUrl}/user/${app.globalData.uid}/authentication`;
    let data = {
      loginType: 0,
      wxCode
    };
    let header = {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${app.globalData.token}`
    };
    return requestUtils.doPOST(url, data, header);
  },

  go_signup: function () {
    wx.navigateTo({
      url: '/pages/signup/signup'
    })
  },

  login: function (e) {
    // const that = this;
    // let url = "";
    // let data = {};
    // let header = {};
    var wxUserInfo = e.detail.userInfo;

    if (e.detail.userInfo) {

      wxLogin().then(res => {
        if (res.code) {
          wxCode = res.code;
          wx.showLoading({ title: '加载中' });
          return this.postSessionPromise();
        } else {
          return new Promise((resolve, reject) => {
            reject(`微信登录失败: ${res.errMsg}`);
          });
        }
      }).then((res) => {
        // PostSession 成功
        // 设置本地变量 uid token
        console.log(res);

        const data = res.data.data;

        app.globalData.uid = data.data.uid;
        app.globalData.token = data.token;
        wx.setStorageSync("uid", data.data.uid);
        wx.setStorageSync("token", data.token);

        this.getIdentityPromise().then(res => {
          // GetIdentity 成功
          this.setData({ isStudent: true });
          app.globalData.isStudent = true;
          wx.setStorageSync("isStudent", true);
          wx.hideLoading();
        }).catch(res => {
          // GetIdentity 失败
          this.setData({ isStudent: false });
          app.globalData.isStudent = false;
          wx.setStorageSync("isStudent", false);
          wx.hideLoading();
        });

      }).catch(res => {
        console.log("PostSession 失败");
        console.log(res);
        // PostSession 失败 创建用户
        this.postUserPromise(wxUserInfo).then(res => {

          console.log("PostSession 失败 创建用户");
          console.log(res);
          const data = res.data.data;

          app.globalData.uid = data.uid;
          app.globalData.token = data.token;
          wx.setStorageSync("uid", data.uid);
          wx.setStorageSync("token", data.token);

          wxLogin().then(res => {
            // 更新全局 wxCode
            wxCode = res.code;

            this.postUserAuthPromise().then(res => {
              // PostAuthentication 成功
              wx.hideLoading();

              // 获取isStu信息
              this.getIdentityPromise().then(res => {
                // GetIdentity 成功
                this.setData({ isStudent: true });
                app.globalData.isStudent = true
                wx.setStorageSync("isStudent", true);
              }).catch(res => {
                // GetIdentity 失败
                wx.hideLoading();
                this.setData({ isStudent: false });
                app.globalData.isStudent = false;
                wx.setStorageSync("isStudent", false);
              });

            }).catch(res => {
              // PostAuthentication 失败
              console.error("PostAuthentication 失败");
              console.error(res);
            });

          }).catch(res => {
            // wxlogin失败
            wx.hideLoading();
            console.error("微信登录失败");
            console.error(res);
          });

        }).catch(res => {
          // PostUser 失败
          wx.hideLoading();
          console.error("创建用户失败");
          console.error(res);
        });

      });
      // 设置全局Avatar nickName
      app.globalData.nickName = e.detail.userInfo.nickName;
      app.globalData.userAvatar = e.detail.userInfo.avatarUrl;
      app.globalData.isLogin = true;
      this.setData({
        nickName: app.globalData.nickName,
        avater: app.globalData.userAvatar,
        isLogin: app.globalData.isLogin
      });
    }
  },
  moveToAbout: function () {
    console.log("进入跳转按钮");
    wx.navigateTo({
      url: '/pages/about/about',
      success: () => console.log("跳转至 关于我们 页面"),
      fail: () => {},
      complete: () => {}
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("页面 person onLoad");
    setUserData(this, app.globalData);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("页面 person onReady");
    setUserData(this, app.globalData);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    typeof this.getTabBar === 'function' &&
    this.getTabBar() &&
    this.getTabBar().setData({
      selected: 1
    });
    setUserData(this, app.globalData);
    console.log("person onShow");
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
  onShareAppMessage: function (e) {
    return {
      title: "上应小风筝",
      path: "pages/index/index"
    }
  }
})
