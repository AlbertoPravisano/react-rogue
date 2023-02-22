import Entity, { verbs } from "./Entity";
import Spawner from "./Spawner";

export const stairsAttribute = {
  name: "Stairs",
  color: "black",
  ascii: ">",
  offset: { x: 2, y: 2 },
};

class Stairs extends Entity {
  attributes = stairsAttribute;

  action(verb, world) {
    if (verb === verbs.BUMP) {
      world.addToHistory("You move downstairs...");
      world.floor = world.floor + 1;
      world.createCellularMap();
      world.resetEntities();
      world.moveToSpace(world.player);

      let spawner = new Spawner(world);
      spawner.spawnLoot(10);
      spawner.spawnMonster(8);
      spawner.spawnStairs();
    }
  }
}

export default Stairs;
