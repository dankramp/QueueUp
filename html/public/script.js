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
    data = JSON.parse(data);
    var div = document.getElementById("search-results");

    // Remove anything from div
    if (div.childNodes.length) {
	while (div.childNodes[0])
	    div.removeChild(div.childNodes[0]);
    }
    if (data.tracks.items.length) { // At least one result found
	// Default Table settings
	var table = document.createElement("TABLE");
	table.className = "table table-inverse";
	var thead = document.createElement("THEAD");
	var tr = document.createElement("TR");
	
	var th = document.createElement("TH");
	var text = document.createTextNode("#");
	th.appendChild(text);
	tr.appendChild(th);
	
	th = document.createElement("TH");
	text = document.createTextNode("Title");
	th.appendChild(text);
	tr.appendChild(th);
	
	th = document.createElement("TH");
	text = document.createTextNode("Artist");
	th.appendChild(text);
	tr.appendChild(th);

	th = document.createElement("TH");
	text = document.createTextNode("Duration");
	th.appendChild(text);
	tr.appendChild(th);
	
	thead.appendChild(tr);
	table.appendChild(thead);

	// Search results
	var td;
	var tbody = document.createElement("TBODY");
	for (var i = 0, l = data.tracks.items.length; i < l; i++) {
	    tr = document.createElement("TR");
	    
	    td = document.createElement("TD");
	    text = document.createTextNode("" + (i+1));
	    td.appendChild(text);
	    tr.appendChild(td);

	    td = document.createElement("TD");
	    text = document.createTextNode(data.tracks.items[i].name);
	    td.appendChild(text);
	    tr.appendChild(td);

	    td = document.createElement("TD");
	    text = document.createTextNode(data.tracks.items[i].artists[0].name);
	    td.appendChild(text);
	    tr.appendChild(td);

	    td = document.createElement("TD");
	    text = document.createTextNode(data.tracks.items[i].duration_ms);
	    td.appendChild(text);
	    tr.appendChild(td);
	    
	    tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	div.appendChild(table);
    }
    else { // No results
	var p = document.createElement("P");
	var text = document.createTextNode("No results found.");
	p.appendChild(text);
	div.appendChild(p);
    }
}

function triggerSearch() {
    var query = document.getElementById("search-bar").value;
    var link = "https://api.spotify.com/v1/search?q=" + query + "&type=track&market=US&limit=5";
    var auth = getAuth();
    if (query != "")
	httpGetAsync(link, auth, loadResults);
}
