$(document).ready(function() {
    if (localStorage.getItem("gurmukhion") === null) {
        localStorage.setItem("gurmukhion", "true");
    }
    if (localStorage.getItem("hindion") === null) {
        localStorage.setItem("hindion", "false");
    }
    if (localStorage.getItem("transliterationon") === null) {
        localStorage.setItem("transliterationon", "false");
    }
    if (localStorage.getItem("englishon") === null) {
        localStorage.setItem("englishon", "true");
    }
    if (localStorage.getItem("punjabion") === null) {
        localStorage.setItem("punjabion", "false");
    }
    if (localStorage.getItem("dayon") === null) {
        localStorage.setItem("dayon", "false");
    }
    if (localStorage.getItem("larivaaron") === null) {
        localStorage.setItem("larivaaron", "false");
    }
    if (localStorage.getItem("larivaarassiston") === null) {
        localStorage.setItem("larivaarassiston", "false");
    }
    if (localStorage.getItem("shabadinfoon") === null) {
        localStorage.setItem("shabadinfoon", "true");
    }
    if (localStorage.getItem("centeron") === null) {
        localStorage.setItem("centeron", "false");
    }
    if (localStorage.getItem("font") === null) {
        localStorage.setItem("font", "GurbaniAkharThick");
    }
    if (localStorage.getItem("gurmukhisize") === null) {
        localStorage.setItem("gurmukhisize", $(".gurmukhi").css("font-size"));
    }
    if (localStorage.getItem("hindisize") === null) {
        localStorage.setItem("hindisize", $(".hindi").css("font-size"));
    }
    if (localStorage.getItem("transliterationsize") === null) {
        localStorage.setItem("transliterationsize", $(".transliteration").css("font-size"));
    }
    if (localStorage.getItem("englishsize") === null) {
        localStorage.setItem("englishsize", $(".english").css("font-size"));
    }
    if (localStorage.getItem("punjabisize") === null) {
        localStorage.setItem("punjabisize", $(".punjabi").css("font-size"));
    }
    if (localStorage.getItem("unicodeon") === null) {
        localStorage.setItem("unicodeon", "false");
    }
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
    });
    var pageno = $('#page').data('page');
	var sourceid = $('#sourceid').data('sourceid');
	getpage(pageno, sourceid);
});

function toggleday() {
    if ($("#daytoggle").is(":checked")) {
        document.getElementById("pagestyle").setAttribute("href", "https://gurbaninow.com/assets/css/bootstrap.min.light.css/3.3.7.5/css.css");
        localStorage.setItem("dayon", "true");
    } else {
        document.getElementById("pagestyle").setAttribute("href", "https://gurbaninow.com/assets/css/bootstrap.min.dark.css/3.3.7.5/css.css");
        localStorage.setItem("dayon", "false");
    }
}

function togglelarivaar() {
    if (localStorage.getItem("larivaaron") == "false") {
        localStorage.setItem("larivaaron", "true");
        $(".gurmukhi.normal").each(function() {
            var value = $(this).text();
            $(this).html(value.split(" ").join("<wbr>"));
        });
        $("#assist").html('<a href="javascript:void(0)" onclick="togglelarivaarassist();">LarivaarAssist&nbsp;&nbsp;<i class="fa fa-life-ring fa-fw" aria-hidden="true"></i></a>');
        $("#larivaarbtn").addClass("active");
    } else {
        localStorage.setItem("larivaaron", "false");
        $(".gurmukhi.normal").each(function() {
            var value = $(this).html();
            $(this).html(value.split("<wbr>").join(" "));
        });
        $("#assist").html("");
        $("#assist").removeClass("active");
        localStorage.setItem("larivaarassiston", "false");
        $(".assist").hide();
        if (localStorage.getItem("unicodeon") == "true") {
            $(".unicode.normal").show();
        } else {
            $(".akhar.normal").show();
        }
        $("#larivaarbtn").removeClass("active");
    }
}

