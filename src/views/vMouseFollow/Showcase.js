import { GLManager } from './GLManager';

function Showcase(data, options = {}) {
  this.GL = new GLManager(data);
  this.GL.createPlan();
}

Showcase.prototype.render = function() {
  this.GL.render();
  this.GL.scheduleLoop();
};

Showcase.prototype.mount = function(container) {
  this.GL.mount(container);
};

Showcase.prototype.updateStickEffect = function(direction) {
  this.GL.updateStickEffect({ direction });
};

Showcase.prototype.updateTmp = function(value) {
  this.GL.updateTmp(value);
};

// eslint-disable-next-line import/prefer-default-export
export { Showcase };
