console.log("Client side javascript file is loaded.")
// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messageOne = document.getElementById("messageOne")
const messageTwo = document.getElementById("messageTwo")



weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    messageOne.textContent="Loading..."
    messageTwo.textContent=" "
    const location = search.value
        fetch("http://localhost:3000/weather?address="+location).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    messageOne.textContent="Error: "+data.error
                }
                else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                    //console.log(data.location)
                    //console.log(data.forecast)
                }
           })
        })  
})


// fetch("http://localhost:3000/weather?address=!").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){console.log(data.error)}
//         else{
//             console.log(data.location)
//             console.log(data.forecast)
//             //console.log(data.location.name,data.current.weather_descriptions[0])
//         }
//     }) 
// })
