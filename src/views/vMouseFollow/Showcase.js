import { GLManager } from './GLManager';

function Showcase(data, options = {}) {
  this.GL = new GLManager(data);
  this.GL.createPlan();
}

Showcase.prototype.render = function() {
  this.GL.render();
};

Showcase.prototype.mount = function(container) {
  this.GL.mount(container);
};

Showcase.prototype.updateStickEffect = function(progress) {
  console.log('Showcase / progress: ', progress);
};

// eslint-disable-next-line import/prefer-default-export
export { Showcase };
