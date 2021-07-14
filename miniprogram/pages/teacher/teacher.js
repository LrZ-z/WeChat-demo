// pages/teacher/teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    txt:' ',
    sum:'',
    num:[
      { 第一题: '' },
      { 第二题: '' }, 
      { 第三题: '' }, 
      { 第四题: '' }, 
      { 第五题: '' }, 
      { 第六题: '' }, 
      { 第七题: '' },
      { 第八题: '' },
      { 第九题: '' },
      { 第十题: '' } 
    ]
  },
  input:function(e){
    var that=this
    var id = e.currentTarget.dataset.index
    this.data.num[id] = e.detail.value
    var sum = Number(Number(this.data.num[0]) + Number(this.data.num[1]) + Number(this.data.num[2]) + Number(this.data.num[3])+Number(this.data.num[4]) + Number(this.data.num[5])+Number(this.data.num[6]) + Number(this.data.num[7])+Number(this.data.num[8]) + Number(this.data.num[9]))/10
    that.setData({
      a: e.detail.value,
      sum:sum
    })
    if (e.detail.value <= 100 && e.detail.value>=0){
      console.log(this.data.a)
    }else{

      wx.showModal({
        title: '提示',
        content: '分数在0~100之间',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
  
    }
    //this.data.num[id] = e.detail.value
    // num.push(e.detail.value)
    console.log(this.data.num)
    console.log(id)
    console.log(e.detail.value)
    console.log(that)
    
  },

  btn1:function(){
    this.setData({
      txt:''
    })
  },
  btn2: function () {
    this.save();
    console.log(this.data.sum)
    
  },

  save:function() {
    const db = wx.cloud.database()
    db.collection('sj').add({
      data: { 
        '账号': this.data.name,
        '工号': this.data.gh,
        '姓名': this.data.jsxm,
        '平均分': this.data.sum,
        '第一题': this.data.num[0],
        '第二题': this.data.num[1],
        '第三题': this.data.num[2],
        '第四题': this.data.num[3],
        '第五题': this.data.num[4],
        '第六题': this.data.num[5],
        '第七题': this.data.num[6],
        '第八题': this.data.num[7],
        '第九题': this.data.num[8],
        '第十题': this.data.num[9]

      },

      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var gh = options.gh
    var jsxm=options.jsxm
    var name = options.name
    that.setData({
      gh:gh,
      jsxm:jsxm,
      name:name
    })

    const db = wx.cloud.database({});
    const cont = db.collection('pj');
    cont.doc('5cef2e048e5c9976b5c4bf09').get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        console.log(res)
        var ask1 = res.data.result
        console.log(ask1)
        that.setData({
          listes:ask1
        })
        
      }
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

  }
})