function httpGetAsync(theUrl, auth, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader('Authorization', 'Bearer ' + auth);
    xmlHttp.send(null);
}

function loadResults(data) {
    console.log(data);
}

function triggerSearch() {
    var query = document.getElementById("search-bar").value;
    var link = "https://api.spotify.com/v1/search?q=Muse&type=track,artist&market=US&limit=5";
    var auth = "BQD94YyrQgXrUYKAQLpkYo_Wn_HkOpvIGHTMz0cwsJXZhw_Z8CWSz3Gjn9puyiq6Bei9ltEoAGn1vOODFkoZG3kr6hbNo9pgUnr5TUCbHVADd9aasd5cKx6cG2d6nGAd540D0XzCUBao";
    httpGetAsync(link, auth, loadResults);
}
