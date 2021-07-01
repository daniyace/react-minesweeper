import React, { useEffect, useState } from 'react';
import '../styles/grid.css';
import '../styles/selection.css';

const Grid = () => {
  const size = 15;
  let ban = true;
  const start = () => {
    let matrix = [];
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        matrix[i][j] = {
          val: Math.floor(Math.random() * 2),
          x: i,
          y: j,
          marca: false,
          mines: 0,
        };
      }
    }

    setState(matrix);
  };

  const [diff, setDiff] = useState(false);
  const [state, setState] = useState(false);
  const [select, setSelect] = useState(false);
  const [first, setFirst] = useState(true);
  const [lost, setLost] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (first && select) {
      setFirst(false);
      start();
    }
    if (diff > 0 && state) {
      setDiff(diff - 1);

      let matrix = state;
      for (let i = 0; i < state.length; i++)
        for (let j = 0; j < state.length; j++)
          if (matrix[i][j].val === 1)
            matrix[i][j].val = Math.floor(Math.random() * 2);

      if (matrix) setState(state);
    }
  }, [select, diff, first, state]);

  const surround = (cell, copy) => {
    let x = cell.x;
    let y = cell.y;
    let mines = 0;
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++)
        if (i === 0 && j === 0) {
          //no comprobar la casilla a la que se le da click
        } else if (x + i === -1 || x + i === size) {
          //manejando los limites en x
        } else if (y + j === -1 || y + j === size) {
          //manejando los limites en y
        } else if (copy[x + i][y + j].val === 1) mines++;

    copy[cell.x][cell.y] = {
      val: 2,
      x: cell.x,
      y: cell.y,
      marca: cell.marca,
      mines: mines,
    };

    if (mines === 0) {
      for (let i = -1; i < 2; i++)
        for (let j = -1; j < 2; j++)
          if (i === 0 && j === 0) {
            //no comprobar la casilla a la que se le da click
          } else if (x + i === -1 || x + i === size) {
            //manejando los limites en x
          } else if (y + j === -1 || y + j === size) {
            //manejando los limites en y
          } else if (copy[x + i][y + j].val === 1) mines++;
          else if (copy[x + i][y + j].val !== 2) {
            surround(copy[x + i][y + j], copy);
          }
    }
    return copy;
  };

  const endGame = () => {
    for (var i = 0; i < state.length; i++) {
      for (var j = 0; j < state[0].length; j++) {
        if (state[i][j].val === 0) ban = false;
      }
    }
    if (ban) {
      alert('You win');
      setWin(true);
    }
  };

  const handleRigthClick = (cell) => {
    if (!cell.marca) {
      if (!lost && !win)
        if (cell.val === 1) {
          alert('You lost');
          setLost(true);
        } else {
          if (cell.val !== 2) {
            setState(surround(cell, [...state]));
            endGame();
          }
        }
    } else {
      console.log(cell.val);
    }
  };

  const handleLeftClick = (e, cell) => {
    e.preventDefault();
    let copy = [...state];
    copy[cell.x][cell.y] = {
      val: cell.val,
      x: cell.x,
      y: cell.y,
      marca: !cell.marca,
      mines: cell.mines,
    };
    setState(copy);
  };
  const reset = () => {
    setDiff(false);
    setState(false);
    setSelect(false);
    setFirst(true);
    setLost(false);
    setWin(false);
    ban = false;
  };
  if (select && state) {
    return (
      <div className='grid'>
        {state.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <div
                key={j}
                className={
                  col.marca && col.val === 1
                    ? 'd-inline-flex cell flag'
                    : col.marca && col.val === 0
                    ? 'd-inline-flex cell flag'
                    : col.val === 1
                    ? !ban || lost
                      ? 'd-inline-flex cell active'
                      : 'd-inline-flex cell'
                    : col.val === 2
                    ? 'd-inline-flex cell clean'
                    : 'd-inline-flex cell '
                }
                onClick={() => handleRigthClick(col)}
                onContextMenu={(e) => handleLeftClick(e, col)}
              >
                <p>{col.mines !== 0 ? col.mines : '⠀'}</p>
              </div>
            ))}
          </div>
        ))}
        {lost ? (
          <button className='btn btn-danger res' onClick={() => reset()}>
            Reset
          </button>
        ) : (
          ''
        )}
        {win ? (
          <button className='btn btn-success win' onClick={() => reset()}>
            Reset
          </button>
        ) : (
          ''
        )}
      </div>
    );
  } else {
    return (
      <div className='selection container'>
        <header>
          <h1 className='text-center'>Minesweeper on React</h1>
        </header>
        <section>
          <h3 className='text-center par'>Choose the difficulty</h3>
          <div className='center'>
            <select name='diff' id='diff' className='select' defaultValue={2}>
              <option value={3}>Easy</option>
              <option value={2}>Normal</option>
              <option value={1}>Hard</option>
              <option value={0}>You cant win</option>
            </select>
            <button
              className='btn btn-primary '
              onClick={() => {
                let e = document.getElementById('diff');
                setDiff(e.value);
                setSelect(true);
              }}
            >
              Start
            </button>
          </div>
        </section>
      </div>
    );
  }
};

export default Grid;
