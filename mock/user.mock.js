// 使用 Mockjs 产生模拟数据，详见 https://github.com/nuysoft/Mock/wiki
const Mock = require('mockjs');

module.exports = {
  'POST /userInfo': {
    userName: 'qisong',
    userId: 1,
  },
  // Mock 预发参考 https://github.com/nuysoft/Mock/wiki/Syntax-Specification
  'GET /userInfo': Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-20': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1,
        'name|2-5': 'fish',
    }]
})
}
