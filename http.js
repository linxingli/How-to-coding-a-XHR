(function (window) {
  const createXHR = (callback) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback({
            code: JSON.parse(xhr.response).code,
            data: JSON.parse(xhr.response).data,
            msg: JSON.parse(xhr.response).msg,
          })
        } else {
          callback({
            code: -999,
            msg: '服务器出错'
          })
        }
      }
    }
    return xhr
  }

  /**
   * http请求方法
   * @param {*} url 请求api
   * @param {*} param 入参
   * @param {*} method POST or GET
   * @param {*} callback 回调方法
   */
  const http = (obj) => {
    let {
      url,
      param,
      method,
      callback
    } = obj

    const fullurl = `/router/rest?${url}`


    let XMLHttp = createXHR(callback)

    XMLHttp.open(method, fullurl, true)

    // let _token = sessionStorage.TOKEN
    if (!_token) {
      return callback({
        code: -999,
        msg: '无token'
      })
    }
    XMLHttp.setRequestHeader('format', 'JSON')
    XMLHttp.setRequestHeader('appkey', 10132)
    XMLHttp.setRequestHeader('method', url)
    XMLHttp.setRequestHeader('x-menu-id', '1060140045583847433')
    XMLHttp.setRequestHeader('token', _token)
    XMLHttp.send(JSON.stringify(param))
  }

  const req = (url, param, method = 'POST') => {
    return new Promise((resolve, reject) => {
      http({
        url,
        param,
        method,
        callback: (res) => {
          if (res.code === 0) {
            resolve(res.data)
          } else {
            alert(res.msg)
            reject(res.data)
          }
        }
      })
    })
  }

  window.$http = req
}(window))