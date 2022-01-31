var json_obj = new Object();
var jsonString;

async function getData(){
    await fetch('https://api.slangapp.com/challenges/v1/activities', { 
    method: 'get', 
    headers: new Headers({
        'Authorization': 'Basic MTQ6a0pxOWVEUXZZTm5oZ2J0b3NOTXg4aXV6TXA4cTdzZm1DRXMyU01qcTlTWT0=', 
        'Content-Type': 'application/json'
    }), 
}).then(res=>{
    if(res.ok){
        console.log(res.status);
        return res.json();
    }else if(res.status == 401){
        console.log("401 Unauthorized");
    }else if(res.status == 400){
        console.log("400 Bad request");
    }else{
        console.log("429 too many requests")
    }
}).then(data => {
    json_obj = data;
    jsonString = JSON.stringify(json_obj);
})
.then(() => console.log(json_obj));
}

getData();




