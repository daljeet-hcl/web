if (localStorage.getItem("s.onoff.gurmukhi") === null) {
	localStorage.setItem("s.onoff.gurmukhi", "true");
}
if (localStorage.getItem("s.onoff.hindi") === null) {
	localStorage.setItem("s.onoff.hindi", "false");
}
if (localStorage.getItem("s.onoff.transliteration") === null) {
	localStorage.setItem("s.onoff.transliteration", "false");
}
if (localStorage.getItem("s.onoff.english") === null) {
	localStorage.setItem("s.onoff.english", "true");
}
if (localStorage.getItem("s.onoff.punjabi") === null) {
	localStorage.setItem("s.onoff.punjabi", "false");
}
if (localStorage.getItem("s.onoff.day") === null) {
	localStorage.setItem("s.onoff.day", "false");
}
if (localStorage.getItem("s.onoff.larivaar") === null) {
	localStorage.setItem("s.onoff.larivaar", "false");
}
if (localStorage.getItem("s.onoff.larivaarassist") === null) {
	localStorage.setItem("s.onoff.larivaarassist", "false");
}
if (localStorage.getItem("s.onoff.shabadinfo") === null) {
	localStorage.setItem("s.onoff.shabadinfo", "true");
}
if (localStorage.getItem("s.onoff.center") === null) {
	localStorage.setItem("s.onoff.center", "false");
}
if (localStorage.getItem("s.data.font") === null) {
	localStorage.setItem("s.data.font", "GurbaniAkharThick");
}
if (localStorage.getItem("s.fontsize.gurmukhi") === null) {
	localStorage.setItem("s.fontsize.gurmukhi", "");
}
if (localStorage.getItem("s.fontsize.hindi") === null) {
	localStorage.setItem("s.fontsize.hindi", "");
}
if (localStorage.getItem("s.fontsize.transliteration") === null) {
	localStorage.setItem("s.fontsize.transliteration", "");
}
if (localStorage.getItem("s.fontsize.english") === null) {
	localStorage.setItem("s.fontsize.english", "");
}
if (localStorage.getItem("s.fontsize.punjabi") === null) {
	localStorage.setItem("s.fontsize.punjabi", "");
}
if (localStorage.getItem("s.onoff.unicode") === null) {
	localStorage.setItem("s.onoff.unicode", "false");
}

new ClipboardJS("#sharecopybutton");

window.addEventListener('scroll', function() {
	if (window.scrollY !== 0) {
		document.getElementById("scrollup").classList.add('show');
		document.getElementById("scrollup").classList.remove('hide');
		document.getElementById("scrolldown").classList.add('show');
		document.getElementById("scrolldown").classList.remove('hide');
	} else {
		document.getElementById("scrollup").classList.add('hide');
		document.getElementById("scrolldown").classList.add('hide');
	}
});
document.getElementById("scrollup").addEventListener('click', function() {
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
});
document.getElementById("scrolldown").addEventListener('click', function() {
	window.scroll({ top: document.documentElement.clientHeight, left: 0, behavior: 'smooth' });
});


var getshabadid = document.getElementById("shabadid").dataset.shabadid;
if (getshabadid !== null) {
	var getlineid = document.getElementById("lineid").dataset.lineid;
	if (getlineid !== null) {
		getshabad(getshabadid, getlineid);
	} else {
		getshabad(getshabadid, 0);
	}
}

function toggleday() {
	if (document.getElementById('daytoggle').checked) {
		document.getElementById("pagestyle").setAttribute("href", "https://cdn.jsdelivr.net/gh/GurbaniNow/bootstrap@3.3.7-3/dist/bootstrap-flatly.min.css");
		if (document.querySelector(".activeline")) {
			document.querySelector(".activeline").style.backgroundColor = "#ECF0F1";
		}
		localStorage.setItem("s.onoff.day", "true");
	} else {
		document.getElementById("pagestyle").setAttribute("href", "https://cdn.jsdelivr.net/gh/GurbaniNow/bootstrap@3.3.7-3/dist/bootstrap-darkly.min.css");
		if (document.querySelector(".activeline")) {
			document.querySelector(".activeline").style.backgroundColor = "#303030";
		}
		localStorage.setItem("s.onoff.day", "false");
	}
}

