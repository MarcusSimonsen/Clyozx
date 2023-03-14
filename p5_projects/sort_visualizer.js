function setup() {
    creatCanvas(600, 400);
    print('Test')
}

function draw() {
    if (mousePressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
    print('print')
}