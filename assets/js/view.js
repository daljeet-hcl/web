function update() {
	var data = $.parseJSON(localStorage.getItem('shabad'));
	var id = localStorage.getItem('lineid');
	if(localStorage.getItem('daynight') === 'night') {
		$("body").css('background-color', '#333');
		$("#gurmukhi").css('color', '#f1f1f1');
		$("#english").css('color', '#217DBB');
		$("#transliteration").css('color', '#afaeae');
		$("#punjabi").css('color', '#f1f1f1');
	} else {
		$("body").css('background-color', '#f1f1f1');
		$("#gurmukhi").css('color', '#333');
		$("#english").css('color', '#006799');
		$("#transliteration").css('color', '#868383');
		$("#punjabi").css('color', '#333');
	}
	$("#gurmukhi").css('font-size', localStorage.getItem('gurmukhipfontsize') + "vh");
	$("#english").css('font-size', localStorage.getItem('englishpfontsize') + "vh");
	$("#transliteration").css('font-size', localStorage.getItem('transliterationpfontsize') + "vh");
	$("#punjabi").css('font-size', localStorage.getItem('punjabipfontsize') + "vh");
	if (id == 'c') {
		$("#gurmukhi").html("");
		$("#transliteration").html("");
		$("#english").html("");
		$("#punjabi").html("");
	} else {
		$.each(data.shabad, function(i, shabad) {
			if(shabad.line.id == id) {
				if(localStorage.getItem('larivaarpon') == 'true') {
					var value = shabad.line.gurmukhi.akhar;
					$("#gurmukhi").html(value.split(' ').join('<wbr>'));
				} else {
					$("#gurmukhi").html(shabad.line.gurmukhi.akhar);
				}
				if (localStorage.getItem('transliterationpon') == 'true') {
					$("#transliteration").html(shabad.line.transliteration.english.text);
				} else {
					$("#transliteration").html("");
				}
				if (localStorage.getItem('englishpon') == 'true') {
					$("#english").html(shabad.line.translation.english.default);
				} else {
					$("#english").html("");
				}
				if (localStorage.getItem('punjabipon') == 'true') {
					$("#punjabi").html(shabad.line.translation.punjabi.default.akhar);
				} else {
					$("#punjabi").html("");
				}
			}
		});
	}
}
setInterval(update, 100);
update();