function preload() 
{
    game.load.tilemap('LevelOne', 'TileMaps/Tutorial.json', null, Phaser.Tilemap.TILED_JSON);
    
    game.load.image('Background', 'Assets/Background.png');
    game.load.image('InterImages', 'Assets/InterImages.png');
    game.load.spritesheet('MainCharacter', 'Assets/MainCharacter.png', 60, 80, 33);
    game.load.spritesheet('StandardEnemyFull', 'Assets/StandardEnemyFull.png');
    
}

var map;
var player;
var layer1;
var layer2;
var layer3;
//var standardenemy;

    
function create() 
{
    //call in physics and assigns gravity
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 900;
    
    //add tilemap, images and create layers, resize world
    map = game.add.tilemap('LevelOne');
    map.addTilesetImage('Background', 'Background');
    map.addTilesetImage('Interaction', 'InterImages');
    
    layer = map.createLayer('Scenery');
    layer2 = map.createLayer('Activates');
    layer3 = map.createLayer('Floor');
    
    
    game.physics.arcade.enable(layer3);
   
    
    //add player and enable player physics. Ensure player collides with world bounds and the layer 'floor'
    player = game.add.sprite(1040,1300,'MainCharacter');
    player.anchor.x = player.anchor.y = 0.2;
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;   
    //set map collision for the sprites on floor of tileid x to x (Currently only works for standing on top of tile, can go through from side and bottom)
    map.setCollisionBetween(0, 10000, true, layer3);
    
    
    
    //game.camera.follow(player);
    
        
    //Add animations and assign a current animation to play   
    /*var idleright = player.animations.add('idleright', [0,1,2,3,4,5], 5, true);
    var idleleft = player.animations.add('idleleft', [6,7,8,9,10,11], 5, true);
    var walking = player.animations.add('walking', [12,13,14,15,16,17], 8, true);
    var wepready = player.animations.add('wepready', [18,19,20,21,22], 12, false);
    var swing = player.animations.add('swing', [24,25,26,27,28,29], 13, true);
    var dead = player.animations.add('dead', [30,31,32], 3, false);
    player.animations.play('idleright');*/
    
}  

function update()
    {
    game.physics.arcade.collide(player, layer3);
    
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
    {
        player.x -= 10;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        player.x += 10;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        player.y -= 10;
    }
     if (game.input.keyboard.isDown(Phaser.Keyboard.S))
    {
        player.y += 10;
    }
        
    
    }
function render()
    {
        game.debug.bodyInfo(player, 32, 32);
    }