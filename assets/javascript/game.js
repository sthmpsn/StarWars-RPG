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
        this.isDefeated = false;      // if true will trigger a CounterAttack
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
    var p1NewAP = 0;  // holder for accumulative p1 AP  (XP gained)


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
                if (cpu.isDefeated !== true){
                    $charContainerUsedEl.append('<img id="cpu-charSelected" class="chars-thumb" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>'); 
                }
                else{
                    $charContainerUsedEl.append('<img id="cpu-charSelected" class="chars-thumb cpu-defeated" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>'); 
                }
            }
            else {
                $charContainerUsedEl.append('<img class="cpu-defeated" src="assets/images/' + fighter.imageName + '" value="' + fighter.name + '" alt="' + fighter.name + '" title=\'Name: ' + fighter.name + '&#013;HP: ' + fighter.hp + '&#013;Strength: ' + fighter.strength + '&#013;Weakness: ' + fighter.weakness +  '&#013;\'/>'); 
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

    function battleAction(charObj){
        if (charObj === p1){
            console.log("P1 AP Start " + p1NewAP," CPU HP before attack " + cpu.hp);            
            cpu.hp = cpu.hp - p1NewAP;
            p1NewAP += p1.ap;
            console.log("P1 AP increased to " + p1NewAP," CPU HP after attack " + cpu.hp);
            if (cpu.hp > 0){
                $cpuHpEl.text(cpu.hp);
                $('#battle-console').prepend('<span class="attackActivity"><span class="p1Name">' + p1.name + ' </span>attacked <span class="cpuName">' + cpu.name + ' </span>for </span><span class="damage">' + p1NewAP + ' damage</span><br>');
            }
            else{
                //cpu defeated
                cpu.isDefeated = true;
                $cpuHpEl.text(' X');
                $('#battle-console').prepend('<span class="attackActivity"><span class="p1Name">' + p1.name + ' </span>DEFEATED <span class="cpuName">' + cpu.name + ' </span><br>');
            }

        }
        else if (charObj === cpu){
            if (!(cpu.isDefeated)){
                console.log("CPU CAP Start " + cpu.cap," Player HP before counter attack " + p1.hp);            
                p1.hp -= cpu.cap;
                console.log("CPU CAP Stayed at " + cpu.cap," Player HP after attack " + p1.hp);
                if (charObj.name === "Storm Trooper"){
                    $('#battle-console').prepend('<span class="attackActivity"><span class="cpuName">' + cpu.name + ' </span>missed their blaster shot counter attack at <span class="p1Name">' + p1.name + ' </span>for </span><span class="damage">' + cpu.cap + ' damage</span><br>');
                }
                else{
                    $('#battle-console').prepend('<span class="attackActivity"><span class="cpuName">' + cpu.name + ' </span>counter attacked <span class="p1Name">' + p1.name + ' </span>for </span><span class="damage">' + cpu.cap + ' damage</span><br>');
                }
                if (p1.hp > 0){
                    $p1HpEl.text(p1.hp);  // Still alive
                }
                else{
                    p1.isDefeated = true;   // Dead and Game Over
                    $p1HpEl.text(' X');
                    $('#battle-console').prepend('<span class="attackActivity"><span class="cpuName">' + cpu.name + ' </span>DEFEATED <span class="p1Name">' + p1.name + ' </span><br>');
                    $('#shipsBox').hide();
                    $('#bttn-cpu').hide();
                    $('#bttn-replay').show();
                    $('#p1-charSelected, #p1Matchup').attr("class",'char-defeated');
                    // $playerSelectEl.text('You were defeated, GAME OVER\n Press "RESET" to play again');
                    // $playerSelectEl.attr("class",'warning');
                    $('#attackBttn').text("Game \n Over");
                    $('#attackBttn').attr("class",'gameOver');
                }

            }
            else{
                //defeated and ensure that damage is not done to P1 on this turn
                $('#bttn-cpu').show();  //to select a new opponent
                $('#shipsBox').hide();
                $('#cpu-charSelected, #cpuMatchup').attr("class",'char-defeated');
                cpu = "";
                loadUsedFighters();
                loadAvailFighters();
                $('.chars-thumb').attr("class", 'chars-thumb chars-thumb-cpu'); // switch hover to red since CPU select turn

            }
        }
    }




// Load Game Environment
    loadAvailFighters();
    $charContainerUsedEl.hide();
    $('#bttn-cpu').hide();
    $('#bttn-replay').hide();
    $('#shipsBox').hide();



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
        if ($('.chars-thumb-p1-clicked')[0] && p1 === ""){
            p1 = moveCharToUsedArray(p1SelectedVal);
            p1.isSelected = true;
            p1NewAP = p1.ap;

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
            $('#battle-console').prepend('<span class="attackActivity">Player 1 Chose <span class="p1Name">' + p1.name + ' </span></span><br>');
            $('.chars-thumb').attr("class", 'chars-thumb chars-thumb-cpu'); // switch hover to red since CPU select turn
        }
    });

    $(document).on("click", '#bttn-cpu', function(){
        console.log("CPU Button was clicked");
        cpu = moveCharToUsedArray(cpuSelectedVal);
        cpu.isSelected = true;   //use for later logic after defeated
        console.log('Current Selected: ' + cpuSelectedVal);
        console.log('CPU: ' + cpu.name);
        loadAvailFighters();
        loadUsedFighters();
        $('.chars-thumb').attr("class", 'chars-thumb'); 
        $cpuMatchupEl.attr({
            "src": 'assets/images/' + cpu.imageName,
            "alt": cpu.name
        });
        $cpuHpEl.text(cpu.hp);
        $('#bttn-cpu').hide();
        $('#shipsBox').show();
        $cpuMatchupEl.attr("class",'');  //clear grayscale if applied
        $('#battle-console').prepend('<span class="attackActivity"><span class="cpuName">' + cpu.name + ' </span>is your opponent</span><br>');
        if (availableFighters.length < 1){
            $charContainerEl.hide();
        }
    });

    $(document).on("click", '#attackBttn', function(){
        $playerSelectEl.hide();
        if (!(p1 === "" || cpu === "" || p1.isDefeated)){
            battleAction(p1);
            battleAction(cpu); 
        }
    });

    // Reload/Restart page when Game Over
    $('#bttn-replay').click(function(){
        location.reload();
    });



});    // Close document.ready statement
