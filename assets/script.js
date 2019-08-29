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

var allChars = [Hector, Lynn, Eliwood];
var enemyChoices = []
var attacker, defender;
var combatPhase = false;

$(document).ready(function() {
    // Render Characters to Char Select Function
    for(var i=0; i < allChars.length; i++) {
        renderChara(allChars[i], "atkOption")
    }

    $(document).on("click", ".select-char", function() {
        let clickedElement = $(this)
        var name = clickedElement.attr("name")
        attacker = getObject(name);

        for (var i=0; i< allChars.length; i++) {
            let character = allChars[i];
            if (character != attacker) {
                enemyChoices.push(character);
            }
        }

        renderChara(attacker, "attacker");

        for (let i = 0; i < enemyChoices.length; i++) {
            let enemy = enemyChoices[i];
            renderChara(enemy, "defOption")
        }

        $("#chara-select-area").html("")
    })

    $(document).on("click", ".select-defender", function() {
        if (!combatPhase) {
            
            let clickedElement = $(this)
            var name = clickedElement.attr("name");
            defender = getObject(name);

            renderChara(defender, "defender")
            // Remove defender from enemies
            console.log(enemyChoices)
            enemyChoices.splice(enemyChoices.indexOf(defender), 1)
            console.log(enemyChoices)
            // Rerender Enemies array

            $("#enemy-select-area").html("")

            for (let i = 0; i < enemyChoices.length; i++) {
                let enemy = enemyChoices[i];
                renderChara(enemy, "defOption")
            }

            combatPhase = true;
        }
    })

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
            element.addClass("select-defender")
            var destination = $('#enemy-select-area');
            destination.append(element);
            break;
        case "attacker":
            element.addClass("attacker")
            var destination = $('#attacker-area');
            destination.append(element);
            break;
        case "defender":
            element.addClass("defender")
            var destination = $('#defender-area');
            destination.append(element);
            break;
        default:
            break;
    }
}


function getObject(name) {
    for (let i = 0; i < allChars.length; i++) {
        if (allChars[i].name === name) {
            return allChars[i];
        }            
    }
}