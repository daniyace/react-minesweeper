import React, { useState } from 'react';
import '../styles/grid.css';

const Grid = () => {
  let size = 15;
  let ban = true;
  let matrix = [];
  for (var i = 0; i < size; i++) {
    matrix[i] = [];
    for (var j = 0; j < size; j++) {
      matrix[i][j] = {
        val: Math.floor(Math.random() * 2),
        x: i,
        y: j,
        marca: false,
        mines: 0,
      };
      for (let h = 0; h < 2; h++)
        if (matrix[i][j].val === 1)
          matrix[i][j].val = Math.floor(Math.random() * 2);
    }
  }

  const [state, setState] = useState(matrix);

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
      alert('Ya ganaste we');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const handleRigthClick = (cell) => {
    if (!cell.marca) {
      if (cell.val === 1) {
        alert('Ya perdiste chavo');
        window.location.reload();
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
                  ? !ban
                    ? 'd-inline-flex cell active'
                    : 'd-inline-flex cell '
                  : col.val === 2
                  ? 'd-inline-flex cell clean'
                  : 'd-inline-flex cell '
              }
              onClick={() => handleRigthClick(col)}
              onContextMenu={(e) => handleLeftClick(e, col)}
            >
              <p>{col.mines !== 0 ? col.mines : ' '}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
