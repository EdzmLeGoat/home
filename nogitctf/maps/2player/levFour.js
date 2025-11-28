//groundpos is 525
lev4Platform1 = new Rectangle(
  canvCenter - 12,
  groundPos - 110,
  24,
  80,
  render,
  0,
  0,
  0,
  1,
  false,
  "4center"
);
lev4Platform8 = new Rectangle(
  canvCenter - 12,
  groundPos - 250,
  24,
  80,
  render,
  0,
  0,
  0,
  1,
  false,
  "4center"
);

lev4smalldist = 135;
lev4Platform2 = new Rectangle(
  canvCenter + lev4smalldist - 15,
  groundPos - 180,
  15,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "4smolright"
);
lev4Platform3 = new Rectangle(
  lev4Platform2.x - 10,
  lev4Platform2.y,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeright1"
);
lev4Platform4 = new Rectangle(
  lev4Platform2.x + lev4Platform2.w,
  lev4Platform2.y,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeright2"
);
lev4Platform9 = new Rectangle(
  lev4Platform2.x - 10,
  lev4Platform2.y + lev4Platform2.h - 10,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeright3"
);
lev4Platform10 = new Rectangle(
  lev4Platform2.x + lev4Platform2.w,
  lev4Platform2.y + lev4Platform2.h - 10,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeright4"
);

lev4Platform5 = new Rectangle(
  canvCenter - lev4smalldist,
  groundPos - 180,
  15,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "4smolleft"
);
lev4Platform6 = new Rectangle(
  lev4Platform5.x - 10,
  lev4Platform5.y,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeleft1"
);
lev4Platform7 = new Rectangle(
  lev4Platform5.x + lev4Platform5.w,
  lev4Platform5.y,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeleft2"
);
lev4Platform11 = new Rectangle(
  lev4Platform5.x - 10,
  lev4Platform5.y + lev4Platform5.h - 10,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeleft3"
);
lev4Platform12 = new Rectangle(
  lev4Platform5.x + lev4Platform5.w,
  lev4Platform5.y + lev4Platform5.h - 10,
  10,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4ledgeleft4"
);

closeDist = 310;
closeSpeeds = 1.2;

bottomBound = groundPos - 100;
topBound = groundPos - 180;
lev4CloseVert1 = new MovingRectangle(
  canvCenter + closeDist - 15,
  bottomBound,
  15,
  60,
  render,
  0,
  0,
  0,
  1,
  false,
  "4closevert1",
  canvCenter + closeDist - 15,
  canvCenter + closeDist - 15,
  bottomBound,
  topBound,
  closeSpeeds,
  false
);
lev4CloseVert2 = new MovingRectangle(
  canvCenter - closeDist,
  bottomBound,
  15,
  60,
  render,
  0,
  0,
  0,
  1,
  false,
  "4closevert2",
  canvCenter + closeDist,
  canvCenter + closeDist,
  bottomBound,
  topBound,
  closeSpeeds,
  false
);

farDist = 410;
farSpeeds = 1.3;

lev4FarVert1 = new MovingRectangle(
  canvCenter + farDist - 15,
  topBound,
  15,
  60,
  render,
  0,
  0,
  0,
  1,
  false,
  "4closevert1",
  canvCenter + farDist - 15,
  canvCenter + farDist - 15,
  topBound,
  bottomBound + 10,
  farSpeeds,
  false
);
lev4FarVert2 = new MovingRectangle(
  canvCenter - farDist,
  topBound,
  15,
  60,
  render,
  0,
  0,
  0,
  1,
  false,
  "4closevert2",
  canvCenter - farDist,
  canvCenter - farDist,
  topBound,
  bottomBound + 10,
  farSpeeds,
  false
);
veryfardist = 605;
veryfarwidth = 60;
lev4Platform13 = new Rectangle(
  canvCenter - veryfardist,
  groundPos - 90,
  veryfarwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4veryfarleft"
);
lev4Platform14 = new Rectangle(
  canvCenter + veryfardist - veryfarwidth,
  groundPos - 90,
  veryfarwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "4veryfarright"
);

lev4PlayerPos1 = [100, groundPos - gamePlayerOne.h - 20, true];
lev4PlayerPos2 = [
  canvWidth - 100 - gamePlayerTwo.w,
  groundPos - gamePlayerTwo.h - 20,
  true,
];
lev4PlayerPos = [lev4PlayerPos1, lev4PlayerPos2];

//object list used for drawing
lev4ObjectList = [];
lev4PlatformList = [];
lev4DangerList = [];
lev4MovePlats = [];
lev4DangerMovePlats = [];

[leftBound, rightBound].forEach((bound) => {
  lev4PlatformList.push(bound);
});
[gamePlayerOne, gamePlayerTwo].forEach((thing) => {
  lev4ObjectList.push(thing);
});

lev4Platforms = [
  ground,
  lev4Platform1,
  lev4Platform2,
  lev4Platform3,
  lev4Platform4,
  lev4Platform5,
  lev4Platform6,
  lev4Platform7,
  lev4Platform8,
  lev4Platform9,
  lev4Platform10,
  lev4Platform11,
  lev4Platform12,
  lev4Platform13,
  lev4Platform14,
];
lev4Platforms.forEach((platform) => {
  lev4PlatformList.push(platform);
  lev4ObjectList.push(platform);
});

lev4MPlats = [lev4CloseVert1, lev4CloseVert2, lev4FarVert1, lev4FarVert2];
lev4MPlats.forEach((platform) => {
  lev4MovePlats.push(platform);
  lev4ObjectList.push(platform);
  lev4PlatformList.push(platform);
});

lev4DP = [];
lev4DP.forEach((platform) => {
  lev4DangerMovePlats.push(platform);
  lev4ObjectList.push(platform);
});
//clearRect needs to be added last

lev4 = [
  lev4ObjectList,
  lev4PlatformList,
  lev4DangerList,
  lev4MovePlats,
  lev4DangerMovePlats,
  lev4PlayerPos,
  4,
];
levelList.push(lev4);
