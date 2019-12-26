// pages/demo/demo.js
Page({
  data: {
    dataList: []
  },
  // 获取云数据库数据
  getData() {
    wx.cloud.database().collection("userList").get({
      success: res => {
        console.log("请求成功", res)
        const data = res.data
        this.setData({
          dataList: data
        })
      },
      fail: err => {
        console.log("请求失败", err)
      }
    })
  }
})