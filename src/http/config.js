// axios的默认配置
const getPath = function (num) {
  switch (num) {
      case 1:
          // 测试环境
          return "http://mrb.amez999.com/pc/"  
          break;
      case 2:
          // 正式环境
          return "http://www.52mrb.com/pc/"
          break;
      default:
          return "http://mrb.amez999.com/pc/"
  } 
}
export default {
    method: 'post',
    // 基础url前缀
    baseURL: getPath(1),
    // 请求头信息
    headers: {
      'Content-Type':'application/json;charset=UTF-8'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}
