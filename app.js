const Utils = require("./utils/util.js");

//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    Utils.checkSystemInfo(this);
  },
  globalData: {
    userInfo: null,
    channel: '',
    unionId: '',
    uid: 0,
    camera: false,
    baseUrl: 'https://lncs-cc-scm-gray-stg.pingan.com/api'
  }
})