const app = getApp()
const Utils = require('../../utils/util.js')

// pages/index/index.js.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // used to store user info like portrait & nickname
    userInfo: {},
    hasUserInfo: false,
    // whether to disable join btn or not
    disableJoin: false,
    intoRoomRequestCount: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    // page setup
    wx.setNavigationBarTitle({
      title: `平安面对面`
    });
    // 获取房间号
    const scene = decodeURIComponent(query.scene || '92453741ae14d992')
    app.globalData.channel = scene;
    this.lock = false;
    let userInfo = wx.getStorageSync("userInfo");
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      });
    }
    console.log(this.data.intoRoomRequestCount)
  },

  /**
   * 只有提供了该回调才会出现转发选项
   */
  onShareAppMessage() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * callback to get user info
   * using wechat open-type
   */
  onGotUserInfo: function(e) {
    let userInfo = e.detail.userInfo || {};
    this.setData({
      userInfo: userInfo
    });
    // store data for next launch use
    wx.setStorage({
      key: 'userInfo',
      data: userInfo,
    });

    // request
    this.intoRoomRequest()
  },
  intoRoomRequest() {
    // 用户加入频道，并获取unionId等信息
    // 登录

    wx.login({
      success: loginRes => {
        console.warn('login success', loginRes, this.data.intoRoomRequestCount);
        this.data.intoRoomRequestCount++;
        wx.getUserInfo({
          withCredentails: true,
          success: data => {
            wx.request({
              url: `${app.globalData.baseUrl}/miniprogram/media/video/dynamic`,
              method: 'POST',
              data: {
                roomId: app.globalData.channel,
                type: '2',
                code: loginRes.code,
                headImage: data.userInfo.avatarUrl,
                nickName: data.userInfo.nickName,
                iv: data.iv,
                encryptedData: data.encryptedData
              },
              success: result => {
                let res = result.data
                  // 房间号有效
                if (res.resultCode === '000000') {
                  if (res.data.roomState === '1000') {
                    // 设置unionId
                    app.globalData.unionId = res.data.unionId;
                    // 设置uid
                    app.globalData.uid = `333333${res.data.uid}` - 0;
                    // 设置坐席信息
                    let agentInfoItem = JSON.parse(res.data.infoList.find(item => JSON.parse(item).uid !== res.data.uid));
                    let agentInfo = {
                      headImage: agentInfoItem.headImage,
                      nickName: agentInfoItem.nickName
                    };
                    console.warn('agentInfoItem', agentInfoItem, agentInfo);
                    // 设置坐席信息
                    wx.setStorage({
                      key: 'agentInfo',
                      data: agentInfo
                    });
                    // 设置通话类型
                    app.globalData.camera = res.data.chatType === '2';
                    // 加入房间
                    this.onJoin();
                  } else if (res.data.roomState === '0001') {
                    // 房间号失效
                    wx.showModal({
                      title: '错误',
                      content: '房间号失效，请联系您的客户经理',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else if (res.data.roomState === '0002') {
                    // 房间人满
                    wx.showModal({
                      title: '错误',
                      content: '房间人数已满，请联系您的客户经理',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else if (res.data.roomState === '0003') {
                    // 房间客户经理未进入
                    wx.showModal({
                      title: '错误',
                      content: '您的客户经理还未进入房间，请稍后重试',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else {
                    // 未知错误
                    wx.showModal({
                      title: '错误',
                      content: '未知错误，无法进入房间，请稍后重试',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  }
                } else {
                  // 请求失败，重新获取code，再次请求
                  console.warn('连接失败，请关闭小程序后重试', this.data.intoRoomRequestCount)
                  if (this.data.intoRoomRequestCount >= 3) {
                    wx.showModal({
                      title: '错误',
                      content: '连接失败，请关闭小程序后重试',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                  } else {
                    this.intoRoomRequest()
                  }
                }
              },
              fail(err) {
                wx.showModal({
                  title: '错误',
                  content: '获取用户信息失败，请检查网络',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            });
          }
        })

      },
      fail: err => {
        console.warn('login fail', err)
      }
    })
  },
  /**
   * check if join is locked now, this is mainly to prevent from clicking join btn to start multiple new pages
   */
  checkJoinLock: function() {
    return !(this.lock || false);
  },

  lockJoin: function() {
    this.lock = true;
  },

  unlockJoin: function() {
    this.lock = false;
  },

  onJoin: function() {
    if (this.checkJoinLock()) {
      this.lockJoin();
      wx.navigateTo({
        url: `../meeting/meeting`
      });
    }
  }
})