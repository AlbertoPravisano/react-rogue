import React from "react";
import InputManager, { actions } from "./model/InputManager";
import Spawner, { lootTable, monsterTable } from "./model/Spawner";
import { stairsAttribute } from "./model/Stairs";
import World from "./model/World";

/**
 * @typedef {object} Props
 * @property {number} width Width of the canvas
 * @property {number} height Height of the canvas
 * @property {number} tileSize size of the tile
 */

/**
 *
 * @type {React.FC<Props>}
 * @see https://www.udemy.com/course/react-learn-react-with-hooks-by-creating-a-roguelike-game/
 */
const ReactRogue = ({ width, height, tileSize }) => {
  const canvasRef = React.useRef();
  const [world, setWorld] = React.useState(new World(width, height, tileSize));
  const inputManager = new InputManager();

  const handleInput = (action, data) => {
    if (action === actions.MOVE) {
      const newWorld = new World();
      Object.assign(newWorld, world);
      newWorld.movePlayer(data.x, data.y);
      setWorld(newWorld);
    }
  };

  React.useEffect(() => {
    const newWorld = new World();
    Object.assign(newWorld, world);
    newWorld.createCellularMap();
    newWorld.moveToSpace(world.player);
    let spawner = new Spawner(newWorld);
    spawner.spawnLoot(10);
    spawner.spawnMonster(8);
    spawner.spawnStairs();
    setWorld(newWorld);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);

    var pane = document.getElementById("legend");
    pane.scrollTop = pane.offsetHeight;

    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    };
  });

  React.useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(
      0,
      0,
      world.width * world.tileSize,
      world.height * world.tileSize
    );
    world.draw(ctx);
  });

  return (
    <div style={{ display: "flex", height: world.height * world.tileSize }}>
      <div style={{ flex: "40%", padding: "10px" }}>
        <canvas
          ref={canvasRef}
          width={world.width * world.tileSize}
          height={world.height * world.tileSize}
          style={{ border: "1px solid black", background: "DimGrey" }}
        />
      </div>

      <div style={{ flex: "60%", padding: "10px" }}>
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "black",
            height: "20%",
            marginBottom: "1em",
            display: "flex",
          }}
        >
          <span style={{ color: "white" }}>Legend:</span>
          <div style={{ flex: "30%" }}>{renderLegend()}</div>
          <div style={{ flex: "30%" }}>{renderMonsters()}</div>
          <div style={{ flex: "30%" }}>{renderStairs()}</div>
        </div>
        <div
          id="legend"
          style={{
            border: "1px solid black",
            overflowY: "scroll",
            height: "80%",
          }}
        >
          History:
          {renderHistory(world.history)}
        </div>
      </div>
    </div>
  );
};

export default ReactRogue;

const renderLegend = () => (
  <ul>
    {lootTable.map((loot, index) => (
      <li key={index} style={{ color: loot.color }}>
        {loot.ascii}: {loot.name}
      </li>
    ))}
  </ul>
);

const renderMonsters = () => (
  <ul>
    {monsterTable.map((monster, index) => (
      <li key={index} style={{ color: monster.color }}>
        {monster.ascii}: {monster.name} (Health: {monster.health})
      </li>
    ))}
  </ul>
);

const renderStairs = () => (
  <ul>
    <li style={{ color: "white" }}>{">"}: Stairs</li>
  </ul>
);

const renderHistory = (history) => {
  return (
    <ul>
      {history.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
};
