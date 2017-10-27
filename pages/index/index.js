//index.js
var WxParse = require('../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    BaseInfo: {},
    close: 0,
    block: 'none',
    topBackground: '',
    BaseImgUrl: app.BaseImgUrl,
    //页面内
    otherList: [1],
    imgUrls: [
      app.BaseImgUrl + '/templets/szjdwap/images/banner1.jpg',
      app.BaseImgUrl + '/templets/szjdwap/images/banner2.jpg',
      app.BaseImgUrl + '/templets/szjdwap/images/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000
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
  onShow: function() {
    this.getOther();
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
  },
  onPageScroll: function (e) {
    if (e.scrollTop > 112) {
      this.setData({
        topBackground: 'topBackground'
      })
    } else if (e.scrollTop == 0) {
      this.setData({
        topBackground: ''
      })
    }
  },
  getOther: function() {
    var that = this;
    app.RequestUrl('/index.php/index/getOther', {}, '', function (res) {
      if (res.data.status == 1) {
        that.setData({
          otherList: res.data.data
        })
      }else {
        wx.showToast({
          title: '加载失败',
          icon: 'success',
          duration: 2000
        })
      }
      WxParse.wxParse('article', 'html', that.data.otherList.about, that, 5);
      console.log(that.data.otherList);
    });
  }
})
