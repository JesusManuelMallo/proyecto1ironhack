window.onload = function initCanvas() {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const nave = new Image();
  nave.src = "./images/navejesus.gif";
  nave.onload = function () {
    ctx.drawImage(nave, canvas.width / 2 - 32, 700, 64, 64);
  };
};
