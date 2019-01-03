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
    var p1SelectedVal = "";
    var cpuSelectedVal = "";
    var p1 = "";
    var cpu = "";


    // Get Elements in the DOM
    var $charContainerEl = $('#char-container');
    var $charContainerUsedEl = $('#char-container-used');
    var $playerSelectEl = $('#player-select-warn');
    var $p1MatchupEl = $('#p1Matchup');
    var $cpuMatchupEl = $('#cpuMatchup');
    var $p1HpEl = $('#p1Hp');
    var $cpuHpEl = $('#cpuHp');

    // Game Activities

    function loadAvailFighters(){
        $charContainerEl.text('');
        availableFighters.forEach(function(fighter) {
            console.log(fighter);
            $charContainerEl.append('<img class="chars-thumb chars-thumb-p1" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>');

        });
    }

    function loadUsedFighters(){
        $charContainerUsedEl.text('');
        usedFighters.forEach(function(fighter) {
            console.log(fighter);
            // If fighter.name === p1.name  THEN make ID = #p1-charSelected  ELSE #cpu-charSelected
            if (fighter.name === p1.name){
                $charContainerUsedEl.append('<img id="p1-charSelected" class="chars-thumb" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>');
            }
            else if (fighter.name === cpu.name){
                $charContainerUsedEl.append('<img id="cpu-charSelected" class="chars-thumb" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>'); 
            }
            else {
                $charContainerUsedEl.append('<img class="chars-thumb cpu-defeated" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>'); 
            }
        });
    }

    function selectPlayer(charObj){
        console.log(charObj);
        $('.chars-thumb').attr("class", 'chars-thumb');

        if (p1 === ""){    
            charObj.attr("class", 'chars-thumb chars-thumb-p1-clicked');
            p1SelectedVal = charObj.attr("value");
            console.log("p1SelectedVal: " + p1SelectedVal);
        }
        else{
            if (cpu === ""){
                charObj.attr("class", 'chars-thumb chars-thumb-cpu-clicked');
                cpuSelectedVal = charObj.attr("value");
                console.log("cpuSelectedVal: " + cpuSelectedVal);
            }

        }

    }

    function moveCharToUsedArray(charSelected){
        for (var i = 0; i < availableFighters.length; i++){
            if (availableFighters[i].name === charSelected){
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
    loadAvailFighters();
    $charContainerUsedEl.hide();
    $('#bttn-cpu').hide();



// Listening to Click Events 

    $(document).on("click", '.chars-thumb', function(){
        if (p1 === "" || cpu === ""){
            selectPlayer($(this));
        }
        else{
            $playerSelectEl.text('Battle already in progress\n Complete the battle first');
            $playerSelectEl.attr("class",'warning');
        }
    });
    
    $(document).on("click", '#bttn-p1', function(){
        console.log("Player Button was clicked");
        p1 = moveCharToUsedArray(p1SelectedVal);
        $('.chars-thumb').attr("class", 'chars-thumb chars-thumb-cpu'); // switch hover to red since CPU select turn
        console.log('Player 1: ' + p1.name);
        loadAvailFighters();
        loadUsedFighters();
        $charContainerUsedEl.show();

        //load to the matchup area
        $p1MatchupEl.attr({
            "src": 'assets/images/' + p1.imageName,
            "alt": p1.name  
        });
        $p1HpEl.text(p1.hp);

        $('#bttn-p1').hide();
        $('#bttn-cpu').show();  // need to decide if only want to show one button at time
    });

    $(document).on("click", '#bttn-cpu', function(){
        console.log("CPU Button was clicked");
        cpu = moveCharToUsedArray(cpuSelectedVal);
        console.log('Current Selected: ' + cpuSelectedVal);
        console.log('CPU: ' + cpu.name);
        loadAvailFighters();
        loadUsedFighters();
        $('.chars-thumb').attr("class", 'chars-thumb');  // switch hover to red since CPU select turn
        $cpuMatchupEl.attr({
            "src": 'assets/images/' + cpu.imageName,
            "alt": cpu.name
        });
        $cpuHpEl.text(cpu.hp);


        $('#bttn-cpu').hide();
    });


});    // Close document.ready statement