function togglelarivaar() {
	if (localStorage.getItem("s.onoff.larivaar") == "false") {
		localStorage.setItem("s.onoff.larivaar", "true");
		document.querySelectorAll(".gurmukhi.normal").forEach(function(el) {
			el.innerHTML = el.innerHTML.split(" ").join("<wbr>");
		});
		document.getElementById("assist").innerHTML = '<a href="javascript:void(0)" onclick="togglelarivaarassist();">LarivaarAssist&nbsp;&nbsp;<i class="fa fa-life-ring fa-fw" aria-hidden="true"></i></a>';
		document.getElementById("larivaarbtn").classList.add("active");
	} else {
		localStorage.setItem("s.onoff.larivaar", "false");
		document.querySelectorAll(".gurmukhi.normal").forEach(function(el) {
			el.innerHTML = el.innerHTML.split("<wbr>").join(" ");
		});
		document.getElementById("assist").innerHTML = "";
		document.getElementById("assist").classList.remove("active");
		localStorage.setItem("s.onoff.larivaarassist", "false");
		document.querySelectorAll(".assist").forEach(function(el) {
			el.style.display = "none";
		});
		if (localStorage.getItem("s.onoff.unicode") == "true") {
			document.querySelectorAll(".unicode.normal").forEach(function(el) {
				el.style.display = "";
			});
		} else {
			document.querySelectorAll(".akhar.normal").forEach(function(el) {
				el.style.display = "";
			});
		}
		document.getElementById("larivaarbtn").classList.remove("active");
	}
}

function togglelarivaarassist() {
	if (localStorage.getItem("s.onoff.larivaarassist") == "false") {
		localStorage.setItem("s.onoff.larivaarassist", "true");
		document.querySelectorAll(".normal").forEach(function(el) {
			el.style.display = "none";
		});
		if (localStorage.getItem("s.onoff.unicode") == "true") {
			document.querySelectorAll(".unicode.assist").forEach(function(el) {
				el.style.display = "";
			});
		} else {
			document.querySelectorAll(".akhar.assist").forEach(function(el) {
				el.style.display = "";
			});
		}
		document.getElementById("assist").classList.add("active");
	} else {
		localStorage.setItem("s.onoff.larivaarassist", "false");
		document.querySelectorAll(".assist").forEach(function(el) {
			el.style.display = "none";
		});
		if (localStorage.getItem("s.onoff.unicode") == "true") {
			document.querySelectorAll(".unicode.normal").forEach(function(el) {
				el.style.display = "";
			});
		} else {
			document.querySelectorAll(".akhar.normal").forEach(function(el) {
				el.style.display = "";
			});
		}
		document.getElementById("assist").classList.remove("active");
	}
}

function toggleunicode() {
	if (localStorage.getItem("s.onoff.unicode") == "false") {
		localStorage.setItem("s.onoff.unicode", "true");
		if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
			document.querySelectorAll(".akhar.assist").forEach(function(el) {
				el.style.display = "none";
			});
			document.querySelectorAll(".unicode.assist").forEach(function(el) {
				el.style.display = "";
			});
		} else {
			document.querySelectorAll(".akhar.normal").forEach(function(el) {
				el.style.display = "none";
			});
			document.querySelectorAll(".unicode.normal").forEach(function(el) {
				el.style.display = "";
			});
		}
		document.getElementById("unicodebutton").innerHTML = 'Unicode&nbsp;&nbsp;<span class="fa fa-fw">ਸ</span>';
		document.getElementById("unicodebtn").classList.add("active");
	} else {
		localStorage.setItem("s.onoff.unicode", "false");
		if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
			document.querySelectorAll(".unicode.assist").forEach(function(el) {
				el.style.display = "none";
			});
			document.querySelectorAll(".akhar.assist").forEach(function(el) {
				el.style.display = "";
			});
		} else {
			document.querySelectorAll(".unicode.normal").forEach(function(el) {
				el.style.display = "none";
			});
			document.querySelectorAll(".akhar.normal").forEach(function(el) {
				el.style.display = "";
			});
		}
		document.getElementById("unicodebutton").innerHTML = 'Unicode&nbsp;&nbsp;<i class="fa fa-font fa-fw" aria-hidden="true"></i>';
		document.getElementById("unicodebtn").classList.remove("active");
	}
}

function togglecenter() {
	if (document.getElementById('centertoggle').checked) {
		localStorage.setItem("s.onoff.center", "true");
		document.getElementById('shabad').style.textAlign = "center";
	} else {
		localStorage.setItem("s.onoff.center", "false");
		document.getElementById('shabad').style.textAlign = "left";
	}
}

