import Vector from './components/Vector/Vector';
import perlinNoise from './function/perlin-noise';
import * as dat from 'dat.gui';

import './styles/index.sass';

const config = {
   k: 100,
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
      time += 0.001;

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
      const h = perlinNoise(i / config.k, 0, 0) * 500;

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

   gui.add(config, 'k', 1, 500);
}