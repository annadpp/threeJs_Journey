//this assumes experience fills the viewport -> modify code if that's not the case for project

import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
  constructor() {
    super(); //so we overwrite the EventEmitter constructor

    //Setup
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    //Resize event
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);

      this.trigger("resize");
    });
  }
}
