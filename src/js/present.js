$(document).ready(function() {
    $(".gurmukhi-keyboard button").click(function() {
        if ($(this).data("action")) {
            var action = $(this).data("action");
            if (action === "bksp") {
                $("#searchbox").val(function() {
                    return this.value.substring(0, this.value.length - 1);
                });
                showresult($("#searchbox").val());
            } else if (action === "close") {
                $(".gurmukhi-keyboard").hide();
            } else if (action === "search") {
                showresult($("#searchbox").val());
                $(".gurmukhi-keyboard").hide();
            } else if (action.includes("page")) {
                $(".gurmukhi-keyboard .page").hide();
                $("#gurmukhi-keyboard-" + action).show();
            }
        } else {
            var charinput = $(this).text();
            $("#searchbox").val(function() {
                return this.value + charinput;
            });
            showresult($("#searchbox").val());
        }
    });
    if (localStorage.getItem("p.onoff.daynight") === null) {
        localStorage.setItem("p.onoff.daynight", "day");
    }
    if (localStorage.getItem("p.onoff.daynight") === "night") {
        $("#daynight").attr("checked", "true");
    }
    if (localStorage.getItem("p.onoff.transliteration") === "true") {
        $("#transliteration").attr("checked", "true");
    }
    showhide("transliteration");
    if (localStorage.getItem("p.onoff.english") === "true") {
        $("#english").attr("checked", "true");
    }
    showhide("english");
    if (localStorage.getItem("p.onoff.punjabi") === "true") {
        $("#punjabi").attr("checked", "true");
    }
    showhide("punjabi");
    if (localStorage.getItem("p.onoff.larivaar") === "true") {
        $("#larivaar").attr("checked", "true");
    }
    showhide("larivaar");
    if (localStorage.getItem("p.fontsize.gurmukhi") === null) {
        localStorage.setItem("p.fontsize.gurmukhi", "11");
    }
    $("#gurmukhifontvalue").text(localStorage.getItem("p.fontsize.gurmukhi"));
    if (localStorage.getItem("p.fontsize.transliteration") === null) {
        localStorage.setItem("p.fontsize.transliteration", "4");
    }
    $("#transliterationfontvalue").text(localStorage.getItem("p.fontsize.transliteration"));
    if (localStorage.getItem("p.fontsize.english") === null) {
        localStorage.setItem("p.fontsize.english", "5");
    }
    $("#englishfontvalue").text(localStorage.getItem("p.fontsize.english"));
    if (localStorage.getItem("p.fontsize.punjabi") === null) {
        localStorage.setItem("p.fontsize.punjabi", "4");
    }
    $("#punjabifontvalue").text(localStorage.getItem("p.fontsize.punjabi"));
    if (localStorage.getItem("p.onoff.assakivaar") === null) {
        localStorage.setItem("p.onoff.assakivaar", false);
    }
    if (localStorage.getItem("p.data.assakivaarid") === null) {
        localStorage.setItem("p.data.assakivaarid", "1");
    }
});

jQuery.fn.scrollTo = function(elem, speed) {
    $(this).animate({
        scrollTop: $(this).scrollTop() - $(this).offset().top + $(elem).offset().top - 80
    }, speed === undefined ? 1000 : speed);
    return this;
};
var sid = {};

function showresult(stru) {
    if (stru.length === 0) {
        $("#searchinfo").empty();
        $("#searchresults").empty();
        return false;
    } else {
        var str = encodeURIComponent(stru);
        var source = $("#sourceoption").val();
        var type = $("#searchtypeoption").val();
        var writer = $("#writeroption").val();
        var raag = $("#raagoption").val();
        //var ang = $("#angsearch").val();
        $("#searchinfo").text("Searching...");
        $.getJSON("https://api.gurbaninow.com/v2/search/" + str + "?", {
            source: source,
            searchtype: type,
            writer: writer,
            raag: raag
        }, function(data) {
            var searchcount = data.count;
            if (searchcount === 0) {
                var resultText = "No Shabads Found!";
                $("#searchresults").empty();
            } else {
                $("#searchresults").empty();
                $.each(data.shabads, function(i, shabads) {
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
                    var html = '<a href="javascript:void(0)" onclick="getshabad(' + shabads.shabad.shabadid + ', ' + shabads.shabad.id + ')" class="list-group-item">';
                    html += '<h3 class="list-group-item-heading" style="font-family: GurbaniAkharThick; color: #ffffff;">' + shabads.shabad.gurmukhi.akhar + '</h3>';
                    html += '<p class="list-group-item-text"><small><b>' + shabads.shabad.raag.english + ', ' + writer + ', ' + ang + ' ' + shabads.shabad.pageno + source + '</b></small></p>';
                    html += '</a>';
                    $("#searchresults").append(html);
                });
                if (searchcount === 1) {
                    var resultText = "Found 1 Shabad";
                } else {
                    var resultText = "Found " + searchcount + " Shabads";
                }
            }
            $("#searchinfo").text(resultText);
        });
    }
}

