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
	localStorage.setItem("s.fontsize.gurmukhi", $(".gurmukhi").css("font-size"));
}
if (localStorage.getItem("s.fontsize.hindi") === null) {
	localStorage.setItem("s.fontsize.hindi", $(".hindi").css("font-size"));
}
if (localStorage.getItem("s.fontsize.transliteration") === null) {
	localStorage.setItem("s.fontsize.transliteration", $(".transliteration").css("font-size"));
}
if (localStorage.getItem("s.fontsize.english") === null) {
	localStorage.setItem("s.fontsize.english", $(".english").css("font-size"));
}
if (localStorage.getItem("s.fontsize.punjabi") === null) {
	localStorage.setItem("s.fontsize.punjabi", $(".punjabi").css("font-size"));
}
if (localStorage.getItem("s.onoff.unicode") === null) {
	localStorage.setItem("s.onoff.unicode", "false");
}
/*
$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() !== 0) {
			$("#scrollup").fadeIn();
			$("#scrolldown").fadeIn();
		} else {
			$("#scrollup").fadeOut();
			$("#scrolldown").fadeOut();
		}
	});
	$("#scrollup").click(function() {
		$("body,html").animate({
			scrollTop: 0
		}, 800);
	});
	$("#scrolldown").click(function() {
		$("body,html").animate({
			scrollTop: $(document).height()
		}, 800);
	});
});*/

var getshabadid = document.getElementById("shabadid").dataset.shabadid;
if (getshabadid !== null) {
	var getlineid = document.getElementById("lineid").dataset.lineid;
	if (getlineid !== null) {
		getshabad(getshabadid, getlineid);
	} else {
		getshabad(getshabadid, 0);
	}
}
/*
function toggleday() {
	if (document.getElementById('daytoggle').checked) {
		document.getElementById("pagestyle").setAttribute("href", "https://cdn.jsdelivr.net/gh/GurbaniNow/bootstrap@3.3.7-2/dist/bootstrap-darkly.min.css");
		localStorage.setItem("s.onoff.day", "true");
	} else {
		document.getElementById("pagestyle").setAttribute("href", "https://cdn.jsdelivr.net/gh/GurbaniNow/bootstrap@3.3.7-2/dist/bootstrap-flatly.min.css");
		localStorage.setItem("s.onoff.day", "false");
	}
}

function togglelarivaar() {
	if (localStorage.getItem("s.onoff.larivaar") == "false") {
		localStorage.setItem("s.onoff.larivaar", "true");
		$(".gurmukhi.normal").each(function() {
			var value = $(this).text();
			$(this).html(value.split(" ").join("<wbr>"));
		});
		$("#assist").html('<a href="javascript:void(0)" onclick="togglelarivaarassist();">LarivaarAssist&nbsp;&nbsp;<i class="fa fa-life-ring fa-fw" aria-hidden="true"></i></a>');
		$("#larivaarbtn").addClass("active");
	} else {
		localStorage.setItem("s.onoff.larivaar", "false");
		$(".gurmukhi.normal").each(function() {
			var value = $(this).html();
			$(this).html(value.split("<wbr>").join(" "));
		});
		$("#assist").html("");
		$("#assist").removeClass("active");
		localStorage.setItem("s.onoff.larivaarassist", "false");
		$(".assist").hide();
		if (localStorage.getItem("s.onoff.unicode") == "true") {
			$(".unicode.normal").show();
		} else {
			$(".akhar.normal").show();
		}
		$("#larivaarbtn").removeClass("active");
	}
}

function togglelarivaarassist() {
	if (localStorage.getItem("s.onoff.larivaarassist") == "false") {
		localStorage.setItem("s.onoff.larivaarassist", "true");
		$(".normal").hide();
		if (localStorage.getItem("s.onoff.unicode") == "true") {
			$(".unicode.assist").show();
		} else {
			$(".akhar.assist").show();
		}
		$("#assist").addClass("active");
	} else {
		localStorage.setItem("s.onoff.larivaarassist", "false");
		$(".assist").hide();
		if (localStorage.getItem("s.onoff.unicode") == "true") {
			$(".unicode.normal").show();
		} else {
			$(".akhar.normal").show();
		}
		$("#assist").removeClass("active");
	}
}

function toggleunicode() {
	if (localStorage.getItem("s.onoff.unicode") == "false") {
		localStorage.setItem("s.onoff.unicode", "true");
		if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
			$(".akhar.assist").hide();
			$(".unicode.assist").show();
		} else {
			$(".akhar.normal").hide();
			$(".unicode.normal").show();
		}
		$("#unicodebutton").html('Unicode&nbsp;&nbsp;<span class="fa fa-fw">ਸ</span>');
		$("#unicodebtn").addClass("active");
	} else {
		localStorage.setItem("s.onoff.unicode", "false");
		if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
			$(".unicode.assist").hide();
			$(".akhar.assist").show();
		} else {
			$(".unicode.normal").hide();
			$(".akhar.normal").show();
		}
		$("#unicodebutton").html('Unicode&nbsp;&nbsp;<i class="fa fa-font fa-fw" aria-hidden="true"></i>');
		$("#unicodebtn").removeClass("active");
	}
}

function togglecenter() {
	if ($("#centertoggle").is(":checked")) {
		localStorage.setItem("s.onoff.center", "true");
		$("#shabad").css("text-align", "center");
	} else {
		localStorage.setItem("s.onoff.center", "false");
		$("#shabad").css("text-align", "left");
	}
}

function toggleshabadinfo() {
	if ($("#shabadinfotoggle").is(":checked")) {
		localStorage.setItem("s.onoff.shabadinfo", "true");
		$("#shabadinforoot").show();
	} else {
		$("#shabadinfotoggle").removeAttr("checked");
		localStorage.setItem("s.onoff.shabadinfo", "false");
		$("#shabadinforoot").hide();
	}
}*/

