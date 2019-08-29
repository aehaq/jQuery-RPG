var Hector = {
    name: "Hector",
    hp: 120,
    atk: 7,
    counter: 7
}
var Lynn = {
    name: "Lynn",
    hp: 80,
    atk: 12,
    counter: 12
}
var Eliwood = {
    name: "Eliwood",
    hp: 100,
    atk: 9,
    counter: 9
}

var choicesArray = [Hector, Lynn, Eliwood];

$(document).ready(function() {
    // Render Characters to Char Select Function
    for(var i=0; i < choicesArray.length; i++) {
        renderChara(choicesArray[i], "atkOption")
    }

    // $(document).on("click", ".select-char", function(event) {
        
    //     var choice = $(this);

    //     renderChara()

    // })



})

function renderChara(chara, type) {

    var element = $("<button>");
    element.attr('hp', chara.hp);
    element.attr('atk', chara.atk);
    element.attr('counter', chara.counter)
    element.attr('name', chara.name)
    element.html(`${chara.name} <br></br> HP: ${chara.hp}`)

    switch (type) {
        case "atkOption":
            element.addClass("select-char")
            var destination = $('#chara-select-area');
            destination.append(element);
            break;
        case "defOption":
        
            break;
        case "attacker":
        
            break;
        case "defender":
        
            break;
        default:
            break;
    }
}