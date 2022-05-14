let config= {
    type: Phaser.AUTO,
    scale: {
         width:innerWidth-15,
         height: innerHeight-15
    },
    backgroundColor: '#049cd8',
    physics: {
         default: 'arcade',
          arcade: {
               gravity: {
                     y: 100,
               },
          }
    },
    scene: {
         preload, create, update
    }
}

let game = new Phaser.Game(config);

let PipUpClass = new Phaser.Class({
     Extends: Phaser.GameObjects.Image,
     initialize: function PipUpClass(scene){
          Phaser.GameObjects.Image.call(this, scene, 0, 0, "pipUp");
     }
})

let PipDownClass = new Phaser.Class({
     Extends: Phaser.GameObjects.Image,
     initialize: function PipDownClass(scene){
          Phaser.GameObjects.Image.call(this, scene, 0, 0, "pipDown");
     }
})

function preload(){
     this.load.image("pipUp","assets/pipUp.png");
     this.load.image("pipDown","assets/pipDown.png");
     this.load.spritesheet("bird","assets/birds.png", {
          frameWidth: 175, frameHeight: 150,

     })
}

function create(){
     this.cursor = this.input.keyboard.createCursorKeys();
     this.pipUp = this.physics.add.group({
          classType: PipUpClass,
          runChildUpdate: true,
          allowGravity: false
     })

     this.pipDown = this.physics.add.group({
          classType: PipDownClass,
          runChildUpdate: true,
          allowGravity: false 
     })



     this.bird = this.physics.add.sprite(100,game.config.height/2,"bird", 0);
     this.anims.create({
          key: "fly",
          frames: this.anims.generateFrameNumbers("bird", {
               start: 0, end: 4 
          }),
          frameRate: 15,
          repeat: -1
     })

     this.physics.add.collider(this.bird, this.pipUp, birdDie);
     this.physics.add.collider(this.bird, this.pipDown, birdDie);
}

let posX = 1000
function update(time){
     if(time%9 == 0){
          if(time % 6 == 0){
          this.pipeU = this.pipUp.get().setActive(true).setVisible(true).setPosition(posX + 100, 10).setScale(1.5);
          this.pipeD = this.pipDown.get().setActive(true).setVisible(true).setPosition(posX + 100, game.config.height).setScale(1.5);
          }else{
               this.pipeU = this.pipUp.get().setActive(true).setVisible(true).setPosition(posX + 100, 40).setScale(1.5);
               this.pipeD = this.pipDown.get().setActive(true).setVisible(true).setPosition(posX + 100, game.config.height + 40).setScale(1.5);
          }
          this.pipUp.setVelocityX(-200);
          this.pipDown.setVelocityX(-200);
          posX += 100
     }





          this.bird.anims.play("fly", true);
          if(this.cursor.up.isDown){
               this.bird.setVelocityY(-100)
          }else{
               this.bird.setVelocityY(200)
          }
}


function birdDie(b){
     b.active = false;
     b.disableBody(true, true);
     
     this.scene.start("gameOver");
}

