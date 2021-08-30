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

    document.getElementById("first").innerHTML = "";
    document.getElementById("second").innerHTML = "";
    document.getElementById("third").innerHTML = "";

    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    
    const url = `https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=1c426b82dcf3493a9021f2db8e82717c&siteid=${id}&timewindow=20`;

    fetch(url)

        .then((resp) => resp.json())

            .then(function (data){
                
                let trains = data.ResponseData.Trains;

                trains.map(function (train)
                {
                    let lineNumber = creatingElement('div'),
                        destinationName = creatingElement('div')
                        time = creatingElement('div');


                    lineNumber.innerHTML = train.LineNumber;
                    destinationName.innerHTML = train.Destination;
                    time.innerHTML = train.DisplayTime;

                    document.getElementById("textDisplay-Top").innerHTML = train.StopAreaName;

                    append(first, lineNumber);
                    append(second, destinationName);
                    append(third, time);

                })

                 setInterval(Start, 60000);
            })

        .catch(function (error){
            document.getElementById("dataDisplay-Text").innerHTML = error;
        })
}