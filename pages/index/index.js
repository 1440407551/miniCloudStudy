//index.js
const DB = wx.cloud.database().collection("list")
let name = ""
let age = 0
let id = ""
Page({
  // 获取用户输入的name
  addName(e) {
    name = e.detail.value
  },
  // 获取用户输入的age
  addAge(e) {
    age = e.detail.value
  },
  // 要删除的id
  delDataInput(e) {
    console.log('要删除的id', e.detail.value)
    id = e.detail.value
  },
  // 要更新的id
  updDataInput(e) {
    id = e.detail.value
  },
  // 要更新的age
  updAge(e) {
    age = e.detail.value
  },


  // 添加数据
  addData() {
    DB.add({
      data: {
        name,
        age
      },
      success(res) {
        console.log('添加成功', res)
      },
      fail(err){
        console.log('添加失败', err)
      }
    })
  },
  // 查询数据
  getData() {
    DB.get({
      success(res) {
        console.log('查询数据成功', res)
      }
    })
  },

  // 删除数据
  delData() {
    DB.doc(id).remove({
      success(res) {
        console.log('删除成功', res)
      },
      fail(err) {
        console.log('删除失败', err)
      }
    })
  },
  // 修改数据
  updData() {
    DB.doc(id).update({
      data: {
        age
      },
      success(res) {
        console.log('修改成功', res)
      },
      fail(err) {
        console.log('修改失败', err)
      }
    })
  }
})
