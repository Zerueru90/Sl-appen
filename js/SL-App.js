function creatingElement(element) 
{
    return document.createElement(element);
}

function append(parent, el) 
{
    return parent.appendChild(el);
}

function Start()
{
    const ul = document.getElementById("dataDisplay-Text");
    const first = document.getElementById("first");
    const second = document.getElementById("second");
    const third = document.getElementById("third");
    const url = "https://cors-anywhere.herokuapp.com/http://api.sl.se/api2/realtimedeparturesV4.json?key=f1b7512b0672495d93ef0037f5f1b297&siteid=9192&timewindow=5";
    //const url = "http://api.sl.se/api2/typeahead.json?key=494288bb92614e8cb19a001768f94f65&searchstring=Flemingsberg&stationsonly=true";


    fetch(url)

        .then((resp) => resp.json())

        .then(function (data){
            
            let trains = data.ResponseData.Metros;


            trains.map(function (train)
            {
                let div = creatingElement('div'),
                    lineNumber = creatingElement('div'),
                    destinationName = creatingElement('div')
                    time = creatingElement('div');


                lineNumber.innerHTML = train.LineNumber;
                destinationName.innerHTML = train.Destination;
                time.innerHTML = train.ExpectedDateTime;

                document.getElementById("textDisplay-Top").innerHTML = train.StopAreaName;

                //konverterar från string till datetime..
                // const datetime1 =  Date.parse(train.ExpectedDateTime);
                // document.getElementById("test").innerHTML = typeof datetime1;

                // var dateting = new Date(train.ExpectedDateTime);
                // var dt = dateting.getDate();
                // document.getElementById("test").innerHTML = dt

                append(first, lineNumber);
                append(second, destinationName);
                append(third, time);

            })

        })

        .catch(function (error){
            document.getElementById("dataDisplay-Text").innerHTML = error;
        })
}