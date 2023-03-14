function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent('p5_canvas');
    background(150);
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
      } else {
        fill(255);
      }
      ellipse(mouseX, mouseY, 80, 80);
}