const raceCarApp = {
  ctx: undefined,
  // canvasDOM: undefined,
  canvasSize: { w: undefined, h: undefined },
  intervalId: undefined,
  framesCounter: 0,
  obstacles: [],
  speed: 2,
  score: 0,
  arrayDisparos: [], //DISPAROS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  init(canvas) {
    this.setContext(canvas);
    this.setCanvasDimensions(canvas);
    this.createNewCar();
    this.imageBackground = new Image();
    this.imageBackground.src = "./images/fondo.gif";
    this.setListeners();
    this.gameStart();
  },

  setContext(canvas) {
    this.ctx = canvas.getContext("2d");
  },

  setCanvasDimensions(canvas) {
    this.canvasSize.w = 540;
    this.canvasSize.h = 650;
    canvas.setAttribute("width", this.canvasSize.w);
    canvas.setAttribute("height", this.canvasSize.h);
  },

  createNewCar() {
    this.newCar = new Car(this.ctx, 64, 64, this.canvasSize); //modificado de tamaño coche a tamaño de mi nave
  },

  createDisparo() {
    // DISPAROS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.arrayDisparos.push(
      (this.newDisparo = new Disparo(
        this.ctx,
        this.newCar.carPosition.x + this.newCar.carSize.w / 2,
        this.newCar.carPosition.y
      ))
    );
  },

  setListeners() {
    document.addEventListener("keydown", (e) => {
      e.key === "ArrowLeft" ? (this.newCar.moveLeft = true) : null;
      e.key === "ArrowRight" ? (this.newCar.moveRight = true) : null;
      e.keyCode === 32
        ? this.createDisparo() && console.log(this.arrayDisparos)
        : null;
    });

    document.addEventListener("keyup", (e) => {
      e.key === "ArrowLeft" ? (this.newCar.moveLeft = false) : null;
      e.key === "ArrowRight" ? (this.newCar.moveRight = false) : null;
    });
  },

  gameStart() {
    // si nos fijamos solo hay 1 solo intervalo para toda la aplicación, donde llamo todo lo necesario en el
    this.intervalId = setInterval(() => {
      this.checkIfCollision();
      this.clearCanvas();
      this.drawAll();

      this.newCar.move();
      if (this.arrayDisparos.length !== 0) {
        this.arrayDisparos.forEach((disparo) => {
          disparo.moveDisparo();
        });
      }

      this.framesCounter++;

      if (this.framesCounter % 200 === 0) {
        this.score++;
      }

      if (this.framesCounter % 100 === 0) {
        this.createObstacle();
      }
    }, 1000 / 60);
  },

  drawAll() {
    this.drawBackground();
    this.newCar.drawCar();
    this.obstacles.forEach((obstacle) => obstacle.draw());
    this.arrayDisparos.forEach((disparo) => {
      //DISPAROS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
      disparo.showDisparo();
    });
    /* if (this.newDisparo) {
      this.newDisparo.showDisparo();
    } */

    this.showScores();
  },

  createObstacle() {
    /* const randomWidth = Math.trunc(Math.random() * (300 - 100) + 100); 
    const randomHeight = Math.trunc(Math.random() * (100 - 70) + 70); */
    const randomWidth = 64;
    const randomHeight = 64;
    const xRandomPosition = Math.trunc(
      Math.random() * (this.canvasSize.w - 100) //***1 explicacion para que aparezcan desde lugares random
    );

    const newObstacle = new obstacles( //***1 explicacion, de logica y relacion de clases/funcion linea 77, que se llama aquí + constructor
      this.ctx,
      randomWidth,
      randomHeight,
      this.canvasSize,
      xRandomPosition,
      this.speed
    );

    this.obstacles.push(newObstacle);
  },

  drawBackground() {
    this.ctx.drawImage(
      this.imageBackground,
      0,
      0,
      this.canvasSize.w,
      this.canvasSize.h
    );
  },

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h); //explicacion de porque esto
  },

  showScores() {
    // show scores
    this.ctx.font = "25px Verdana";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Score: " + this.score, 1, 90);
  },

  checkIfCollision() {
    if (this.obstacles.length) {
      this.obstacles.forEach((elem) => {
        elem.draw();

        if (
          this.newCar.carPosition.x <
            elem.obstaclePosition.x + elem.obstacleSize.w - 10 &&
          this.newCar.carPosition.x + this.newCar.carSize.w - 10 >
            elem.obstaclePosition.x &&
          this.newCar.carPosition.y <
            elem.obstaclePosition.y + elem.obstacleSize.h - 10 &&
          this.newCar.carSize.h - 10 + this.newCar.carPosition.y >
            elem.obstaclePosition.y
        ) {
          clearInterval(this.intervalId);
        }
      });
    }
  },

  // looser() {
  //   // this.ctx.drawImage(this.image, 0, 0, this.canvasSize.w, this.canvasSize.h);
  // },

  // reset() {
  //   this.score = 0
  //   this.obstacles = []
  //   this.start()
  // }
};
