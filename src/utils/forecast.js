const request = require("request")

const forecast= (longitude,latitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=5c8e7ee84db901c3bd1e97219ae7f926&query="+latitude+","+longitude+"&units=f"
    
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback("Unable to connect to the weather service!",undefined)
        }else if(body.error){
            callback("Invald coordinates",undefined)
        }else{
            callback(undefined,"Overcast: "+body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}



module.exports=forecast




