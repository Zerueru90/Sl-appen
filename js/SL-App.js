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
let symbolName;

function GetStationID(stationName)
{
    const url = `https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/typeahead.json?key=494288bb92614e8cb19a001768f94f65&searchstring=${stationName.value}&stationsonly=true`;
  
    fetch(url)

        .then((reps) => reps.json())

            .then(function (data)
            {

                let stations = data.ResponseData;

                stations.map(function (station)
                {
                    if(station.Name === stationName.value) 
                    {
                        id = station.SiteId;
                    }

                })

                Start();
            })
}

function Start()
{

    document.getElementById("textDisplay-Top").innerHTML = "";
    document.getElementById("symbol").innerHTML = "";
    document.getElementById("first").innerHTML = "";
    document.getElementById("second").innerHTML = "";
    document.getElementById("third").innerHTML = "";

    const symbol = document.getElementById("symbol");
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    
    const url = `https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=1c426b82dcf3493a9021f2db8e82717c&siteid=${id}&timewindow=30`;

    fetch(url)

        .then((resp) => resp.json())

            .then(function (data){
                
                let transport = data.ResponseData;

                if (transport.Buses.length != 0) 
                {
                    symbolName = "Buss"
                        
                    let transport = data.ResponseData.Buses;

                    transport.map(function (transports) 
                    {
                        let transportName = creatingElement('div');
                        lineNumber = creatingElement('div'),
                        destinationName = creatingElement('div')
                        time = creatingElement('div');
    
                        transportName.innerHTML = symbolName;
                        lineNumber.innerHTML = transports.LineNumber;
                        destinationName.innerHTML = transports.Destination;
                        time.innerHTML = transports.DisplayTime;

                        document.getElementById("textDisplay-Top").innerHTML = transports.StopAreaName;

                        append(symbol, transportName);
                        append(first, lineNumber);
                        append(second, destinationName);
                        append(third, time);
                    })

                }
                if (transport.Metros.length != 0) 
                {
                    symbolName = "Tåg"
                    
                    let transport = data.ResponseData.Metros;

                    transport.map(function (transports) 
                    {
                        let transportName = creatingElement('div');
                        lineNumber = creatingElement('div'),
                        destinationName = creatingElement('div')
                        time = creatingElement('div');
    
                        transportName.innerHTML = symbolName;
                        lineNumber.innerHTML = transports.LineNumber;
                        destinationName.innerHTML = transports.Destination;
                        time.innerHTML = transports.DisplayTime;

                        document.getElementById("textDisplay-Top").innerHTML = transports.StopAreaName;

                        append(symbol, transportName);
                        append(first, lineNumber);
                        append(second, destinationName);
                        append(third, time);
                    })

                }
                if (transport.Trains.length != 0) 
                {
                    symbolName = "Pendel"
                        
                    let transport = data.ResponseData.Trains;

                    transport.map(function (transports) 
                    {
                        let transportName = creatingElement('div');
                        lineNumber = creatingElement('div'),
                        destinationName = creatingElement('div')
                        time = creatingElement('div');
    
                        transportName.innerHTML = symbolName;
                        lineNumber.innerHTML = transports.LineNumber;
                        destinationName.innerHTML = transports.Destination;
                        time.innerHTML = transports.DisplayTime;

                        document.getElementById("textDisplay-Top").innerHTML = transports.StopAreaName;

                        append(symbol, transportName);
                        append(first, lineNumber);
                        append(second, destinationName);
                        append(third, time);
                    })
                }
                if (transport.Trams.length != 0) 
                {
                    symbolName = "Spårvagn"
                        
                    let transport = data.ResponseData.Trams;

                    transport.map(function (transports) 
                    {
                        let transportName = creatingElement('div');
                        lineNumber = creatingElement('div'),
                        destinationName = creatingElement('div')
                        time = creatingElement('div');    

                        transportName.innerHTML = symbolName;
                        lineNumber.innerHTML = transports.LineNumber;
                        destinationName.innerHTML = transports.Destination;
                        time.innerHTML = transports.DisplayTime;

                        document.getElementById("textDisplay-Top").innerHTML = transports.StopAreaName;

                        append(symbol, transportName);
                        append(first, lineNumber);
                        append(second, destinationName);
                        append(third, time);
                    })

                }
                if (transport.Ships.length != 0) 
                {
                    symbolName = "Båt"
                        
                    let transport = data.ResponseData.Ships;

                    transport.map(function (transports) 
                    {

                    let transportName = creatingElement('div');
                    lineNumber = creatingElement('div'),
                    destinationName = creatingElement('div')
                    time = creatingElement('div');

                    transportName.innerHTML = symbolName;
                    lineNumber.innerHTML = transports.LineNumber;
                    destinationName.innerHTML = transports.Destination;
                    time.innerHTML = transports.DisplayTime;

                    document.getElementById("textDisplay-Top").innerHTML = transports.StopAreaName;

                    append(symbol, transportName);
                    append(first, lineNumber);
                    append(second, destinationName);
                    append(third, time);
                    })
                }
                
                 setInterval(Start, 60000);
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