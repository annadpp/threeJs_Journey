import GUI from "lil-gui";

export default class Debug {
  constructor() {
    //debug gui on /#debug
    this.active = window.location.hash === "#debug";

    if (this.active) {
      this.ui = new GUI();
    }
  }
}
