class CircularMover {
  constructor(torusSize, toriNumber, boxSize, colors, offsetAngle, diameter) {
    this.torusSize = torusSize;
    this.toriNumber = toriNumber;
    this.boxSize = boxSize;
    this.colors = colors;
    this.offsetAngle = offsetAngle;
    this.diameter = diameter;
    this.angle = 0;
    this.theta = 0;
  }

  update(theta) {
    this.theta = theta;
    this.angle = this.offsetAngle + 0.05 * theta;
    this.centerX = sin(this.theta) * diameter;
    this.centerY = cos(this.theta) * diameter + 100;
    this.centerZ = sin(this.theta * 2) * 100;
  }

  display() {
    push();
    let colorFrequency = 23;
    let colorIndex =
      floor(
        map(this.angle, 0, TWO_PI, 0, this.colors.length * colorFrequency)
      ) % this.colors.length;
    fill(this.colors[colorIndex]);
    noStroke();

    let offsetX = this.centerX + (sin(this.angle) * this.boxSize) / 2;
    let offsetY = this.centerY + (cos(this.angle) * this.boxSize) / 2;
    let offsetZ = this.centerZ + (sin(this.angle * 0.5) * this.boxSize) / 2;

    translate(offsetX, offsetY, offsetZ);
    rotateX(this.theta * 0.01);
    rotateY(this.theta * 0.02);

    for (let i = 0; i < this.toriNumber; i++) {
      push();
      let orbitAngle = (this.theta + (i * TWO_PI) / this.toriNumber) % TWO_PI;
      let orbitRadius = this.torusSize;
      let torusX = sin(orbitAngle) * orbitRadius;
      let torusY = cos(orbitAngle) * orbitRadius;
      translate(torusX, torusY, 0);
      torus(this.torusSize, this.torusSize / 10, 3, 3);
      pop();
    }
    pop();
  }
}
