const canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");
let isDrawing = false;
let brushWidth = 5;

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// start drawing
const startDraw = () => {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
};

// stop drawing
const stopDraw = () => {
  isDrawing = false;
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
};

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw);
