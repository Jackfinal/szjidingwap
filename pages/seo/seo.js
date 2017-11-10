// pages/case/case.js
var WxParse = require('../../wxParse/wxParse.js');
var utils = require('../../utils/util.js');
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BaseInfo: {},
    close: 0,
    block: 'none',
    topBackground: '',
    BaseImgUrl: app.BaseImgUrl
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.setNavigationBarTitle({
      title: app.BaseInfo.cfg_webname
    })
    
    this.setData({
      BaseInfo: app.BaseInfo
    });

    WxParse.wxParse('article', 'html', app.BaseInfo.nav[5]['content'], that, 5);
    //this.getOther();
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
  onClickMenu: function () {
    if (this.data.close === 0) {
      this.setData({
        close: 1,
        block: 'block'
      })
    } else {
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
  getOther: function () {
    var that = this;
    app.RequestUrl('/index.php/index/getOther', {}, '', function (res) {
      if (res.data.status == 1) {
        that.setData({
          otherList: res.data.data
        })
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'success',
          duration: 2000
        })
      }
      WxParse.wxParse('article', 'html', that.data.otherList.about, that, 5);

    });
  },
  jump: function (e) {
    wx.navigateTo({
      url: e.currentTarget.id
    })
  },
  callphone: function(e) {
    let m = '';
    if (e.currentTarget.id == ''){
      m = this.data.BaseInfo.x_mobile
    }else {
      m = e.currentTarget.id
    }
    wx.makePhoneCall({
      phoneNumber: m //仅为示例，并非真实的电话号码
    })
  }
})