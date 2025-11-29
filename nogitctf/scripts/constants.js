//canvas constants
//hello
const canvas = document.getElementById("myCanvas");
const render = canvas.getContext("2d");

const resetColor = () => {
  render.fillStyle = "black";
};

const shift = 0;
const canvWidth = canvas.width;
const canvHeight = canvas.height;
const canvCenter = canvWidth / 2;
const groundPos = 525;
const animations = [];

const startingLevelIndex = 2;
const numLevels = 4;

const threePlayerStartingIndex = 0;
const threePlayerNumLevels = 1;
const threePlayerMaxScore = 60;

let numPlayers = 2;

//gameplay constants
const movementSpeed = 1;

const maxVel = 4.5;

const friction = 0.91;

const fps = 60;
const targetFrameTime = 1000 / fps;

const knockback = 0.3;

const jump = 9;

const gravity = 0.35;

const smash = 9;

const quadraticSmash = false;

const smashStop = 0.9;

const revivalTimeout = 3.5;

const initialTimeout = 1;

const headBoost = 1.3;

const maxScore = 5;

const framesNecessaryToScore = 4;

const wallPushback = 4;

const pushMaxVelMultiplication = 4;

const wallVertBoost = 0.7;

const pushbackFrames = 3;

const platformSpeed = 48;

const initialScoreDelay = 3;

//stylistic constants
const backgroundTransparency = 0.55;
const outlineWidth = 1;
const reboundWidth = 2;
const transitionSpeed = 5;
const flashFrames = fps / 2;

//player constants
const playerVisibility = 0.3;
let flagSpeedDebuff = 0.94;

let flaggedSpeed = movementSpeed * flagSpeedDebuff;
let flaggedMaxVel = maxVel * flagSpeedDebuff;
const playerSize = 20;
const gamePlayerOne = new Player(
  100,
  groundPos - playerSize,
  playerSize,
  playerSize,
  render,
  255,
  100,
  100,
  1,
  true,
  "white",
  0,
  0,
  "one",
  "w",
  "a",
  "s",
  "d",
  0
);
const gamePlayerTwo = new Player(
  1000,
  groundPos - playerSize,
  playerSize,
  playerSize,
  render,
  100,
  100,
  255,
  1,
  true,
  "white",
  0,
  0,
  "two",
  "i",
  "j",
  "k",
  "l",
  1
);
const gamePlayerThree = new Player(
  1000,
  groundPos - playerSize,
  playerSize,
  playerSize,
  render,
  100,
  255,
  100,
  1,
  true,
  "white",
  0,
  0,
  "three",
  "ArrowUp".toLowerCase(),
  "ArrowLeft".toLowerCase(),
  "ArrowDown".toLowerCase(),
  "ArrowRight".toLowerCase(),
  2
);

//level constants
const safeZoneSize = 80;

const ground = new Rectangle(
  0,
  groundPos,
  canvWidth,
  canvHeight - groundPos,
  render,
  0,
  0,
  0,
  1,
  false,
  "ground"
);

const leftBound = new Rectangle(
  0,
  0,
  shift,
  canvHeight,
  render,
  255,
  255,
  255,
  1,
  false,
  "left"
);
const rightBound = new Rectangle(
  canvWidth - shift,
  shift,
  canvHeight,
  groundPos,
  render,
  255,
  255,
  255,
  1,
  false,
  "right"
);

const red = new Rectangle(
  0,
  0,
  canvCenter,
  groundPos,
  render,
  255,
  0,
  0,
  backgroundTransparency,
  false,
  "red"
);
const blue = new Rectangle(
  canvCenter,
  0,
  canvCenter,
  groundPos,
  render,
  0,
  0,
  255,
  backgroundTransparency,
  false,
  "blue"
);
const gray = new Rectangle(
  0,
  0,
  canvWidth,
  groundPos,
  render,
  255,
  100,
  100,
  backgroundTransparency,
  false,
  "gray"
);
const redSafeZone = new Rectangle(
  0,
  0,
  safeZoneSize,
  groundPos,
  render,
  255,
  0,
  255,
  0.75,
  false,
  "redsafe"
);
const blueSafeZone = new Rectangle(
  canvWidth - safeZoneSize,
  0,
  safeZoneSize,
  groundPos,
  render,
  255,
  0,
  255,
  0.75,
  false,
  "redsafe"
);

const poleWidth = 10;

const redFlagx = 25;
const redFlagy = groundPos - 175;
const blueFlagx = canvWidth - 25 - poleWidth;
const blueFlagy = groundPos - 175;

const flagWidth = 35;
const redFlag = new Rectangle(
  redFlagx,
  redFlagy,
  poleWidth,
  50,
  render,
  40,
  0,
  0,
  0.5,
  false,
  "redflag"
);
const blueFlag = new Rectangle(
  blueFlagx,
  blueFlagy,
  poleWidth,
  50,
  render,
  40,
  0,
  0,
  0.5,
  false,
  "blueflag"
);

const redFlagImage = new Image();
const blueFlagImage = new Image();

redFlagImage.src = "assets/redflag.png";
blueFlagImage.src = "assets/blueflag.png";

const clearRect = new Rectangle(
  0,
  0,
  canvWidth,
  0,
  render,
  0,
  0,
  0,
  1,
  false,
  "transitioner"
);

const crownWidth = 20;
const crownHeight = 13;
const crownRect = new Rectangle(
  canvCenter - crownWidth / 2,
  10,
  crownWidth,
  crownHeight,
  render,
  255,
  255,
  0,
  0.3,
  false,
  "crown"
);
const crownImage = new Image();
crownImage.src = "assets/crown.png";

const levelList = [];
const threePlayerLevelList = [];

(() => {
  [
    "assets/blueflag.png",
    "assets/redflag.png",
    "assets/fs.png",
    "assets/nfs.png",
    "assets/lock.png",
    "assets/unlock.png",
    "assets/moonicon.png",
    "assets/sunicon.png",
    "assets/crown.png",
  ].map((imageSource) => {
    const img = new Image();
    img.src = imageSource;
  });
})();

const roundTo = (number, decimalPlaces) => {
  const factor = 10 ** decimalPlaces;
  return Math.round(number * factor) / factor;
};
