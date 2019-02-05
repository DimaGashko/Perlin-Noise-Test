import './styles/index.sass';
import Vector from './components/Vector/Vector';
import perlinNoise from './function/perlin-noise';

const canvas = <HTMLCanvasElement>document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let size = new Vector(100, 100);

updateSize();
initEvents();
setStartStyle();

start();

(<any>window).perlinNoise = perlinNoise;

function start() { 
   requestAnimationFrame(function animationFunc(time: number) { 
      draw(time);

      requestAnimationFrame(animationFunc);
   });
}

function draw(time: number) {
   const x = (perlinNoise(time, 0, 0) - 0.5) * 500;
   const y = (perlinNoise(1, time, 0) - 0.5) * 500;

   ctx.fillRect(x, y, 1, 1);
}

function onResize() {
   updateSize();
   draw();
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