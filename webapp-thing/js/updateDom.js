// Customize how the browser will display the contents of Thing update messages received
//

function handleMessage(msg) {  // called from within connectAsThing.js
     // display the JSON message in a panel
    document.getElementById('panel').innerHTML = msg;

    // unpack the message and find the city value.  Pop a child browser window to display images.
    var myCity = JSON.parse(msg).city;
    //var ImgUrl = "https://www.google.com/search?tbm=isch&q=" + encodeURI(myCity);  // Message Body (Image Search URL)
    var ImgUrl = "https://www.youtube.com";  // Message Body (Image Search URL)

    pop(ImgUrl);

}
function reloader() {
    location.reload(true);  // hard reload including .js and .css files

}

var childWindow;

function pop(url) {
    console.log('Opening child url ' + url);

    if (childWindow) {
        childWindow.location = url;
    } else {

        childWindow = window.open(
            url,
            'mychild',
            'height=500,width=700,titlebar=yes,toolbar=no,menubar=no,directories=no,status=no,location=yes,title=new'
        );
    }
}
