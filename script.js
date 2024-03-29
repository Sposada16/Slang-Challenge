fetch('https://api.slangapp.com/challenges/v1/activities', {
    method: 'get',
    headers: new Headers({
        'Authorization': 'Basic MTQ6a0pxOWVEUXZZTm5oZ2J0b3NOTXg4aXV6TXA4cTdzZm1DRXMyU01qcTlTWT0=',
        'Content-Type': 'application/json'
    }),
}).then(res => {
    if (res.ok) {
        console.log(res.status);
        return res.json();
    } else if (res.status == 401) {
        console.log("401 Unauthorized");
    } else if (res.status == 400) {
        console.log("400 Bad request");
    } else {
        console.log("429 too many requests")
    }
}).then(data => {

    const array = data;
    console.log(array);


    //2nd Step//

    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    groupedByActivities = groupBy(array.activities, 'user_id');

    console.log(groupedByActivities[Object.keys(groupedByActivities)[0]]);

    //

    //3rd step//

    fetch('https://api.slangapp.com/challenges/v1/activities/sessions', {
        method: 'post',
        headers: new Headers({
            'Authorization': 'Basic MTQ6a0pxOWVEUXZZTm5oZ2J0b3NOTXg4aXV6TXA4cTdzZm1DRXMyU01qcTlTWT0=',
            'Content-Type': 'application/json'
        }),
        body: {"user_sessions":groupedByActivities}
    }).then(result => {
        if (result.ok) {
            console.log(result.status);
            return result.json();
        } else if (result.status == 401) {
            console.log("401 Unauthorized");
        } else if (result.status == 400) {
            console.log("400 Bad request");
        } else {
            console.log("429 too many requests")
        }
    }).then(dataf => {
        console.log(dataf);
    })

    //

});


