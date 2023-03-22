let ms;

function setup() {
    const canvas = createCanvas(1000, 600);
    canvas.parent('p5_canvas');
    
    ms = new MarchingSquares(10, width, height);    
}

function draw() {
    background(127);
    
    ms.drawRects();
    stroke(255);
    strokeWeight(1);
    ms.drawIsolines();
    ms.update();
}