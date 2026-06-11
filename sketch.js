// Moving stars background behind info
//this is claude I wanted to revamp the starfield from my freshman year portfolio so I implemented a new version here with AI.
new p5(function (p) {
  const STAR_COUNT = 1000;
  const stars = [];

  function Star() {
    this.reset = function (born) {
      this.x = p.random(p.width);
      this.y = born ? p.random(p.height) : p.random(-10, -2);
      this.z = p.random(0.2, 1.2); 
      this.speed = p.random(0.3, 1.2) * this.z;
      this.size = p.random(0.8, 2.5) * this.z;
      this.alpha = p.random(120, 255);
    };
    this.reset(true);

    this.update = function () {
      this.y += this.speed;
      if (this.y > p.height + 5) this.reset(false);
    };

    this.draw = function () {
      p.noStroke();
      p.fill(180, 195, 220, this.alpha * 0.6);
      p.ellipse(this.x, this.y, this.size, this.size);
    };
  }

  p.setup = function () {
    const cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    cnv.parent('starCanvas');
    cnv.style('position', 'fixed');
    cnv.style('top', '0');
    cnv.style('left', '0');
    cnv.style('z-index', '-1');
    cnv.style('pointer-events', 'none');

  
    const existing = document.getElementById('starCanvas');
    if (existing && existing !== cnv.elt) {
      existing.replaceWith(cnv.elt);
      cnv.elt.id = 'starCanvas';
    }

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }
  };

  p.draw = function () {
    p.background(13, 27, 42);
    for (let s of stars) {
      s.update();
      s.draw();
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}, document.body);
