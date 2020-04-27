//防抖函数
export function debounce(func,delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function formatDate(date, fmt) {
  //1.获取年份
  //y+ -> 1个或者多个y
  //y* -> 0个或者多个y
  //y？ -> 0个或者1个y
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length))
  }

  //获取
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length ===1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

//补0操作：  先在字符串前加两个0，然后在截取掉字符串长度个 0，最后返回的就是补0后的两位数的字符串
function padLeftZero(str) {
  return ('00' + str).substring(str.length)
}
