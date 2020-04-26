import axios from 'axios'

export function request(config) {
  //1.创建axios 的示例
  const instance1 = axios.create({
    baseURL : 'http://152.136.185.210:8000/api/h8',
    // baseURL : "http://123.207.32.32:8000/api/h8",
    // baseURL : "http://106.54.54.237:8000/api/h8",
    // baseURL: 'http://127.0.0.1:8000/api',
    timeout: 5000
  })

  //2.1 axios的请求拦截器
  instance1.interceptors.request.use(config => {
    // console.log(config);
    //请求信息拦截
    //1.比如  config中的一些信息不符合服务器的要求
    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //3.比如某些网络请求(比如登录（token）)，必须要携带一些特殊的信息
    return config
  },err => {
    // console.log(err);
  })

  //2.2 响应拦截
  instance1.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err => {
    // console.log(err);
  })

  //这个本身就是返回的promise，
  return instance1(config)
}

//返回promise对象
// export function request(config) {
//   return new Promise((resolve,reject) => {
//     const instance1 = axios.create({
//       baseURL: 'http://123.207.32.32:8000',
//       timeout: 5000
//     })
//
//     instance1(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

//传入两个方法进行调用
// export function request(config,success,failure) {
//   const instance1 = axios.create({
//     baseURL: 'http://123.207.32.32:8000',
//     timeout: 5000
//   })
//
//   instance1(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(error => {
//       failure(error)
//     })
// }

