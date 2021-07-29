import React from 'react';
import Sketch from 'react-p5';

import './BinaryTree.css';

export default () => {
  var leftAngleSlider;
  var rightAngleSlider;
  var levelSlider;
  var leftAngle;
  var rightAngle;
  var totalLevel;

  const setup = (p5, canvasParentRef) => {
    let canvas = p5.createCanvas(1000, 500).parent(canvasParentRef);
    canvas.position(150, 110, 'fixed');
    leftAngleSlider = p5.createSlider(0, p5.TWO_PI, p5.PI / 4, 0.01);
    leftAngleSlider.position(130, 120);

    rightAngleSlider = p5.createSlider(0, p5.TWO_PI, p5.PI / 5, 0.01);
    rightAngleSlider.position(leftAngleSlider.position().x,
    leftAngleSlider.position().y + 30);
    
    levelSlider = p5.createSlider(0, 13, 10, 1);
    levelSlider.position(
      rightAngleSlider.position().x,
      rightAngleSlider.position().y + 30
    );

    
  };

  const draw = p5 => {
    // p5.background(0);
    p5.background('#011627');

    p5.noStroke();
    p5.fill('#80a4c2');  
    p5.textSize(16);  
    p5.text('Left Angle', 120, 25);
    p5.text('Right Angle', 120, 55);
    p5.text('Height', 120, 80);

    p5.translate(p5.width / 2, p5.height);
    p5.stroke(250);
    leftAngle = leftAngleSlider.value();
    rightAngle = rightAngleSlider.value();
    totalLevel = levelSlider.value();
    branch(totalLevel, p5, 130, 8);
  };

  function branch(level, p5, len, strokeWeight) {
    p5.strokeWeight(strokeWeight);
    if (level < totalLevel - 3) {
      p5.stroke('#c792ea');
    }
    p5.line(0, 0, 0, -len);
    p5.translate(0, -len);
    if (level > 0) {
      p5.push();
      p5.rotate(rightAngle);
      let newStrokeWeight = strokeWeight * 0.68 >= 1 ? strokeWeight * 0.67 : 1;
      
      branch(level - 1, p5,  0.75 * len, newStrokeWeight);
      p5.pop();

      p5.rotate(-leftAngle);
      branch(level - 1, p5,  0.75 * len, newStrokeWeight);
    }
  }

  return (
    <div className="binary-tree-wrapper">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};
