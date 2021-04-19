var player;
var cursors;
var passage_bas;
var blockCentral;
var blockCentral_2;
var arbre;
class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
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

        this.physics.add.collider(player, bloquant);
        this.physics.add.overlap(player, zone, changementZone, null, this)
        

        blockCentral = this.physics.add.staticGroup(); // Le personnage passe derrière //
        blockCentral_2 = this.physics.add.staticGroup(); // Le personnage passe devant //
        arbre = this.physics.add.staticGroup(); // arbre element de décor // 
        

       blockCentral.create(410,250,'blockCentral').setOrigin(0).setSize(250,20).setOffset(150,150);
        // ----- Player ----- //
        //Ajout du joueur et de ces Sprites
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        //Changement de scène au contact du blcok de changement 
        this.physics.add.overlap(player,passage_bas, changementZone, null, this);

        

       
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
    }
    
    update(){
        if (cursors.right.isDown){
            player.setVelocityX(200);
        }
        else if (cursors.left.isDown){
            player.setVelocityX(-200);
        }
        else if (cursors.up.isDown){
            player.setVelocityY(-200);
        }
        else if (cursors.down.isDown){
            player.setVelocityY(200);
        }
        else{
            player.setVelocity(0);
        }
    }
}
