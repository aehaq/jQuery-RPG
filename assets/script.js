// Constructor for characters
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

// When the page has loaded
$(document).ready(function() {
    // Render Characters to Char Select Function
    init();

    // When the player selects a character from the top of the screen
    $(document).on("click", ".select-char", function() {
        // Identify the attacker chosen
        let clickedElement = $(this)
        var name = clickedElement.attr("name")
        attacker = getObject(name);

        // create an array of available enemies
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
            enemyChoices.splice(enemyChoices.indexOf(defender), 1)

            // Resets and rerenders enemies available to select
            $("#enemy-select-area").html("")
            for (let i = 0; i < enemyChoices.length; i++) {
                let enemy = enemyChoices[i];
                renderChara(enemy, "defOption")
            }

            // Combat phase begins when there is both an attacker and defender available
            combatPhase = true;
        }
    })

    // When the attack button is clicked
    $('#attack-button').on("click", function() {
        // Attack button only functions if combatphase has begun
        if (combatPhase) {
            // Player Attacks the Defender, and their attack score raises
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
                
                // Defender counterattacks character
                attacker.hp -= defender.counter;

                //rerenders attacker
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
            element.addClass("select-char");
            element.addClass("btn-info");
            var destination = $('#chara-select-area');
            destination.append(element);
            break;
        case "defOption":
            element.addClass("select-defender")
            element.addClass("btn-info");
            var destination = $('#enemy-select-area');
            destination.append(element);
            break;
        case "attacker":
            element.addClass("attacker")
            element.addClass("btn btn-success");
            var destination = $('#attacker-area');
            destination.append(element);
            break;
        case "defender":
            element.addClass("defender")
            element.addClass("btn btn-warning");
            var destination = $('#defender-area');
            destination.append(element);
            break;
        default:
            break;
    }
}

// A function for retriving the character object by using their name.
function getObject(name) {
    for (let i = 0; i < allChars.length; i++) {
        if (allChars[i].name === name) {
            return allChars[i];
        }            
    }
}

function init() {
    // Resets characters and their roles
    var Lynn = new Character("Lynn", 100, 8, 8, 22);
    var Hector = new Character("Hector", 300, 2, 2, 12);
    var Eliwood = new Character("Eliwood", 120, 6, 6, 16);
    var Marth = new Character("Marth", 250, 4, 4, 14);
    allChars = [Hector, Lynn, Eliwood, Marth];
    enemyChoices = []
    attacker = undefined; 
    defender = undefined;

    // Makes sure combat phase is off
    combatPhase = false;

    //Empties enemy, attacker and defender div
    $('#attacker-area').html("")
    $('#defender-area').html("")
    $('#enemy-select-area').html("")

    //renders characters into character select div
    for(var i=0; i < allChars.length; i++) {
        renderChara(allChars[i], "atkOption")
    }
}