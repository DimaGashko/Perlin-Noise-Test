import './styles/index.sass';
import Vector from './components/Vector/Vector';

const canvas = <HTMLCanvasElement>document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

let size = new Vector(100, 100);

updateSize();
initEvents();
setStartStyle();

draw();

function draw() {
   ctx.fillRect(-100, -100, 200, 200);
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
   ctx.fillStyle = '#bdbdbd';
   ctx.strokeStyle = '#bdbdbd';
}