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
      if (matrix[i][j].val === 1) {
        matrix[i][j].val = Math.floor(Math.random() * 2);
      }
      if (matrix[i][j].val === 1) {
        matrix[i][j].val = Math.floor(Math.random() * 2);
      }
    }
  }

  const [state, setState] = useState(matrix);

  const surround = (cell, copy) => {
    let x = cell.x;
    let y = cell.y;
    let mines = 0;
    //let copy = [...state];
    //console.log(x, y);
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++)
        if (i === 0 && j === 0) {
          //no comprobar la casilla a la que se le da click
        } else {
          if (x + i === -1 || x + i === state.length) {
            //console.log(x + i + 1, y + j + 1);
          } else if (y + j === -1 || y + j === state.length) {
            //console.log(x + i + 1, y + j + 1);
          } else {
            if (copy[x + i][y + j].val === 1) mines++;
          }
        }
    /*  if (x +i && y+j >= 0) {
          console.log(x, y);
        } */
    /*  for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++) {
        console.log(copy[x + i][y + j]);
        if (copy[x + i][y + j].val === 1) mines++;
      }

    if (mines === 0)
      for (let i = -1; i < 2; i++)
        for (let j = -1; j < 2; j++) reveal(copy[x + i][y + j]); */

    /* if (x === 0 && y === 0) {
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
      if (mines === 0)
        for (let i = 0; i < 2; i++)
          for (let j = 0; j < 2; j++) reveal(copy[x + i][y + j]);
    } else if (x === 0 && y === copy.length - 1) {
      for (let i = 0; i < 2; i++)
        for (let j = -1; j < 1; j++) if (copy[x + i][y + j].val === 1) mines++;
      if (mines === 0)
        for (let i = 0; i < 2; i++)
          for (let j = -1; j < 1; j++) reveal(copy[x + i][y + j]);
    } else if (x === copy.length - 1 && y === 0) {
      for (let i = -1; i < 1; i++)
        for (let j = 0; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
      if (mines === 0)
        for (let i = -1; i < 1; i++)
          for (let j = 0; j < 2; j++) reveal(copy[x + i][y + j]);
    } else if (x === copy.length - 1 && y === copy[0].length - 1) {
      for (let i = -1; i < 1; i++)
        for (let j = -1; j < 1; j++) if (copy[x + i][y + j].val === 1) mines++;
      if (mines === 0)
        for (let i = -1; i < 1; i++)
          for (let j = -1; j < 1; j++) reveal(copy[x + i][y + j]);
    } else if (
      x !== 0 &&
      x !== copy.length - 1 &&
      y !== 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = -1; i < 2; i++)
        for (let j = -1; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;

      if (mines === 0) {
        for (let i = -1; i < 2; i++)
          for (let j = -1; j < 2; j++) reveal(copy[x + i][y + j]);
      }
    } else if (
      x === 0 &&
      x !== copy.length - 1 &&
      y !== 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = 0; i < 2; i++)
        for (let j = -1; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
      if (mines === 0)
        for (let i = 0; i < 2; i++)
          for (let j = -1; j < 2; j++) reveal(copy[x + i][y + j]);
    } else if (
      x !== 0 &&
      x === copy.length - 1 &&
      y !== 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = -1; i < 1; i++)
        for (let j = -1; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;

      if (mines === 0)
        for (let i = -1; i < 1; i++)
          for (let j = -1; j < 2; j++) reveal(copy[x + i][y + j]);
    } else if (
      x !== 0 &&
      x !== copy.length - 1 &&
      y === 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = -1; i < 2; i++)
        for (let j = 0; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;

      if (mines === 0)
        for (let i = -1; i < 2; i++)
          for (let j = 0; j < 2; j++) reveal(copy[x + i][y + j]);
    } else if (
      x !== 0 &&
      x !== copy.length - 1 &&
      y !== 0 &&
      y === copy[0].length - 1
    ) {
      for (let i = -1; i < 2; i++)
        for (let j = -1; j < 1; j++) if (copy[x + i][y + j].val === 1) mines++;

      if (mines === 0)
        for (let i = -1; i < 2; i++)
          for (let j = -1; j < 1; j++) reveal(copy[x + i][y + j]);
    } */

    copy[cell.x][cell.y] = {
      val: 2,
      x: cell.x,
      y: cell.y,
      marca: cell.marca,
      mines: mines,
    };
    setState(copy);

    endGame();
  };

  const reveal = (cell) => {
    let x = cell.x;
    let y = cell.y;
    let mines = 0;
    let copy = [...state];

    /*  for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++; */
    if (x === 0 && y === 0) {
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (x === 0 && y === copy.length - 1) {
      for (let i = 0; i < 2; i++)
        for (let j = -1; j < 1; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (x === copy[0].length - 1 && y === 0) {
      for (let i = -1; i < 1; i++)
        for (let j = 0; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (x === copy.length - 1 && y === copy[0].length - 1) {
      for (let i = -1; i < 1; i++)
        for (let j = -1; j < 1; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (
      x !== 0 &&
      x !== copy.length - 1 &&
      y !== 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = -1; i < 2; i++)
        for (let j = -1; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (
      x === 0 &&
      x !== copy.length - 1 &&
      y !== 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = 0; i < 2; i++)
        for (let j = -1; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (
      x !== 0 &&
      x === copy.length - 1 &&
      y !== 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = -1; i < 1; i++)
        for (let j = -1; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (
      x !== 0 &&
      x !== copy.length - 1 &&
      y === 0 &&
      y !== copy[0].length - 1
    ) {
      for (let i = -1; i < 2; i++)
        for (let j = 0; j < 2; j++) if (copy[x + i][y + j].val === 1) mines++;
    } else if (
      x !== 0 &&
      x !== copy.length - 1 &&
      y !== 0 &&
      y === copy[0].length - 1
    ) {
      for (let i = -1; i < 2; i++)
        for (let j = -1; j < 1; j++) if (copy[x + i][y + j].val === 1) mines++;
    }

    copy[cell.x][cell.y] = {
      val: 2,
      x: cell.x,
      y: cell.y,
      marca: cell.marca,
      mines: mines,
    };
    setState(copy);
  };

  const endGame = () => {
    for (var i = 0; i < state.length; i++) {
      for (var j = 0; j < state[0].length; j++) {
        if (state[i][j].val === 0) ban = false;
      }
    }
    if (ban) {
      alert('Ya ganaste we');
      window.location.reload();
    }
  };

  const handleRigthClick = (cell) => {
    if (!cell.marca) {
      if (cell.val === 1) {
        alert('Ya perdiste chavo');
        window.location.reload();
      } else {
        if (cell.val !== 2) surround(cell, [...state]);
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
                  ? 'd-inline-flex cell active'
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
