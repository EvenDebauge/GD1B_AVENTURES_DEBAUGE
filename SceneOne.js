var player;
var ennemis;
var items;
var walls;
var keys;

var gamepad;
var paddle;
var padConnected;
var pad;

var _Hp_player = 5;
var invincible = false;
var _Hearth1;
var _Hearth2;
var _Hearth3;
var _Hearth4;
var _Hearth5;
var _Empty_Hearth1;
var _Empty_Hearth2;
var _Empty_Hearth3;
var _Empty_Hearth4;
var _Empty_Hearth5;

var attack;
var new_attack;
var attack_possible;
var sword = false;
var sword_icon;


var coin;
var newCoin;
var _Bank;
var _Coin_icon;
var _Coins_account = 0;
var _Collect;

var _Heal_icon;
var _Heal_possible;
var _Heal = 1;
var _Healed = false;

var newItem;
var new_Wall_1;
var new_Wall_2;
var new_Wall_3;
var new_Wall_4;
var new_Wall_5;
var green_tiles;

var move = false;
var pickup;

var start_x = 250;
var start_y = 250;



class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
        this.pad.null;
    }
    init(data){
    }
    preload(){

        this.load.image('passage_bas','assets/01_decors/block_decors-assets/passage_zone_01.png')
        this.load.image('tiles','assets/images/spikes.png');//load des piques en Assets
        this.load.image('tiles','assets/images/player.png','assets/images/kenny.player.json');//Load du perso et de son spritesheet
        this.load.image('tiles','assets/tilesets/platformPack_tilesheet.png');//Load du jeu de tuile de Tiles dans phaser
        this.load.image('map','assets/tilemaps/level1.json');//load de la map à partir de Tiles
    }
    create(){

        
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0); //background affiché dans Phaser
        backgroundImage.setScale(2, 0.8);//Remise à l échelle du Background

        const map = this.make.tilemap({ key: 'map' });//ajout de la map dans Phaser, visible

        const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');//Rendre les objets dans la map de Tiles Visible dans Phaser.

        const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);//ajout de la visibilité des plateformes dans Phaser
        
        this.add.image(0,0,'scene_01').setOrigin(0).setScrollFactor(0);
        passage_bas = this.physics.add.sprite(580, 700, 'passage_bas');

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true);

        //sprites d'anim joueur
        player = this.physics.add.sprite(300, 300, 'player');

        _Hearth1 = this.add.sprite(50,50, 'Hearth');
        _Hearth2 = this.add.sprite(50,50, 'Hearth');
        _Hearth3 = this.add.sprite(50,50, 'Hearth');
        _Hearth4 = this.add.sprite(50,50, 'Hearth');
        _Hearth5 = this.add.sprite(50,50, 'Hearth');
_
        _Empty_Hearth1 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        _Empty_Hearth2 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        _Empty_Hearth3 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        _Empty_Hearth4 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        _Empty_Hearth5 = this.add.sprite(50,50, 'Hearth').setvisible(false);

        _Coin_icon = this.add.sprite(350,50,'coin').setScale(0.5);
        _Coin_icon.setScrollFactor(0);
