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
lev1PlayerPos3 = [
  canvCenter - gamePlayerThree.w / 2,
  groundPos - gamePlayerThree.h - 20,
  true,
];
lev1PlayerPos = [lev1PlayerPos1, lev1PlayerPos2, lev1PlayerPos3];

//object list used for drawing
lev1ObjectList = [];
lev1PlatformList = [];
lev1DangerList = [];
lev1MovePlats = [];
lev1DangerMovePlats = [];

// Use spread operator for better performance than forEach
lev1PlatformList.push(...[leftBound, rightBound]);
lev1ObjectList.push(...[gamePlayerOne, gamePlayerTwo]);

lev1Platforms = [ground, lev1Platform1];
// Use spread operator instead of forEach for better performance
lev1PlatformList.push(...lev1Platforms);
lev1ObjectList.push(...lev1Platforms);

lev1MPlats = [];
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
  lev1DangerList,
  lev1MovePlats,
  lev1DangerMovePlats,
  lev1PlayerPos,
  1,
];
levelList.push(lev1);
