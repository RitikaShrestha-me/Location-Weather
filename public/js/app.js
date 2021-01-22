console.log('Client side javascript file is loaded!')

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    console.log(location)
    message1.innerText = "loading......\n\nWait for a while"

    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
            }else{
                console.log(data.forecast)
                console.log(data.place)
                console.log(data.address)
                console.log(data.longitude)
                console.log(data.latitude)
                message1.innerText = `${data.place}\n\n${data.forecast}`
            }
        })
    })
})