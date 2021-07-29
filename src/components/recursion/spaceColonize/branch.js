export default function Branch(p5, parent, pos, dir) {
  this.p5 = p5;
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.originDir = dir.copy();
  this.count = 0; // # leaves has this branch as the closest branch
  this.len = 2;


  this.next = function() {
    var nextDir = vectorMult(this.p5, this.dir, this.len);
    var nextPos = vectorAdd(this.p5, this.pos, nextDir);
    var nextBranch = new Branch(this.p5, this, nextPos, this.dir.copy());
    return nextBranch;
  }

  this.show = function(sw) {
    if (this.parent != null) {
      this.p5.stroke(255);
      this.p5.strokeWeight(sw);
      this.p5.line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
      
    }
  }

  this.reset = function() {
    this.dir = this.originDir.copy();
    this.count = 0;
  }

}

function vectorAdd(p5, a, b) {
  return p5.createVector(a.x + b.x, a.y + b.y);
}

function vectorMult(p5, a, num) {
  return p5.createVector(a.x * num, a.y * num);
}

