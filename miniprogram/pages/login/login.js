// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: ''

  },
  input1: function(e) {
    this.setData({
      name: e.detail.value
    })
    console.log(this.data.name)
  },
  input2: function(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(this.data.password)
  },



  formSubmit: function(e) {
    this.login();
  },


  login: function() {
    var name = this.data.name
    var password = this.data.password

    wx.cloud.init({
      env: 'pj-ddrzw',
      traceUser: true
    });

    wx.showToast({
      title: '加载中...',
      icon: 'loading',
    })


    const db = wx.cloud.database({});
    const cont = db.collection('pj');
    cont.doc("5cf213358e5c9976b5e9cf18").get({
      success: function(res) {
        console.log(res)
        var user = res.data.RECORDS
        for (let i = 0; i < user.length; i++) { //遍历数据库对象集合
          if (name == user[i].name) { //用户名存在
            if (password !== user[i].password) { //判断密码是否正确

              wx.showToast({
                title: '密码错误',
                icon: 'none',
              })
            } else {
              console.log('登陆成功！')
              wx.navigateTo({
                url: '../index/index?name=' + name,
              })
              console.log(name)
              break
            }
          } else { //不存在
            
            wx.showToast({
              title: '用户名不存在',
              icon: 'none',
            })
            console.log('用户名不存在')
          }
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})