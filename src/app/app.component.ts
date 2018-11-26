import { Component, OnInit } from "@angular/core";
import * as uuid from "uuid";
import { Board } from "./board";
import { Player } from "./player";

interface ITile {
  id?: any;
  isRevealed?: boolean;
  isMatched?: boolean;
  pattern?: any;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  // columns: string[] = [];
  // rows: number[] = [];
  playerId = 1;

  title = "retrogrid-dev";
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

  log(r: any, c: any) {
    // console.log('Row ', r, ' ', 'Column ', c);
    this.board.tiles[r][c] = this.board.tiles[r][c] ? 0 : 1;
    this.halfBoard[r][c] = this.halfBoard[r][c] ? 0 : 1;
    let x = this.halfBoard[r];

    let xx = x.join("");
    let x_rev = this.reverseBinary(xx);
    let xxx = xx + x_rev;

    let z_xxx = xxx.toString().split("");
    let res = z_xxx.map(v => parseInt(v, 10));
    this.fullBoard[r] = res;

    console.log(this.fullBoard);
  }

  reverseBinary(text: any) {
    const lines = text.split("\n");
    let output = "";
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      output += line
        .split("")
        .reverse()
        .join("");
    }
    return output;
  }

  ngOnInit() {
    // console.log(this.createTile());
    this.pattern = this.createTile();
    this.playerTile = this.createPlayerTile();
    this.halfBoard = this.createHalfBoard();
    this.fullBoard = this.createPlayerTile();
    // console.log(this.pattern);
    // create board
    this.board = new Board({
      player: new Player({ id: this.playerId++ }),
      tiles: this.playerTile
    });
    // console.log(this.board);
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
    );
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