function fontplus(divName) {
    var currentFontSize = localStorage.getItem("p.fontsize." + divName);
    var currentFontSizeNum = parseInt(currentFontSize);
    if (currentFontSizeNum < 12) {
        var newFontSize = currentFontSizeNum + 1;
    } else {
        var newFontSize = 12;
    }
    $("#" + divName + "fontvalue").text(newFontSize);
    localStorage.setItem("p.fontsize." + divName, newFontSize);
    return false;
}

function fontminus(divName) {
    var currentFontSize = localStorage.getItem("p.fontsize." + divName);
    var currentFontSizeNum = parseInt(currentFontSize);
    if (currentFontSizeNum > 1) {
        var newFontSize = currentFontSizeNum - 1;
    } else {
        var newFontSize = 1;
    }
    $("#" + divName + "fontvalue").text(newFontSize);
    localStorage.setItem("p.fontsize." + divName, newFontSize);
    return false;
}

function showang(angnum) {
    $("#searchresults").empty();
    $("#searchinfo").text("Searching...");
    $.getJSON("https://api.gurbaninow.com/v2/ang/" + angnum + "/" + $("#sourceoption").val(), "", function(data) {
        var searchcount = data.count;
        $.each(data.page, function(i, lines) {
            if (data.source.id === "G") {
                var ang = "Ang";
            } else if (data.source.id === "D" || data.source.id === "A" || data.source.id === "U") {
                var ang = "Panaa";
            } else {
                var ang = "Vaar";
            }
            if (data.source.id === "G") {
                var source = " (SGGS)";
            } else if (data.source.id === "D") {
                var source = " (Sri Dasam Granth)";
            } else {
                var source = "";
            }
            if (lines.line.writer.english === "") {
                var writer = lines.line.raag.english;
            } else {
                var writer = lines.line.writer.english;
            }
            var html = '<a href="javascript:void(0)" onclick="getshabad(\'' + lines.line.shabadid + '\', \'' + lines.line.id + '\')" class="list-group-item">';
            html += '<h3 class="list-group-item-heading" style="font-family: GurbaniAkharThick; color: #ffffff;">' + lines.line.gurmukhi.akhar + '</h3>';
            html += '<p class="list-group-item-text"><small><b>' + lines.line.raag.english + ', ' + writer + ', ' + ang + ' ' + lines.line.pageno + source + '</b></small></p>';
            html += '</a>';
            $("#searchresults").append(html);
        });
        if (searchcount === 0) {
            var resultText = "No Page Found!";
        } else if (searchcount === 1) {
            var resultText = "Found 1 Line";
            $("#divShowMore").hide();
        } else {
            resultText = "Found " + searchcount + " Lines";
        }
        $("#searchinfo").text(resultText);
    });
}

function getshabad(shabadid, lineid) {
    $("#shabad").empty();
    localStorage.setItem("p.onoff.assakivaar", false);
    $.getJSON("https://api.gurbaninow.com/v2/shabad/" + shabadid, function(data) {
        localStorage.setItem("p.data.shabad", JSON.stringify(data));
        sid.minid = data.shabad[0].line.id;
        $.each(data.shabad, function(i, shabad) {
            sid.maxid = shabad.line.id;
            if (lineid === shabad.line.id) {
                $("#h" + shabadid).remove();
                $("#history").prepend('<a href="javascript:void(0)" id="h' + shabadid + '" onclick="getshabad(' + shabadid + ', ' + shabad.line.id + ')" class="list-group-item"><span style="font-size: large; font-family: \'GurbaniAkharThick\';">' + shabad.line.gurmukhi.akhar + '</span></a>');
                localStorage.setItem("p.data.lineid", shabad.line.id);
                active = " active";
                home = " home";
                icon = '<i class="fa fa-home" aria-hidden="true"></i> ';
            } else {
                active = "";
                home = "";
                icon = "";
            }
            html = '<a href="javascript:void(0)" id="s' + shabad.line.id + '" data-id="' + shabad.line.id + '" onclick="setline(' + shabad.line.id + ')" class="list-group-item' + active + home + '"><h3 class="list-group-item-heading" style="font-family: \'GurbaniAkharThick\'; color: #ffffff;">' + icon + shabad.line.gurmukhi.akhar + '</h3></a>';
            $("#shabad").append(html);
        });
        $("#shabad").scrollTo("#s" + lineid, 300);
    });
}

