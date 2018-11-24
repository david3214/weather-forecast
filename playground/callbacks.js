let getUser= (id, callback)=>{
    let user = {
        id,
        name: 'Sam'
    }

    setTimeout(()=> {
        callback(user)
    },3000)
}

getUser(62, (user)=>{
    console.log(user)
})