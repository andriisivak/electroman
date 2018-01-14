var game = new Phaser.Game(624, 384, Phaser.AUTO, '', { // 48px * 13, 48px * 8
  preload: preload,
  create: create,
  update: update
});

var map, layerBg, layerObjects, layerMonsters, layerWalls, em, cursors;
var facing = 'right';
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
  map.addTilesetImage('PLAN2');
  map.addTilesetImage('PLAN3');
  map.addTilesetImage('PLAN4');

  // main background layer
  layerBg = map.createLayer(0);

  // objects layer
  layerObjects = map.createLayer(1);

  // monsters layer
  layerMonsters = map.createLayer(2);

  // walls layer
  layerWalls = map.createLayer(3);
  game.physics.arcade.enable(layerWalls);
  layerWalls.resizeWorld();

  game.physics.arcade.gravity.y = 700;

  // electroman
  em = game.add.sprite(144, 260, 'em');
  game.physics.arcade.enable(em);
  em.body.setSize(28, 84, 10, 0); // set negative x-fields for em

  em.animations.add('left', [17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 16, true);
  em.animations.add('right', [7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 16, true);

  game.physics.arcade.enable(em);
  game.camera.follow(em, Phaser.Camera.FOLLOW_TOPDOWN);

  map.setCollisionBetween(0, 10000, true, layerWalls, true);

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
      if (facing === 'left') {
        em.frame = 4;
      } else if (facing === 'right') {
        em.frame = 0;
      } else {
        em.frame = 2;
      }
      facing = 'idle';
    }
  }

  if (cursors.up.isDown && em.body.onFloor() && game.time.now > jumpTimer) {
    em.body.velocity.y = -370;
    jumpTimer = game.time.now + 750;
  }

  if (!em.body.onFloor() && facing === 'left') {
    em.frame = 19;
  }

  if (!em.body.onFloor() && facing === 'right') {
    em.frame = 9;
  }
}
