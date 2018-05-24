if (sessionStorage.getItem("s.data.searchtype") === null) {
	sessionStorage.setItem("s.data.searchtype", 0);
}

if (/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	document.getElementById("presenter").style.display = "none";
}

function showresult(string, ontype) {
	if (string.length === 0) {
		document.getElementById("searchinfo").textContent = "Search Box is Empty!";
		document.getElementById("searchresults").innerHTML = "";
		return false;
	} else if (string.length < 3 && ontype === true) {
		return false;
	} else {
		var str = encodeURIComponent(string);
		var source = document.getElementById("sourceoption").value;
		var type = document.getElementById("searchtypeoption").value;
		var writer = document.getElementById("writeroption").value;
		var raag = document.getElementById("raagoption").value;
		//var ang = $("#angsearch").val();
		document.getElementById("searchinfo").textContent = "Searching...";
		var request = new XMLHttpRequest();
		var url = GurbaniNow.buildApiUrl({
			q: str,
			source: source,
			type: type,
			writer: writer,
			raag: raag
		});
		request.open("GET", url, true);
		request.onload = function() {
			if (this.status >= 200 && this.status < 400) {
				var data = JSON.parse(this.response);
				var searchcount = data.count;
				if (searchcount === 0) {
					var resultText = "No Shabads Found! Please Check Your Input.";
					document.getElementById("searchresults").innerHTML = "";
				} else {
					document.getElementById("searchresults").innerHTML = "";
					data.shabads.forEach(function(shabads, i) {
						if (shabads.shabad.source.id === "G") {
							var ang = "Ang";
						} else if (shabads.shabad.source.id === "D" || shabads.shabad.source.id === "A" || shabads.shabad.source.id === "U") {
							var ang = "Panaa";
						} else {
							var ang = "Vaar";
						}
						if (shabads.shabad.source.id === "G") {
							var source = " (SGGS)";
						} else if (shabads.shabad.source.id === "D") {
							var source = " (Sri Dasam Granth)";
						} else {
							var source = "";
						}
						if (shabads.shabad.writer.english === "") {
							var writer = shabads.shabad.raag.english;
						} else {
							var writer = shabads.shabad.writer.english;
						}
						var append = document.createElement("div");
						append.classList.add("list-group");
						var html = '<a href="/shabad/' + shabads.shabad.shabadid + '/' + shabads.shabad.id + '" class="list-group-item">';
						html += '<h3 class="list-group-item-heading gurmukhi" style="font-family: GurbaniAkharThick; color: #ffffff;">' + shabads.shabad.gurmukhi.akhar + '</h3>';
						html += '<p class="list-group-item-text"><small>' + shabads.shabad.translation.english.default+'</small></p>';
						html += '<p class="list-group-item-text"><small><b>' + shabads.shabad.raag.english + ', ' + writer + ', ' + ang + ' ' + shabads.shabad.pageno + source + '</b></small></p>';
						html += "</a>";
						append.innerHTML = html;
						document.getElementById("searchresults").appendChild(append);
					});
					if (searchcount === 1) {
						var resultText = "Your Search Returned 1 Shabad";
					} else {
						var resultText = "Your Search Returned " + searchcount + " Shabads";
					}
				}
				document.getElementById("searchinfo").textContent = resultText;
			} else {
				document.getElementById("searchinfo").textContent = "An Error has occurred, Try Again.";
			}
		};
		request.onerror = function() {
			document.getElementById("searchinfo").textContent = "An Error has occurred, Try Again.";
		};
		request.send();
	}
}

function setsourceinfo(selectedvalue) {
	if (selectedvalue === "0") {
		var type = "Gurmukhi - First Letter (Start)";
	} else if (selectedvalue === "1") {
		var type = "Gurmukhi - First Letter (Anywhere)";
	} else if (selectedvalue === "2") {
		var type = "Gurmukhi - Full Word/Line";
	} else if (selectedvalue === "3") {
		var type = "English - Full Word/Line";
	} else if (selectedvalue === "4") {
		var type = "Gurmukhi - Search All Words";
	} else if (selectedvalue === "5") {
		var type = "English - Search All Words";
	} else if (selectedvalue === "6") {
		var type = "Gurmukhi - Search Any Words";
	} else if (selectedvalue === "7") {
		var type = "English - Search Any Words";
	}
	document.getElementById("searchinfo").textContent = "Search: " + type;
	if (selectedvalue === "0" || selectedvalue === "1" || selectedvalue === "2" || selectedvalue === "4" || selectedvalue === "6") {
		document.getElementById("searchbox").setAttribute("style", "font-family: GurbaniAkharThick; font-size: 1.2em;");
		document.getElementById("searchbox").setAttribute("placeholder", "Koj...");
	}
	if (selectedvalue === "3" || selectedvalue === "5" || selectedvalue === "7") {
		document.getElementById("searchbox").setAttribute("style", "");
		document.getElementById("searchbox").setAttribute("placeholder", "Search...");
	}
	sessionStorage.setItem("s.data.searchtype", selectedvalue);
}

function updatesourceinfo() {
	var searchtype = sessionStorage.getItem("s.data.searchtype");
	if (searchtype !== 0 && document.getElementById("searchbox").value.length === 0) {
		setsourceinfo(document.getElementById("searchtypeoption").value);
	}
}

function clearbtn() {
	document.getElementById("searchbox").value = "";
	document.getElementById("clearbtn").style.display = "none";
	document.getElementById("searchinfo").textContent = "Search Box is Empty!";
	document.getElementById("searchresults").innerHTML = "";
}

function togglekeyboard() {
	var x = document.getElementById("gurmukhi-keyboard");
	if (x.style.display === "none") {
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}

document.getElementById("searchbox").addEventListener("keyup", function() {
	if (document.getElementById("searchbox").value.length === 0) {
		document.getElementById("clearbtn").style.display = "none";
	} else {
		document.getElementById("clearbtn").style.display = "";
	}
});
document.addEventListener("keyup", function(e) {
	if (e.which === 13) {
		document.activeElement.blur();
	}
	if (e.which === 27) {
		document.getElementById("clearbtn").style.display = "none";
	}
});

document.querySelectorAll("#gurmukhi-keyboard button").forEach(function(el) {
	el.addEventListener("click", function() {
		if (this.dataset.action) {
			var action = this.dataset.action;
			if (action === "bksp") {
				document.getElementById("searchbox").value = document.getElementById("searchbox").value.substring(0, document.getElementById("searchbox").value.length - 1);
				showresult(document.getElementById("searchbox").value, true);
			} else if (action === "close") {
				document.getElementById("gurmukhi-keyboard").style.display = "none";
			} else if (action === "search") {
				showresult(document.getElementById("searchbox").value, false);
				document.getElementById("gurmukhi-keyboard").style.display = "none";
			} else if (action.includes("page")) {
				document.querySelectorAll("#gurmukhi-keyboard .page").forEach(function(el) {
					el.style.display = "none";
				});
				document.querySelector("#gurmukhi-keyboard-" + action).style.display = "block";
			}
		} else {
			var charinput = this.textContent;
			document.getElementById("searchbox").value = document.getElementById("searchbox").value + charinput;
			showresult(document.getElementById("searchbox").value, true);
		}
	});
});

setInterval(updatesourceinfo, 500);