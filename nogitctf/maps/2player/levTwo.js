//groundpos is 525
lev2Platform1 = new Rectangle(
  canvCenter - 15,
  groundPos - 250,
  30,
  50,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2centercol"
);
lev2Platform2 = new Rectangle(
  canvCenter - 60,
  lev2Platform1.y - 15,
  60 * 2,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2centerhor"
);
lev2Platform3 = new Rectangle(
  canvCenter - 100,
  lev2Platform1.y + lev2Platform1.h,
  100 * 2,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2centerhorbig"
);

lev2Platform4 = new Rectangle(
  canvCenter - 15,
  groundPos - 135,
  30,
  70,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2centercolbelow"
);

txpos = canvCenter + 200;
txpos2 = canvCenter - 200;

lev2Platform5 = new Rectangle(
  txpos - 30,
  groundPos - 100,
  100,
  20,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2t1"
);
lev2Platform6 = new Rectangle(
  txpos2 - 70,
  groundPos - 100,
  100,
  20,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2t1"
);

lev2Platform7 = new Rectangle(
  txpos - 10,
  groundPos - 100,
  20,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2t2"
);
lev2Platform8 = new Rectangle(
  txpos2 - 10,
  groundPos - 100,
  20,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2t2"
);

vertxpos = canvCenter + 550;
vertxpos2 = canvCenter - 550;

lev2MovingVert1 = new MovingRectangle(
  vertxpos - 40,
  groundPos - 305,
  40 * 2,
  20,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2vert1",
  vertxpos - 40,
  vertxpos - 40,
  groundPos - 305,
  groundPos - 95,
  25,
  true
);
lev2MovingVert2 = new MovingRectangle(
  vertxpos2 - 40,
  groundPos - 305,
  40 * 2,
  20,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev2vert1",
  vertxpos2 - 40,
  vertxpos2 - 40,
  groundPos - 305,
  groundPos - 95,
  25,
  true
);

dangerxpos = canvCenter + 250;
dangerxpos2 = canvCenter - 250;

lev2MovingDanger1 = new MovingRectangle(
  dangerxpos - 10,
  groundPos - 225,
  20,
  80,
  render,
  reddangerr,
  reddangerg,
  reddangerb,
  1,
  false,
  "reddanger",
  dangerxpos - 20,
  dangerxpos - 20,
  groundPos - 225,
  groundPos - 225 - 50 * 3,
  1.58,
  false
);
lev2MovingDanger2 = new MovingRectangle(
  dangerxpos2 - 10,
  groundPos - 225,
  20,
  80,
  render,
  bluedangerr,
  bluedangerg,
  bluedangerb,
  1,
  false,
  "bluedanger",
  dangerxpos2 - 20,
  dangerxpos2 - 20,
  groundPos - 225,
  groundPos - 225 - 50 * 3,
  1.58,
  false
);

lev2centerBorderThing = new Rectangle(
  canvCenter - 15,
  0,
  30,
  75,
  render,
  0,
  0,
  0,
  1,
  false,
  "bordertop"
);

lev2PlayerPos1 = [100, groundPos - gamePlayerOne.h - 20, true];
lev2PlayerPos2 = [
  canvWidth - 100 - gamePlayerTwo.w,
  groundPos - gamePlayerTwo.h - 20,
  true,
];
lev2PlayerPos = [lev2PlayerPos1, lev2PlayerPos2];

//object list used for drawing
lev2ObjectList = [];
lev2PlatformList = [];
lev2DangerList = [];
lev2MovePlats = [];
lev2DangerMovePlats = [];

[leftBound, rightBound].forEach((bound) => {
  lev2PlatformList.push(bound);
});
[gamePlayerOne, gamePlayerTwo].forEach((thing) => {
  lev2ObjectList.push(thing);
});

lev2Platforms = [
  ground,
  lev2Platform1,
  lev2Platform2,
  lev2Platform3,
  lev2Platform4,
  lev2Platform5,
  lev2Platform6,
  lev2Platform7,
  lev2Platform8,
  lev2centerBorderThing,
];
lev2Platforms.forEach((platform) => {
  lev2PlatformList.push(platform);
  lev2ObjectList.push(platform);
});

lev2MPlats = [lev2MovingVert1, lev2MovingVert2];
lev2MPlats.forEach((platform) => {
  lev2MovePlats.push(platform);
  lev2ObjectList.push(platform);
  lev2PlatformList.push(platform);
});

lev2DP = [lev2MovingDanger1, lev2MovingDanger2];
lev2DP.forEach((platform) => {
  lev2DangerMovePlats.push(platform);
  lev2ObjectList.push(platform);
});
//clearRect needs to be added last

lev2 = [
  lev2ObjectList,
  lev2PlatformList,
  lev2DangerList,
  lev2MovePlats,
  lev2DangerMovePlats,
  lev2PlayerPos,
  2,
];
levelList.push(lev2);
