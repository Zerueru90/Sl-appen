let id;
let symbolName;

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
                        document.getElementById("textDisplay-Top").innerHTML = stationName.value;
                    }

                })

                Start();
            })
}

function Clean()
{
    //document.getElementById("dataDisplay").innerHTML = "";

    // document.getElementById("textDisplay-Top").innerHTML = "";
    document.getElementById("symbol").innerHTML = "";
    document.getElementById("first").innerHTML = "";
    document.getElementById("second").innerHTML = "";
    document.getElementById("third").innerHTML = "";

}

function Start()
{
    Clean();

    const url = `https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=1c426b82dcf3493a9021f2db8e82717c&siteid=${id}&timewindow=15`;

    fetch(url)

        .then((resp) => resp.json())

            .then(function (data){
                
                let transport = data.ResponseData;

                if (transport.Buses.length != 0) 
                {
                    symbolName = "Buss"
                        
                    let transport = data.ResponseData.Buses;

                    LoopyDoopy(transport);
                }
                if (transport.Metros.length != 0) 
                {
                    symbolName = "Tåg"
                    
                    let transport = data.ResponseData.Metros;

                    LoopyDoopy(transport);
                }
                if (transport.Trains.length != 0) 
                {
                    symbolName = "Pendel"
                        
                    let transport = data.ResponseData.Trains;
                   
                    LoopyDoopy(transport);
                }
                if (transport.Trams.length != 0) 
                {
                    symbolName = "Spårvagn"
                        
                    let transport = data.ResponseData.Trams;

                    LoopyDoopy(transport);
                }
                
                setInterval(Start, 60000);
            })

        .catch(function (error){
            document.getElementById("dataDisplay-Text").innerHTML = error;
        })
}

function LoopyDoopy(transport)
{
    const symbol = document.getElementById("symbol");
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");

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
        
        append(symbol, transportName);
        append(first, lineNumber);
        append(second, destinationName);
        append(third, time);
    })
}

function ChangeTime()
{
    
    let check = document.getElementById("radioBtn")
    if (check.checked === false) 
    {
        var checking = 0;
    }
    
    var elem3 = document.getElementById("third");

    for (let i = 0; i < elem3.childNodes.length; i++) 
    {
        if (elem3.childNodes[i].innerHTML !== "Nu") 
        {
            let test = elem3.childNodes[i].innerHTML;
            let nr = parseInt(test);

            if (nr > 10) 
            { 
                let minus = nr - 10;
                elem3.childNodes[i].innerHTML = minus + " " + "min";
            }
        }

    }
}

function ChangeTimeBack()
{
    document.getElementById("radioBtn").checked = false;
}