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
    var charSelectedImg = "";
    var charSelectedVal = "";
    var p1 = "";
    var cpu = "";


    // Get Elements in the DOM
    var $charContainerEl = $('#char-container');



    // Game Activities

    function loadFighters(){
        availableFighters.forEach(function(fighter) {
            console.log(fighter);
            $charContainerEl.append('<img class="chars-thumb" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>');
        });
    }

    function selectPlayer(charObj){
        console.log(charObj);
        $('.chars-thumb').attr("class", 'chars-thumb');
        if (p1 === ""){    
            charObj.attr("class", 'chars-thumb chars-thumb-p1-chosen');
            }
        else{
            charObj.attr("class", 'chars-thumb chars-thumb-cpu-selected');
        }
        charSelectedImg = charObj;
        charSelectedVal = charSelectedImg.attr("value");
    }

    function findPlayerInArray(playerSelected){
        for (var i = 0; i < availableFighters.length; i++){
            if (availableFighters[i].name === playerSelected){
                var player = availableFighters[i];
            }
        }
        return player;
    }


// Load Game Environment
    loadFighters();




// Listening to Click Events 

    $('.chars-thumb').click(function(){
        selectPlayer($(this));
    });

    $('#bttn-p1').click(function(){
        console.log('Current Selected: ' + charSelectedVal);
        p1 = findPlayerInArray(charSelectedVal);
        console.log('Player 1: ' + p1.name);
        $('.chars-thumb').attr("class", 'chars-thumb chars-thumb-cpu');
        charSelectedImg.attr("class", 'chars-thumb');
        charSelectedImg.attr("id", 'char-thumb-p1-selected');
        $('#bttn-p1').hide();
        $('#bttn-cpu').show();  // need to decide if only want to show one button at time
    });

    $('#bttn-cpu').click(function(){
        console.log('Current Selected: ' + charSelectedVal);
        cpu = findPlayerInArray(charSelectedVal);
        console.log('CPU: ' + cpu.name);

    });




});    // Close document.ready statement
