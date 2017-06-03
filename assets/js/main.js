$(document).ready(function(){
	$(".gurmukhi-keyboard button").click(function() {
		if ($(this).data("action")) {
			var action = $(this).data("action");
			if (action == 'bksp') {
				$("#searchbox").val(function() {
					return this.value.substring(0, this.value.length-1);
				});
				showresult($('#searchbox').val(), true);
			} else if (action == "close") {
				$(".gurmukhi-keyboard").hide();
			} else if (action == "search") {
				showresult($('#searchbox').val());
				$(".gurmukhi-keyboard").hide();
			} else if (action.includes('page')) {
				$(".gurmukhi-keyboard .page").hide();
				$("#gurmukhi-keyboard-" + action).show();
			}
		} else {
			var charinput = $(this).text();
			$("#searchbox").val(function() {
				return this.value + charinput;
			});
			showresult($('#searchbox').val(), true);
		}
	});
	if(/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$("#presenter").hide();
	}
});
	
function showresult(stru, ontype) {
	if(ontype == ""){
		var ontype = false;
	}
    if (stru.length == 0) {
		$('#searchinfo').text("Search Box is Empty!");
		$('#searchresults').empty();
        return false;
	} else if(stru.length < 3 && ontype == true) {
		return false;
    } else {
		var str = encodeURIComponent(stru);
		var source = $('#sourceoption').val();
		var type = $('#searchtypeoption').val();
		var writer = $('#writeroption').val();
		var raag = $('#raagoption').val();
		//var ang = $('#angsearch').val();
		$('#searchinfo').text("Searching...");
		$.getJSON("https://api.gurbaninow.com/v2/search/" + str + "?", {
			source: source,
			searchtype: type,
			writer: writer,
			raag: raag
		}, function(data) {
			var searchcount = data.count;
			if (searchcount == 0) {
				var resultText = "No Shabads Found! Please Check Your Input";
				$('#searchresults').empty();
			} else {
				$('#searchresults').empty();
				$.each(data.shabads, function(i, shabads) {
					if (shabads.shabad.source.id == "G") {
						var ang = 'Ang';
					} else if (shabads.shabad.source.id == "D" || shabads.shabad.source.id == "A" || shabads.shabad.source.id == "U") {
						var ang = 'Panaa';
					} else {
						var ang = 'Vaar';
					}
					if (shabads.shabad.source.id == "G") {
						var source = " (SGGS)";
					} else if (shabads.shabad.source.id == "D") {
						var source = " (Sri Dasam Granth)";
					} else {
						var source = "";
					}
					if(shabads.shabad.writer.english === "") {
						var writer = shabads.shabad.raag.english;
					} else {
						var writer = shabads.shabad.writer.english;
					}
					var html = "<div class=\"list-group\">";
					html += '<a href="/shabad/' + shabads.shabad.shabadid + '/' + shabads.shabad.id + '" class="list-group-item">';
					html += '<h3 class="list-group-item-heading" style="font-family: GurbaniAkharThick; color: #ffffff">' + shabads.shabad.gurmukhi.akhar + '</h3>';
					html += '<p class="list-group-item-text"><small>' + shabads.shabad.translation.english.default + '</small></p>';
					html += '<p class="list-group-item-text"><small><b>' + shabads.shabad.raag.english + ', ' + writer + ', ' + ang + ' ' + shabads.shabad.pageno + source + '</b></small></p>';
					html += '</a>';
					html += '</div>';
					$('#searchresults').append(html);
				});
				if (searchcount == 1) {
					var resultText = "Your Search Returned 1 Shabad";
				} else {
					var resultText = "Your Search Returned " + searchcount + " Shabads";
				}
			}
			$('#searchinfo').text(resultText);
		});
	}
}

