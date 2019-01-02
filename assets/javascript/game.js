$(document).ready(function(){


    // Create Fighter Objects Constructor
    function Fighter (name, imageName, hp, ap, cap, strength, weakness) {
        this.name = name;            // Figther Name
        this.imageName = imageName;    // Filename of image to use
        this.hp = hp;      // Hit Points (health)
        this.ap = ap;      // Attack Points
        this.cap = cap;    // Counter Attack Points
        this.strength = strength;       // description info
        this.weakness = weakness;      // description info 
        this.isSelected = false;      // set to true if P1 or CPU fighter
        this.isAttacked = false;      // if true will trigger a CounterAttack
    }

    // Creating Actual Fighters
    var kyloRen = new Fighter(
        'Kylo Ren',
        'kylo.jpg',
        150,
        5,
        10,
        'Sweet looking light saber',
        'Daddy issues'
    )

    var lukeSkywalker = new Fighter(
        'Luke Skywalker',
        'luke.jpg',
        200,
        6,
        12,
        'Had great mentors and "A Natural"' ,
        'Self-confidence'
    )

    var darthMaul = new Fighter(
        'Darth Maul',
        'maul.jpg',
        220,
        8,
        16,
        'Double-bladed light saber + Martial Arts' ,
        'Overconfidence and Jedi light sabers'
    )

    var quigon = new Fighter(
        'Qui-Gon Jinn',
        'quigon.jpg',
        180,
        5,
        10,
        'Ability to retain consciousness after death' ,
        'Combat Skills'
    )

    var stormTrooper = new Fighter(
        'Storm Trooper',
        'stormTrooper.jpg',
        100,
        1,
        0,
        'Travel in packs' ,
        'Blaster aim'
    )

    var darthVader = new Fighter(
        'Darth Vader',
        'vader.jpg',
        300,
        8,
        20,
        'Channeling of rage for manipulation of the Force' ,
        'Mommy issues'
    )

    var yoda = new Fighter(
        'Yoda',
        'yoda.jpg',
        300,
        3,
        10,
        'Mentoring young Jedi and wisdom' ,
        'Linguistically constructing sentences in "object-subject-verb"'
    )

    // End Creating Initial Fighters

    // Defining Variables
    var availableFighters = [kyloRen, lukeSkywalker, darthMaul, quigon, stormTrooper, darthVader, yoda];
    var usedFighters = [];
    var charSelectedImg = "";
    var charSelectedVal = "";
    var p1 = "";
    var cpu = "";


    // Get Elements in the DOM
    var $charContainerEl = $('#char-container');
    var $charContainerUsedEl = $('#char-container-used');
    var $playerSelectEl = $('#player-select-warn');


    // Game Activities

    function loadFighters(){
        $charContainerEl.text('');
        availableFighters.forEach(function(fighter) {
            console.log(fighter);
            $charContainerEl.append('<img class="chars-thumb chars-thumb-p1" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>');

        });
        usedFighters.forEach(function(fighter) {
            console.log(fighter);
            $charContainerUsedEl.append('<img class="chars-thumb" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>');
        });
    }

    function selectPlayer(charObj){
        console.log(charObj);
        charSelectedImg = charObj;
        charSelectedVal = charSelectedImg.attr("value");
        
        $('.chars-thumb').attr("class", 'chars-thumb');


        if (p1 === ""){    
            charSelectedImg.attr("class", 'chars-thumb chars-thumb-p1-clicked');
        }
        else{
            if (cpu === ""){
                charSelectedImg.attr("class", 'chars-thumb chars-thumb-cpu-clicked');

            }
            else{
                $playerSelectEl.text('Battle already in progress\n Complete the battle first');
                $playerSelectEl.attr("class",'warning');
            }
        }
    }

    function moveCharToUsedArray(playerSelected){
        for (var i = 0; i < availableFighters.length; i++){
            if (availableFighters[i].name === playerSelected){
                usedFighters.push(availableFighters[i]);
                var player = usedFighters[(usedFighters.length -1)];
                availableFighters.splice(i,1);   
                console.log(player.name + ' was removed from the Available Fighter array\n', availableFighters);
                console.log(player.name + ' was added to the Used Fighter Array\n', usedFighters);
            }
        }
        return player;
    }


// Load Game Environment
    loadFighters();
    // $charContainerUsedEl.hide();
    $('#bttn-cpu').hide();



// Listening to Click Events 

    $('.chars-thumb').click(function(){
        selectPlayer($(this));
    });

    $('#bttn-p1').click(function(){
        p1 = moveCharToUsedArray(charSelectedVal);
        $('.chars-thumb').attr("class", 'chars-thumb chars-thumb-cpu'); // switch hover to red since CPU select turn
        console.log('Player 1: ' + p1.name);
        charSelectedImg.hide();
        $('#bttn-p1').hide();
        $('#bttn-cpu').show();  // need to decide if only want to show one button at time

    });

    $('#bttn-cpu').click(function(){
        cpu = moveCharToUsedArray(charSelectedVal);
        loadFighters();
        $('.chars-thumb').attr("class", 'chars-thumb chars-thumb-cpu');  // switch hover to red since CPU select turn
        console.log('Current Selected: ' + charSelectedVal);
        console.log('CPU: ' + cpu.name);
        $('#bttn-cpu').hide();
    });





});    // Close document.ready statement
