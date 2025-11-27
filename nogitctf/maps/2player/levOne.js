firstPlatDist = 475;
lev1Platform1 = new Rectangle(
  canvCenter + firstPlatDist - 35,
  groundPos - 100,
  70,
  70,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall1"
);
lev1Platform2 = new Rectangle(
  canvCenter - firstPlatDist - 35,
  groundPos - 100,
  70,
  70,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall1"
);

lev1Platform3 = new Rectangle(
  canvCenter + firstPlatDist - 35,
  groundPos - 290,
  70,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall2"
);
lev1Platform4 = new Rectangle(
  canvCenter - firstPlatDist - 35,
  groundPos - 290,
  70,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall2"
);

lev1Platform19 = new Rectangle(
  canvCenter - firstPlatDist - 55 + 10,
  groundPos - 205,
  10,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "hinge1"
);
lev1Platform20 = new Rectangle(
  canvCenter + firstPlatDist + 55 - 20,
  groundPos - 205,
  10,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "hinge1"
);

lev1Platform23 = new Rectangle(
  canvCenter - firstPlatDist - 55 + 10 + lev1Platform1.w + 10,
  groundPos - 205,
  10,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "hinge2"
);
lev1Platform24 = new Rectangle(
  canvCenter + firstPlatDist + 55 - 20 - 10 - lev1Platform2.w,
  groundPos - 205,
  10,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "hinge2"
);

lev1Platform5 = new Rectangle(
  canvCenter + 150 - 25,
  groundPos - 160,
  50,
  60,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall3"
);
lev1Platform6 = new Rectangle(
  canvCenter - 150 - 25,
  groundPos - 160,
  50,
  60,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall3"
);

lev1Platform7 = new Rectangle(
  canvCenter + 150 - 10,
  groundPos - 100,
  20,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall4"
);
lev1Platform8 = new Rectangle(
  canvCenter - 150 - 10,
  groundPos - 100,
  20,
  100,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall4"
);

//   lev1Platform9 = new Rectangle(canvCenter-20, groundPos-205, 40, 15, render, 0, 0, 0, 1, false, "smallplat");
lev1Platform10 = new Rectangle(
  canvCenter - 60,
  groundPos - 100,
  120,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "bigplat"
);

lev1MovingPlatform1 = new MovingRectangle(
  canvCenter + 100 - 20,
  groundPos - 250,
  40,
  20,
  render,
  reddangerr,
  reddangerg,
  reddangerb,
  1,
  false,
  "reddanger",
  canvCenter + 100 - 20,
  canvCenter + 100 - 20,
  groundPos - 250,
  groundPos - 375,
  25,
  true
);
lev1MovingPlatform2 = new MovingRectangle(
  canvCenter + 100 - 10,
  groundPos - 250 + 19,
  20,
  40,
  render,
  reddangerr,
  reddangerg,
  reddangerb,
  1,
  false,
  "reddanger",
  canvCenter + 100 - 10,
  canvCenter + 100 - 10,
  groundPos - 250 + 19,
  groundPos - 375 + 19,
  25,
  true
);
lev1MovingPlatform3 = new MovingRectangle(
  canvCenter + 100 - 10,
  groundPos - 250 - 39,
  20,
  40,
  render,
  reddangerr,
  reddangerg,
  reddangerb,
  1,
  false,
  "reddanger",
  canvCenter + 100 - 10,
  canvCenter + 100 - 10,
  groundPos - 250 - 39,
  groundPos - 375 - 39,
  25,
  true
);

lev1MovingPlatform4 = new MovingRectangle(
  canvCenter - 100 - 20,
  groundPos - 250,
  40,
  20,
  render,
  bluedangerr,
  bluedangerg,
  bluedangerb,
  1,
  false,
  "bluedanger",
  canvCenter - 100 - 20,
  canvCenter - 100 - 20,
  groundPos - 250,
  groundPos - 375,
  25,
  true
);
lev1MovingPlatform5 = new MovingRectangle(
  canvCenter - 100 - 10,
  groundPos - 250 + 19,
  20,
  40,
  render,
  bluedangerr,
  bluedangerg,
  bluedangerb,
  1,
  false,
  "bluedanger",
  canvCenter - 100 - 10,
  canvCenter - 100 - 10,
  groundPos - 250 + 19,
  groundPos - 375 + 19,
  25,
  true
);
lev1MovingPlatform6 = new MovingRectangle(
  canvCenter - 100 - 10,
  groundPos - 250 - 39,
  20,
  40,
  render,
  bluedangerr,
  bluedangerg,
  bluedangerb,
  1,
  false,
  "bluedanger",
  canvCenter - 100 - 10,
  canvCenter - 100 - 10,
  groundPos - 250 - 39,
  groundPos - 375 - 39,
  25,
  true
);

