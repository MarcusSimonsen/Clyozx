class MarchingSquares {
    
    constructor(resolution, width, height) {
        this.noiseOff = 10;
        this.speed = 0.02;
        this.res = resolution;

        this.rows = height/this.res+1;
        this.cols = width/this.res+1;

        this.grid = [];
        this.zOff = 10;
        for(let x = 0; x < this.cols; x++) {
            this.grid.push([]);
            for(let y = 0; y < this.rows; y++) {
                let xOff = x/this.cols*this.noiseOff;
                let yOff = y/this.rows*this.noiseOff;
                this.grid[x].push(noise(xOff, yOff, this.zOff));
            }
        }
    }

    update() {
        for(let x = 0; x < this.cols; x++) {
            for(let y = 0; y < this.rows; y++) {
                let xOff = x/this.cols*this.noiseOff;
                let yOff = y/this.rows*this.noiseOff;
                this.grid[x][y] = noise(xOff, yOff, this.zOff);
            }
        }
        this.zOff += this.speed;
    }

    drawPoints() {
        strokeWeight(6);
        for(let x = 0; x < this.cols; x++) {
            for(let y = 0; y < this.rows; y++) {
                stroke(this.grid[x][y]*255);
                point(x * this.res, y * this.res);
            }
        }
    }
    drawPointsHard() {
        strokeWeight(6);
        for(let x = 0; x < this.cols; x++) {
            for(let y = 0; y < this.rows; y++) {
                stroke(this._getHard(x, y)*255);
                point(x * this.res, y * this.res);
            }
        }
    }

    drawRects() {
        noStroke();
        for(let x = 0; x < this.cols; x++) {
            for(let y = 0; y < this.rows; y++) {
                fill(this.grid[x][y]*255);
                rect(x*this.res, y*this.res, (x+1)*this.res, (y+1)*this.res);
            }
        }
    }

    drawIsolines() {
        for(let x = 0; x < this.cols-1; x++) {
            for(let y = 0; y < this.rows-1; y++) {
                this._drawIsoline(x, y);
            }
        }
    }
    drawIsolinesSmooth() {
        for(let x = 0; x < this.cols-1; x++) {
            for(let y = 0; y < this.rows-1; y++) {
                this._drawIsolineSmooth(x, y);
            }
        }
    }

    _drawIsoline(i, j) {
        let x = i * this.res;
        let y = j * this.res;
    
        let a = createVector(x + this.res * 0.5, y);
        let b = createVector(x + this.res, y + this.res * 0.5);
        let c = createVector(x + this.res * 0.5, y + this.res);
        let d = createVector(x, y + this.res * 0.5);
        
        let state = this._getState(this._getHard(i, j), this._getHard(i+1, j), this._getHard(i+1, j+1), this._getHard(i, j+1));

        switch (state) {
            case 0:
                break;
            case 1:
                line(c.x, c.y, d.x, d.y);
                break;
            case 2:
                line(b.x, b.y, c.x, c.y);
                break;
            case 3:
                line(b.x, b.y, d.x, d.y);
                break;
            case 4:
                line(a.x, a.y, b.x, b.y);
                break;
            case 5:
                line(a.x, a.y, d.x, d.y);
                line(b.x, b.y, c.x, c.y);
                break;
            case 6:
                line(a.x, a.y, c.x, c.y);
                break;
            case 7:
                line(a.x, a.y, d.x, d.y);
                break;
            case 8:
                line(a.x, a.y, d.x, d.y);
                break;
            case 9:
                line(a.x, a.y, c.x, c.y);
                break;
            case 10:
                line(a.x, a.y, b.x, b.y);
                line(c.x, c.y, d.x, d.y);
                break;
            case 11:
                line(a.x, a.y, b.x, b.y);
                break;
            case 12:
                line(b.x, b.y, d.x, d.y);
                break;
            case 13:
                line(b.x, b.y, c.x, c.y);
                break;
            case 14:
                line(c.x, c.y, d.x, d.y);
                break;
            case 15:
                break;
        }
    }
    
    _drawIsolineSmooth(i, j) {
        let x = i * this.res;
        let y = j * this.res;

        let a = createVector(x + this.res * this._weightedMid(this.grid[i][j], this.grid[i+1][j]), y);
        let b = createVector(x + this.res, y + this.res * this._weightedMid(this.grid[i+1][j], this.grid[i+1][j+1]));
        let c = createVector(x + this.res * this._weightedMid(this.grid[i][j+1], this.grid[i+1][j+1]), y + this.res);
        let d = createVector(x, y + this.res * this._weightedMid(this.grid[i][j], this.grid[i][j+1]));
    
        let state = this._getState(this._getHard(i, j), this._getHard(i+1, j), this._getHard(i+1, j+1), this._getHard(i, j+1));

        switch (state) {
            case 0:
                break;
            case 1:
                line(c.x, c.y, d.x, d.y);
                break;
            case 2:
                line(b.x, b.y, c.x, c.y);
                break;
            case 3:
                line(b.x, b.y, d.x, d.y);
                break;
            case 4:
                line(a.x, a.y, b.x, b.y);
                break;
            case 5:
                line(a.x, a.y, d.x, d.y);
                line(b.x, b.y, c.x, c.y);
                break;
            case 6:
                line(a.x, a.y, c.x, c.y);
                break;
            case 7:
                line(a.x, a.y, d.x, d.y);
                break;
            case 8:
                line(a.x, a.y, d.x, d.y);
                break;
            case 9:
                line(a.x, a.y, c.x, c.y);
                break;
            case 10:
                line(a.x, a.y, b.x, b.y);
                line(c.x, c.y, d.x, d.y);
                break;
            case 11:
                line(a.x, a.y, b.x, b.y);
                break;
            case 12:
                line(b.x, b.y, d.x, d.y);
                break;
            case 13:
                line(b.x, b.y, c.x, c.y);
                break;
            case 14:
                line(c.x, c.y, d.x, d.y);
                break;
            case 15:
                break;
        }
    }

    _getHard(i, j) {
        return this.grid[i][j] >= 0.5 ? 1 : 0;
    }
    
    _weightedMid(a, b) {
        return 0.5 - map(a, 0, 1, 0, 0.5) + map(b, 0, 1, 0, 0.5);
    }
    
    _getState(a, b, c, d) {
        return a * 8 + b * 4 + c * 2 + d * 1;
    }
}
