// pages/demoyun/demoyun.js
Page({
  data: {
    dataList: []
  },
  // 获取云数据库数据
  getData() {
    wx.cloud.callFunction({
      name: 'getList',
      success: res => {
        console.log("请求云函数成功", res)
        const data = res.result.data
        this.setData({
          dataList: data
        })
      },
      fail: err => {
        console.log("请求云函数失败", err)
      }
    })
  }
})