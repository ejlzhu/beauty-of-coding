export default function Leaf(p5) {
  this.p5 = p5;
  
  var y = p5.random(p5.height - 100)
  var x = p5.random(p5.width);
  while (distanceOf(p5.width / 2, p5.height - 100, x, y) > 300 ){
    y = p5.random(p5.height - 100)
    x = p5.random(p5.width);
  }
  this.pos = p5.createVector(x, y);
  
  this.reached = false;
  

  this.show = function() {
    this.p5.fill(255);
    this.p5.noStroke();
    this.p5.ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}

function distanceOf(x1, y1, x2, y2) {
  var dx = x1 - x2;
  var dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}