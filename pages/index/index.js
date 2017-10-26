//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    BaseInfo: {},
    imgUrls: [
      app.BaseImgUrl + '/templets/szjdwap/images/banner1.jpg',
      app.BaseImgUrl + '/templets/szjdwap/images/banner2.jpg',
      app.BaseImgUrl + '/templets/szjdwap/images/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    close: 0,
    block: 'none'
  },
  onLoad: function () {
    var that = this
    this.setData({
      BaseInfo: app.BaseInfo
    });
    wx.setNavigationBarTitle({
      title: app.BaseInfo.cfg_webname
    })
  },
  onClickMenu: function () {
    if (this.data.close === 0) {
      this.setData({
        close: 1,
        block: 'block'
      })
    }else {
      this.setData({
        close: 0,
        block: 'none'
      })
    }
    console.log(this.data.close);
  }
  
})