function showhide(divName, className) {
	if (document.getElementById(divName).checked) {
		document.querySelectorAll("." + className).forEach(function(el) {
			el.style.display = "";
		});
		document.getElementById("#" + className + "fontsize").style.display = "";
		localStorage.setItem("s.onoff." + className, "true");
	} else {
		document.getElementById(divName).checked = false;
		document.querySelectorAll("." + className).forEach(function(el) {
			el.style.display = "none";
		});
		document.getElementById("#" + className + "fontsize").style.display = "none";
		localStorage.setItem("s.onoff." + className, "false");
	}
}
/*
function fontplus(divName) {
	var currentFontSize = $("." + divName).css("font-size");
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum * 1.2;
	$("." + divName).css("font-size", newFontSize);
	localStorage.setItem("s.fontsize." + divName, newFontSize);
	return false;
}

function fontminus(divName) {
	var currentFontSize = $("." + divName).css("font-size");
	var currentFontSizeNum = parseFloat(currentFontSize, 10);
	var newFontSize = currentFontSizeNum * 0.8;
	$("." + divName).css("font-size", newFontSize);
	localStorage.setItem("s.fontsize." + divName, newFontSize);
	return false;
}

function togglefont(font) {
	$(".akhar").css("font-family", font);
	localStorage.setItem("s.data.font", font);
}
*/
function getshabad(shabadNo, shabadId) {
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
					var active = "activeline";
					document.title = shabad.line.gurmukhi.unicode + " - GurbaniNow Search";
				} else {
					var active = "";
				}
				var akharsplit = shabad.line.gurmukhi.akhar.split(" ");
				var unisplit = shabad.line.gurmukhi.unicode.split(" ");
				var splitakharlength = akharsplit.length;
				var splitunicodelength = unisplit.length;
				var append = document.createElement("div");
				append.classList.add("sline");
				if(active !== "") {
					append.classList.add(active);
				}
				append.id = "s" + shabad.line.id;
				var html = '<div class="gurmukhi akhar normal" style="font-family: GurbaniAkharThick;">' + shabad.line.gurmukhi.akhar + "</div>";
				html += '<div class="gurmukhi unicode normal" style="font-family: AnmolBani; font-weight: 900; display: none;">' + shabad.line.gurmukhi.unicode + "</div>";
				html += '<div class="gurmukhi akhar assist" style="font-family: GurbaniAkharThick; display: none;">';
				for (var i = 0; i < splitakharlength; i++) {
					html += "<span>" + akharsplit[i] + "</span><wbr>";
				}
				html += "</div>";
				html += '<div class="gurmukhi unicode assist" style="font-family: AnmolBani; font-weight: 900; display: none;">';
				for (var i = 0; i < splitunicodelength; i++) {
					html += "<span>" + unisplit[i] + "</span><wbr>";
				}
				html += "</div>";
				html += '<div class="hindi">' + shabad.line.transliteration.devanagari.text + "</div>";
				html += '<div class="transliteration">' + shabad.line.transliteration.english.text + "</div>";
				html += '<div class="english">' + shabad.line.translation.english.default+"</div>";
				html += '<div class="punjabi">' + shabad.line.translation.punjabi.default.akhar + "</div>";
				append.innerHTML = html;
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
				document.getElementById("shabad").appendChild(append);
			});
			document.querySelectorAll(".gurmukhi").forEach(function(el) {
				el.style.fontsize = parseInt(localStorage.getItem("s.fontsize.gurmukhi"));
			});
			document.querySelectorAll(".hindi").forEach(function(el) {
				el.style.fontsize = parseInt(localStorage.getItem("s.fontsize.hindi"));
			});
			document.querySelectorAll(".transliteration").forEach(function(el) {
				el.style.fontsize = parseInt(localStorage.getItem("s.fontsize.transliteration"));
			});
			document.querySelectorAll(".english").forEach(function(el) {
				el.style.fontsize = parseInt(localStorage.getItem("s.fontsize.english"));
			});
			document.querySelectorAll(".punjabi").forEach(function(el) {
				el.style.fontsize = parseInt(localStorage.getItem("s.fontsize.punjabi"));
			});
			if (localStorage.getItem("s.onoff.larivaar") == "true") {
				document.querySelectorAll(".gurmukhi.normal").forEach(function(el) {
					el.innerHTML = el.textContent.split(" ").join("<wbr>");
				});
				document.getElementById("assist").innerHTML = '<a href="javascript:void(0)" onclick="togglelarivaarassist();">LarivaarAssist&nbsp;&nbsp;<i class="fa fa-life-ring fa-fw" aria-hidden="true"></i></a>';
				document.getElementById("assist").classList.add("active");
			}
			if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
				document.querySelectorAll(".gurmukhi.normal").forEach(function(el) {
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
			/* showhide("hinditoggle", "hindi"); */
			if (localStorage.getItem("s.onoff.transliteration") == "true") {
				document.getElementById("transliterationtoggle").setAttribute("checked", "true");
			}
			/* showhide("transliterationtoggle", "transliteration"); */
			if (localStorage.getItem("s.onoff.english") == "true") {
				document.getElementById("englishtranslationtoggle").setAttribute("checked", "true");
			}
			/* showhide("englishtranslationtoggle", "english"); */
			if (localStorage.getItem("s.onoff.punjabi") == "true") {
				document.getElementById("punjabitranslationtoggle").setAttribute("checked", "true");
			}
			/* showhide("punjabitranslationtoggle", "punjabi"); */
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
						el.style.display = "";
					});
					document.querySelectorAll(".unicode.normal").forEach(function(el) {
						el.style.display = "none";
					});
				}
				document.getElementById("unicodebutton").innerHTML = 'Unicode&nbsp;&nbsp;<span class="fa fa-fw">ਸ</span>';
				document.getElementById("unicodebutton").classList.add("active");
			}
			if (localStorage.getItem("s.data.font") != "GurbaniAkharThick") {
				togglefont(localStorage.getItem("s.data.font"));
			}
			/*toggleday();
			toggleshabadinfo();
			togglecenter();*/
			document.getElementById("loading").style.display = "none";
			document.getElementById("shabadinfo").classList.add("fadeInDown");
			document.getElementById("shabad").classList.add("fadeInDown");
			document.getElementById("shabadinfo").classList.add("fadeInDown");
			document.getElementById("shabadcontrol").style.display = "";
			document.getElementById("shabad").style.display = "";
			document.getElementById("shabadcontrol").style.display = "";
			if (shabadId > 0) {
				//document.getElementById("#s" + shabadId).scrollIntoView();
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