_
        _Coins_account = this.add.text(370,540, _Bank,{fonySize: '35px', fill: '#FFFFFF'}).setScrollFactor(0);

        attack = this.physics.add.group();

        sword_icon = this.physics.add.sprite(50, 600, 'sword_icon');
        sword_icon.setScale(1.5);
        if (!attack_possible){
            sword_icon.setVisible(false);
        }
        sword_icon.setVisible(false);

        _Heal_icon = this.physics.add.sprite(150,700, 'Heal');
        _Heal_icon.setScale(1.5);
        if (!_Heal_possible){
            _Heal_icon.setvisible(false);
        }
        _Heal_icon.setScrollFactor(0);

        //collisions .
        this.physics.add.collider(player, bloquant);
        this.physics.add.overlap(player, zone, changementZone, null, this)

        
        

        blockCentral = this.physics.add.staticGroup(); // Le personnage passe derrière //
        blockCentral_2 = this.physics.add.staticGroup(); // Le personnage passe devant //

       blockCentral.create(410,250,'blockCentral').setOrigin(0).setSize(250,20).setOffset(150,150);
        // ----- Player ----- //
        //Ajout du joueur et de ces Sprites
        this.player = this.physics.add.sprite(250, 250, 'player');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        //Changement de scène au contact du blcok de changement 
        this.physics.add.overlap(player,passage_bas, changementZone, null, this);
        this.cameras.main.startFollow(player);
        

       
       blockCentral_2.create(420,250,'blockCentral_2').setOrigin(0).setSize(0,0).setOffset(150,150);

        this.physics.add.overlap(player,passage_bas, changementZone, null, this);
        this.physics.add.collider(player,blockCentral);

        cursors = this.input.keyboard.createCursorKeys();
        
        function changementZone(){
            if (player.y >= 730 && player.x >= 400 && player.x <= 560){
                this.scene.start("sceneTwo");
                console.log("changement");
            }   
        }
        //animation Joueur
        this.anims.create({
            key:"right",
            frames: this.anim.generateFrameNumbers ('player',{start:1,end:1}),
            frameRate : 10,
            repeat: -1
        });
        this.anims.create({
            key:"left",
            frames: this.anim.generateFrameNumbers ('player',{start:2,end:2}),
            frameRate : 10,
            repeat: -1
        });
        this.anims.create({
            key:"up",
            frames: this.anim.generateFrameNumbers ('player',{start:0,end:0}),
            frameRate : 10,
            repeat: -1
        });
        this.anims.create({
            key:"down",
            frames: this.anim.generateFrameNumbers ('player',{start:3,end:3}),
            frameRate : 10,
            repeat: -1
        });

        this.anims.create({
            key:"attack_right",
            frames: this.anim.generateFrameNumbers ('player',{start:1,end:1}),
            frameRate : 10,
            repeat: -1
        });
        this.anims.create({
            key:"attack_left",
            frames: this.anim.generateFrameNumbers ('player',{start:2,end:2}),
            frameRate : 10,
            repeat: -1
        });
        this.anims.create({
            key:"attack_up",
            frames: this.anim.generateFrameNumbers ('player',{start:0,end:0}),
            frameRate : 10,
            repeat: -1
        });
        this.anims.create({
            key:"attack_down",
            frames: this.anim.generateFrameNumbers ('player',{start:3,end:3}),
            frameRate : 10,
            repeat: -1
        });

        //Commandes Clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });

        //Commandes Manettes
        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
            
    };
   
    update(){
        
        if (moving == true){
            moving = false; 
        }

        if (_Hp_player == 4){
            _Hearth5.setVisible(false);
            _Empty_Hearth5.setVisible(true);
        }
        else if (_Hp_player == 3){
            _Hearth5.setVisible(false);
            _Empty_Hearth5.setVisible(true);
            _Hearth4.setVisible(false);
            _Empty_Hearth4.setVisible(true);
        }
        else if (_Hp_player == 2){
            _Hearth5.setVisible(false);
            _Empty_Hearth5.setVisible(true);
            _Hearth4.setVisible(false);
            _Empty_Hearth4.setVisible(true);
            _Hearth3.setVisible(false);
            _Empty_Hearth3.setVisible(true);
        }
        else if (_Hp_player == 1){
            _Hearth5.setVisible(false);
            _Empty_Hearth5.setVisible(true);
            _Hearth4.setVisible(false);
            _Empty_Hearth4.setVisible(true);
            _Hearth3.setVisible(false);
            _Empty_Hearth3.setVisible(true);
            _Hearth2.setVisible(false);
            _Empty_Hearth2.setVisible(true);  
        }
        else if (_Hp_player == 0){
            _Hearth5.setVisible(false);
            _Empty_Hearth5.setVisible(true);
            _Hearth4.setVisible(false);
            _Empty_Hearth4.setVisible(true);
            _Hearth3.setVisible(false);
            _Empty_Hearth3.setVisible(true);
            _Hearth2.setVisible(false);
            _Empty_Hearth2.setVisible(true); 
            _Hearth1.setVisible(false);
            _Empty_Hearth1.setVisible(true);   
        }

        _Coins_account.setText(_Bank);
        if (_Heal_possible){
            if (padConnected){
                if (keys.shift.isDown && !_Healed || paddle.B && !_Healed){
                    _Healed = true;
                    _Heal = 5;
                    setTimeout(function(){_Heal = 1}, 500);
                }
                if (keys.shift.isUp && !paddle.B){
                    _Healed = false;
                }
            }
            if (padConnected){
                if (keys.shift.isDown && !_Healed || paddle.B && !_Healed){
                    _Healed = true;
                    _Heal = 5;
                    setTimeout(function(){_Heal = 1}, 500);
            }
            if (keys.shift.isUp){
                _Healed = false;
            }
        }
    };
    //Contrôles clavier
    if (!attack_possible){
        if (!padConnected){
            if (keys.right.isDown){
                player.setVelocityX(250);
                player.anims.play('right',true);
            }
            else if (keys.left.isDown){
                player.setVelocityX(-250);
                player.anims.play('left',true);
            }
            else if (keys.right.isUp && keys.left.isUp){
                player.setVelocityX(0);
            }
            else if (keys.up.isDown){
                player.setVelocityY(250);
                player.anims.play('up',true);
            }
            else if (keys.down.isDown){
                player.setVelocityY(-250);
                player.anims.play('down',true);
            }
            else if (keys.up.isUp && keys.down.isUp){
                player.setVelocityY(0);
        }
        }
    
    //Contrôles Manette
    if(padConnected){
        
        if (paddle.right || keys.right.isDown){
            player.setVelocityX(250);
            player.anims.play('right',true);
        }
        else if (paddle.left || keys.left.isDown){
            player.setVelocityX(-250);
            player.anims.play('left',true);
        }
        else if ( !paddle.right && !paddle.left || keys.right.isUp && keys.left.isUp){
            player.setVelocityX(0);
        }
        else if (paddle.up || keys.up.isDown){
            player.setVelocityY(250);
            player.anims.play('up',true);
        }
        else if (paddle.down || keys.down.isDown){
            player.setVelocityY(-250);
            player.anims.play('down',true);
        }
        else if ( !paddle.up && !paddle.down || keys.up.isUp && keys.down.isUp){
            player.setVelocityY(0);
        }
    }
    }
    if (attack_possible){

        //Contrôles Clavier
        if (!padConnected){
            if (keys.right.isDown){
                player.setVelocityX(250);
                player.anims.play('right',true);
            }
            else if (keys.left.isDown){
                player.setVelocityX(-250);
                player.anims.play('left',true);
            }
            else if (keys.right.isUp && keys.left.isUp){
                player.setVelocityX(0);
            }
            else if (keys.up.isDown){
                player.setVelocityY(250);
                player.anims.play('up',true);
            }
            else if (keys.down.isDown){
                player.setVelocityY(-250);
                player.anims.play('down',true);
            }
            else if (keys.up.isUp && keys.down.isUp){
                player.setVelocityY(0);
            }
            if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_right',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
            if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_left',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
            if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_up',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
            if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.up.isUp){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_down',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
        }

        //Contrôles manettes
        if (padConnected){

            if(paddle.right || keys.right.isDown){
                player.setVelocityX(250);
                player.anims.play('right', true);
            }
            else if(paddle.left || keys.left.isDown){
                player.setVelocityX(-250);
                player.anims.play('left', true);
            }
            else if (!paddle.right && !paddle.left && keys.right.isUp && keys.left.isUp){
                player.setVelocity(0);
            }
            else if(paddle.up|| keys.up.isDown){
                player.setVelocityY(250);
                player.anims.play('up', true);
            }
            else if(paddle.down|| keys.down.isDown){
                player.setVelocityY(-250);
                player.anims.play('down', true);
            }
            else if (!paddle.up && !paddle.down && keys.up.isUp && keys.down.isUp){
                player.setVelocity(0);
            }

            if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down || paddle.left && paddle.A && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_left',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
            if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down|| paddle.right && paddle.A && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_right',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
            if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down || paddle.up && paddle.A && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_up',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
            if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up || paddle.down && paddle.A && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up){
                attack_possible = false;
                player.setvelocity(0);
                attaque(32,0);
                new_attack.anims.play('attack_down',true);
                setTimeout(function(){new_attack.destroy()},200);
                setTimeout(function(){attack_possible = true},200);
            }
        }

    }
}//Fin Update
}//Fin Constructeur Scène 1
function attaque(x,y){
    new_attack = attaque.create(player.x + x, player.y + y, 'attack')
}
