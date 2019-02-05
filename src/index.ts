import Vector from './components/Vector/Vector';
import perlinNoise from './function/perlin-noise';
import * as dat from 'dat.gui';

import './styles/index.sass';

const config = {
   speed: 0.01,
   height: 400,
   bend: 100,
   mobility: 0.25,
}

const canvas = <HTMLCanvasElement>document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let size = new Vector(100, 100);
let time = 0;

updateSize();
initEvents();
setStartStyle();
initGui();

start();

(<any>window).perlinNoise = perlinNoise;

function start() { 

   requestAnimationFrame(function animationFunc() { 
      time += config.speed;

      clear();
      draw();

      requestAnimationFrame(animationFunc);
   });
}

let coords = new Vector(0, 0);

function draw() {  
   ctx.save();
   //ctx.translate(size.x / 2, size.y / 2);

   const count = size.x;
   
   for (let i = 0; i < count; i++) {
      const h = perlinNoise(time + i / config.bend, time * config.mobility, 0) * config.height;

      ctx.fillRect(i, size.y - h, 1, h);
   }

   ctx.restore();
}

function onResize() {
   updateSize();
   setStartStyle();
}

function updateSize() {
   size = new Vector(window.innerWidth, window.innerHeight);

   canvas.width = size.x;
   canvas.height = size.y;
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

function clear() { 
   ctx.clearRect(0, 0, size.x, size.y);
}

function initGui() {
   const gui = new dat.GUI();

   gui.add(config, 'speed', 0, 0.2);
   gui.add(config, 'height', 100, 1000);
   gui.add(config, 'bend', 50, 500);
   gui.add(config, 'mobility', 0, 1);
}