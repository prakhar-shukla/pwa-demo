
if('serviceWorker' in navigator){

    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('service-worker.js')
        .then(reg=>{
            console.log('Service worker registered')
        })
        .catch(error=>{
            console.log(`Something went wrong ${error}`)
        })
    })
}