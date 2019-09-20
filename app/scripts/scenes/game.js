import Logo from '@/objects/logo';
import IsoPlugin from 'phaser3-plugin-isometric';
import FightingMap from '../../static/assets/maps/Fighting_map.json';

export default class Game extends Phaser.Scene {
  /**
   *  A sample Game scene, displaying the Phaser logo.
   *
   *  @extends Phaser.Scene
   */
  constructor() {
    const sceneConfig = {
      key: 'Game',
      mapAdd: {isoPlugin: 'iso'}
    };
    super(sceneConfig);
  }
  preload(){
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });
  }
  /**
   *  Called when a scene is initialized. Method responsible for setting up
   *  the game objects of the scene.
   *
   *  @protected
   *  @param {object} data Initialization parameters.
   */
  create(/* data */) {
    //  TODO: Replace this content with really cool game code here :)
    //this.logo = this.add.existing(new Logo(this));
    const camera = this.cameras.main
    this.isoGroup = this.add.group();

    this.iso.projector.origin.setTo(0.5, 0.5);
    FightingMap.layers.forEach(layer => {
      let z = layer.offsety ? layer.offsety - (layer.offsety * 2) : 0
      this.spawnTiles(layer.data, z, layer.active);
    });

    camera.setZoom(2);
  }

  spawnTiles(data, z, active){
    let tile;
    let i = 0
    for(let xx = 0; xx < 128; xx += 16){
      for(let yy = 0; yy < 128; yy += 16){
        tile = this.add.isoSprite(xx, yy, z, 'tiles', this.isoGroup, data[i] === 0 ? 27 : data[i]-1);

        if(active){
          if(tile.frame.name !== 12){
            tile.setInteractive();
            tile.on('pointerover', function(){
              this.setTint(0x86bfda);
              this.isoZ += 2;
            });

            tile.on('pointerout', function(){
              this.clearTint();
              this.isoZ -= 2;
            });
          }
        }
        i++;
      }
    }
  }

  /**
   *  Called when a scene is updated. Updates to game logic, physics and game
   *  objects are handled here.
   *
   *  @protected
   *  @param {number} t Current internal clock time.
   *  @param {number} dt Time elapsed since last update.
   */
  update(/* t, dt */) {
    //this.logo.update();
  }
}
