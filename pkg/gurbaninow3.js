var NUMRESULTS = 20;
var baseUrl = window.location.hostname;
var translit = '';
$(document).ready(function() {
    if (localStorage.getItem('shabadGurmukhiEnabled') == null) {
        localStorage.setItem('shabadGurmukhiEnabled', 'true');
    }
    if (localStorage.getItem('shabadHindiEnabled') == null) {
        localStorage.setItem('shabadHindiEnabled', 'false');
    }
    if (localStorage.getItem('shabadRomanEnabled') == null) {
        localStorage.setItem('shabadRomanEnabled', 'false');
    }
    if (localStorage.getItem('shabadTransliterationEnabled') == null) {
        localStorage.setItem('shabadTransliterationEnabled', 'true');
    }
    if (localStorage.getItem('shabadEnglishEnabled') == null) {
        localStorage.setItem('shabadEnglishEnabled', 'true');
    }
    if (localStorage.getItem('shabadPunjabiEnabled') == null) {
        localStorage.setItem('shabadPunjabiEnabled', 'false');
    }
    if (localStorage.getItem('shabadNightDay') == null) {
        localStorage.setItem('shabadNightDay', 'false');
    }
    if (localStorage.getItem('shabadLarivaar') == null) {
        localStorage.setItem('shabadLarivaar', 'false');
    }
    if (localStorage.getItem('shabadInfo') == null) {
        localStorage.setItem('shabadInfo', 'true');
    }
    if (localStorage.getItem('shabadCenter') == null) {
        localStorage.setItem('shabadCenter', 'false');
    }
    if (localStorage.getItem('shabadhr') == null) {
        localStorage.setItem('shabadhr', 'true');
    }
    if (localStorage.getItem('font') == null) {
        localStorage.setItem('font', 'GurbaniAkharThickTrue');
    }
    if (localStorage.getItem('shabadGurmukhiSize') == null) {
        localStorage.setItem('shabadGurmukhiSize', $('.shabadGurmukhi').css('font-size'));
    }
    if (localStorage.getItem('shabadHindiSize') == null) {
        localStorage.setItem('shabadHindiSize', $('.shabadHindi').css('font-size'));
    }
    if (localStorage.getItem('shabadRomanSize') == null) {
        localStorage.setItem('shabadRomanSize', $('.shabadRoman').css('font-size'));
    }
    if (localStorage.getItem('shabadTransliterationSize') == null) {
        localStorage.setItem('shabadTransliterationSize', $('.shabadTransliteration').css('font-size'));
    }
    if (localStorage.getItem('shabadEnglishSize') == null) {
        localStorage.setItem('shabadEnglishSize', $('.shabadEnglish').css('font-size'));
    }
    if (localStorage.getItem('shabadPunjabiSize') == null) {
        localStorage.setItem('shabadPunjabiSize', $('.shabadPunjabi').css('font-size'));
    }
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() != 0) {
                $('#divScrollTop').fadeIn();
                $('#divScrollBottom').fadeIn();
            } else {
                $('#divScrollTop').fadeOut();
                $('#divScrollBottom').fadeOut();
            }
        });
        $('#divScrollTop').click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
        });
        $('#divScrollBottom').click(function() {
            $('body,html').animate({
                scrollTop: $(document).height()
            }, 800);
        });
    });
    var URLgetShabadId = location.href.split("shabadid=");
    if (URLgetShabadId[1] != null) {
        var URLgetShabadIdPart = URLgetShabadId[1];
        var URLSplitIndex = URLgetShabadIdPart.indexOf("&");
        if (URLSplitIndex > 0) URLgetShabadId = URLgetShabadIdPart.substring(0,
            URLSplitIndex);
        else URLgetShabadId = URLgetShabadId[1];
        var URLgetId = location.href.split("&id=");
        if (URLgetId[1] != null) {
            var URLgetIdPart = URLgetId[1];
            URLSplitIndex = URLgetIdPart.indexOf("#");
            if (URLSplitIndex > 0) URLgetId = URLgetIdPart.substring(0, URLSplitIndex);
            else URLgetId = URLgetId[1];
        } else {
            URLgetId = 0;
        }
        getShabad(URLgetShabadId, URLgetId);
    }
});

function searchtypChanged() {
	var typeOptionsSelectList = $('select#typeOptions');
	var selectedValue = $('option:selected', typeOptionsSelectList).val();
	if (selectedValue == '0' || selectedValue == '2' || selectedValue == '3') {
		document.getElementById('srchbox').setAttribute('style','font-family: HomescreenGurbani; font-size: 1.2em;');
		document.getElementById('srchbox').setAttribute('placeholder', 'ਖੋਜ...');
	}
	if (selectedValue == '3') {
		document.getElementById('srchbox').setAttribute('style','');
		document.getElementById('srchbox').setAttribute('placeholder', 'Search...');
	}
}

