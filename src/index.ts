import Vector from './components/Vector/Vector';
import perlinNoise from './function/perlin-noise';
import * as dat from 'dat.gui';

import './styles/index.sass';

const config = {
   k: 2,
}

const canvas = <HTMLCanvasElement>document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let size = new Vector(100, 100);

updateSize();
initEvents();
setStartStyle();
initGui();

start();

(<any>window).perlinNoise = perlinNoise;

function start() { 
   requestAnimationFrame(function animationFunc(time: number) { 
      time /= 1000;

      draw(time);

      requestAnimationFrame(animationFunc);
   });
}

let coords = new Vector(0, 0);

function draw(t: number) {
   coords = new Vector(
      (perlinNoise(t, 0, 0) - 0.5) * 500,
      (perlinNoise(t * 2, 0, 0) - 0.5) * 500
   );

   ctx.fillRect(coords.x, coords.y, 1, 1);
}

function onResize() {
   updateSize();
   setStartStyle();
}

function updateSize() {
   size = new Vector(window.innerWidth, window.innerHeight);

   canvas.width = size.x;
   canvas.height = size.y;

   setStartTransforms();
}

function setStartTransforms() {
   ctx.translate(size.x / 2, size.y / 2);
}

function initEvents() {
   window.addEventListener('resize', () => {
      onResize();
   });
}

function setStartStyle() { 
   ctx.fillStyle = '#4CAF50';
   ctx.strokeStyle = '#4CAF50';
}

function initGui() {
   const gui = new dat.GUI();

   gui.add(config, 'k', -5, 5);
}