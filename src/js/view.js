function update() {
    var data = $.parseJSON(localStorage.getItem('p.data.shabad'));
    var id = localStorage.getItem('p.data.lineid');
    if (localStorage.getItem('p.onoff.daynight') === 'night') {
        $("body").css('background-color', '#333');
        $("#gurmukhi").css('color', '#f1f1f1');
        $("#english").css('color', '#4D97C8');
        $("#transliteration").css('color', '#BFBEBE');
        $("#punjabi").css('color', '#f1f1f1');
    } else {
        $("body").css('background-color', '#f1f1f1');
        $("#gurmukhi").css('color', '#333');
        $("#english").css('color', '#006799');
        $("#transliteration").css('color', '#868383');
        $("#punjabi").css('color', '#333');
    }
    $("#gurmukhi").css('font-size', localStorage.getItem('p.fontsize.gurmukhi') + "vh");
    $("#english").css('font-size', localStorage.getItem('p.fontsize.english') + "vh");
    $("#transliteration").css('font-size', localStorage.getItem('p.fontsize.transliteration') + "vh");
    $("#punjabi").css('font-size', localStorage.getItem('p.fontsize.punjabi') + "vh");
    if (id == 'c') {
        $("#gurmukhi").html("");
        $("#transliteration").html("");
        $("#english").html("");
        $("#punjabi").html("");
    } else {
        $.each(data.shabad, function(i, shabad) {
            if (shabad.line.id == id) {
                if (localStorage.getItem('p.onoff.larivaar') == 'true') {
                    var value = shabad.line.gurmukhi.akhar;
                    $("#gurmukhi").html(value.split(' ').join('<wbr>'));
                } else {
                    $("#gurmukhi").html(shabad.line.gurmukhi.akhar);
                }
                if (localStorage.getItem('p.onoff.transliteration') == 'true') {
                    $("#transliteration").html(shabad.line.transliteration.english.text);
                } else {
                    $("#transliteration").html("");
                }
                if (localStorage.getItem('p.onoff.english') == 'true') {
                    $("#english").html(shabad.line.translation.english.default);
                } else {
                    $("#english").html("");
                }
                if (localStorage.getItem('p.onoff.punjabi') == 'true') {
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