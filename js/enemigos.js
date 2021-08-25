class obstacles {
  constructor(ctx, width, height, canvasSize, position, speed) {
    this.ctx = ctx;
    this.obstacleSize = { w: width, h: height };
    this.canvasSize = canvasSize;
    this.obstaclePosition = { x: position, y: -20 };
    this.randomImage = Math.trunc(Math.random() * (6 - 1) + 1); //duda, al poner 5 aquí, da error cuando parece que sea lo mismo.
    this.speed = speed;
    this.imageInstance = new Image();
    this.imageInstance.src = `./images/mons${this.randomImage}.gif`;
  }

  draw() {
    this.ctx.drawImage(
      this.imageInstance,
      this.obstaclePosition.x,
      this.obstaclePosition.y,
      this.obstacleSize.w,
      this.obstacleSize.h
    );
    // console.log('me muevo');
    this.move();
  }

  move() {
    this.obstaclePosition.y += this.speed;
  }
}
