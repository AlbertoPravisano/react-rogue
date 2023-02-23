import Entity, { verbs } from "./Entity";

class Monster extends Entity {
  action(verb, world) {
    if (verb === verbs.BUMP) {
      if (world.player.attributes.health > 0) {
        world.addToHistory(`Player attacks ${this.attributes.name}`);
        this.attributes.health =
          this.attributes.health - world.player.attributes.power;
      }
      if (this.attributes.health <= 0) {
        world.addToHistory(`${this.attributes.name} died!`);
        world.remove(this);
      } else {
        world.addToHistory(
          `${this.attributes.name}'s health: ${this.attributes.health}`
        );
        const indexArmorInventory = world.player.inventory.findIndex(
          (i) => i.name === "Light Armor"
        );
        if (indexArmorInventory >= 0) {
          world.addToHistory(
            "Your armor absorbed the damage and now is broken!"
          );
          world.player.inventory = world.player.inventory.filter(
            (_, index) => index !== indexArmorInventory
          );
        } else {
          world.player.attributes.health = world.player.attributes.health - 1;
          if (world.player.attributes.health <= 0) {
            world.addToHistory(
              `You have died! You have reached the floor ${world.floor}`
            );
          } else {
            world.addToHistory(
              `Your health is: ${world.player.attributes.health}`
            );
          }
        }
      }
    }
  }
}

export default Monster;
