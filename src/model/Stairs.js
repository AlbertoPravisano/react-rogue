import Entity, { verbs } from "./Entity";
import Spawner from "./Spawner";

export const stairsAttribute = {
  name: "Stairs",
  color: "white",
  ascii: ">",
  offset: { x: 2, y: 2 },
};

class Stairs extends Entity {
  attributes = stairsAttribute;

  action(verb, world) {
    if (verb === verbs.BUMP) {
      if (!world.demonKing) {
        world.addToHistory("You move downstairs...");
        if (world.player.attributes.health < 10) {
          world.addToHistory("Your health is restored");
        }
        world.floor = world.floor + 1;
        world.createCellularMap();
        world.resetEntities();
        world.moveToSpace(world.player);

        let spawner = new Spawner(world);
        spawner.spawnLoot(10);
        spawner.spawnMonster(8);
        spawner.spawnStairs();
        if (world.floor % 5 === 0) {
          spawner.spawnBoss();
        }
      } else {
        world.addToHistory(
          "The Demon King doesn't let you leave! You must defeat him first."
        );
      }
    }
  }
}

export default Stairs;
