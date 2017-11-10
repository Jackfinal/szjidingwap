// pages/caseinfo/caseinfo.js
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
    info: [],
    type: 1,
    prev:'',
    next:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    if (!options.id) {
      options.id = 1;
      
    } 
    if (options.type == 2) {
      this.setData({
        type: 2
      });

    } 

    
    this.setData({
      BaseInfo: app.BaseInfo,
      id: options.id
    });
    this.getOther();
  },
  back: function(){
    wx.navigateBack({
      delta: 1
    })
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
    app.RequestUrl('/index.php/index/getInfo', { id: this.data.id }, '', function (res) {
      if (res.data.status == 1) {

        if (!res.data.data) {
          wx.showToast({
            title: '没有了',
            icon: 'success',
            duration: 2000
          })
          return;
        }
        let info = res.data.data;
        console.log(info.content.body)
        WxParse.wxParse('article', 'html', info.content.body, that, 5);
        let next = ''
        let prev = ''
        if(info.next>0){
          if(that.data.type == 1){
            next = '/pages/caseinfo/caseinfo?id=' + info.next
          }else {
            next = '/pages/caseinfo/caseinfo?type=2&id=' + info.next
          }
        }
        if (info.prev > 0) {
          if (that.data.type == 1) {
            prev = '/pages/caseinfo/caseinfo?id=' + info.prev
          } else {
            prev = '/pages/caseinfo/caseinfo?type=2&id=' + info.prev
          }
        }
        that.setData({
          info: info,
          prev: prev,
          next: next
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
    if (e.currentTarget.id =='')
    {
      wx.showToast({
        title: '没有了',
        icon: 'success',
        duration: 2000
      })
      return '';
    } console.log(e.currentTarget);
    wx.redirectTo({
      url: e.currentTarget.id
    })
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
  }
})