let points = 0;
let pointsInside = 0;
let piDiv;

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent('p5_canvas');

    piDiv = select('#pi_div');

    background(0);
    stroke(255);
    strokeWeight(2);
    fill(0);
    ellipse(width/2, height/2, width);

    //saveGif("pi_approximator_darts.gif", 10);
}

function draw() {
    strokeWeight(1);
    for (let i = 0; i < 1000; i++) {
        let x = random(width);
        let y = random(height);

        let distFromCenter = sqrt((width/2-x)*(width/2-x) + (height/2-y)*(height/2-y));

        stroke(color(0, 0, 255));
        points++;
        if (distFromCenter < width/2) {
            pointsInside++;
            stroke(color(0, 255, 0));
        }
        point(x, y);
    }
    piDiv.html(4*pointsInside/points);
}