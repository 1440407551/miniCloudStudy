// pages/upload/upload.js
Page({
  data: {
    imgUrl: '',
    videoUrl: '',
    fileID: 'cloud://xiaocheng-zajh4.7869-xiaocheng-zajh4-1300991132/1577327700205.xlsx' // 需要下载的文件id
  },
  // 下载并打开excel文件
  openExcel() {
    wx.cloud.downloadFile({
      fileID: this.data.fileID,
      success: res => {
        console.log("下载文件成功", res)
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath,
          success: res => {
            console.log("打开文档成功", res)
          },
          fail: err => {
            console.log("打开文档失败", err)
          }
        })
      },
      fail: err => {
        console.log("下载文件失败", err)
      }
    })
  },


  // 上传excel文件
  uploadExcel() {
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success: res => {
        console.log(res)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.xlsx',
          filePath: res.tempFiles[0].path, // 文件路径
          success: res => {
            console.log("上传excel成功", res)
            this.setData({
              fileID: res.fileID
            })
          },
          fail: err => {
            console.log("上传excel失败", err)
          }
        })
      }
    })
  },



  // 上传图片
  uploadFile() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log("选择成功", res)
        this.uploadImg(res.tempFilePaths[0])
      }
    })
  },

  uploadImg(fileUrl) {
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.png',
      filePath: fileUrl, // 文件路径
      success: res => {
        // get resource ID
        console.log("上传成功", res)
        this.setData({
          imgUrl: res.fileID
        })
      },
      fail: err => {
        console.log("上传失败", err)
      }
    })
  },

  // 上传视频
  uploadVideo() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60, // 视频时长, 单位秒
      camera: 'back',
      success: res => {
        console.log("选择视频成功", res)
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.mp4',
          filePath: res.tempFilePath, // 文件路径
          success: res => {
            // get resource ID
            console.log("上传视频成功", res)
            this.setData({
              videoUrl: res.fileID
            })
          },
          fail: err => {
            console.log("上传视频失败", err)
          }
        })
      },
      fail: err => {
        console.log("选择视频失败", err)
      }
    })
  }
})