function togglelarivaarassist() {
    if (localStorage.getItem("larivaarassiston") == "false") {
        localStorage.setItem("larivaarassiston", "true");
        $(".normal").hide();
        if (localStorage.getItem("unicodeon") == "true") {
            $(".unicode.assist").show();
        } else {
            $(".akhar.assist").show();
        }
        $("#assist").addClass("active");
    } else {
        localStorage.setItem("larivaarassiston", "false");
        $(".assist").hide();
        if (localStorage.getItem("unicodeon") == "true") {
            $(".unicode.normal").show();
        } else {
            $(".akhar.normal").show();
        }
        $("#assist").removeClass("active");
    }
}

function toggleunicode() {
    if (localStorage.getItem("unicodeon") == "false") {
        localStorage.setItem("unicodeon", "true");
        if (localStorage.getItem("larivaarassiston") == "true") {
            $(".akhar.assist").hide();
            $(".unicode.assist").show();
        } else {
            $(".akhar.normal").hide();
            $(".unicode.normal").show();
        }
        $("#unicodebutton").html('Unicode&nbsp;&nbsp;<span class="fa fa-fw">ਸ</span>');
        $("#unicodebtn").addClass("active");
    } else {
        localStorage.setItem("unicodeon", "false");
        if (localStorage.getItem("larivaarassiston") == "true") {
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
        localStorage.setItem("centeron", "true");
        $("#shabad").css("text-align", "center");
    } else {
        localStorage.setItem("centeron", "false");
        $("#shabad").css("text-align", "left");
    }
}

function toggleshabadinfo() {
    if ($("#shabadinfotoggle").is(":checked")) {
        localStorage.setItem("shabadinfoon", "true");
        $("#shabadinforoot").show();
    } else {
        $("#shabadinfotoggle").removeAttr("checked");
        localStorage.setItem("shabadinfoon", "false");
        $("#shabadinforoot").hide();
    }
}

function showhide(divName, className) {
    if ($("#" + divName).is(":checked")) {
        $("." + className).show();
        $("#" + className + "fontsize").show();
        localStorage.setItem(className + "on", "true");
    } else {
        $("#" + divName).removeAttr("checked");
        $("." + className).hide();
        $("#" + className + "fontsize").hide();
        localStorage.setItem(className + "on", "false");
    }
}

function fontplus(divName) {
    var currentFontSize = $("." + divName).css("font-size");
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum * 1.2;
    $("." + divName).css("font-size", newFontSize);
    localStorage.setItem(divName + "size", newFontSize);
    return false;
}

function fontminus(divName) {
    var currentFontSize = $("." + divName).css("font-size");
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum * 0.8;
    $("." + divName).css("font-size", newFontSize);
    localStorage.setItem(divName + "size", newFontSize);
    return false;
}

function togglefont(font) {
    $(".akhar").css("font-family", font);
    localStorage.setItem("font", font);
}

function getpage(pageno, sourceid) {
    $("#shabadinfo").hide();
	$('#page').data('page', pageno);
    $("#shabad").hide();
    $("#shabadcontrol").hide();
    $("#loading").show();
    $("#shabad").empty();
    $("#shabadinfogurmukhi").empty();
    $("#shabadinfoenglish").empty();
    $.getJSON("https://api.gurbaninow.com/v2/ang/" + pageno + '/' + sourceid, function(data) {
		if(pageno <= 0) {
			getpage(1, sourceid);
			changeurl("Page View - GurbaniNow Search", "https://gurbaninow.com/page/1/" + $("#sourceid").data("sourceid"));
		} else if(data.count == 0 && pageno > 0) {
			getpage(pageno-1, sourceid);
			changeurl("Page View - GurbaniNow Search", "https://gurbaninow.com/page/" + (pageno-1) + "/" + $("#sourceid").data("sourceid"));
		} else {
			if (data.source.id == "G") {
				angen = "Ang";
				anggur = "ਅੰਗ";
			} else if (data.source.id == "D" || data.source.id == "A" || data.source.id == "U") {
				angen = "Panaa";
				anggur = "ਪੰਨਾ";
			} else {
				angen = "Vaar";
				anggur = "ਵਾਰ";
			}
			var fpageno = "" + data.pageno;
			var unipagenum = fpageno.replace(/0/g, "੦").replace(/1/g, "੧").replace(/2/g, "੨").replace(/3/g, "੩").replace(/4/g, "੪").replace(/5/g, "੫").replace(/6/g, "੬").replace(/7/g, "੭").replace(/8/g, "੮").replace(/9/g, "੯");
			htmlen = data.source.english + ' - ' + angen + ' ' + data.pageno;
			htmlgur = data.source.unicode + ' - ' + anggur + ' ' + unipagenum;
			$("#shabadinfoenglish").append(htmlen);
			$("#shabadinfogurmukhi").append(htmlgur);
			$.each(data.page, function(i, shabad) {
				var akharsplit = shabad.line.gurmukhi.akhar.split(" ");
				var unisplit = shabad.line.gurmukhi.unicode.split(" ");
				var splitakharlength = akharsplit.length;
				var splitunicodelength = unisplit.length;
				html = '<div class="sline" id="s' + shabad.line.id + '">';
				html += '<div class="gurmukhi akhar normal" style="font-family: GurbaniAkharThick;">' + shabad.line.gurmukhi.akhar + "</div>";
				html += '<div class="gurmukhi unicode normal" style="font-family: AnmolBani; display: none; font-weight: bold;">' + shabad.line.gurmukhi.unicode + "</div>";
				html += '<div class="gurmukhi akhar assist" style="font-family: GurbaniAkharThick; display: none;">';
				for (var i = 0; i < splitakharlength; i++) {
					html += "<span>" + akharsplit[i] + "</span><wbr>";
				}
				html += "</div>";
				html += '<div class="gurmukhi unicode assist" style="font-family: AnmolBani; display: none; font-weight: bold;">';
				for (var i = 0; i < splitunicodelength; i++) {
					html += "<span>" + unisplit[i] + "</span><wbr>";
				}
				html += "</div>";
				html += '<div class="hindi">' + shabad.line.transliteration.devanagari.text + "</div>";
				html += '<div class="transliteration">' + shabad.line.transliteration.english.text + "</div>";
				html += '<div class="english">' + shabad.line.translation.english.default+"</div>";
				html += '<div class="punjabi">' + shabad.line.translation.punjabi.default.akhar + "</div></div>";
				if (shabad.line.transliteration === "") {
					$(".transliteration").hide();
				} else {
					$(".transliteration").show();
				}
				if (shabad.line.translation.english.default === "") {
					$(".english").hide();
				} else {
					$(".english").show();
				}
				if (shabad.line.translation.punjabi.default.akhar === "") {
					$(".punjabi").hide();
				} else {
					$(".punjabi").show();
				}
				$("#shabad").append(html);
			});
		}
        $(".gurmukhi").css("font-size", parseInt(localStorage.getItem("gurmukhisize")));
        $(".hindi").css("font-size", parseInt(localStorage.getItem("hindisize")));
        $(".transliteration").css("font-size", parseInt(localStorage.getItem("transliterationsize")));
        $(".english").css("font-size", parseInt(localStorage.getItem("englishsize")));
        $(".punjabi").css("font-size", parseInt(localStorage.getItem("punjabisize")));
        if (localStorage.getItem("larivaaron") == "true") {
            $(".gurmukhi.normal").each(function() {
                var value = $(this).text();
                $(this).html(value.split(" ").join("<wbr>"));
            });
            $("#assist").html('<a href="javascript:void(0)" onclick="togglelarivaarassist();">LarivaarAssist&nbsp;&nbsp;<i class="fa fa-life-ring fa-fw" aria-hidden="true"></i></a>');
            $("#larivaarbtn").addClass("active");
        }
        if (localStorage.getItem("larivaarassiston") == "true") {
            $(".normal").hide();
            if (localStorage.getItem("unicodeon") == "true") {
                $(".unicode.assist").show();
            } else {
                $(".akhar.assist").show();
            }
            $("#assist").addClass("active");
        }
        if (localStorage.getItem("hindion") == "true") {
            $("#hinditoggle").attr("checked", "true");
        }
        showhide("hinditoggle", "hindi");
        if (localStorage.getItem("transliterationon") == "true") {
            $("#transliterationtoggle").attr("checked", "true");
        }
        showhide("transliterationtoggle", "transliteration");
        if (localStorage.getItem("englishon") == "true") {
            $("#englishtranslationtoggle").attr("checked", "true");
        }
        showhide("englishtranslationtoggle", "english");
        if (localStorage.getItem("punjabion") == "true") {
            $("#punjabitranslationtoggle").attr("checked", "true");
        }
        showhide("punjabitranslationtoggle", "punjabi");
        if (localStorage.getItem("dayon") == "true") {
            $("#daytoggle").attr("checked", "true");
        }
        if (localStorage.getItem("shabadinfoon") == "true") {
            $("#shabadinfotoggle").attr("checked", "true");
        }
        if (localStorage.getItem("centeron") == "true") {
            $("#centertoggle").attr("checked", "true");
        }
        if (localStorage.getItem("unicodeon") == "true") {
            if (localStorage.getItem("larivaarassiston") == "true") {
                $(".akhar.assist").hide();
                $(".unicode.assist").show();
            } else {
                $(".akhar.normal").hide();
                $(".unicode.normal").show();
            }
            $("#unicodebutton").html('Unicode&nbsp;&nbsp;<span class="fa fa-fw">ਸ</span>');
            $("#unicodebtn").addClass("active");
        }
        if (localStorage.getItem("font") != "GurbaniAkharThick") {
            togglefont(localStorage.getItem("font"));
        }
        toggleday();
        toggleshabadinfo();
        togglecenter();
        $("#loading").hide();
        $("#shabadinfo").show("slow");
        $("#shabad").show("slow");
		$("#shabadcontrol").show("slow");
    });
}

function changeurl(title, url) {
    if (typeof(history.pushState) !== "undefined") {
        var obj = {
            Title: title,
            Url: url
        };
        history.pushState(obj, obj.Title, obj.Url);
    }
}

function getpageno(num) {
    getpage(num, $('#sourceid').data('sourceid'));
    changeurl("Page View - GurbaniNow Search", "https://gurbaninow.com/page/" + num + "/" + $("#sourceid").data("sourceid"));
}

$("#pagenumgo").keyup(function(event) {
    if (event.keyCode == 13) {
        $("#pagego").click();
    }
});

function changeangup() {
    var num = parseInt($("#page").data("page")) + 1;
    getpage(num, $("#sourceid").data("sourceid"));
    changeurl("Page View - GurbaniNow Search", "https://gurbaninow.com/page/" + num + "/" + $("#sourceid").data("sourceid"));
}

function changeangdown() {
    var num = parseInt($("#page").data("page")) - 1;
    getpage(num, $("#sourceid").data("sourceid"));
    changeurl("Page View - GurbaniNow Search", "https://gurbaninow.com/page/" + num + "/" + $("#sourceid").data("sourceid"));
}

$(document).keyup(function(e) {
    if (e.which === 39) {
		changeangup();
    }
    if (e.which === 37) {
        changeangdown();
    }
});

function showformatbox() {
    if ($("#shabadformat").is(":visible")) {
        $("#shabadformat").hide("slow");
    } else {
        $("#shabadformat").show("slow");
    }
}