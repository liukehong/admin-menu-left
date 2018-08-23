// 请求接口文件
import axios from './api' // 倒入 api
// 登录接口
export const userLogin = data => {
    return axios({
        url: "baseUsers/userLogin?userName="+data.userName+"&password="+data.passWord+"&loginType=0",
        method: 'post',
        data
    })
}


// 默认全部倒出
// 根绝需要进行  
export default {
    userLogin, // 账号密码登录
}
