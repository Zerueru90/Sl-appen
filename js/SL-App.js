// window.onload = function () {
//     setInterval(Start, 60000);
// };

function ReturnStationNamesForList(charing)
{
    var charachterLenght = charing.value;

    if (charachterLenght.length >= 3) 
    {
        const url = `https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/typeahead.json?key=494288bb92614e8cb19a001768f94f65&searchstring=${charing.value}&stationsonly=true`;

        const optionsList = document.getElementById("stations");
        
        fetch(url)

        .then((reps) => reps.json())

            .then(function (data)
            {

                document.getElementById("stations").innerHTML = "";
                
                let stations = data.ResponseData;

                stations.map(function (station)
                {
                    let div = creatingElement('option');

                    div.innerHTML = station.Name;
                    
                    append(optionsList, div);
                })
            })
    }
}

function creatingElement(element) 
{
    return document.createElement(element);
}

function append(parent, el) 
{
    return parent.appendChild(el);
}

function containsWord(str, word) 
{
    return str.match(new RegExp("\\b" + word + "\\b")) != null;
}

let id;
let stopInterval;

function GetStationID(stationName)
{

    const url = `https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/typeahead.json?key=494288bb92614e8cb19a001768f94f65&searchstring=${stationName.value}&stationsonly=true`;
  
    //document.getElementById("test").innerHTML = url;

    fetch(url)

        .then((reps) => reps.json())

            .then(function (data){

                let stations = data.ResponseData;

                stations.map(function (station){

                    // if(containsWord(station.Name, stationName.value)) 
                    // {
                    //     //document.getElementById("test").innerHTML = station.Name;
                    //     Start(station.SiteId);
                    // }
                    if(station.Name === stationName.value) 
                    {
                        id = station.SiteId;
                    }

                })

                Start();
                // stopInterval = setInterval(Start, 5000)

                // document.getElementById("test").innerHTML = station;

            })
}

//Flemingsbergs station (Huddinge)

function Start()
{
    
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    const url = `https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=1c426b82dcf3493a9021f2db8e82717c&siteid=${id}&timewindow=10`;

    fetch(url)

        .then((resp) => resp.json())

            .then(function (data){
                
                let trains = data.ResponseData.Trains;

                trains.map(function (train)
                {
                    let div = creatingElement('div'),
                        lineNumber = creatingElement('div'),
                        destinationName = creatingElement('div')
                        time = creatingElement('div');


                        
                    var newStr = train.ExpectedDateTime.replace('T', ' ');
                    var incomingDates = new Date(newStr);
                    var nowDate = new Date();
                    var minutesTime = diff_minutes(nowDate, incomingDates);

                    lineNumber.innerHTML = train.LineNumber;
                    destinationName.innerHTML = train.Destination;
                    //time.innerHTML = minutesTime + " " + "min";
                    time.innerHTML = train.DisplayTime;

                    document.getElementById("textDisplay-Top").innerHTML = train.StopAreaName;

                    append(first, lineNumber);
                    append(second, destinationName);
                    append(third, time);

                })

                // setInterval(Start, 3000);
                //clearInterval(stopInterval);

            })

        .catch(function (error){
            document.getElementById("dataDisplay-Text").innerHTML = error;
        })
}

function diff_minutes(dt2, dt1) 
 {

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  
 }