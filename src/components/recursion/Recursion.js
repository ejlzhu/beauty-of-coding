import React from 'react';
import BinaryTree from './binaryTree/BinaryTree';
import SpaceColonize from './spaceColonize/SpaceColonize';
import './Recursion.css';

export default class Recursion extends React.Component {
  constructor() {
    super();
    this.state = { tree: 'Binary Tree' };
  }

  chooseTree(tree) {
    this.setState({ tree });
  }

  renderTree() {
    let { tree } = this.state;
    if (tree === 'Binary Tree') {
      return <BinaryTree />;
    } else if (tree === 'Space Colonization') {
      return <SpaceColonize />;
    }
  }

  render() {
    return (
      <div className="recursion-wrapper">
        <div className="recursion-nav-wrapper">
          <nav className="inner-wrapper">
            <ul>
              <li>
                <a className="choose-algorithm" href="#">
                  Choose Tree:{' '}
                  <i>
                    <span>{this.state.tree}</span>
                  </i>
                </a>

                <ul>
                  <li onClick={() => this.chooseTree('Binary Tree')}>
                    <a href="#">Binary Tree</a>
                  </li>
                  <li
                    onClick={() => this.chooseTree('Space Colonization')}
                  >
                    <a href="#">Space Colonization</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="recursion-tree-wrapper">{this.renderTree()}</div>
      </div>
    );
  }
}
