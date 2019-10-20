const storeChildObject = {
  callbacks: new Set(),

  init() {
    chrome.runtime.onMessage.addListener((m) => {
      console.log("this?");
      this.messageHandler(m);
    });
  },

  update(data) {
    this.callbacks.forEach((callback) => {
      callback(data);
    });
  },

  onUpdate(callback) {
    console.log("a");
    this.callbacks.add(callback);
  },

  messageHandler(m) {
    console.log("thise");
    if (m.type !== 'storeChildCall') {
      console.log("here?");
      return;
    }
    console.log("m.args",m.args);
    const args = m.args;
    return this.update(...args);
  },

  parentMessage(method, ...args) {
    return chrome.runtime.sendMessage({
      type: 'storeCall',
      method,
      args
    });
  }
};

const storeChild = new Proxy(storeChildObject, {
  get(target, prop) {
    if (target[prop] === undefined) {
      return async function(...args)  {
        return await this.parentMessage(prop, ...args);
      };
    } else {
      return target[prop];
    }
  }
});

storeChild.init();
