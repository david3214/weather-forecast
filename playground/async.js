console.log('\nstarting app')

setTimeout(()=>{
    console.log ('Inside callback')
}, 2000)
setTimeout(()=>{
    console.log ('Inside callback2')
}, 0)
console.log('finishing app')