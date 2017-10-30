//app.js

App({
  onLaunch: function() {
    this.BaseApiUrl = 'http://szjidingwap.0512iis.tt';
    this.BaseImgUrl = 'http://szjidingwap.0512iis.cc';
    this.BaseInfo = {};
    var that = this;
    //获取基础配置信息
    this.RequestUrl( '/index.php/index/getBase' ,{} , '', function(res) {
      that.BaseInfo = res.data.data;
      wx.setStorage({
        key: "BaseInfo",
        data: that.BaseInfo
      })
    },true);
  },
  RequestUrl(url, data, method, success, complete, loading) {
    if (!method) {
      let method = 'GET'
    }
    if (!success) {
      let success = function (res) {
        console.log(res);
      };
    }
    if (!data) {
      let data = {};
    }
    if (!complete) {
      let complete = function (res) {
        console.log(res);
      };
    }
    if (loading && loading === true) {
      wx.showLoading({
        title:'loading'
      })
    }
    var that = this;
    wx.request({
      url: that.BaseApiUrl + url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: method,
      success: success,
      fail: function(res) {
        wx.showToast({
          title: '请求失败',
          icon: 'success',
          duration: 2000
        })
        wx.hideLoading();
      },
      complete: complete,
    })
  }
})
