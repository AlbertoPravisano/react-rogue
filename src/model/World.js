import { Map } from "rot-js";
import { verbs } from "./Entity";
import Player from "./Player";

class World {
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.entities = [new Player(0, 0, 16)];
    this.history = ["Your journey begins!"];
    this.floor = 1;

    this.worldmap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldmap[x] = new Array(this.height);
    }
  }

  resetEntities() {
    this.entities = [new Player(0, 0, 16)];
  }

  healPlayer() {
    const indexPotionInventory = this.player.inventory.findIndex(
      (i) => i.name === "Potion"
    );
    if (indexPotionInventory >= 0) {
      if (this.player.attributes.health < 10) {
        this.player.attributes.health = 10;
        this.player.inventory = this.player.inventory.filter(
          (_, index) => index !== indexPotionInventory
        );
        this.addToHistory("Player's health restored. Potion consumed");
      } else {
        this.addToHistory("Player's health alredy full");
      }
    } else {
      this.addToHistory("You don't have any potion to heal yourself!");
    }
  }

  addToHistory(text) {
    this.history.push(text);
    // if(this.history.length > 6) this.history.shift();
  }

  createCellularMap() {
    const map = new Map.Cellular(this.width, this.height, { connected: true });
    map.randomize(0.5);
    const userCallback = (x, y, value) => {
      if (x === 0 || y === 0 || x === this.width || y === this.height) {
        this.worldmap[x][y] = 1;
        return;
      }
      this.worldmap[x][y] = value === 0 ? 1 : 0;
    };
    map.create(userCallback);
    map.connect(userCallback, 1);
  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldmap[x][y] === 1) {
          this.drawWall(context, x, y);
        }
      }
    }
    this.entities.forEach((entity) => entity.draw(context));
  }

  drawWall(context, x, y) {
    context.fillStyle = "#000";
    context.fillRect(
      x * this.tileSize,
      y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }

  moveToSpace(entity) {
    for (let x = entity.x; x < this.width; x++) {
      for (let y = entity.y; y < this.height; y++) {
        if (this.worldmap[x][y] === 0 && !this.getEntityAtLocation(x, y)) {
          entity.x = x;
          entity.y = y;
          return;
        }
      }
    }
  }

  isWall(x, y) {
    return (
      this.worldmap[x] === undefined ||
      this.worldmap[y] === undefined ||
      this.worldmap[x][y] === 1
    );
  }

  get player() {
    return this.entities[0];
  }

  getEntityAtLocation(x, y) {
    return this.entities.find((entity) => entity.x === x && entity.y === y);
  }

  add(entity) {
    this.entities.push(entity);
  }

  remove(entity) {
    this.entities = this.entities.filter((e) => e !== entity);
  }

  movePlayer(dx, dy) {
    let p = this.player.duplicate();
    p.move(dx, dy);
    let entity = this.getEntityAtLocation(p.x, p.y);
    if (entity) {
      entity.action(verbs.BUMP, this);
      return;
    }

    if (!this.isWall(p.x, p.y)) {
      this.player.move(dx, dy);
    }
  }
}

export default World;
