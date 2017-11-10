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
    otherList: [],
    hover: '',
    scrollintoview: '',
    page: 1,
    listCase: [],
    classid: 3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.setNavigationBarTitle({
      title: app.BaseInfo.cfg_webname
    })
    let child = app.BaseInfo.nav[3]['child']; 
    let nowClassList = [];
    if (!options.id || options.id == 3) {
      options.id = 3;
      this.setData({
        hover: 'hover'
      })
      nowClassList = app.BaseInfo.nav;
    } else {
      nowClassList = child;
    }

    for (let i in child) {
      app.BaseInfo.nav[3]['child'][i]['hover'] = ''
      if (options.id == child[i]['id']) {
        app.BaseInfo.nav[3]['child'][i]['hover'] = 'hover'
      }
    }
    this.setData({
      BaseInfo: app.BaseInfo,
      scrollintoview: 'pagescasecaseid' + options.id,
      classid: options.id
    });

    this.getOther();
  },
  more: function () {
    this.setData({
      page: this.data.page + 1
    });
    this.getOther();
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
  },
  getOther: function () {
    var that = this;
    app.RequestUrl('/index.php/index/caseList', { page: this.data.page, classid: this.data.classid }, '', function (res) {
      if (res.data.status == 1) {

        if (!res.data.data['list']) {
          wx.showToast({
            title: '没有了',
            icon: 'success',
            duration: 2000
          })
          return;
        }
        let temp = that.data.listCase;

        if (temp[0]) {
          let ret = res.data.data.list;
          for (let i in ret) {
            temp.push(ret[i])
          }

        } else {
          temp = res.data.data.list
        } console.log(temp);
        that.setData({
          listCase: temp
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
  jumpp: function (e) {
    let string1 = e.currentTarget.id;
    if (string1.indexOf('-')) {
      let temp = string1.split('-');
      wx.redirectTo({
        url: 'news?id=' + temp[1]
      })
    }

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