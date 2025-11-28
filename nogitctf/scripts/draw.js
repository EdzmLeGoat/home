class Drawn {
  constructor(renderer, red, green, blue, alpha, outlineChoice, name) {
    this.rend = renderer;
    this.r = red;
    this.g = green;
    this.b = blue;
    this.a = alpha;
    this.outline = outlineChoice;
    this.n = name;
  }

  fillColor = () => {
    this.rend.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.a})`;
  };
}

class Rectangle extends Drawn {
  constructor(
    xpos,
    ypos,
    width,
    height,
    renderer,
    red,
    green,
    blue,
    alpha,
    outlineChoice,
    name
  ) {
    super(renderer, red, green, blue, alpha, outlineChoice, name);
    this.x = xpos;
    this.y = ypos;
    this.w = width;
    this.h = height;
    this.ow = 0;
  }
  drawSelf = () => {
    this.fillColor();
    this.rend.beginPath();
    this.rend.rect(this.x, this.y, this.w, this.h);
    this.rend.fill();
    if (this.outline) {
      this.rend.lineWidth = this.ow;
      this.rend.stroke();
    }
  };
}

class Player extends Rectangle {
  constructor(
    xpos,
    ypos,
    width,
    height,
    renderer,
    red,
    green,
    blue,
    alpha,
    outlineChoice,
    outlineColor,
    xvelocity,
    yvelocity,
    name,
    upKey,
    leftKey,
    downKey,
    rightKey,
    index
  ) {
    super(
      xpos,
      ypos,
      width,
      height,
      renderer,
      red,
      green,
      blue,
      alpha,
      outlineChoice,
      name
    );
    this.xvel = xvelocity;
    this.yvel = yvelocity;
    this.oc = outlineColor;
    this.rk = rightKey;
    this.lk = leftKey;
    this.uk = upKey;
    this.dk = downKey;
    this.movementSpeed = movementSpeed;
    this.maxVel = maxVel;
    this.flagged = false;
    this.index = index;
    this.ow = outlineWidth;
  }
  updateX = () => {
    this.x += this.xvel;
  };
  updateY = () => {
    this.y += this.yvel;
  };

  drawSelf = () => {
    this.fillColor();
    this.rend.beginPath();
    this.rend.rect(this.x, this.y, this.w, this.h);
    this.rend.fill();
    if (this.outline) {
      this.rend.lineWidth = this.ow;
      this.rend.strokeStyle = this.oc;
      this.rend.stroke();
    }
  };
}

class MovingRectangle extends Rectangle {
  constructor(
    xpos,
    ypos,
    width,
    height,
    renderer,
    red,
    green,
    blue,
    alpha,
    outlineChoice,
    name,
    xstart,
    xend,
    ystart,
    yend,
    speed,
    smooth
  ) {
    super(
      xpos,
      ypos,
      width,
      height,
      renderer,
      red,
      green,
      blue,
      alpha,
      outlineChoice,
      name
    );
    this.xs = xstart;
    this.xe = xend;
    this.ys = ystart;
    this.ye = yend;
    this.sp = speed;
    this.sm = smooth;
    this.xvel = 0;
    this.yvel = 0;
  }

  updateX = () => {
    this.xvel = (this.xe - this.xs) / Math.round(platformSpeed * this.sp);
    this.x += this.xvel;
    if (Math.round(this.x) == Math.round(this.xe)) {
      let temp = this.xe;
      this.xe = this.xs;
      this.xs = temp;
    }
  };

  updateY = () => {
    this.yvel = (this.ye - this.ys) / Math.round(platformSpeed * this.sp);
    this.y += this.yvel;
    if (Math.round(this.y) == Math.round(this.ye)) {
      let temp = this.ye;
      this.ye = this.ys;
      this.ys = temp;
    }
  };

  updateXSmooth = () => {
    this.xvel = (this.xe - this.x) / this.sp;
    this.x += this.xvel;
    if (Math.round(this.x) == this.xe) {
      this.x = this.xe;
      let temp = this.xe;
      this.xe = this.xs;
      this.xs = temp;
    }
  };

  updateYSmooth = () => {
    this.yvel = (this.ye - this.y) / this.sp;
    this.y += this.yvel;
    if (Math.round(this.y) == this.ye) {
      this.y = this.ye;
      let temp = this.ye;
      this.ye = this.ys;
      this.ys = temp;
    }
  };
}

const drawEverything = (objects, dontDraw) => {
  render.clearRect(0, 0, canvas.width, canvas.height);
  if (dontDraw === undefined) {
    red.drawSelf();
    blue.drawSelf();
    if (numPlayers == 2) {
      redSafeZone.drawSelf();
      blueSafeZone.drawSelf();
    }
    // redFlag.drawSelf();
    // blueFlag.drawSelf();

    // Use traditional for loop for better performance
    for (let i = 0; i < objects.length; i++) {
      objects[i].drawSelf();
    }
    if (numPlayers == 2) {
      render.drawImage(
        redFlagImage,
        redFlag.x,
        redFlag.y,
        flagWidth,
        redFlag.h
      );
      render.drawImage(
        blueFlagImage,
        blueFlag.x - (flagWidth - poleWidth),
        blueFlag.y,
        flagWidth,
        blueFlag.h
      );
    } else {
      render.drawImage(
        crownImage,
        crownRect.x,
        crownRect.y,
        crownRect.w,
        crownRect.h
      );
      crownRect.drawSelf();
    }
  }
  clearRect.drawSelf();
};
