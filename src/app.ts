import GameRunner from './modules/game-runner/GameRunner';
import ImageLoader from './modules/ImageLoader';

import Wall from '%assets%/images/block_08.png';
import Box from '%assets%/images/crate_02.png';
import Target from '%assets%/images/crate_27.png';
import Player from '%assets%/images/player_tileset.png';
import PlayerFace from '%assets%/images/player_face.png';

import Actor from './modules/game-runner/models/Actor';

// Load images
const loader = new ImageLoader();
loader.add('wall', Wall);
loader.add('box', Box);
loader.add('target', Target);
loader.add('player-tileset', PlayerFace); // Change to Player
loader.load().then(() => {
  Actor.assets = loader.all;
});

// Init document structure
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d')!;

document.body.appendChild(canvas);

// Init runner
const runner = new GameRunner(ctx);
runner.setLevel({
  boxes: [{ x: 1, y: 1 }],
  height: 5,
  width: 10,
  start: { x: 2, y: 2 },
  targets: [{ x: 3, y: 3 }],
  walls: [{ x: 2, y: 1 }],
});
runner.updateGrid();

// Canvas size updater
function updateCanvasSize(): void {
  canvas.width = innerWidth - 128;
  canvas.height = innerHeight - 128;
  runner.updateGrid();
}

updateCanvasSize();
addEventListener('resize', updateCanvasSize);

// Build controls
const buttons = ['start', 'stop', 'reset'];
const [start, stop, reset] = buttons.map(text => {
  const button = document.createElement('button');
  button.textContent = text;
  return button;
});

start.onclick = () => runner.start();
stop.onclick = () => runner.stop();
reset.onclick = () => runner.reset();

const wrapper = document.createElement('div');
wrapper.append(start, stop, reset);
document.body.appendChild(wrapper);

// Build stats element
const statistics = document.createElement('div');
document.body.appendChild(statistics);

setInterval(() => {
  const stats = runner.stats;
  statistics.textContent = `Player moves: ${stats.moves.player} | Box moves: ${stats.moves.box} | Time: ${stats.time}`;
});
