//index.js
//获取应用实例
const app = getApp()
const requestUtils = require("../../utils/requestUtils");
Page({
  data: {
    incompleted: false,
    show: false,
    showTemp: false,
    selected: -1,
    id: "",
    animation_data: "",
    notice:[],
    menu_list: [{
        id: "welcome",
        text: "迎新",
        iconPath: "/asset/icon/main_icon/user.png"
      },
      {
        id: "inquiry",
        text: "电费",
        iconPath: "/asset/icon/main_icon/electricity.png"
      } /* ,
      {
        id: "education",
        text: "教务",
        iconPath: "/asset/icon/main_icon/kecheng.png"
      },
      {
        id: "activity",
        text: "活动",
        iconPath: "/asset/icon/main_icon/tuandui.png"
      },
      {
        id: "shopping",
        text: "闲置",
        iconPath: "/asset/icon/main_icon/dianpu.png"
      }, {
        id: "lost",
        text: "失物",
        iconPath: "/asset/icon/main_icon/sousuo.png"
      } */
    ]
  },
  onLoad: function () {
    this.getNotice();
  },
  getNotice: function () {
    const url = `${app.globalData.commonUrl}/notice`;
    const data = {};
    let header = {
      "content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${app.globalData.token}`,
    };
    let getNotice = requestUtils.doGET(url, data, header);
    getNotice.then((res) => {
      this.setData({
        notice: res.data.data
      })
      console.log(res.data.data)
    }).
    catch((res) => {
      console.log(res)
    })
  },
  move: function (e) {
    this.setData({
      animation_data: "animation:living .5s ease;",
      selected: e.currentTarget.dataset.index,
      id: e.currentTarget.dataset.id
    });
    // console.log(this.data.selected);
    // console.log(this.data.id);
    this.router(this.data.id);
  },
  router: function (id) {
    let url = new Map([
        [ "welcome", "/freshman/pages/freshman/welcome/welcome" ],
        [ "qrcode", "/pages/qrcode/qrcode" ],
        [ "education", "/pages/education/education" ],
        [ "activity", "/pages/activity/activity" ],
        [ "shopping", "/pages/shopping/shopping" ],
        [ "lost", "/pages/lost/lost" ],
        [ "inquiry", "/pages/consume/electricity/electricity" ]
    ]).get(id);

    if (url === undefined) {
      console.error("找不到对应的 url", {id, url});
      throw "找不到对应的 url";
    }

    // 如果点击新生但是userDetail不为空，那么直接跳入到stuInfoDetail
    if (
      id === "welcome" &&
      app.globalData.userDetail != "" &&
      app.globalData.userDetail != null
    ) {
      url = "/freshman/pages/freshman/stuInfoDetail/stuInfoDetail";
    }

    const show = !app.globalData.isLogin;
    if (!show) {
      let that = this
      wx.navigateTo({
        url: url,
        success: function () {}, //接口调用成功的回调函数
        fail: function () {
          // 页面跳转失败则显示未完成
          that.setData({
            incompleted: true
          });
          setTimeout(() => {
            that.setData({
              incompleted: false
            })
          }, 1000);
        }, //接口调用失败的回调函数
        complete: function () {} //接口调用结束的回调函数（调用成功、失败都会执行）
      })
    } else {
      this.setData({
        show: true
      })
    }
  },
  goLogin: function () {
    this.setData({
      show: false
    })
    wx.switchTab({
      url: '/pages/person/person',
    })
  },
  onClose() {
    this.setData({
      show: false,
      showTemp: false
    });
  },
  onShow: function (e) {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

  },
  goTemp: function (e) {
    let url = "/pages/freshman/welcome/welcome";
    if (app.globalData.userDetail != "" && app.globalData.userDetail != null) {
      url = "/pages/freshman/stuInfoDetail/stuInfoDetail";
    }
    wx.navigateTo({
      url: url,
      success: function () {
        console.log("跳转成功")
      }, //接口调用成功的回调函数
      fail: function (res) {
        console.log(res);
        console.log("跳转失败")
      }, //接口调用失败的回调函数
      complete: function () {} //接口调用结束的回调函数（调用成功、失败都会执行）
    })

  },
  goNavigate: function () {
    wx.navigateTo({
      url: '/pages/freshman/navigate/navigate',
    });
  },
  onShareAppMessage: function (e) {
    return {
      title: "上应小风筝",
      path: "pages/index/index"
    };
  }
})