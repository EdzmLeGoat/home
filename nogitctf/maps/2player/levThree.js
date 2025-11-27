//groundpos is 525
let centerplath = 170;
let centerplaty = groundPos - centerplath - 20;
const lev3Platform1 = new Rectangle(
  canvCenter - 15,
  centerplaty,
  30,
  centerplath - 50,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centercol"
);

let hingeyshift = 100;
let hingewidth = 150;
const lev3Platform2 = new Rectangle(
  canvCenter - hingewidth / 2,
  centerplaty + hingeyshift,
  hingewidth,
  20,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3hinge1"
);
let bighingewidth = 200;
const lev3Platform3 = new Rectangle(
  canvCenter - bighingewidth / 2,
  lev3Platform1.y,
  bighingewidth,
  20,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3hinge1"
);

let tallplatdist = 550;
let tallplaty = groundPos - 140;
const lev3Platform7 = new Rectangle(
  canvCenter - tallplatdist,
  tallplaty,
  20,
  50,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3tallplat1"
);
const lev3Platform8 = new Rectangle(
  canvCenter + tallplatdist - 20,
  tallplaty,
  20,
  50,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3tallplat1"
);

let shortplatdist = 420;
let shortplaty = groundPos - 100;
let shortplath = 50;
const lev3Platform9 = new Rectangle(
  canvCenter - shortplatdist,
  shortplaty,
  20,
  shortplath,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3shortplat1"
);
const lev3Platform10 = new Rectangle(
  canvCenter + shortplatdist - 20,
  shortplaty,
  20,
  shortplath,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3shortplat1"
);

const lev3PlayerPos1 = [100, groundPos - gamePlayerOne.h - 20, true];
const lev3PlayerPos2 = [
  canvWidth - 100 - gamePlayerTwo.w,
  groundPos - gamePlayerTwo.h - 20,
  true,
];
const lev3PlayerPos = [lev3PlayerPos1, lev3PlayerPos2];

//object list used for drawing
const lev3ObjectList = [];
const lev3PlatformList = [];
const lev3DangerList = [];
const lev3MovePlats = [];
const lev3DangerMovePlats = [];

[leftBound, rightBound].forEach((bound) => {
  lev3PlatformList.push(bound);
});
[gamePlayerOne, gamePlayerTwo].forEach((thing) => {
  lev3ObjectList.push(thing);
});

const lev3Platforms = [
  ground,
  lev3Platform1,
  lev3Platform2,
  lev3Platform3,
  lev3Platform7,
  lev3Platform8,
  lev3Platform9,
  lev3Platform10,
];
lev3Platforms.forEach((platform) => {
  lev3PlatformList.push(platform);
  lev3ObjectList.push(platform);
});

const lev3MPlats = [];
lev3MPlats.forEach((platform) => {
  lev3MovePlats.push(platform);
  lev3ObjectList.push(platform);
  lev3PlatformList.push(platform);
});

const lev3DP = [];
lev3DP.forEach((platform) => {
  lev3DangerMovePlats.push(platform);
  lev3ObjectList.push(platform);
});
//clearRect needs to be added last

const lev3 = [
  lev3ObjectList,
  lev3PlatformList,
  lev3DangerList,
  lev3MovePlats,
  lev3DangerMovePlats,
  lev3PlayerPos,
  3,
];
levelList.push(lev3);
