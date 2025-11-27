//groundpos is 525
l5centerplatwidth = 80;
l5botcentery = groundPos - 120;
l5topcentery = l5botcentery - 100;

lev5Platform1 = new Rectangle(
  canvCenter - l5centerplatwidth / 2,
  l5topcentery,
  l5centerplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat1"
);

lev5Platform2 = new Rectangle(
  canvCenter - (l5centerplatwidth + 60) / 2,
  l5botcentery,
  l5centerplatwidth + 60,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat2"
);

l5farplatdist = 565;
l5farplatwidth = 80;
l5farplaty = groundPos - 150;
lev5Platform3 = new Rectangle(
  canvCenter - l5farplatdist - l5farplatwidth / 2,
  l5farplaty,
  l5farplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5midplat1"
);
lev5Platform4 = new Rectangle(
  canvCenter + l5farplatdist - l5farplatwidth / 2,
  l5farplaty,
  l5farplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5midplat1"
);
lev5Platform15 = new Rectangle(
  canvCenter - l5farplatdist - l5farplatwidth / 2,
  l5farplaty - 80,
  l5farplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5midplat1"
);
lev5Platform16 = new Rectangle(
  canvCenter + l5farplatdist - l5farplatwidth / 2,
  l5farplaty - 80,
  l5farplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5midplat1"
);
midfardist = 420;

lev5Platform5 = new Rectangle(
  canvCenter - midfardist,
  l5topcentery + 10,
  l5centerplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat1"
);

lev5Platform7 = new Rectangle(
  canvCenter + midfardist - l5centerplatwidth,
  l5topcentery + 10,
  l5centerplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat1"
);

middist = 200;
midshift = 50;
lev5Platform9 = new Rectangle(
  canvCenter - middist - l5centerplatwidth / 2,
  l5topcentery - midshift,
  l5centerplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat1"
);

lev5Platform10 = new Rectangle(
  canvCenter - middist - l5centerplatwidth / 2 - 20,
  l5botcentery - midshift,
  l5centerplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat2"
);
lev5Platform11 = new Rectangle(
  canvCenter + middist - l5centerplatwidth / 2,
  l5topcentery - midshift,
  l5centerplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat1"
);

lev5Platform12 = new Rectangle(
  canvCenter + middist - l5centerplatwidth / 2 + 20,
  l5botcentery - midshift,
  l5centerplatwidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev3centerplat2"
);
safewidth = 250;
lev5Platform13 = new Rectangle(
  0,
  groundPos - 80,
  safeZoneSize + safewidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5safeplatform"
);
lev5Platform14 = new Rectangle(
  canvWidth - safeZoneSize - safewidth,
  groundPos - 80,
  safeZoneSize + safewidth,
  10,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5safeplatform"
);

l5blockcolh = 120;
lev5BlockCol = new Rectangle(
  canvCenter - 10,
  groundPos - l5blockcolh,
  20,
  l5blockcolh,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5blockcolleft"
);
lowblockerleft = new Rectangle(
  redSafeZone.w,
  groundPos - 70,
  10,
  70,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5blockcolleft"
);
lowblockerright = new Rectangle(
  canvWidth - blueSafeZone.w - 10,
  groundPos - 70,
  10,
  70,
  render,
  0,
  0,
  0,
  1,
  false,
  "lev5blockcolright"
);

lev5PlayerPos1 = [100, groundPos - gamePlayerOne.h - 250, true];
lev5PlayerPos2 = [
  canvWidth - 100 - gamePlayerTwo.w,
  groundPos - gamePlayerTwo.h - 250,
  true,
];
lev5PlayerPos = [lev5PlayerPos1, lev5PlayerPos2];

//object list used for drawing
lev5ObjectList = [];
lev5PlatformList = [];
lev5DangerList = [];
lev5MovePlats = [];
lev5DangerMovePlats = [];

[leftBound, rightBound].forEach((bound) => {
  lev5PlatformList.push(bound);
});
[gamePlayerOne, gamePlayerTwo].forEach((thing) => {
  lev5ObjectList.push(thing);
});

lev5Platforms = [
  ground,
  lev5Platform1,
  lev5Platform2,
  lev5Platform3,
  lev5Platform4,
  lev5Platform5,
  lev5Platform7,
  lev5Platform9,
  lev5Platform10,
  lev5Platform11,
  lev5Platform12,
  lev5Platform13,
  lev5Platform14,
  lev5Platform15,
  lev5Platform16,
  lev5BlockCol,
  lowblockerleft,
  lowblockerright,
];
lev5Platforms.forEach((platform) => {
  lev5PlatformList.push(platform);
  lev5ObjectList.push(platform);
});

lev5Dangers = [];
lev5Dangers.forEach((platform) => {
  lev5DangerList.push(platform);
  lev5ObjectList.push(platform);
});

lev5MPlats = [];
lev5MPlats.forEach((platform) => {
  lev5MovePlats.push(platform);
  lev5ObjectList.push(platform);
  lev5PlatformList.push(platform);
});

lev5DP = [];
lev5DP.forEach((platform) => {
  lev5DangerMovePlats.push(platform);
  lev5ObjectList.push(platform);
});
//clearRect needs to be added last

lev5 = [
  lev5ObjectList,
  lev5PlatformList,
  lev5DangerList,
  lev5MovePlats,
  lev5DangerMovePlats,
  lev5PlayerPos,
  5,
];
levelList.push(lev5);