function assakivaar() {
    $("#shabad").empty();
    localStorage.setItem("p.onoff.assakivaar", true);
    $.getJSON("https://api.gurbaninow.com/dev/assakivaar", function(data) {
        localStorage.setItem("p.data.shabad", JSON.stringify(data));
        sid.minid = data.shabad[0].line.id;
        $.each(data.shabad, function(i, shabad) {
            sid.maxid = shabad.line.id;
            html = '<a href="javascript:void(0)" id="s' + shabad.line.id + '" data-id="' + shabad.line.id + '" onclick="setline(' + shabad.line.id + ')" class="list-group-item"><h3 class="list-group-item-heading" style="font-family: \'GurbaniAkharThick\'; color: #ffffff;">' + shabad.line.gurmukhi.akhar + '</h3></a>';
            $("#shabad").append(html);
        });
        if (localStorage.getItem("p.data.assakivaarid") != "1") {
            setline(localStorage.getItem("p.data.assakivaarid"));
        } else {
            $("#shabad").scrollTo("#s1", 300);
        }
    });
}

function setline(lineid) {
    localStorage.setItem("p.data.lineid", lineid);
    $(".list-group-item.active").removeClass("active");
    $("#s" + lineid).addClass("active");
    $("#shabad").scrollTo("#s" + lineid, 300);
    if (localStorage.getItem("p.onoff.assakivaar") === "true") {
        localStorage.setItem("p.data.assakivaarid", lineid);
    }
}

function homeline() {
    var lineid = $(".home").data("id");
    setline(lineid);
}

function searchsetmsg() {
    var typelist = $("select#searchtypeoption");
    var selectedvalue = $("option:selected", typelist).val();
    if (selectedvalue === "0" || selectedvalue === "2" || selectedvalue === "3") {
        document.getElementById("searchbox").setAttribute("style", "font-family: GurbaniAkharThick; font-size: 1.2em;");
        document.getElementById("searchbox").setAttribute("placeholder", "ਖੋਜ...");
    }
    if (selectedvalue === "3") {
        document.getElementById("searchbox").setAttribute("style", "");
        document.getElementById("searchbox").setAttribute("placeholder", "Search...");
    }
}
$(document).keyup(function(e) {
    if (e.which === 13) {
        document.activeElement.blur();
    }
    if (e.which === 38) {
        var lineid = localStorage.getItem("p.data.lineid");
        var newid = lineid - 1;
        if (newid < sid.minid) {
            setline(sid.minid);
        } else {
            setline(newid);
        }
    }
    if (e.which === 40) {
        var lineid = localStorage.getItem("p.data.lineid");
        var newid = lineid * 1 + 1;
        if (newid > sid.maxid) {
            setline(sid.maxid);
        } else {
            setline(newid);
        }
    }
    if (e.which === 37) {
        var lineid = localStorage.getItem("p.data.lineid");
        var newid = lineid - 1;
        if (newid < sid.minid) {
            setline(sid.minid);
        } else {
            setline(newid);
        }
    }
    if (e.which === 39) {
        var lineid = localStorage.getItem("p.data.lineid");
        var newid = lineid * 1 + 1;
        if (newid > sid.maxid) {
            setline(sid.maxid);
        } else {
            setline(newid);
        }
    }
    if (e.which === 32) {
        homeline();
    }
});

function showhide(className) {
    if ($("#" + className).is(":checked")) {
        localStorage.setItem("p.onoff." + className, "true");
        $("#" + className + "fontsize").show();
    } else {
        $("#" + className).removeAttr("checked");
        localStorage.setItem("p.onoff." + className, "false");
        $("#" + className + "fontsize").hide();
    }
}

function daynight() {
    if (localStorage.getItem("p.onoff.daynight") === "day") {
        localStorage.setItem("p.onoff.daynight", "night");
        $("#daynight").attr("checked", "true");
    } else {
        localStorage.setItem("p.onoff.daynight", "day");
        $("#daynight").attr("checked", "false");
    }
}