smallPlatSZDist = 585;
lev1Platform11 = new Rectangle(
  canvCenter + smallPlatSZDist - 20,
  groundPos - 100,
  40,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall5"
);
lev1Platform12 = new Rectangle(
  canvCenter - smallPlatSZDist - 20,
  groundPos - 100,
  40,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall5"
);

middleDist = 315;
//   lev1Platform13 = new Rectangle(canvCenter+middleDist-12, groundPos-140,25,60, render, 0, 0, 0, 1, false, "wall6");
//   lev1Platform17 = new Rectangle(canvCenter+middleDist-12, groundPos-290,25,80, render, 0, 0, 0, 1, false, "wall6");
lev1Platform21 = new Rectangle(
  canvCenter + middleDist - 25,
  groundPos - 160,
  50,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall6"
);

//   lev1Platform14 = new Rectangle(canvCenter-middleDist-12, groundPos-140,25,60, render, 0, 0, 0, 1, false, "wall6");
//   lev1Platform18 = new Rectangle(canvCenter-middleDist-12, groundPos-290,25,80, render, 0, 0, 0, 1, false, "wall6");
lev1Platform22 = new Rectangle(
  canvCenter - middleDist - 25,
  groundPos - 160,
  50,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wall6"
);

lev1centerBorderThing = new Rectangle(
  canvCenter - 15,
  0,
  30,
  200,
  render,
  0,
  0,
  0,
  1,
  false,
  "bordertop"
);

lev1PlayerPos1 = [
  canvCenter - smallPlatSZDist - gamePlayerOne.w / 2,
  groundPos - 100 - gamePlayerOne.h,
  true,
];
lev1PlayerPos2 = [
  canvCenter + smallPlatSZDist - gamePlayerTwo.w / 2,
  groundPos - 100 - gamePlayerTwo.h,
  true,
];
lev1PlayerPos = [lev1PlayerPos1, lev1PlayerPos2];

//object list used for drawing
lev1ObjectList = [];
lev1PlatformList = [];
lev1DangerList = [];
lev1MovePlats = [];
lev1DangerMovePlats = [];

// Use spread operator for better performance than forEach
lev1PlatformList.push(...[leftBound, rightBound]);
lev1ObjectList.push(...[gamePlayerOne, gamePlayerTwo]);

lev1Platforms = [
  ground,
  lev1Platform1,
  lev1Platform2,
  lev1Platform3,
  lev1Platform4,
  lev1Platform5,
  lev1Platform6,
  lev1Platform7,
  lev1Platform8,
  lev1Platform10,
  lev1Platform11,
  lev1Platform12,
  lev1Platform19,
  lev1Platform20,
  lev1Platform21,
  lev1Platform22,
  lev1Platform23,
  lev1Platform24,
  lev1centerBorderThing,
];
// Use spread operator instead of forEach for better performance
lev1PlatformList.push(...lev1Platforms);
lev1ObjectList.push(...lev1Platforms);

lev1MPlats = [];
if (lev1MPlats.length > 0) {
  lev1MovePlats.push(...lev1MPlats);
  lev1ObjectList.push(...lev1MPlats);
  lev1PlatformList.push(...lev1MPlats);
}

lev1DP = [
  lev1MovingPlatform1,
  lev1MovingPlatform2,
  lev1MovingPlatform3,
  lev1MovingPlatform4,
  lev1MovingPlatform5,
  lev1MovingPlatform6,
];
lev1DangerMovePlats.push(...lev1DP);
lev1ObjectList.push(...lev1DP);
//clearRect needs to be added last

lev1 = [
  lev1ObjectList,
  lev1PlatformList,
  lev1DangerList,
  lev1MovePlats,
  lev1DangerMovePlats,
  lev1PlayerPos,
  1,
];
levelList.push(lev1);
