var game = new Phaser.Game(624, 384, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var em, bg, layerBg, walls, layerWalls, cursors, jumpButton;
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

  // main background layer
  bg = game.add.tilemap('level1');
  bg.addTilesetImage('PLAN1');
  layerBg = bg.createLayer('Background');
  // layerBg.resizeWorld();

  // walls layer
  walls = game.add.tilemap('level1');
  walls.addTilesetImage('PLAN1');
  walls.enableBody = true;
  layerWalls = walls.createLayer('Walls');
  game.physics.enable(layerWalls, Phaser.Physics.ARCADE);
  // layerWalls.resizeWorld();

  game.physics.arcade.gravity.y = 200;

  // electroman
  em = game.add.sprite(100, 200, 'em');
  game.physics.enable(em, Phaser.Physics.ARCADE);
  
  em.body.collideWorldBounds = true;

  em.animations.add('left', [0], 10, true);
  em.animations.add('turn', [0], 20, true);
  em.animations.add('right', [0], 10, true);

  game.camera.follow(em);

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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
    /* if (facing != 'idle') {
      em.animations.stop();
      if (facing == 'left') {
        em.frame = 0;
      } else {
        em.frame = 5;
      }
      facing = 'idle';
    } */
  }
  
  if (jumpButton.isDown && em.body.onFloor() && game.time.now > jumpTimer) {
    em.body.velocity.y = -250;
    jumpTimer = game.time.now + 750;
  }
}
