const request =  require('request');

const forecast = (longitude, latitude, callback)=>{
    const url = `https://api.darksky.net/forecast/05a974d3bca7facb405cb1d0c2c20c6b/${latitude},${longitude}?units=si`;

    request({url, json: true}, (error, {body} = {})=>{
        if(error){
            callback("cannot connect to the server... please check your internet connection!!!!>", undefined);
        }else if(body.error){
            callback(`unable to fetch the location!!!${body.error}`, undefined);
        }else{
            callback(undefined, `${body.daily.data[0].summary}. Current temperature is ${body.currently.temperature}॰c and the chance of rain fall is ${body.currently.precipProbability*100} %`)
        }
    });
};

module.exports = forecast;