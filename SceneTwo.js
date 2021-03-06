
class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneTwo");
        this.pad = null;
    }
    init(data){
    }
    preload(){

        this.load.image('passage_bas','assets/01_decors/block_decors-assets/passage_zone_01.png')
        this.load.image('Ennemis','assets/images/Ennemi.png');
        this.load.image('Hearth','assets/images/Hearth.png');
        this.load.image('Empty_Hearth','assets/images/Empty_Hearth.png');
        this.load.image('Heal','assets/images/Heal.png');
        this.load.image('Sword','assets/images/Sword.png');
        this.load.image('Coffre','assets/images/Chest.png');
        this.load.image('georges_left','assets/spritesheet/georges_left.png');
        this.load.image('georges_right','assets/spritesheet/georges_right.png');
        this.load.image('georges_up','assets/spritesheet/georges_up.png');
        this.load.image('georges_down','assets/spritesheet/georges_down.png');
        this.load.image('Sword_slash_left','assets/spritesheet/Sword_slash_gauche.png');
        this.load.image('Sword_slash_right','assets/spritesheet/Sword_slash_droite.png');
        this.load.image('Sword_slash_up','assets/spritesheet/Sword_slash_haut.png');
        this.load.image('Sword_slash_down','assets/spritesheet/Sword_slash_bas.png');
        this.load.image('Plateformes','assets/images/george.png');//Load du perso et de son spritesheet
        this.load.image('PathAndObjects','assets/tilesets/platformPack_tilesheet.png');
        this.load.image('ui','assets/tilesets/platformPack_tilesheet.png');//Load du jeu de tuile de Tiles dans phaser
        this.load.image('SceneTwo','assets/tilemaps/level1.json');//load de la map à partir de Tiles
    create();{

        cursors = this.input.keyboard.createCursorKeys();
        
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0); //background affiché dans Phaser
        backgroundImage.setScale(2, 0.8);//Remise à l échelle du Background

        const map = this.make.tilemap({ key: 'map' });//ajout de la map dans Phaser, visible

        const tileset = map.addTilesetImage('kenney_simple_platformer', 'tiles');//Rendre les objets dans la map de Tiles Visible dans Phaser.

        const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);//ajout de la visibilité des plateformes dans Phaser
        
        this.add.image(0,0,'scene_01').setOrigin(0).setScrollFactor(0);
        passage_bas = this.physics.add.sprite(580, 700, 'passage_bas');

        bloquant.setCollisionByExclusion(-1, true);
        zone.setCollisionByExclusion(-1, true);

        player = this.physics.add.sprite(300, 300, 'player');

        _Hearth1 = this.add.sprite(50,50, 'Hearth');
        _Hearth2 = this.add.sprite(50,50, 'Hearth');
        _Hearth3 = this.add.sprite(50,50, 'Hearth');
        _Hearth4 = this.add.sprite(50,50, 'Hearth');
        _Hearth5 = this.add.sprite(50,50, 'Hearth');

        Empty_Hearth1 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        Empty_Hearth2 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        Empty_Hearth3 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        Empty_Hearth4 = this.add.sprite(50,50, 'Hearth').setvisible(false);
        Empty_Hearth5 = this.add.sprite(50,50, 'Hearth').setvisible(false);

        _Coin_icon = this.add.sprite(350,50,'coin').setScale(0.5);

        items = this.physics.add.group();

        ennemis = this.physics.add.group();

        coins = this.physics.add.group({
            setScrollFactor : 0
        });
        _Coins_account = this.add.text(370,540, _Bank,{fonySize: '35px', fill: '#FFFFFF'}).setScrollFactor(0);

        attack = this.physics.add.group();

        sword_icon = this.physics.add.sprite(50, 600, 'sword_icon');
        sword_icon.setScale(1.5);
        if (!attack_possible){
            sword_icon.setVisible(false);
        }
        sword_icon.setScrollFactor(0);

        this.physics.add.collider(player, bloquant);
        this.physics.add.overlap(player, zone, changementZone, null, this)

        this.cameras.main.startFollow(player);
        

        blockCentral = this.physics.add.staticGroup(); // Le personnage passe derrière //
        blockCentral_2 = this.physics.add.staticGroup(); // Le personnage passe devant //
        arbre = this.physics.add.staticGroup(); // arbre element de décor // 
        

       blockCentral.create(410,250,'blockCentral').setOrigin(0).setSize(250,20).setOffset(150,150);
        // ----- Player ----- //
        //Ajout du joueur et de ces Sprites
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(player,ennemis, hitOnPlayer,null,this);
        this.physics.add.collider(attack,ennemis,Tchak,null,this);
        this.physics.add.overlap(player, zone, changementZone, null,this);
        this.physics.add.overlap(player,coins, CollectMoulaga,null,this);
        this.physics.add.overlap(player,items, OpenChest,null,this);
        //Changement de scène au contact du blcok de changement 

        // Clavier
        keys = this.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            up : Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            space: Phaser.Input.Keyboard.KeyCodes.SPACE,
            shift: Phaser.Input.Keyboard.KeyCodes.SHIFT
        });
        
        //Manette
        if (this.input.gamepad.total === 0){
            this.input.gamepad.once('connected', function (pad, button, index) {
                paddle = pad;
                padConnected = true;
            }); 
        }
        else {
            paddle = this.input.gamepad.pad1;
        }
          
        for (const item of itemObjects){
            items.create(item.x, item.y, 'Coffre')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }
        for (const _Ennemi of itemObjects){
            _Ennemi.create(item.x, item.y, 'Ennemi')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }
        for (const Item_Heal of itemObjects){
            Item_Heal.create(item.x, item.y, 'Heal')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }
        for (const Item_Epee of itemObjects){
            Item_Epee.create(item.x, item.y, 'Sword')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }

        for (const passage_bas of itemObjects){
            passage_bas.create(item.x, item.y, 'Passage_Bas')
                .setPosition(item.x+32, item.y-32)
                .setScale(1)
        }
   

       
       blockCentral_2.create(420,250,'blockCentral_2').setOrigin(0).setSize(0,0).setOffset(150,150);

        this.physics.add.overlap(player,passage_bas, changementZone, null, this);
        this.physics.add.collider(player,blockCentral);
        
        function changementZone(player,zone){
            if (player.y >= 730 && player.x >= 400 && player.x <= 560){
                this.scene.start("sceneOne");
                console.log("changement");
                moving = false;

            }
            
        }

        function Tchak(){
            console.log("Tchak"),
            ennemis.destroy();
            newCoin = coin.create(ennemis.x, ennemis.y, 'Coin').setScale(0.5);
        };

        function CollectMoulaga(player,coin){
            if (_Collect){
                _Coins_account = _Coins_account +1;
                coin.destroy();
            }
        }

        function hitOnPlayer(player,ennemis){
            if( invincible == false){
                _Hp_player = _Hp_player -1;
                invincible = true;
                setTimeout(function(){invincible = false},900);
            }
        }

        //Ouverture Coffre
        function OpenChest(player,items){
            items.destroy();
            for (let i =1;i<11;i++){
                _Collect = false;
                setTimeout(function(){newCoin = coin.create(items.x, items.y,'coin').setScale(0.5)},i*300);
            }
            setTimeout(function(){_Collect = true},3400);
        }

        //Spell de soins
        function GetHealed(player,_Hp_player){
            if(_Heal_possible == true){
                _Hp_player = _Hp_player + 1;
                if (_Hp_player == 1){
                    _Empty_Hearth2.setVisible(false);
                    _Hearth2.setVisible(true);
                }
                else if (_Hp_player == 2){
                    _Empty_Hearth3.setVisible(false);
                    _Hearth3.setVisible(true);
                }
                else if (_Hp_player == 3){
                    _Empty_Hearth4.setVisible(false);
                    _Hearth4.setVisible(true);
                }
                else if (_Hp_player == 4){
                    _Empty_Hearth5.setVisible(false);
                    _Hearth5.setVisible(true);
                }

            }
        }
    };
    
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
            _Hp_player.GetHealed();
            setTimeout(function(){GetHealed() = 1}, 1500);
        }
        if (keys.shift.isUp && !paddle.B){
            _Healed = false;
        }
    }
    if (padConnected){
        if (keys.shift.isDown && !_Healed || paddle.B && !_Healed){
            _Hp_player.GetHealed();
            setTimeout(function(){GetHealed() = 1}, 1500);
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
        player.anims.play('george_right,true');
    }
    else if (keys.left.isDown){
        player.setVelocityX(-250);
        player.anims.play('george_left',true);
    }
    else if (keys.right.isUp && keys.left.isUp){
        player.setVelocityX(0);
    }
    else if (keys.up.isDown){
        player.setVelocityY(250);
        player.anims.play('george_up',true);
    }
    else if (keys.down.isDown){
        player.setVelocityY(-250);
        player.anims.play('george_down',true);
    }
    else if (keys.up.isUp && keys.down.isUp){
        player.setVelocityY(0);
}
}

