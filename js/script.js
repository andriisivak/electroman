var game = new Phaser.Game(624, 384, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var map, layerBg, layerWalls, em, cursors, jumpButton;
var facing = 'left';
var jumpTimer = 0;

function preload() {
  game.load.tilemap('level1', '../tilemap/em-tilemap.json', null,
    Phaser.Tilemap.TILED_JSON);
    game.load.image('PLAN1', '../img/PLAN1.png');
    game.load.image('PLAN2', '../img/PLAN2.png');
    game.load.image('PLAN3', '../img/PLAN3.png');
    game.load.image('PLAN4', '../img/PLAN4.png');
    game.load.spritesheet('em', '../img/EM.png', 48, 84);
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#000';

  map = game.add.tilemap('level1');
  map.addTilesetImage('PLAN1');
  
  // main background layer  
  layerBg = map.createLayer('Background');
  game.physics.enable(layerBg, Phaser.Physics.ARCADE);
  layerBg.resizeWorld();

  // walls layer
  layerWalls = map.createLayer('Walls');
  game.physics.enable(layerWalls, Phaser.Physics.ARCADE);
  layerWalls.resizeWorld();

  game.physics.arcade.gravity.y = 300;
  
  // electroman
  em = game.add.sprite(100, 200, 'em');
  game.physics.enable(em, Phaser.Physics.ARCADE);

  em.body.collideWorldBounds = true;

  em.animations.add('left', [0], 10, true);
  em.animations.add('turn', [0], 20, true);
  em.animations.add('right', [0], 10, true);

  game.camera.follow(em);
  
  map.setCollisionBetween(em, layerWalls);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(em, layerWalls);

  em.body.velocity.x = 0;

  if (cursors.left.isDown) {
    em.body.velocity.x = -150;
    if (facing != 'left') {
      em.animations.play('left');
      facing = 'left';
    }
  } else if (cursors.right.isDown) {
      em.body.velocity.x = 150;
      if (facing != 'right') {
        em.animations.play('right');
        facing = 'right';
      }
  } else {
    if (facing != 'idle') {
      em.animations.stop();
      if (facing == 'left') {
        em.frame = 0;
      } else {
        em.frame = 0;
      }
      facing = 'idle';
    }
  }

  if (cursors.up.isDown && em.body.onFloor() && game.time.now > jumpTimer) {
    em.body.velocity.y = -200;
    jumpTimer = game.time.now + 750;
  }
}
