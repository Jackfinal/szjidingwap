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
    BaseImgUrl: app.BaseImgUrl,
    block1:'block',
    block2: 'none',
    block3: 'none',
    hover1: '_h',
    hover2: '',
    hover3: ''
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

    WxParse.wxParse('article', 'html', app.BaseInfo.nav[6]['child'][17]['content'], that, 5);
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
  change:function(e) {
    let id = e.currentTarget.id;
    this.setData({
      block1: 'none',
      block2: 'none',
      block3: 'none',
      hover1:'',
      hover2:'',
      hover3: '',
      listall: []
    })
    switch(id){
      case '1':
        this.setData({
          block1: 'block',
          hover1: '_h'
        }); console.log(id);
        break;
      case '2':
        this.setData({
          block2: 'block',
          hover2: '_h'
        })
        break;
      case '3':
        this.getOther();
        this.setData({
          block3: 'block',
          hover3: '_h'
        })
        break;
    }
    
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
    app.RequestUrl('/index.php/index/caselist', {classid:19}, '', function (res) {
      if (res.data.status == 1) {
        that.setData({
          listall: res.data.data.list
        })
      } else {
        wx.showToast({
          title: '加载失败',
          icon: 'success',
          duration: 2000
        })
      }
      

    });
  },
  jump: function (e) {
    wx.navigateTo({
      url: e.currentTarget.id
    })
  },
  callphone: function (e) {
    let m = '';
    if (e.currentTarget.id == '') {
      m = this.data.BaseInfo.x_mobile
    } else {
      m = e.currentTarget.id
    }
    wx.makePhoneCall({
      phoneNumber: m //仅为示例，并非真实的电话号码
    })
  }
})