function toggleshabadinfo() {
	if (document.getElementById('shabadinfotoggle').checked) {
		localStorage.setItem("s.onoff.shabadinfo", "true");
		document.getElementById('shabadinforoot').style.display = "block";
	} else {
		document.getElementById('shabadinfotoggle').checked = false;
		localStorage.setItem("s.onoff.shabadinfo", "false");
		document.getElementById('shabadinforoot').style.display = "none";
	}
}

function showhide(divName, className) {
	if (document.getElementById(divName).checked) {
		document.querySelectorAll("." + className).forEach(function(el) {
			el.style.display = "";
		});
		document.getElementById(className + "fontsize").style.display = "";
		localStorage.setItem("s.onoff." + className, "true");
	} else {
		document.getElementById(divName).checked = false;
		document.querySelectorAll("." + className).forEach(function(el) {
			el.style.display = "none";
		});
		document.getElementById(className + "fontsize").style.display = "none";
		localStorage.setItem("s.onoff." + className, "false");
	}
}

function fontplus(divName) {
	var currentFontSize = window.getComputedStyle(document.getElementsByClassName(divName)[0]).fontSize;
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum * 1.2;
	document.querySelectorAll("." + divName).forEach(function(el) {
		el.style.fontSize = newFontSize + "px";
	});
	localStorage.setItem("s.fontsize." + divName, newFontSize);
	return false;
}

function fontminus(divName) {
	var currentFontSize = window.getComputedStyle(document.getElementsByClassName(divName)[0]).fontSize;
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum * 0.8;
	document.querySelectorAll("." + divName).forEach(function(el) {
		el.style.fontSize = newFontSize + "px";
	});
	localStorage.setItem("s.fontsize." + divName, newFontSize);
	return false;
}

function togglefont(font) {
	document.querySelectorAll(".akhar").forEach(function(el) {
		el.style.fontFamily = font;
	});
	localStorage.setItem("s.data.font", font);
}

