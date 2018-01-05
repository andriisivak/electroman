var game = new Phaser.Game(624, 384, Phaser.AUTO, '', {
  preload: preload,
  create: create,
  update: update
});

var bg, em, layerBg, walls, layerWalls, cursors;

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
  layerWalls = walls.createLayer('Walls');
  game.physics.enable(walls, Phaser.Physics.ARCADE);
  // layerWalls.resizeWorld();

  game.physics.arcade.gravity.y = 200;

  // player
  em = game.add.sprite(100, 200, 'em');
  game.physics.enable(em, Phaser.Physics.ARCADE);
  em.body.collideWorldBounds = true;
  game.camera.follow(em);
  
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  game.physics.arcade.collide(em, walls);
}