//Contrôles Manette
if(padConnected){

if (paddle.right || keys.right.isDown){
    player.setVelocityX(250);
    player.anims.play('george_right',true);
}
else if (paddle.left || keys.left.isDown){
    player.setVelocityX(-250);
    player.anims.play('george_left',true);
}
else if ( !paddle.right && !paddle.left || keys.right.isUp && keys.left.isUp){
    player.setVelocityX(0);
}
else if (paddle.up || keys.up.isDown){
    player.setVelocityY(250);
    player.anims.play('george_up',true);
}
else if (paddle.down || keys.down.isDown){
    player.setVelocityY(-250);
    player.anims.play('george_down',true);
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
        player.anims.play('george_right',true);
    }
    else if (keys.left.isDown){
        player.setVelocityX(-250);
        player.anims.play('george_left',true);
    }
    else if (keys.right.isUp && keys.left.isUp){
        player.setVelocityX(0);
    }
    else if (keys.up.isDown){
        player.setVelocityY(250);
        player.anims.play('george_up',true);
    }
    else if (keys.down.isDown){
        player.setVelocityY(-250);
        player.anims.play('george_down',true);
    }
    else if (keys.up.isUp && keys.down.isUp){
        player.setVelocityY(0);
    }
    if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_right',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
    if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_left',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
    if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_up',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
    if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.up.isUp){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_down',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
}