function getshabad(shabadNo, shabadId) {
	window.scrollTo(0,0);
	document.getElementById("shabadid").dataset.shabadid = shabadNo;
	document.getElementById("shabadinfo").style.display = "none";
	document.getElementById("shabad").style.display = "none";
	document.getElementById("shabadcontrol").style.display = "none";
	document.getElementById("loading").style.display = "";
	document.getElementById("shabad").innerHTML = "";
	document.getElementById("shabadinfogurmukhi").innerHTML = "";
	document.getElementById("shabadinfoenglish").innerHTML = "";
	var request = new XMLHttpRequest();
	var url = GurbaniNow.buildApiUrl({
		id: shabadNo
	});
	request.open('GET', url, true);
	request.onload = function() {
		if (this.status >= 200 && this.status < 400) {
			var data = JSON.parse(this.response);
			if (data.shabadinfo.source.id == "G") {
				angen = "Ang";
				anggur = "ਅੰਗ";
			} else if (data.shabadinfo.source.id == "D" || data.shabadinfo.source.id == "A" || data.shabadinfo.source.id == "U") {
				angen = "Panaa";
				anggur = "ਪੰਨਾ";
			} else {
				angen = "Vaar";
				anggur = "ਵਾਰ";
			}
			if (data.shabadinfo.source.id == "G") {
				raagEnglishOut = " (Sri Guru Granth Sahib Ji)";
				raagGurOut = " (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ)";
			} else if (data.shabadinfo.source.id == "D") {
				raagEnglishOut = " (Sri Dasam Granth)";
				raagGurOut = " (ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ)";
			} else {
				raagEnglishOut = "";
				raagGurOut = "";
			}
			var pageno = "" + data.shabadinfo.pageno;
			var unipagenum = pageno.replace(/0/g, "੦").replace(/1/g, "੧").replace(/2/g, "੨").replace(/3/g, "੩").replace(/4/g, "੪").replace(/5/g, "੫").replace(/6/g, "੬").replace(/7/g, "੭").replace(/8/g, "੮").replace(/9/g, "੯");
			var appenden = document.createElement("span");
			var appendgur = document.createElement("span");
			var htmlen = data.shabadinfo.raag.english + " - " + data.shabadinfo.writer.english + " - " + '<a href="/page/' + data.shabadinfo.pageno + "/" + data.shabadinfo.source.id + '">' + angen + " " + data.shabadinfo.pageno + "</a>" + raagEnglishOut;
			var htmlgur = data.shabadinfo.raag.unicode + " - " + data.shabadinfo.writer.unicode + " - " + '<a href="/page/' + data.shabadinfo.pageno + "/" + data.shabadinfo.source.id + '">' + anggur + " " + unipagenum + "</a>" + raagGurOut;
			appenden.innerHTML = htmlen;
			appendgur.innerHTML = htmlgur;
			document.getElementById("shabadinfoenglish").appendChild(appenden);
			document.getElementById("shabadinfogurmukhi").appendChild(appendgur);
			data.shabad.forEach(function(shabad, i) {
				if (shabadId == shabad.line.id) {
					var active = true;
					document.title = shabad.line.gurmukhi.unicode + " - GurbaniNow Search";
				} else {
					var active = false;
				}
				var akharsplit = shabad.line.gurmukhi.akhar.split(" ");
				var unisplit = shabad.line.gurmukhi.unicode.split(" ");
				var splitakharlength = akharsplit.length;
				var splitunicodelength = unisplit.length;
				var append = document.createElement("div");
				append.classList.add("sline");
				if (active) {
					append.classList.add("activeline");
				}
				append.id = "s" + shabad.line.id;
				var html = '<div class="gurmukhi akhar normal" style="font-family: GurbaniAkharThick;">' + shabad.line.gurmukhi.akhar + "</div>";
				html += '<div class="gurmukhi unicode normal" style="font-family: AnmolBani; display: none;">' + shabad.line.gurmukhi.unicode + "</div>";
				html += '<div class="gurmukhi akhar assist" style="font-family: GurbaniAkharThick; display: none;">';
				for (var i = 0; i < splitakharlength; i++) {
					html += "<span>" + akharsplit[i] + "</span><wbr>";
				}
				html += "</div>";
				html += '<div class="gurmukhi unicode assist" style="font-family: AnmolBani; display: none;">';
				for (var i = 0; i < splitunicodelength; i++) {
					html += "<span>" + unisplit[i] + "</span><wbr>";
				}
				html += "</div>";
				html += '<div class="hindi">' + shabad.line.transliteration.devanagari.text + "</div>";
				html += '<div class="transliteration">' + shabad.line.transliteration.english.text + "</div>";
				html += '<div class="english">' + shabad.line.translation.english.default+"</div>";
				html += '<div class="punjabi">' + shabad.line.translation.punjabi.default.akhar + "</div>";
				append.innerHTML = html;
				document.getElementById("shabad").appendChild(append);
				if (shabad.line.transliteration === "") {
					document.querySelectorAll(".transliteration").forEach(function(el) {
						el.style.display = "none";
					});
				} else {
					document.querySelectorAll(".transliteration").forEach(function(el) {
						el.style.display = "";
					});
				}
				if (shabad.line.translation.english.default === "") {
					document.querySelectorAll(".english").forEach(function(el) {
						el.style.display = "none";
					});
				} else {
					document.querySelectorAll(".english").forEach(function(el) {
						el.style.display = "";
					});
				}
				if (shabad.line.translation.punjabi.default.akhar === "") {
					document.querySelectorAll(".punjabi").forEach(function(el) {
						el.style.display = "none";
					});
				} else {
					document.querySelectorAll(".english").forEach(function(el) {
						el.style.display = "";
					});
				}
			});
			document.querySelectorAll(".gurmukhi").forEach(function(el) {
				el.style.fontSize = parseInt(localStorage.getItem("s.fontsize.gurmukhi")) + "px";
			});
			document.querySelectorAll(".hindi").forEach(function(el) {
				el.style.fontSize = parseInt(localStorage.getItem("s.fontsize.hindi")) + "px";
			});
			document.querySelectorAll(".transliteration").forEach(function(el) {
				el.style.fontSize = parseInt(localStorage.getItem("s.fontsize.transliteration")) + "px";
			});
			document.querySelectorAll(".english").forEach(function(el) {
				el.style.fontSize = parseInt(localStorage.getItem("s.fontsize.english")) + "px";
			});
			document.querySelectorAll(".punjabi").forEach(function(el) {
				el.style.fontSize = parseInt(localStorage.getItem("s.fontsize.punjabi")) + "px";
			});
			if (localStorage.getItem("s.onoff.larivaar") == "true") {
				document.querySelectorAll(".gurmukhi.normal").forEach(function(el) {
					el.innerHTML = el.innerHTML.split(" ").join("<wbr>");
				});
				document.getElementById("assist").innerHTML = '<a href="javascript:void(0)" onclick="togglelarivaarassist();">LarivaarAssist&nbsp;&nbsp;<i class="fa fa-life-ring fa-fw" aria-hidden="true"></i></a>';
				document.getElementById("larivaarbtn").classList.add("active");
			}
			if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
				document.querySelectorAll(".normal").forEach(function(el) {
					el.style.display = "none";
				});
				if (localStorage.getItem("s.onoff.unicode") == "true") {
					document.querySelectorAll(".unicode.assist").forEach(function(el) {
						el.style.display = "";
					});
				} else {
					document.querySelectorAll(".akhar.assist").forEach(function(el) {
						el.style.display = "";
					});
				}
				document.getElementById("assist").classList.add("active");
			}
			if (localStorage.getItem("s.onoff.hindi") == "true") {
				document.getElementById("hinditoggle").setAttribute("checked", "true");
			}
			showhide("hinditoggle", "hindi");
			if (localStorage.getItem("s.onoff.transliteration") == "true") {
				document.getElementById("transliterationtoggle").setAttribute("checked", "true");
			}
			showhide("transliterationtoggle", "transliteration");
			if (localStorage.getItem("s.onoff.english") == "true") {
				document.getElementById("englishtranslationtoggle").setAttribute("checked", "true");
			}
			showhide("englishtranslationtoggle", "english");
			if (localStorage.getItem("s.onoff.punjabi") == "true") {
				document.getElementById("punjabitranslationtoggle").setAttribute("checked", "true");
			}
			showhide("punjabitranslationtoggle", "punjabi");
			if (localStorage.getItem("s.onoff.day") == "true") {
				document.getElementById("daytoggle").setAttribute("checked", "true");
			}
			if (localStorage.getItem("s.onoff.shabadinfo") == "true") {
				document.getElementById("shabadinfotoggle").setAttribute("checked", "true");
			}
			if (localStorage.getItem("s.onoff.center") == "true") {
				document.getElementById("centertoggle").setAttribute("checked", "true");
			}
			if (localStorage.getItem("s.onoff.unicode") == "true") {
				if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
					document.querySelectorAll(".akhar.assist").forEach(function(el) {
						el.style.display = "none";
					});
					document.querySelectorAll(".unicode.assist").forEach(function(el) {
						el.style.display = "";
					});
				} else {
					document.querySelectorAll(".akhar.normal").forEach(function(el) {
						el.style.display = "none";
					});
					document.querySelectorAll(".unicode.normal").forEach(function(el) {
						el.style.display = "";
					});
				}
				document.getElementById("unicodebutton").innerHTML = 'Unicode&nbsp;&nbsp;<span class="fa fa-fw">ਸ</span>';
				document.getElementById("unicodebtn").classList.add("active");
			}
			if (localStorage.getItem("s.data.font") != "GurbaniAkharThick") {
				togglefont(localStorage.getItem("s.data.font"));
			}
			toggleday();
			toggleshabadinfo();
			togglecenter();
			document.getElementById("loading").style.display = "none";
			document.getElementById("shabadinfo").style.display = "block";
			document.getElementById("shabad").style.display = "block";
			document.getElementById("shabadcontrol").style.display = "block";
			document.getElementById("sharelink").value = "http://gbnow.cc/s/" + shabadNo + "/" + document.getElementById("lineid").dataset.lineid;
			if (shabadId > 0) {
				var rect = document.getElementById("s" + shabadId).getBoundingClientRect();
				var ypos = rect.top - 80;
				window.scroll({ top: ypos, left: 0, behavior: "smooth" });
			}
		} else {
			document.getElementById("loading").innerHTML = '<br><center><i class="fa fa-exclamation-triangle fa-3x fa-fw"></i><br><p>There was an error loading the Shabad.</p></center>';
		}
	};
	request.onerror = function() {
		document.getElementById("loading").innerHTML = '<br><center><i class="fa fa-exclamation-triangle fa-3x fa-fw"></i><br><p>There was an error loading the Shabad.</p></center>';
	};
	request.send();
}

document.addEventListener("keyup", function(e) {
	if (e.which === 39) {
		getshabad(parseInt(document.getElementById("shabadid").dataset.shabadid) + 1, 0);
	}
	if (e.which === 37) {
		getshabad(parseInt(document.getElementById("shabadid").dataset.shabadid) - 1, 0);
	}
});