import { GLManager } from './GLManager';

function Showcase(data, options = {}) {
  this.GL = new GLManager(data);
  this.GL.createPlan();
}

// eslint-disable-next-line import/prefer-default-export
export { Showcase };
