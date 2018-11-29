import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Board } from './board';
import { Player } from './player';

interface ITile {
  id?: any;
  isRevealed?: boolean;
  isMatched?: boolean;
  pattern?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  playerId = 1;
  playerName = 'Player1';
  playerScore = 0;
  title = 'retrogrid-dev';
  tileObject: ITile;
  tileX: any;
  tile: ITile;
  _tiles: Array<any> = [];
  pattern: Array<any> = [];
  playerTile: Array<any> = [];
  playerPattern: Array<any> = [];
  halfBoard: Array<any> = [];
  fullBoard: Array<any> = [];
  public game: any;
  board: any;
  boardPoints = 0;

  calculateBoardPoints(board: any) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let result = 0;
    board.forEach(function(element) {
      const _result = element.reduce(reducer);
      result = result + _result;
    });
    return result;
  }

  toggleCell(r: any, c: any) {
    let res = [];
    if (c <= 3) {
      this.board.tiles[r][c] = this.board.tiles[r][c] ? 0 : 1;
      this.halfBoard[r][c] = this.halfBoard[r][c] ? 0 : 1;
      const halfBoardRow = this.halfBoard[r];

      const xx = halfBoardRow.join('');
      const x_rev = this.reverseBinary(xx);
      const xxx = xx + x_rev;
      const z_xxx = xxx.toString().split('');
      res = z_xxx.map(v => parseInt(v, 10));
      this.fullBoard[r] = res;
    }
    this.checkIfRowMatches(res, r);
  }

  checkIfRowMatches(row: any, index: any): any {
    console.log(row, index);
    const tmp_GameRow = this.pattern[index].join('');
    console.log('tmp_GameRow: ', tmp_GameRow);

    const tmp_PlayerRow = row.join('');
    console.log('tmp_PlayerRow: ', tmp_PlayerRow);

    console.log(this.pattern[index]);
    if (tmp_GameRow === tmp_PlayerRow) {
      console.log('a match');
    } else {
      console.log('no match');
    }
  }
  reverseBinary(text: any) {
    const lines = text.split('\n');
    let output = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      output += line
        .split('')
        .reverse()
        .join('');
    }
    return output;
  }

  ngOnInit() {
    // console.log(this.createTile());
    this.pattern = this.createTile();
    this.playerTile = this.createPlayerTile();
    this.halfBoard = this.createHalfBoard();
    this.fullBoard = this.createPlayerTile();

    this.board = new Board({
      player: new Player({ id: this.playerId++ }),
      tiles: this.playerTile
    });
    this.boardPoints = this.calculateBoardPoints(this.pattern);
  }

  // createTileObject() {
  //   const _tile: ITile = {
  //     id: uuid.v4(),
  //     isRevealed: false,
  //     isMatched: false,
  //     pattern: this.createTile()
  //   };
  //   return _tile;
  // }

  createTiles() {
    const tiles = this.createTile();
    return tiles;
  }

  shuffleTile(o) {
    for (
      let j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    ) {}
    return o;
  }

  createPlayerTile() {
    const baseTile = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    // const copyOfBaseTile = baseTile;
    // const newTile = this.shuffleTile(copyOfBaseTile);
    return baseTile;
  }

  createHalfBoard() {
    const baseTile = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    // const copyOfBaseTile = baseTile;
    // const newTile = this.shuffleTile(copyOfBaseTile);
    return baseTile;
  }

  createTile() {
    const baseTile = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0, 0, 1, 0],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [0, 1, 1, 0, 0, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 1, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 1, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]
    ];
    const copyOfBaseTile = baseTile;
    const newTile = this.shuffleTile(copyOfBaseTile);
    return newTile.slice(0, 8);
  }
}
