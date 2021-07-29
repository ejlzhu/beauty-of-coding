import Leaf from './leaf';
import Branch from './branch';

var maxDist = 100;
var minDist = 10;
export default function Tree(p5) {
  this.leaves = [];
  this.p5 = p5;
  this.branches = [];

  for (var i = 0; i < 300; i++) {
    this.leaves.push(new Leaf(this.p5));
  }

  var pos = this.p5.createVector(this.p5.width / 2, this.p5.height);
  var dir = this.p5.createVector(0, -10);
  var root = new Branch(this.p5, null, pos, dir);

  this.branches.push(root);

  var current = root;
  var found = false;
  while (!found) {
    for (var i = 0; i < this.leaves.length; i++) {
      var dist = computeDistance(current.pos, this.leaves[i].pos);
      if (dist < maxDist) {
        found = true;
      }
    }

    if (!found) {
      var branch = current.next();
      current = branch;
      this.branches.push(current);
    }
  }

  this.grow = function() {
    // for each leaf, find the closest branches
    for (var i = 0; i < this.leaves.length; i++) {
      var leaf = this.leaves[i];

      var closestBranch = null;
      var closestDistance = 0;
      for (var j = 0; j < this.branches.length; j++) {
        var branch = this.branches[j];
        var distance = computeDistance(leaf.pos, branch.pos);
        if (distance < minDist) {
          leaf.reached = true;
          break;
        } else if (distance > maxDist) {
        } else if (!closestBranch || distance < closestDistance) {
          closestBranch = branch;
          closestDistance = distance;
        }
      }

      if (closestBranch) {
        // update branch direction by add normalized vector to leaf
        var newDir = vectorSub(this.p5, leaf.pos, closestBranch.pos);
        newDir.normalize();
        closestBranch.dir.add(newDir);
        closestBranch.count++; // count is # leaves has a closest branch of this branch
      }
    }

    // remove leaves that's reached
    for (var i = this.leaves.length - 1; i >= 0; i--) {
      if (this.leaves[i].reached) {
        this.leaves.splice(i, 1); // remove it
      }
    }

    // add new branch growing from current branch to a direction determined by closest leaves
    for (var i = this.branches.length - 1; i >= 0; i--) {
      var branch = this.branches[i];
      if (branch.count > 0) {
        branch.dir.div(branch.count);
        this.branches.push(branch.next());
      }
      branch.reset();
    }
  };

  this.show = function(showDots) {
    if (showDots) {
      for (var i = 0; i < this.leaves.length; i++) {
        this.leaves[i].show();
      }
    }

    for (var i = 0; i < this.branches.length; i++) {
      let sw = p5.map(i, 0, this.branches.length, 3, 1);
      this.branches[i].show(sw);
    }
  };
}

// get the distance between two points
function computeDistance(a, b) {
  var dx = a.x - b.x;
  var dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// get a new vector = a - b
function vectorSub(p5, a, b) {
  return p5.createVector(a.x - b.x, a.y - b.y);
}
