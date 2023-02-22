import Entity, { verbs } from "./Entity";

class Loot extends Entity {
  action(verb, world) {
    if (verb === verbs.BUMP) {
      world.player.addToInventory(this);
      world.addToHistory(`${this.attributes.name} added to inventory`);
      world.remove(this);
    }

    if (verb === verbs.DROP) {
      console.log("drop", this);
    }
  }
}

export default Loot;