function showang(angnum) {
	$('#searchresults').empty();
    $('#searchinfo').text('Searching...');
    $.getJSON("https://api.gurbaninow.com/v2/ang/" + angnum + "/" + $('#sourceoption').val(), "", function(data) {
        var searchcount = data.count;
        $.each(data.page, function(i, lines) {
			if (data.source.id == "G") {
				var ang = 'Ang';
			} else if (data.source.id == "D" || data.source.id == "A" || data.source.id == "U") {
				var ang = 'Panaa';
			} else {
				var ang = 'Vaar';
			}
			if (data.source.id == "G") {
				var source = " (SGGS)";
			} else if (data.source.id == "D") {
				var source = " (Sri Dasam Granth)";
			} else {
				var source = "";
			}
            if(lines.line.writer.english === "") {
				var writer = lines.line.raag.english;
			} else {
				var writer = lines.line.writer.english;
			}
			var html = "<div class=\"list-group\">";
            html += '<a href="/shabad/' + lines.line.shabadid + '/' + lines.line.id + '" class="list-group-item">';
            html += '<h3 class="list-group-item-heading" style="font-family: GurbaniAkharThick;">' + lines.line.gurmukhi.akhar + '</h3>';
			html += '<p class="list-group-item-text"><small>' + lines.line.translation.english.default + '</small></p>';
            html += '<p class="list-group-item-text"><small><b>' + lines.line.raag.english + ', ' + writer + ', ' + ang + ' ' + lines.line.pageno + source + '</b></small></p>';
            html += '</a>';
			html += '</div>';
            $('#searchresults').append(html);
        });
        if (searchcount == 0) {
            var resultText = "No Page Found! Please Check Your Input";
        } else if (searchcount == 1) {
            var resultText = "Your Search Returned 1 Line on Page " + angnum;
			$('#divShowMore').hide();
		} else {
            resultText = "Your Search Returned " + searchcount + " Lines on Page " + angnum;
        }
        $('#searchinfo').text(resultText);
    });
}

function searchtype() {
	var selectedvaluesource = $('option:selected', $('select#sourceoption')).val();
	var selectedvaluetype = $('option:selected', $('select#searchtypeoption')).val();
	if (selectedvaluesource == '') {
		var source = "All Scriptures";
	} else if (selectedvaluesource == 'G') {
		var source = "Sri Guru Granth Sahib";
	} else if (selectedvaluesource == 'D') {
		var source = "Sri Dasam Granth";
	} else if (selectedvaluesource == 'B') {
		var source = "Bhai Gurdas Ji Vaaran";
	} else if (selectedvaluesource == 'N') {
		var source = "Bhai Nand Lal Ji Guzals";
	} else if (selectedvaluesource == 'A') {
		var source = "Amrit Keertan";
	} else if (selectedvaluesource == 'U') {
		var source = "Uggardanti";
	}
	if (selectedvaluetype == '0') {
		var lang = "Gurmukhi";
		var type = "First Letter (Start)";
	} else if (selectedvaluetype == '1') {
		var lang = "Gurmukhi";
		var type = "First Letter (Anywhere)";
	} else if (selectedvaluetype == '2') {
		var lang = "Gurmukhi";
		var type = "Full Word";
	}  else if (selectedvaluetype == '3') {
		var lang = "English";
		var type = "Full Word";
	}
	$('#searchinfo').text("Search: " + lang + " - " + type + " - " + source);
}

function searchsetmsg() {
	var typelist = $('select#searchtypeoption');
	var selectedvalue = $('option:selected', typelist).val();
	if (selectedvalue == '0' || selectedvalue == '2' || selectedvalue == '3') {
		document.getElementById('searchbox').setAttribute('style', 'font-family: GurbaniAkharThick; font-size: 1.2em;');
		document.getElementById('searchbox').setAttribute('placeholder', 'ਖੋਜ...');
	}
	if (selectedvalue == '3') {
		document.getElementById('searchbox').setAttribute('style', '');
		document.getElementById('searchbox').setAttribute('placeholder', 'Search...');
	}
}

$(document).keyup(function(e) {
	if (e.which === 13) {
		document.activeElement.blur();
	}
});