
export var urls = {
    //blogs: 'http://127.0.0.1:19458/api/blogs',
    blogs: 'http://193.112.136.182:8080/api/blogs'
}

export var Post = (url, bodys, callback) => {
    fetch(url + window.location.search,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(bodys)
    }) // 返回一个Promise对象
    .then((res)=>{
        return res.json()// res.text()是一个Promise对象
    })
    .then(callback);
}

export var Get = (url, callback) => {
    fetch(url + window.location.search,{
        method: 'GET',
        mode: 'cors'
    }) // 返回一个Promise对象
    .then((res)=>{
        return res.json()// res.text()是一个Promise对象
    })
    .then(callback);
}

export var Put = (id, url, bodys, callback) => {
    fetch(url + '/' + id + window.location.search,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        mode: 'cors',
        body: JSON.stringify(bodys)
    }) // 返回一个Promise对象
    .then((res)=>{
        return res.json()// res.text()是一个Promise对象
    })
    .then(callback);
}

export var Delete = (url, param, callback) => {
    url = url + '/' + param + window.location.search;
    fetch(url,{
        method: 'DELETE',
        mode: 'cors'
    }) // 返回一个Promise对象
    .then((res)=>{
        return res.json()// res.text()是一个Promise对象
    })
    .then(callback);
}