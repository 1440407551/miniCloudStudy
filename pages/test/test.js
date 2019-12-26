// pages/test/test.js
Page({
  // 第一个云函数
  qiuhe() {
    wx.cloud.callFunction({
      name: "add",
      data: {
        a: 9,
        b: 3,
      },
      success(res) {
        console.log('请求成功',res)
      },
      fail(err) {
        console.log('请求失败', err)
      }
    })
  },
  // 获取用户openid
  getopenid() {
    wx.cloud.callFunction({
      name: 'getopenid',
      success(res) {
        console.log('获取openid成功', res.result.openid)
      },
      fail(err) {
        console.error('获取openid失败', err)
      }
    })
  },
  // 数据库api获取数据
  shujuku() {
    wx.cloud.database().collection("users").get({
      success(res) {
        console.log('数据库获取成功', res)
      },
      fail(err) {
        console.log('数据库获取失败', err)
      }
    })
  },
  // 云函数获取数据
  yunhanshu() {
    wx.cloud.callFunction({
      name: 'getshuju',
      success(res) {
        console.log('云函数获取数据成功', res)
      },
      fail(err) {
        console.log('云函数获取数据失败', err)
      }
    })
  }
})