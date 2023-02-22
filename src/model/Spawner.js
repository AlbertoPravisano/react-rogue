import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from "./Stairs";

export const lootTable = [
  { name: "Long Sword", color: "darkgrey", ascii: "/", offset: { x: 6, y: 3 } },
  { name: "Potion", color: "red", ascii: "!", offset: { x: 6, y: 3 } },
  { name: "Gold Coin", color: "yellow", ascii: "$", offset: { x: 6, y: 3 } },
  {
    name: "Light Armor",
    color: "lightgrey",
    ascii: "#",
    offset: { x: 6, y: 3 },
  },
];

const monsterTable = [
  {
    name: "Goblin",
    color: "green",
    ascii: "G",
    health: 3,
    offset: { x: 4, y: 3 },
  },
  {
    name: "Slime",
    color: "darkgreen",
    ascii: "S",
    health: 2,
    offset: { x: 3, y: 2 },
  },
  {
    name: "Ogre",
    color: "lightgrey",
    ascii: "O",
    health: 6,
    offset: { x: 2, y: 3 },
  },
  {
    name: "Dragon",
    color: "red",
    ascii: "D",
    health: 10,
    offset: { x: 2, y: 3 },
  },
];

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

class Spawner {
  constructor(world) {
    this.world = world;
  }

  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      const entity = createEntity();
      this.world.add(entity);
      this.world.moveToSpace(entity);
    }
  }

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Loot(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tileSize,
        lootTable[getRandomInt(lootTable.length)]
      );
    });
  }

  spawnMonster(spawnCount) {
    this.spawn(spawnCount, () => {
      return new Monster(
        getRandomInt(this.world.width - 1),
        getRandomInt(this.world.height - 1),
        this.world.tileSize,
        monsterTable[getRandomInt(monsterTable.length)]
      );
    });
  }

  spawnStairs() {
    this.spawn(1, () => {
      return new Stairs(
        getRandomInt(this.world.width - 10),
        getRandomInt(this.world.height - 10),
        this.world.tileSize
      );
    });
  }
}

export default Spawner;
