import Entity from "./Entity";

class Loot extends Entity {
  action(verb, world) {
    if (verb === "bump") {
      world.player.addToInventory(this);
      world.addToHistory(`${this.attributes.name} added to inventory`);
      world.remove(this);
    }

    if (verb === "drop") {
      console.log("drop", this);
    }
  }
}

export default Loot;