//Contrôles manettes
if (padConnected){

    if(paddle.right || keys.right.isDown){
        player.setVelocityX(250);
        player.anims.play('george_right', true);
    }
    else if(paddle.left || keys.left.isDown){
        player.setVelocityX(-250);
        player.anims.play('george_left', true);
    }
    else if (!paddle.right && !paddle.left && keys.right.isUp && keys.left.isUp){
        player.setVelocity(0);
    }
    else if(paddle.up|| keys.up.isDown){
        player.setVelocityY(250);
        player.anims.play('george_up', true);
    }
    else if(paddle.down|| keys.down.isDown){
        player.setVelocityY(-250);
        player.anims.play('george_down', true);
    }
    else if (!paddle.up && !paddle.down && keys.up.isUp && keys.down.isUp){
        player.setVelocity(0);
    }

    if (keys.left.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down || paddle.left && paddle.A && keys.right.isUp && keys.up.isUp && keys.down.isUp && !paddle.right && !paddle.up && !paddle.down){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_left',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
    if (keys.right.isDown && keys.space.isDown && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down|| paddle.right && paddle.A && keys.left.isUp && keys.up.isUp && keys.down.isUp && !paddle.left && !paddle.up && !paddle.down){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_right',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
    if (keys.up.isDown && keys.space.isDown && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down || paddle.up && paddle.A && keys.right.isUp && keys.left.isUp && keys.down.isUp && !paddle.left && !paddle.right && !paddle.down){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_up',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
    if (keys.down.isDown && keys.space.isDown && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up || paddle.down && paddle.A && keys.right.isUp && keys.up.isUp && keys.left.isUp && !paddle.left && !paddle.right && !paddle.up){
        attack_possible = false;
        player.setvelocity(0);
        attaque(32,0);
        new_attack.anims.play('Sword_slash_down',true);
        setTimeout(function(){new_attack.destroy()},200);
        setTimeout(function(){attack_possible = true},200);
    }
}

}

//Mouvement ennemi
for (const ennemi of ennemis.children.entries){
    if(ennemis.body.blocked.right){
        ennemies.setVelocityX(-100);
    }
    else if (ennemis.body.blocked.left){
        ennemies.setVelocityX(100);
    }
    else if (moving == false){
        ennemies.setVelocityX(-100);
        moving = true;
    }
}
}//Fin Update
}//Fin Constructeur Scène 2
function attaque(x,y){
new_attack = attaque.create(player.x + x, player.y + y, 'attack')
}