function toggleNightDay() {
    if ($("#nightDayChk").is(':checked')) {
        document.getElementById('pagestyle').setAttribute('href', 'pkg/assets/css/bootstrap.min.light.css');
        $("randomtagforcolorchange").css('color', '#000000');
        $("shaen").css('color', '#323232');
        localStorage.setItem('shabadNightDay', 'true');
    } else {
        document.getElementById('pagestyle').setAttribute('href', 'pkg/assets/css/bootstrap.min.dark.css');
        $("randomtagforcolorchange").css('color', '#FFFFFF');
        $("shaen").css('color', '#efefef');
        localStorage.setItem('shabadNightDay', 'false');
    }
}

function toggleFont(font) {
	document.getElementById('fontcss').setAttribute('href', 'pkg/fonts/' + font + '/font.css');
	localStorage.setItem('font', font);
}

function toggleLarivaar() {
    if (localStorage.getItem('shabadLarivaar') == 'false') {
        localStorage.setItem('shabadLarivaar', 'true');
		$(".shabadGurmukhi").each(function() {
			var value = $(this).text();
			$(this).html(value.split(' ').join('<wbr>'));
		});
    } else {
        localStorage.setItem('shabadLarivaar', 'false');
		$(".shabadGurmukhi").each(function() {
			var value = $(this).html();
			$(this).html(value.split('<wbr>').join(' '));
		});
    }
}

function toggleCenter() {
    if ($("#CentChk").is(':checked')) {
        localStorage.setItem('shabadCenter', 'true');
        location.reload();
    } else {
        localStorage.setItem('shabadCenter', 'false');
        location.reload();
    }
}

function toggleShabadInfo() {
    if ($("#ShInChk").is(':checked')) {
		localStorage.setItem('shabadInfo', 'true');
		$("#shabadinfodiv").show();
    } else {
		$("#ShInChk").removeAttr('checked');
		localStorage.setItem('shabadInfo', 'false');
		$("#shabadinfodiv").hide();
    }
}

function toggleLineSep() {
    if ($("#HrChk").is(':checked')) {
		$(".shabadhr").show();
        localStorage.setItem('shabadhr', 'true');
    } else {
		$("#HrChk").removeAttr('checked');
		$(".shabadhr").hide();
        localStorage.setItem('shabadhr', 'false');
    }
}

if (localStorage.getItem('shabadCenter') == "true") {
    var centdiv = '<center><div class="shabadResult" id="divShabadResult"></div></center>';
} else {
    var centdiv = '<div class="shabadResult" id="divShabadResult"></div>';
}

function showHide(divName, className) {
    if ($("#" + divName).is(':checked')) {
        $("." + className).show();
        $("#" + divName + "Font").show();
        localStorage.setItem(className + 'Enabled', 'true');
    } else {
        $("#" + divName).removeAttr('checked');
        $("." + className).hide();
        $("#" + divName + "Font").hide();
        localStorage.setItem(className + 'Enabled', 'false');
    }
}

function fontPlus(divName) {
    var currentFontSize = $('.' + divName).css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum * 1.2;
    $('.' + divName).css('font-size', newFontSize);
    localStorage.setItem(divName + 'Size', newFontSize);
    return false;
}

function fontMinus(divName) {
    var currentFontSize = $('.' + divName).css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum * 0.8;
    $('.' + divName).css('font-size', newFontSize);
    localStorage.setItem(divName + 'Size', newFontSize);
    return false;
}

