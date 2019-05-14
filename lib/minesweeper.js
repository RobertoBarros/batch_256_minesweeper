const rows = 5;
const cols = 5;
const minesCount= 5;
const mines = [];

const plantMines = () => {
  for(let i = 0; i < minesCount; i+= 1) {
    mines.push([Math.floor(Math.random() * rows),Math.floor(Math.random() * cols)]);
  }

  console.log(`mines in ${mines}`);
}

const hasMine = (row, col) => {
  let mine = false;
  mines.forEach((m) => {
    if(m[0] === row && m[1] === col) { mine = true}
  });
  return mine;
}

const countNeighborsMines = (row, col) => {
  let count = 0;
  if(hasMine(row-1, col-1)) { count += 1; }
  if(hasMine(row-1, col)) { count += 1; }
  if(hasMine(row-1, col+1)) { count += 1; }

  if(hasMine(row, col-1)) { count += 1; }
  if(hasMine(row, col+1)) { count += 1; }

  if(hasMine(row+1, col-1)) { count += 1; }
  if(hasMine(row+1, col)) { count += 1; }
  if(hasMine(row+1, col+1)) { count += 1; }

  return count;
}

const openTile = (tile) => {
  tile.classList.remove('unopened');

  const col = tile.cellIndex;
  const row = tile.parentElement.rowIndex;

  if (hasMine(row, col)) {
    tile.classList.add('mine');
  }
  else
  {
    const count = countNeighborsMines(row, col);
    if( count > 0) {
      tile.classList.add(`mine-neighbour-${count}`);
    } else {
      tile.classList.add('opened');
    }

  }

}

const grid = () => {
  const table = document.createElement('table');
  table.setAttribute('id', 'minesweeper');

  for(let i = 0; i < rows; i+= 1) {
    const row = document.createElement('tr');

    for(let j = 0; j < rows; j+= 1) {
      const tile = document.createElement('td');
      tile.classList.add('unopened');

      tile.addEventListener('click',()=>{
        openTile(tile)
      });

      row.appendChild(tile);
    }

    table.appendChild(row);
  }

  return table;
}

plantMines();
const game = document.getElementById('game');
game.appendChild(grid());
