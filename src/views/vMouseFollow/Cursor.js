const lerp = function(a, b, n) {
  return (1 - n) * a + n * b;
};

const body = document.body;
const getMousePos = function(event) {
  let posX = 0;
  let posY = 0;

  if (!event) {
    event = window.event;
  }

  if (event.pageX || event.pageY) {
    posX = event.pageX;
    posY = event.pageY;
  } else if (event.clientX || event.clientY) {
    posX = event.clientX + body.scrollLeft + documentElement.scrollLeft;
    posY = event.clientY + body.scrollTop + documentElement.scrollTop;
  }

  return { x: posX, y: posY };
};

class Cursor {
  constructor(element, dot, circle) {
    this.DOM = {
      element,
      dot,
      circle,
    };

    this.bounds = {
      dot: this.DOM.dot.getBoundingClientRect(),
      circle: this.DOM.circle.getBoundingClientRect(),
    };

    this.scale = 1;
    this.opacity = 1;
    this.mousePos = { x: 0, y: 1 };
    this.lastMousePos = {
      dot: {
        x: 0,
        y: 0,
      },
      circle: {
        x: 0,
        y: 0,
      },
    };
    this.lastScale = 1;

    this.initEvents();
    requestAnimationFrame(() => this.render());
  }

  initEvents() {
    window.addEventListener('mousemove', (event) => {
      // console.log(`pageY: ${event.pageY} / clientY: ${event.clientY}`);
      // console.log('scrollLeft value: ', document.body.scrollTop);
      // console.log('document.documentElement.scrollTop: ', document.documentElement.scrollTop);
      this.mousePos = getMousePos(event);
    });
  }

  render() {
    // console.log(`x: ${this.mousePos.x} / y: ${this.mousePos.y}`);
    this.lastMousePos.dot.x = lerp(this.lastMousePos.dot.x, this.mousePos.x - this.bounds.dot.width / 2, 1);
    this.lastMousePos.dot.y = lerp(this.lastMousePos.dot.y, this.mousePos.y - this.bounds.dot.height / 2, 1);
    this.lastMousePos.circle.x = lerp(this.lastMousePos.circle.x, this.mousePos.x - this.bounds.circle.width / 2, 0.15);
    this.lastMousePos.circle.y = lerp(this.lastMousePos.circle.y, this.mousePos.y - this.bounds.circle.height / 2, 0.15);
    this.lastScale = lerp(this.lastScale, this.scale, 0.15);

    this.DOM.dot.style.transform = `translateX(${this.lastMousePos.dot.x}px) translateY(${this.lastMousePos.dot.y}px)`;
    this.DOM.circle.style.transform = `translateX(${this.lastMousePos.circle.x}px) translateY(${this.lastMousePos.circle.y}px) scale(${this.lastScale})`;
    requestAnimationFrame(() => this.render());
  }

  enter() {
    this.scale = 1.5;
    this.DOM.dot.style.display = 'none';
  }

  leave() {
    this.scale = 1.0;
    this.DOM.dot.style.display = '';
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Cursor };
