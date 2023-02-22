export const actions = {
  MOVE: "move",
};

class InputManager {
  observers = [];

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(action, data) {
    this.observers.forEach((subscriber) => subscriber(action, data));
  }

  handleKeys = (e) => {
    e.preventDefault();
    switch (e.keyCode) {
      case 65:
      case 37: {
        // LEFT
        this.broadcast(actions.MOVE, { x: -1, y: 0 });
        break;
      }
      case 87:
      case 38: {
        // UP
        this.broadcast(actions.MOVE, { x: 0, y: -1 });
        break;
      }
      case 68:
      case 39: {
        // RIGHT
        this.broadcast(actions.MOVE, { x: 1, y: 0 });
        break;
      }
      case 83:
      case 40: {
        // DOWN
        this.broadcast(actions.MOVE, { x: 0, y: 1 });
        break;
      }
      default:
        break;
    }
  };

  bindKeys() {
    document.addEventListener("keydown", this.handleKeys);
  }

  unbindKeys() {
    document.removeEventListener("keydown", this.handleKeys);
  }
}

export default InputManager;
