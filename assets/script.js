function Character(name, hp, atk, baseAtk, counter) {
    this.name = name;
    this.hp = hp;
    this.atk = atk;
    this.baseAtk = baseAtk;
    this.counter = counter;
}
var enemyChoices = []
var attacker, defender;
var combatPhase = false;

$(document).ready(function() {
    // Render Characters to Char Select Function
    init();

    // When the player selects a character from the top of the screen
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

    // When the player selects a defender
    $(document).on("click", ".select-defender", function() {
        // Only run when not in combat phase
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

    $('#attack-button').on("click", function(event) {
        if (combatPhase) {

            defender.hp -= attacker.atk;
            attacker.atk += attacker.baseAtk;
            $('#defender-area').html("")
            
            if (defender.hp < 1) {
                // remove enemy and game state
                combatPhase = false;
                if (enemyChoices.length > 0) {
                    alert("ENEMY DEFEATED \n Choose your next opponent")
                } else {
                    alert("CONGRATULATIONS \n All enemies have been vanquished")
                    $('#attacker-area').html("")
                    init()
                }
                
            } else {
                // Render Defender with new HP
                renderChara(defender, "defender");
                
                attacker.hp -= defender.counter;
                $('#attacker-area').html("")
                renderChara(attacker, "attacker");

                if (attacker.hp < 1) {
                    $('#attacker-area').html("")
                    alert("GAME OVER")
                    $('#defender-area').html("")
                    init()
                }
            }
        }
    })

})

function renderChara(chara, type) {

    var element = $("<button>");
    element.attr('hp', chara.hp);
    element.attr('atk', chara.atk);
    element.attr('baseAtk', chara.baseAtk);
    element.attr('counter', chara.counter);
    element.attr('name', chara.name);
    element.html(`${chara.name} <br></br> HP: ${chara.hp}`);

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

function init() {
    var Lynn = new Character("Lynn", 100, 8, 8, 22);
    var Hector = new Character("Hector", 300, 2, 2, 12);
    var Eliwood = new Character("Eliwood", 120, 6, 6, 16);
    var Marth = new Character("Marth", 250, 4, 4, 14);
    allChars = [Hector, Lynn, Eliwood, Marth];
    enemyChoices = []
    attacker = undefined; 
    defender = undefined;
    combatPhase = false;
    for(var i=0; i < allChars.length; i++) {
        renderChara(allChars[i], "atkOption")
    }
}