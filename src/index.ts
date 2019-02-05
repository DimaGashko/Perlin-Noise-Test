import Vector from './components/Vector/Vector';
import perlinNoise from './function/perlin-noise';
import * as dat from 'dat.gui';

import './styles/index.sass';

const config = {
   speed: 0.01,
   height: 400,
   bend: 100,
   mobility: 0.25,
   fill: true,
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
   const vertices = getVertices();

   ctx.beginPath();
   ctx.moveTo(vertices[0].x, vertices[0].y);

   for (let i = 0; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
   }

   ctx.closePath();

   if (config.fill) {
      ctx.fill();

   } else {
      ctx.stroke();
   }
}

function getVertices(): Vector[] {
   const len = size.x;
   const vertices: Vector[] = new Array(len + 1);

   for (let i = 0; i < len; i++) {
      const dx = time + i / config.bend;
      const dy = time * config.mobility;

      const h = perlinNoise(dx, dy, 0) * config.height;

      vertices[i] = new Vector(i, size.y - h);
   }

   // Нижние точки
   vertices[len] = new Vector(size.x, size.y);
   vertices[len + 1] = new Vector(0, size.y);

   return vertices;
};

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
   ctx.fillStyle = '#33691E';
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
   gui.add(config, 'fill', true);
}