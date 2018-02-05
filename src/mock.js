const Mock = require('mockjs')

Mock.mock('/api/mobileTerminal/classification', { // 获取分类
  'result': 'success',
  'message': '操作成功',
  'model': {
    'classificationList|5': [{
      'name|3': '',
      'id|+1': 1,
      'subsetList|1-10': [{
        'name|2-4': '',
        'id|+1': 100
      }]
    }]
  }
})

Mock.mock('/api/mobileTerminal/commodityList', { // 获取商品列表
  'result': 'success',
  'message': '操作成功',
  'model': {
    'commodityList|10': [{
      'id|+1': 1,
      'type': '女装',
      'title|8-16': '',
      'content|8-36': '',
      'money|1-100.1-10': 1,
      'img': '//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg'
    }]
  }
})

Mock.mock('/api/mobileTerminal/commodityInformation', { // 获取商品信息
  'result': 'success',
  'message': '操作成功',
  'model': {
    'title': '阿斯顿撒大',
    'content': '欧～欧～～Are you 王逗比',
    'money': '2689.69',
    'commodityDate': '2018-01-01',
    'colour|8-16': '',
    'size|8-16': '',
    'phone': 18705512512,
    'qq': 806783737,
    'commodityImg': [
      'https://gd4.alicdn.com/imgextra/i2/704298669/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg',
      '//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg'
    ],
    'detailsList': [
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195114a3p2525071.jpg',
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195114vjnb525071.jpg',
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_1610171951148n2x525071.jpg',
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195115pc4w525071.jpg',
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_16101719511547ff525071.jpg',
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_1610171951152pbv525071.jpg',
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195117f723525071.jpg',
      'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195117f7vq525071.jpg'
    ]
  }
})
