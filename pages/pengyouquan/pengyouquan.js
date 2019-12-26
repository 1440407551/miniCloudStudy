// pages/pengyouquan/pengyouquan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  onShow: function() {
    wx.cloud.database().collection("timeline").orderBy('createTime', 'desc').get({
      success: res => {
        console.log('请求成功', res)
        const dataList = res.data;
        this.setData({
          dataList
        })
      },
      fail: err => {
        console.error("请求失败", err)
      }
    })
  },

  previewImg(e) {
    console.log(e)
    const urls = e.currentTarget.dataset.img[1]
    const current = e.currentTarget.dataset.img[0]
    wx.previewImage({
      current,
      urls,
    })
  },

  publish() {
    wx.navigateTo({
      url: '/pages/fabu/fabu',
    })
  }
})