function showResult(str, key, method, mode, recnum) {
    var source = $('#sourceOptions').val();
    var type = $('#typeOptions').val();
    var writer = $('#writerOptions').val();
    var raag = $('#raagOptions').val();
    var ang = $('#angSrch').val();
    if (str.length < 3 && (key == 8 || key == 48)) {
        $('#shabadDispNum').val('0');
    }
    if ((str.length < 3 && method == 1 && key != 13) || (method == 1 && str.length ==
            0) || (method == 1 && type == 3 && key != 13)) {
        return;
    }
    $('#divSearchResultInfo').empty();
    $('#divSearchResultInfo').append('Searching...');
    $.getJSON("https://api.gurbaninow.com/v1/?", {
        mode: mode,
        q: str,
        src: source,
        type: type,
        writer: writer,
        raag: raag,
        ang: ang,
        recnum: recnum,
        format: "json"
    }, function(data) {
        var resultText = " ";
        var raagEnglishOut = " ";
        var shabadCount = data.count;
        if (recnum == 0) {
            $('#divSearchResult').empty();
        }
        $.each(data.shabads, function(i, shabads) {
            var ang = '';
            var engout = '';
            if (shabads.shabad.SourceID == "G" || shabads.shabad.SourceID == "D" || shabads.shabad.SourceID == "A" || shabads.shabad.SourceID == "U") {
                ang = 'Panaa';
			} else {
                ang = 'Vaar';
            }
            if (shabads.shabad.SourceID == "G") {
                source = " (SGGS)";
            } else if (shabads.shabad.SourceID == "D") {
				source = " (Sri Dasam Granth)";
			} else {
                source = "";
            }
            if (shabads.shabad.WriterEnglish == "") {
                writerEngOut = shabads.shabad.RaagEnglish;
            } else {
                writerEngOut = shabads.shabad.WriterEnglish;
            }
            var html = "";
            var html = "";
            html = '<div class="list-group">';
            html += '<a href="?shabadid=' + shabads.shabad.ShabadID + '&id=' + shabads.shabad.ID + '" class="list-group-item">';
            html += '<h3 class="list-group-item-heading"><font face="HomescreenGurbani">' + shabads.shabad.Gurmukhi + '</font></h3>';
            html += '<p class="list-group-item-text">' + shabads.shabad.English + '</p>';
            html += '<p class="list-group-item-text"><small><b>' + shabads.shabad.RaagEnglish + ', ' + writerEngOut + ', ' + ang + ' ' + shabads.shabad.PageNo + source + '</b></small></p>';
            html += '</a>';
            html += '</div>';
            $('#divSearchResult').append(html);
        });
		$('#divShowMore').hide();
        if (shabadCount == 0) {
            resultText = "No Shabads Found. Please Check Your Input";
			$('#divShowMore').hide();
        } else if (shabadCount == 1) {
            resultText = "Your Search Returned 1 Shabad";
			$('#divShowMore').hide();
        } else if (mode == 3 || shabadCount <= NUMRESULTS) {
            resultText = "Your Search Returned " + shabadCount + " Shabads";
			$('#divShowMore').hide();
		} else {
			var dispNum = recnum + NUMRESULTS;
			if (dispNum >= shabadCount && dispNum > 0) {
				$('#divShowMore').hide();
				$('#shabadDispNum').val("X");
			} else {
				$('#divShowMore').show();
				$('#shabadDispNum').val(dispNum);
			}
            resultText = "Your Search Returned " + shabadCount + " Shabads";
        }
        $('#divSearchResultInfo').empty();
        $('#divSearchResultInfo').append(resultText);
    });
}

