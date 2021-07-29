export default function Branch(p5, begin, end) {
  this.p5 = p5;
  this.begin = begin;
  this.end = end;
  this.finished = false;

  this.show = p5 => {
    p5.stroke(255);
    p5.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  };

  // create two branches from one endpoint
  this.branch = function(angle) {
    var dir = vectorSub(this.p5, this.end, this.begin);
    dir.rotate(angle);
    dir.mult(0.67);
    var nextEnd = vectorAdd(this.p5, this.end, dir);
    var b = new Branch(this.p5, this.end, nextEnd);
    return b;
  };
}



function vectorSub(p5, a, b) {
  return p5.createVector(a.x - b.x, a.y - b.y);
}

function vectorAdd(p5, a, b) {
  return p5.createVector(a.x + b.x, a.y + b.y);
}
