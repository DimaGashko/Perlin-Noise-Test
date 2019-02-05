import Vector from "../components/Vector/Vector";

type CTX = CanvasRenderingContext2D;
type IMG = HTMLImageElement;
type TYPE = 'center' | 'cover';

/**
 * Рисует картинку на переданном канвасе (на весь канвас).
 * Может рисовать различными методами:
 * - `type = 'center'`: рисует картинку по центру, если картинка больше 
 * канваса она уменьшается до его размеров (при этом сверху/снизу или по 
 * бокам могут быть пропуски)
 * - `type = 'cover'`: рисует картинка эмитируя background-size: cover
 * @param ctx CanvasRenderingContext2D
 * @param img картинка
 * @param type тип размещения картинки
 */
export default function canvasImgFill(ctx: CTX, img: IMG, type: TYPE = 'center'): void {
   if (!(type in fillMethods)) {
      throw SyntaxError('Wrong fill type');
   }

   fillMethods[type](ctx, img);
}

const fillMethods: { [type: string]: (ctx: CTX, img: IMG) => void } = {

   center: function (ctx: CTX, img: IMG) {
      const canvasSize = new Vector(ctx.canvas.width, ctx.canvas.height);
      const imgSize = new Vector(img.naturalWidth, img.naturalHeight);
      const ratio = imgSize.x / imgSize.y;

      let dw = imgSize.x;
      let dh = imgSize.y;

      if (dw > canvasSize.x) {
         dw = canvasSize.x;
         dh = dw / ratio;

         if (dh > canvasSize.y) {
            dh = canvasSize.y;
            dw = dh * ratio;
         }
      }

      else if (dh > canvasSize.y) {
         dh = canvasSize.y;
         dw = dh * ratio;

         if (dw > canvasSize.x) {
            dw = canvasSize.x;
            dh = dw / ratio;
         }
      }

      ctx.drawImage(img,
         canvasSize.x / 2 - dw / 2,
         canvasSize.y / 2 - dh / 2,
         dw, dh
      );
   },

   cover: function (ctx: CTX, img: IMG) {
      drawImageCover(ctx, img);
   }

}

/**
 * By Ken Fyrstenberg
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
*/

function drawImageCover(
   ctx: CTX, img: IMG,
   x?: number, y?: number,
   w?: number, h?: number,
   offsetX?: number,
   offsetY?: number
): void {

   if (arguments.length === 2) {
      x = y = 0;
      w = ctx.canvas.width;
      h = ctx.canvas.height;
   }

   // default offset is center
   offsetX = offsetX ? offsetX : 0.5;
   offsetY = offsetY ? offsetY : 0.5;

   // keep bounds [0.0, 1.0]
   if (offsetX < 0) offsetX = 0;
   if (offsetY < 0) offsetY = 0;
   if (offsetX > 1) offsetX = 1;
   if (offsetY > 1) offsetY = 1;

   var iw = img.width,
      ih = img.height,
      r = Math.min(w / iw, h / ih),
      nw = iw * r,   /// new prop. width
      nh = ih * r,   /// new prop. height
      cx, cy, cw, ch, ar = 1;

   // decide which gap to fill    
   if (nw < w) ar = w / nw;
   if (nh < h) ar = h / nh;
   nw *= ar;
   nh *= ar;

   // calc source rectangle
   cw = iw / (nw / w);
   ch = ih / (nh / h);

   cx = (iw - cw) * offsetX;
   cy = (ih - ch) * offsetY;

   // make sure source rectangle is valid
   if (cx < 0) cx = 0;
   if (cy < 0) cy = 0;
   if (cw > iw) cw = iw;
   if (ch > ih) ch = ih;

   // fill image in dest. rectangle
   ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}