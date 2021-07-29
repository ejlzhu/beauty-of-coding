import React from 'react';
import Sketch from 'react-p5';

import Tree from './tree';
import './SpaceColonize.css';

export default () => {
  var showDots = true;
  var growTree;
  var tree;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 500).parent(canvasParentRef);
    tree = new Tree(p5);

    growTree = () => {
      tree = new Tree(p5);
    };
  };

  const draw = p5 => {
    // p5.background(0);
    p5.background('#011627');
    tree.show(showDots);
    tree.grow();
  };

  function toggleShowDots() {
    showDots = !showDots;
    growTree();
  }

  return (
    
    <div className="space-clonize-outter-wrapper">
      <div className="space-clonize-button-wrapper">
        <a className="space-lonize-ref" href="https://pdfs.semanticscholar.org/b6b9/d851ea9309e5761c2de3544012e9a7d55165.pdf">
          Reference to This Paper
        </a>
        <button className="space-clonize-button" onClick={() => growTree()}>
          Grow A Tree
        </button>
        <button
          className="space-clonize-button"
          onClick={() => toggleShowDots()}
        >
          Toggle Show/Hide Dots
        </button>
      </div>

      <Sketch setup={setup} draw={draw} />
    </div>
  );
};
