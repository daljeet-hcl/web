$(document).ready(function() {
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
    gethukam();
});

function toggleday() {
    if ($("#daytoggle").is(":checked")) {
        document.getElementById("pagestyle").setAttribute("href", "https://gurbaninow.com/assets/css/bootstrap.min.light.css/3.3.7.5/css.css");
        localStorage.setItem("s.onoff.day", "true");
    } else {
        document.getElementById("pagestyle").setAttribute("href", "https://gurbaninow.com/assets/css/bootstrap.min.dark.css/3.3.7.5/css.css");
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
}

function showhide(divName, className) {
    if ($("#" + divName).is(":checked")) {
        $("." + className).show();
        $("#" + className + "fontsize").show();
        localStorage.setItem("s.onoff." + className, "true");
    } else {
        $("#" + divName).removeAttr("checked");
        $("." + className).hide();
        $("#" + className + "fontsize").hide();
        localStorage.setItem("s.onoff." + className, "false");
    }
}

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

function gethukam() {
    $("#shabadinfo").hide();
    $("#shabad").hide();
    $("#shabadcontrol").hide();
    $("#loading").show();
    $("#shabad").empty();
    $("#shabadinfogurmukhi").empty();
    $("#shabadinfoenglish").empty();
    $.getJSON("https://api.gurbaninow.com/v2/hukamnama/today", function(data) {
        $('#shabadid').data('shabadid', data.hukamnamainfo.shabadid);
        $('#hukaminfo').html(data.date.gregorian.day + ", " + data.date.gregorian.month + " " + data.date.gregorian.date + ", " + data.date.gregorian.year);
        if (data.hukamnamainfo.source.id == "G") {
            angen = "Ang";
            anggur = "ਅੰਗ";
        } else if (data.hukamnamainfo.source.id == "D" || data.hukamnamainfo.source.id == "A" || data.hukamnamainfo.source.id == "U") {
            angen = "Panaa";
            anggur = "ਪੰਨਾ";
        } else {
            angen = "Vaar";
            anggur = "ਵਾਰ";
        }
        if (data.hukamnamainfo.source.id == "G") {
            raagEnglishOut = " (Sri Guru Granth Sahib Ji)";
            raagGurOut = " (ਸ੍ਰੀ ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ ਜੀ)";
        } else if (data.hukamnamainfo.source.id == "D") {
            raagEnglishOut = " (Sri Dasam Granth)";
            raagGurOut = " (ਸ੍ਰੀ ਦਸਮ ਗ੍ਰੰਥ)";
        } else {
            raagEnglishOut = "";
            raagGurOut = "";
        }
        var pageno = "" + data.hukamnamainfo.pageno;
        var unipagenum = pageno.replace(/0/g, "੦").replace(/1/g, "੧").replace(/2/g, "੨").replace(/3/g, "੩").replace(/4/g, "੪").replace(/5/g, "੫").replace(/6/g, "੬").replace(/7/g, "੭").replace(/8/g, "੮").replace(/9/g, "੯");
        htmlen = data.hukamnamainfo.raag.english + " - " + data.hukamnamainfo.writer.english + " - " + '<a href="/page/' + data.hukamnamainfo.pageno + "/" + data.hukamnamainfo.source.id + '">' + angen + " " + data.hukamnamainfo.pageno + "</a>" + raagEnglishOut;
        htmlgur = data.hukamnamainfo.raag.unicode + " - " + data.hukamnamainfo.writer.unicode + " - " + '<a href="/page/' + data.hukamnamainfo.pageno + "/" + data.hukamnamainfo.source.id + '">' + anggur + " " + unipagenum + "</a>" + raagGurOut;
        $("#shabadinfoenglish").append(htmlen);
        $("#shabadinfogurmukhi").append(htmlgur);
        $.each(data.hukamnama, function(i, shabad) {
            var akharsplit = shabad.line.gurmukhi.akhar.split(" ");
            var unisplit = shabad.line.gurmukhi.unicode.split(" ");
            var splitakharlength = akharsplit.length;
            var splitunicodelength = unisplit.length;
            html = '<div class="sline" id="s' + shabad.line.id + '">';
            html += '<div class="gurmukhi akhar normal" style="font-family: GurbaniAkharThick;">' + shabad.line.gurmukhi.akhar + "</div>";
            html += '<div class="gurmukhi unicode normal" style="font-family: AnmolBaniBold; display: none;">' + shabad.line.gurmukhi.unicode + "</div>";
            html += '<div class="gurmukhi akhar assist" style="font-family: GurbaniAkharThick; display: none;">';
            for (var i = 0; i < splitakharlength; i++) {
                html += "<span>" + akharsplit[i] + "</span><wbr>";
            }
            html += "</div>";
            html += '<div class="gurmukhi unicode assist" style="font-family: AnmolBaniBold; display: none;">';
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
        $(".gurmukhi").css("font-size", parseInt(localStorage.getItem("s.fontsize.gurmukhi")));
        $(".hindi").css("font-size", parseInt(localStorage.getItem("s.fontsize.hindi")));
        $(".transliteration").css("font-size", parseInt(localStorage.getItem("s.fontsize.transliteration")));
        $(".english").css("font-size", parseInt(localStorage.getItem("s.fontsize.english")));
        $(".punjabi").css("font-size", parseInt(localStorage.getItem("s.fontsize.punjabi")));
        if (localStorage.getItem("s.onoff.larivaar") == "true") {
            $(".gurmukhi.normal").each(function() {
                var value = $(this).text();
                $(this).html(value.split(" ").join("<wbr>"));
            });
            $("#assist").html('<a href="javascript:void(0)" onclick="togglelarivaarassist();">LarivaarAssist&nbsp;&nbsp;<i class="fa fa-life-ring fa-fw" aria-hidden="true"></i></a>');
            $("#larivaarbtn").addClass("active");
        }
        if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
            $(".normal").hide();
            if (localStorage.getItem("s.onoff.unicode") == "true") {
                $(".unicode.assist").show();
            } else {
                $(".akhar.assist").show();
            }
            $("#assist").addClass("active");
        }
        if (localStorage.getItem("s.onoff.hindi") == "true") {
            $("#hinditoggle").attr("checked", "true");
        }
        showhide("hinditoggle", "hindi");
        if (localStorage.getItem("s.onoff.transliteration") == "true") {
            $("#transliterationtoggle").attr("checked", "true");
        }
        showhide("transliterationtoggle", "transliteration");
        if (localStorage.getItem("s.onoff.english") == "true") {
            $("#englishtranslationtoggle").attr("checked", "true");
        }
        showhide("englishtranslationtoggle", "english");
        if (localStorage.getItem("s.onoff.punjabi") == "true") {
            $("#punjabitranslationtoggle").attr("checked", "true");
        }
        showhide("punjabitranslationtoggle", "punjabi");
        if (localStorage.getItem("s.onoff.day") == "true") {
            $("#daytoggle").attr("checked", "true");
        }
        if (localStorage.getItem("s.onoff.shabadinfo") == "true") {
            $("#shabadinfotoggle").attr("checked", "true");
        }
        if (localStorage.getItem("s.onoff.center") == "true") {
            $("#centertoggle").attr("checked", "true");
        }
        if (localStorage.getItem("s.onoff.unicode") == "true") {
            if (localStorage.getItem("s.onoff.larivaarassist") == "true") {
                $(".akhar.assist").hide();
                $(".unicode.assist").show();
            } else {
                $(".akhar.normal").hide();
                $(".unicode.normal").show();
            }
            $("#unicodebutton").html('Unicode&nbsp;&nbsp;<span class="fa fa-fw">ਸ</span>');
            $("#unicodebtn").addClass("active");
        }
        if (localStorage.getItem("s.data.font") != "GurbaniAkharThick") {
            togglefont(localStorage.getItem("s.data.font"));
        }
        toggleday();
        toggleshabadinfo();
        togglecenter();
        $("#loading").hide();
        $("#shabadinfo").show("slow");
        $("#shabad").show("slow");
    });
}

function showformatbox() {
    if ($("#shabadformat").is(":visible")) {
        $("#shabadformat").hide("slow");
    } else {
        $("#shabadformat").show("slow");
    }
}