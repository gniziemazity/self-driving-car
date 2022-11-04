class Road{
   constructor(x,width,laneCount=3){
      this.x=x;
      this.width=width;
      this.laneCount=laneCount;
      this.left=x-width/4;
      this.right=x+width/4;

      const infinity=10000;
      this.top=-infinity;
      this.bottom=infinity;

      const topLeft={x:this.left,y:this.top};
      const bottomLeft={x:this.left,y:this.bottom};
      const topRight={x:this.right,y:this.top};
      const bottomRight={x:this.right,y:this.bottom};
      this.borders=[
         [topLeft],
         [topRight]
      ];
      for(let y=-1000;y<=0;y++){
         const x=Math.sin(y*0.01)*50;
         this.borders[0].push({x:x+this.left,y:y});
         this.borders[1].push({x:x+this.right,y:y});
      }
      this.borders[0].push(bottomLeft);
      this.borders[1].push(bottomRight);
   }

   getLaneCenter(laneIndex){
      const laneWidth=this.width/this.laneCount;
      return this.left+laneWidth/2+
         Math.min(laneIndex,this.laneCount-1)*laneWidth;
   }

   draw(ctx){
      ctx.lineWidth=5;
      ctx.strokeStyle="white";

      /*
      ctx.setLineDash([20,20]);
      for(let i=1;i<=this.laneCount-1;i++){
         const x=lerp(
            this.left,
            this.right,
            i/this.laneCount
         );
         ctx.beginPath();
         ctx.moveTo(x,this.top);
         ctx.lineTo(x,this.bottom);
         ctx.stroke();
      }
      */

      ctx.setLineDash([20,20]);
      this.borders.forEach(border=>{
         ctx.beginPath();
         ctx.moveTo(border[0].x,border[0].y);
         for(let i=1;i<border.length;i++){
            ctx.lineTo(border[i].x,border[i].y);
         }
         ctx.stroke();
      });
      ctx.setLineDash([]);
   }
}