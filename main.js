// global variables
const canvas = document.querySelector("canvas");
const toolBtns = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color");

// variables
let ctx = canvas.getContext("2d");
let isDrawing = false;
let brushWidth = 5;
let selectedTool = "brush";
let prevMouseX;
let prevMouseY;
let snapshot;

// set to canvas width and height
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// start drawing
const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = brushWidth;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

// stop drawing
const stopDraw = () => {
  isDrawing = false;
};

// draw rectangle
const drawRectangle = (e) => {
  if (!fillColor.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  return ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

// draw circle
const drawCircle = (e) => {
  ctx.beginPath();
  const radius = Math.sqrt(
    Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2)
  );
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

//draw triangle
const drawTriangle = (e) => {
  ctx.beginPath();
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  fillColor.checked ? ctx.fill() : ctx.stroke();
};

// drawing
const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  switch (selectedTool) {
    case "brush":
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      break;
    case "rectangle":
      drawRectangle(e);
      break;
    case "circle":
      drawCircle(e);
      break;
    case "triangle":
      drawTriangle(e);
      break;

    default:
      break;
  }
};

// tool btns
toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool, "selected tool");
  });
});

// event listener
canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDraw);
