// pages/fabu/fabu.js
const app = getApp();
Page({
  data: {
    imgList: [],
    fileIDs: [],
    desc: ''
  },

  // 获取输入内容
  getInput(e) {
    this.setData({
      desc: e.detail.value
    })
  },

  // 删除某张照片
  deleteImg(e) {
    wx.showModal({
      title: '要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if(res.confirm) {
          console.log('删除成功', res)
          const index = e.currentTarget.dataset.index
          const imgList = this.data.imgList
          imgList.splice(index, 1)
          this.setData({
            imgList
          })
        }
      },
      fail: err => {
        console.log('删除失败', err)
      }
    })
    
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 8 - this.data.imgList.length,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: (res) => {
        console.log('选择图片成功', res)
        if (this.data.imgList.length === 0) {
          this.setData({
            imgList: res.tempFilePaths
          })
        } else {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        }
      },
      fail: err => {
        console.log('选择图片失败', err)
      }
    })
  },

  // 发布
  publish() {
    const desc = this.data.desc;
    const imgList = this.data.imgList
    if (!desc || desc.length < 6) {
      wx.showToast({
        icon: 'none',
        title: '输入的文字不能少于6个字',
      })
      return;
    }
    if(!imgList || imgList.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请选择图片',
      })
      return;
    }
    wx.showLoading({
      title: '发布中',
    })
    const promiseArr = []
    imgList.forEach((img, index) => {
      const filePath = img
      const suffix = /\.[^\.]+$/.exec(filePath)[0]
      promiseArr.push(new Promise((resolve, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath,
          success: res => {
            console.log('上传图片成功', res)
            const fileIDs = this.data.fileIDs
            fileIDs.push(res.fileID)
            this.setData({
              fileIDs
            })
            resolve()
          },
          fail: err => {
            console.log('上传图片失败', err)
            reject()
          }
        })
      }))
    })
    let DB = wx.cloud.database()
    Promise.all(promiseArr).then(() => {
      DB.collection("timeline").add({
        data: {
          fileIDs: this.data.fileIDs,
          date: app.getNowFormatDate(),
          createTime: DB.serverDate(),
          desc: this.data.desc,
          images: this.data.imgList,
        },
        success: res => {
          console.log("上传图片成功", res)
          wx.hideLoading()
          wx.showToast({
            title: '上传图片成功',
          })
          wx.navigateBack({
            
          })
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '网络不给力....'
          })
          console.log("上传图片失败", err)
        }
      })
    })
  }

})