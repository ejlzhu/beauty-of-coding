import React, { useState, useEffect, useRef } from 'react';
import { Typography, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import selectionSortAnimations from '../../algorithms/sortingAlgorithms/selectionSort';
import bubbleSortAnimations from '../../algorithms/sortingAlgorithms/bubbleSort';
import insertionSortAnimations from '../../algorithms/sortingAlgorithms/insertionSort';
import mergeSortAnimations from '../../algorithms/sortingAlgorithms/mergeSort';
import quickSortAnimations from '../../algorithms/sortingAlgorithms/quickSort';
import './Sorting.css';

const ARR_SIZE = 20;
const MIN_DELAY = 10;
const MAX_DELAY = 200;
const COLOR_CURR = '#b2d5ee';
const COLOR_COMP = '#c792ea';

const useStyles = makeStyles({
  root: {
    width: '400px',
    color: '#80a4c2'
  },
  markLabel: {
    fontSize: '1rem',
    color: '#80a4c2'
  }
});

export default function Sorting(props) {
  const [algo, setAlgo] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [arr, setArr] = useState([]);
  const [states, setStates] = useState([]);
  const [count, setCount] = useState(0);
  const [speed, setSpeed] = useState(MIN_DELAY);
  const [allTimeouts, setAllTimeouts] = useState([]);
  const containerRef = useRef(null);

  useEffect(resetArray, []);
  useEffect(animateArrChanges, [states]);

  function resetArray() {
    if (isSorting) return;
    setIsSorted(false);

    const newArr = [];
    for (let i = 1; i <= ARR_SIZE; i++) {
      newArr.push(i);
    }

    shuffle(newArr);
    setArr(newArr);
    setCount(0);
  }

  function chooseAlgo(algo) {
    setAlgo(algo);
  }

  function begin() {
    if (algo === 'selection') selectionSort();
    else if (algo === 'bubble') bubbleSort();
    else if (algo === 'insertion') insertionSort();
    else if (algo === 'merge') mergeSort();
    else if (algo === 'quick') quickSort();
    else alert("Please choose an algorithm before sorting!");
  }

  function stop() {
    if (isSorting) {
      setIsSorting(false);
      setIsSorted(false);
      setAllTimeouts((prevTimeouts) => {
        while (prevTimeouts.length) {
          clearTimeout(prevTimeouts.pop());
        }
        const newTimeouts = [];
        return newTimeouts;
      });
    }
  }

  function resume() {
    if(!isSorting && !isSorted) {
      setIsSorting(true);
      animateArrChanges();
    }
  }

  function selectionSort() {
    const sortStates = selectionSortAnimations(arr);
    setStates(sortStates);
  }

  function bubbleSort() {
    const sortStates = bubbleSortAnimations(arr);
    setStates(sortStates);
  }

  function insertionSort() {
    const sortStates = insertionSortAnimations(arr);
    setStates(sortStates);
  }

  function mergeSort() {
    const sortStates = mergeSortAnimations(arr);
    setStates(sortStates);
  }

  function quickSort() {
    const sortStates = quickSortAnimations(arr);
    setStates(sortStates);
  }

  function animateArrChanges() {
    if (states.length === 0) return;
    if (!isSorting) setIsSorting(true);

    let remain = 0;
    for (let i = count; i < states.length; i++) {
      const [comparison, swapped] = states[i];
      let currTimeout = setTimeout(() => {
        if (swapped) {
          if (comparison.length === 2) {
            const[index, val] = comparison;
            changeBarHeight(index, val);
          } else {
            const [index1, val1, index2, val2] = comparison;
            changeBarHeight(index1, val1);
            changeBarHeight(index2, val2);
          }
        } else {
          const [index1, index2] = comparison;
          changeBarColor(index1, index2);
        }
        setCount(prevCount => {
          return prevCount + 1;});
      }, speed * remain * 3);
      remain++;
      allTimeouts.push(currTimeout);
    }

    setTimeout(() => {
      allTimeouts.length !== 0 && setIsSorted(true);
      setIsSorting(false);
    }, speed * remain * 3);
  }

  function changeBarColor(i, j) {
    const bars = containerRef.current.children;
    const barStyle1 = bars[i].style;
    const barStyle2 = bars[j].style;
    setTimeout(() => {
      barStyle1.backgroundColor = COLOR_CURR;
      barStyle2.backgroundColor = COLOR_COMP;
    }, speed);
    setTimeout(() => {
      barStyle1.backgroundColor = '';
      barStyle2.backgroundColor = '';
    }, speed * 2);
  }

  function changeBarHeight(i, newVal) {
    setArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[i] = newVal;
      return newArr;
    });
  }

  function shuffle(arr) {
    for (let i = 0; i < ARR_SIZE; i++) {
      const randIndex = Math.floor(Math.random() * ARR_SIZE);
      const temp = arr[i];
      arr[i] = arr[randIndex];
      arr[randIndex] = temp;
    }
  }

  const handleSpeedChange = (event, newValue) => {
    setSpeed(newValue);
  }

  const classes = useStyles();

  return(
    <div id='container'>
      <nav className='algo-list'>
        <a className='sort-opt' href='#!' onClick={() => chooseAlgo('selection')}>
          Selection Sort
        </a>
        <a className='sort-opt' href='#!' onClick={() => chooseAlgo('bubble')}>
          Bubble Sort
        </a>
        <a className='sort-opt' href='#!' onClick={() => chooseAlgo('insertion')}>
          Insertion Sort
        </a>
        <a className='sort-opt' href='#!' onClick={() => chooseAlgo('merge')}>
          Merge Sort
        </a>
        <a className='sort-opt' href='#!' onClick={() => chooseAlgo('quick')}>
          Quick Sort
        </a>
      </nav>

      <div className='contents-container'>

        <div className='opt-btns'>
          <button onClick={() => resetArray()}>Create New Array</button>
          <button onClick={() => begin()}>Begin Sort</button>
          <button onClick={() => stop()}>Pause Sort</button>
          <button onClick={() => resume()}>Resume Sort</button>
        </div>

        <div className='contents-right'>

          <div className='slider-container'>
          <Typography style={{color: '#80a4c2'}}>
            Adjust Animation Speed (Please Pause First)
          </Typography>
          <Slider
            classes={{
              root: classes.root,
              markLabel: classes.markLabel
            }}
            value={speed}
            min={MIN_DELAY}
            max={MAX_DELAY}
            marks={[{value: MIN_DELAY, label: 'fast'}, {value: MAX_DELAY, label: 'slow'}]}
            onChange={handleSpeedChange}
            aria-labelledby="continuous-slider" />
          </div>

          {(<div className={`message ${isSorted ? 'success-message' : 'hidden-message'}`}>Sorting is done!</div>)}

          <div className='array-container' ref={containerRef}>
            {arr.map((arrHeight, index) => (
              <div
                key={index}
                className='array-bar'
                style={{height:`${arrHeight * 2.5}vh`,
                        width:`40px`
                }}
              />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
