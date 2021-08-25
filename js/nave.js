class Car {
  constructor(ctx, width, height, canvasSize) {
    this.ctx = ctx;
    this.carSize = { w: width, h: height };
    this.canvasSize = canvasSize;
    this.image = undefined;
    this.carPosition = {
      x: this.canvasSize.w / 2 - 50,
      y: this.canvasSize.h - 70, //esto es la distancia Y donde aparece el coche, osea lo lejos hacia arriba que esta del borde inferior
    };
    this.moveLeft = false;
    this.moveRight = false;
    this.image = new Image();
    this.image.src = `./images/navejesus.gif`;
  }

  drawCar() {
    this.ctx.drawImage(
      this.image,
      this.carPosition.x,
      this.carPosition.y,
      this.carSize.w,
      this.carSize.h
    );
  }

  move() {
    this.carPosition.x <= this.canvasSize.w - 70 && this.moveRight
      ? (this.carPosition.x += 6)
      : null;
    this.carPosition.x >= 6 && this.moveLeft ? (this.carPosition.x -= 6) : null;
  }
}

class Disparo {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.height = 15;
    this.width = 3;
    this.color = "red";
    this.x = x;
    this.y = y;
  }
  showDisparo() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveDisparo() {
    this.y -= 8;
  }
}
