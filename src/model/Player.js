import Entity from "./Entity";

class Player extends Entity {
  inventory = [];

  attributes = {
    name: "Player",
    ascii: "@",
    health: 10,
  };

  move(dx, dy) {
    if (this.attributes.health <= 0) {
      return;
    }
    this.x += dx;
    this.y += dy;
  }

  addToInventory(loot) {
    this.inventory.push(loot.attributes);
  }

  duplicate() {
    return new Player(this.x, this.y, this.size);
  }
}

export default Player;
