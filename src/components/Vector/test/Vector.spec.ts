import { expect, assert } from 'chai';
import Vector from '../Vector';

describe('Class Vector', () => {

   describe('new Vector', () => {
      
      it('Если вызван без параметров, то координаты равны нулю', () => {
         const vector = new Vector();

         expect(vector.x).equal(0);
         expect(vector.y).equal(0);       
      });

      it('Координаты равны переданным параметрам', () => {
         const vector = new Vector(2, 5);

         expect(vector.x).equal(2);   
         expect(vector.y).equal(5);
      });
   
   });
 
   describe('Methods', () => { 
      
      it('copy()', () => { 
         const v1 = new Vector(1, 2);
         const res = v1.copy();

         expect(res.x).equal(v1.x);
         expect(res.y).equal(v1.y);
      });

      it('add()', () => { 
         const v1 = new Vector(1, 2);
         const res = v1.add(new Vector(2, 1));

         expect(res.x).equal(3);
         expect(res.y).equal(3);
      });

      it('sub()', () => { 
         const v1 = new Vector(2, 4);
         const res = v1.sub(new Vector(1, 2));

         expect(res.x).equal(1);
         expect(res.y).equal(2);
      });

      it('addNub()', () => { 
         const v1 = new Vector(2, 4);
         const res = v1.addNum(1);

         expect(res.x).equal(3);
         expect(res.y).equal(5);
      });

      it('subNub()', () => { 
         const v1 = new Vector(2, 4);
         const res = v1.subNum(1);

         expect(res.x).equal(1);
         expect(res.y).equal(3);
      });

      it('mul()', () => { 
         const v1 = new Vector(1, 2);
         const res = v1.mul(2);

         expect(res.x).equal(2);
         expect(res.y).equal(4);
      });

      it('div()', () => { 
         const v1 = new Vector(2, 4);
         const res = v1.div(2);

         expect(res.x).equal(1);
         expect(res.y).equal(2);
      });

      it('scale()', () => { 
         const v1 = new Vector(4, 5);
         const res = v1.scale(new Vector(2, 3));

         expect(res.x).equal(8);
         expect(res.y).equal(15);
      });

      it('unscale()', () => { 
         const v1 = new Vector(8, 15);
         const res = v1.unscale(new Vector(2, 3));

         expect(res.x).equal(4);
         expect(res.y).equal(5);
      });

      it('floor()', () => { 
         const res = new Vector(1.1, 2.8).floor();

         expect(res.x).equal(1);
         expect(res.y).equal(2);
      });

      it('ceil()', () => { 
         const res = new Vector(1.1, 2.8).ceil();

         expect(res.x).equal(2);
         expect(res.y).equal(3);
      });

      it('round()', () => { 
         const res = new Vector(1.1, 2.8).round();

         expect(res.x).equal(1);
         expect(res.y).equal(3);
      });

      it('copy() возвращает новый вектор', () => { 
         const v1 = new Vector(1, 2);
         const res = v1.copy();
         
         assert.isTrue(v1 !== res);
      });

      it('add() возвращает новый вектор', () => { 
         const v1 = new Vector(1, 2);
         const v2 = new Vector(2, 1);
         const res = v1.add(v2);
         
         assert.isTrue(v1 !== res);
         assert.isTrue(v2 !== res);
      });

   }); 

});