function getShabad(shabadNo, shabadId) {
    var printShabadInfo = true;
    var raagEnglishOut = " ";
    var active = "";
    $('#shabadNo').val(shabadNo);
    $('#divShabadInfoEn').hide();
	$('#divShabadInfoGur').hide();
	$('#shabadinfo').hide();
	$('#shabadcontrol').hide();
    $('#divShabad').show();
    $('#divLoading').show();
	$('#divShabadInfoEn').empty();
    $('#divShabadInfoGur').empty();
    $('#divShabadResult').empty();
	$('#backBtn').show();
	$('#shareBtn').show();
	$('#menuBtn').show();
    $('#searchdiv').hide();
    $.getJSON("https://api.gurbaninow.com/v1/?", {
        mode: "2",
        shabadNo: shabadNo,
        format: "json"
    }, function(data) {
        $.each(data.gurbani, function(i, gurbani) {
            var angen = '';
			var anggur = '';
            if (gurbani.shabad.SourceID == "G" || gurbani.shabad.SourceID == "D" || gurbani.shabad.SourceID == "A" || gurbani.shabad.SourceID == "U") {
                angen = 'Panaa';
				anggur = 'pMnw';
            } else {
                angen = 'Vaar';
				anggur = 'vwr';
            }
            if (gurbani.shabad.SourceID == "G") {
                raagEnglishOut = " (SGGS)";
				raagGurOut = " (sggs)";
            } else if (gurbani.shabad.SourceID == "D") {
                raagEnglishOut = " (Sri Dasam Granth)";
				raagGurOut = " (sRI dsm gRMQ)";	
			} else {
                raagEnglishOut = '';
				raagGurOut = '';
            }
            if (printShabadInfo) {
                htmlen = gurbani.shabad.RaagEnglish + ' - ' + gurbani.shabad.WriterEnglish + ' - ' + angen + ' ' + gurbani.shabad.PageNo + raagEnglishOut;
                htmlgur = gurbani.shabad.RaagGurmukhi + ' - ' + gurbani.shabad.WriterGurmukhi + ' - ' + anggur + ' ' + gurbani.shabad.PageNo + raagGurOut;
				$('#divShabadInfoEn').append(htmlen);
				$('#divShabadInfoGur').append(htmlgur);
                printShabadInfo = false;
            }
            if (shabadId == gurbani.shabad.ID) {
                active = ' text-info';
                document.title = gurbani.shabad.GurmukhiUni + ' - GurbaniNow';
                translit = gurbani.shabad.Transliteration;
                english = gurbani.shabad.English;
            } else {
                active = "";
            }
            html = '<div id="s' + gurbani.shabad.ID + '">';
            html += '<div class="shabadGurmukhi' + active + '">' + gurbani.shabad.Gurmukhi + '</div>';
            html += '<div class="shabadHindi">' + gurbani.shabad.Gurmukhi + '</div>';
			html += '<div class="shabadRoman">' + gurbani.shabad.Gurmukhi + '</div>';
            html += '<div class="shabadTransliteration">' + gurbani.shabad.Transliteration + '</div>';
            html += '<shaen><div class="shabadEnglish">' + gurbani.shabad.English + '</div></shaen>';
            html += '<shaen><div class="shabadPunjabi">' + gurbani.shabad.Punjabi + '</div></div></shaen>';
			html += '<div class="shabadhr"><hr></div>';
            if (gurbani.shabad.Transliteration == "") {
                $('.shabadTransliteration').hide();
            } else {
                $('.shabadTransliteration').show();
            }
            if (gurbani.shabad.English == "") {
                $('.shabadEnglish').hide();
            } else {
                $('.shabadEnglish').show();
            }
            if (gurbani.shabad.Punjabi == "") {
                $('.shabadPunjabi').hide();
            } else {
                $('.shabadPunjabi').show();
            }
            $('#divShabadResult').append(html);
        });
        $('.shabadGurmukhi').css('font-size', parseInt(localStorage.getItem(
            'shabadGurmukhiSize')));
        $('.shabadHindi').css('font-size', parseInt(localStorage.getItem(
            'shabadHindiSize')));
        $('.shabadRoman').css('font-size', parseInt(localStorage.getItem(
            'shabadRomanSize')));
        $('.shabadTransliteration').css('font-size', parseInt(localStorage.getItem(
            'shabadTransliterationSize')));
        $('.shabadEnglish').css('font-size', parseInt(localStorage.getItem(
            'shabadEnglishSize')));
        $('.shabadPunjabi').css('font-size', parseInt(localStorage.getItem(
            'shabadPunjabiSize')));
        if (localStorage.getItem('shabadGurmukhiEnabled') == 'true') {
            $('#gurmukhiChk').attr('checked', 'true');
        }
        showHide('gurmukhiChk', 'shabadGurmukhi');
        if (localStorage.getItem('shabadLarivaar') == 'true') {
			$(".shabadGurmukhi").each(function() {
				var value = $(this).text();
				$(this).html(value.split(' ').join('<wbr>'));
			}); 
        }
        if (localStorage.getItem('shabadHindiEnabled') == 'true') {
            $('#hindiChk').attr('checked', 'true');
        }
        showHide('hindiChk', 'shabadHindi');
        if (localStorage.getItem('shabadRomanEnabled') == 'true') {
            $('#romanChk').attr('checked', 'true');
        }
        showHide('romanChk', 'shabadRoman');
        if (localStorage.getItem('shabadTransliterationEnabled') == 'true') {
            $('#translitChk').attr('checked', 'true');
        }
        showHide('translitChk', 'shabadTransliteration');
        if (localStorage.getItem('shabadEnglishEnabled') == 'true') {
            $('#engTransChk').attr('checked', 'true');
        }
        showHide('engTransChk', 'shabadEnglish');
        if (localStorage.getItem('shabadPunjabiEnabled') == 'true') {
            $('#punjTransChk').attr('checked', 'true');
        }
        showHide('punjTransChk', 'shabadPunjabi');
        if (localStorage.getItem('shabadhr') == 'true') {
            $('#HrChk').attr('checked', 'true');
        }
        if (localStorage.getItem('shabadNightDay') == 'true') {
            $('#nightDayChk').attr('checked', 'true');
        }
        if (localStorage.getItem('shabadInfo') == 'true') {
            $('#ShInChk').attr('checked', 'true');
        }
        if (localStorage.getItem('shabadCenter') == 'true') {
            $('#CentChk').attr('checked', 'true');
        }
		if (localStorage.getItem('font') != 'GurbaniAkharThickTrue') {
			toggleFont(localStorage.getItem('font'));
		}
        toggleNightDay();
		toggleLineSep();
		toggleShabadInfo();
        $('#divLoading').hide();
		$('#shabadinfo').show();
		$('#shabadcontrol').show();
        $('#divShabadInfoGur').show();
		$('#divShabadInfoEn').show();
        if (shabadId > 0) scrollToDiv(shabadId);
    });
}

function scrollToDiv(shabadId) {
    var settings = jQuery.extend({
        speed: 1100
    }, settings);
    var destination = $('#s' + shabadId).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({
        scrollTop: destination
    }, settings.speed);
    return false;
}