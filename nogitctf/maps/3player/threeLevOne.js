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

smallPlatSZDist = 600;
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
lev1LeftBorder = new Rectangle(
  0,
  groundPos - 800,
  5,
  800,
  render,
  0,
  0,
  0,
  1,
  false,
  "borderleft"
);
lev1RightBorder = new Rectangle(
  canvWidth - 5,
  groundPos - 800,
  5,
  800,
  render,
  0,
  0,
  0,
  1,
  false,
  "borderright"
);
movingPlatSpeed = 20;
movingPlatDist = 150;
movingPlatStart = groundPos - 250;
movingPlatEnd = groundPos - 400;
movingPlatWidth = 80;
leftMovingPlat = new MovingRectangle(
  canvCenter - movingPlatDist - movingPlatWidth / 2,
  movingPlatStart,
  movingPlatWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallmoving",
  canvCenter - movingPlatDist - movingPlatWidth / 2,
  canvCenter - movingPlatDist - movingPlatWidth / 2,
  movingPlatStart,
  movingPlatEnd,
  movingPlatSpeed,
  true
);
rightMovingPlat = new MovingRectangle(
  canvCenter + movingPlatDist - movingPlatWidth / 2,
  movingPlatStart,
  movingPlatWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallmoving",
  canvCenter + movingPlatDist - movingPlatWidth / 2,
  canvCenter + movingPlatDist - movingPlatWidth / 2,
  movingPlatStart,
  movingPlatEnd,
  movingPlatSpeed,
  true
);
lowerHighPlatDist = 350;
higherHighPlatDist = 500;
lowerHighPlatY = groundPos - 370;
higherHighPlatY = groundPos - 415;
highPlatWidth = 60;
leftLowerHighPlat = new Rectangle(
  canvCenter - lowerHighPlatDist - highPlatWidth / 2,
  lowerHighPlatY,
  highPlatWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallhigh"
);
rightLowerHighPlat = new Rectangle(
  canvCenter + lowerHighPlatDist - highPlatWidth / 2,
  lowerHighPlatY,
  highPlatWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallhigh"
);
leftHigherHighPlat = new Rectangle(
  canvCenter - higherHighPlatDist - highPlatWidth / 2,
  higherHighPlatY,
  highPlatWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallhigh"
);
rightHigherHighPlat = new Rectangle(
  canvCenter + higherHighPlatDist - highPlatWidth / 2,
  higherHighPlatY,
  highPlatWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallhigh"
);

highsideY = groundPos - 340;
highsideWidth = 40;
highsideDist = 670;
leftHighSidePlat = new Rectangle(
  canvCenter - highsideDist - highsideWidth / 2,
  highsideY,
  highsideWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallhighside"
);
rightHighSidePlat = new Rectangle(
  canvCenter + highsideDist - highsideWidth / 2,
  highsideY,
  highsideWidth,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "wallhighside"
);
lev1Platform25 = new Rectangle(
  canvCenter - 40,
  groundPos - 230,
  80,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "high middle plat"
);
lev1Platform26 = new Rectangle(
  canvCenter - 30,
  groundPos - 340,
  60,
  15,
  render,
  0,
  0,
  0,
  1,
  false,
  "high middle plat"
);
lev1PlayerPos1 = [
  canvCenter - smallPlatSZDist - gamePlayerOne.w / 2,
  groundPos - 120 - gamePlayerOne.h,
  true,
];
lev1PlayerPos2 = [
  canvCenter + smallPlatSZDist - gamePlayerTwo.w / 2,
  groundPos - 120 - gamePlayerTwo.h,
  true,
];
lev1PlayerPos3 = [
  canvCenter - gamePlayerThree.w / 2,
  groundPos - gamePlayerThree.h - 120,
  true,
];
lev1PlayerPos = [lev1PlayerPos1, lev1PlayerPos2, lev1PlayerPos3];
crownPos = [
  canvCenter + firstPlatDist - 35 + 25 - crownRect.width / 2,
  groundPos - 100 - crownRect.height,
];

//object list used for drawing
lev1ObjectList = [];
lev1PlatformList = [];
lev1DangerList = [];
lev1MovePlats = [];
lev1DangerMovePlats = [];

lev1ObjectList.push(...[gamePlayerOne, gamePlayerTwo, gamePlayerThree]);

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
  lev1Platform25,
  lev1Platform26,
  leftLowerHighPlat,
  rightLowerHighPlat,
  leftHigherHighPlat,
  rightHigherHighPlat,
  leftHighSidePlat,
  rightHighSidePlat,
  lev1centerBorderThing,
  lev1LeftBorder,
  lev1RightBorder,
];
lev1PlatformList.push(...lev1Platforms);
lev1ObjectList.push(...lev1Platforms);

lev1MPlats = [leftMovingPlat, rightMovingPlat];
if (lev1MPlats.length > 0) {
  lev1MovePlats.push(...lev1MPlats);
  lev1ObjectList.push(...lev1MPlats);
  lev1PlatformList.push(...lev1MPlats);
}

lev1DP = [];
lev1DangerMovePlats.push(...lev1DP);
lev1ObjectList.push(...lev1DP);
//clearRect needs to be added last

lev1 = [
  lev1ObjectList,
  lev1PlatformList,
  lev1MovePlats,
  lev1PlayerPos,
  crownPos,
  1,
];

threePlayerLevelList.push(lev1);
