const groundResult = (player, ground) => {
  retList = [ground];
  if (player.y + player.h == ground.y) {
    retList.push("on");
  } else if (player.y + player.h > ground.y) {
    retList.push("under");
  } else {
    retList.push("over");
  }

  oneInTwo = false;
  twoInOne = false;

  if (player.y >= ground.y && player.y <= ground.y + ground.h) {
    oneInTwo = true;
  }
  if (ground.y >= player.y && ground.y <= player.y + player.h) {
    twoInOne = true;
  }

  retList.push(oneInTwo || twoInOne ? "in" : "out");
  return retList;
};

const groundLevel = (player, groundList) => {
  resList = [];
  Array.from(groundList).forEach((ground) => {
    resList.push(groundResult(player, ground));
  });
  return resList;
};

const withinHorizontalBounds = (box1, box2) => {
  oneInTwo = false;
  twoInOne = false;

  if (box1.x >= box2.x && box1.x <= box2.x + box2.w) {
    oneInTwo = true;
  }
  if (box2.x >= box1.x && box2.x <= box1.x + box1.w) {
    twoInOne = true;
  }
  return oneInTwo || twoInOne;
};
const withinVerticalBounds = (box1, box2) => {
  oneInTwo = false;
  twoInOne = false;

  if (box1.y >= box2.y && box1.y <= box2.y + box2.h) {
    oneInTwo = true;
  }
  if (box2.x >= box1.y && box2.y <= box1.y + box1.h) {
    twoInOne = true;
  }
  return oneInTwo || twoInOne;
};

const rectsColliding = (rect1, rect2) => {
  if (
    rect1.x >= rect2.x !== rect1.x >= rect2.x + rect2.w ||
    rect2.x >= rect1.x !== rect2.x >= rect1.x + rect1.w
  ) {
    if (
      rect1.y >= rect2.y !== rect1.y >= rect2.y + rect2.h ||
      rect2.y >= rect1.y !== rect2.y >= rect1.y + rect1.h
    ) {
      return true;
    }
  }
  return false;
};

//box 1 completely in box 2 x
const completelyBoundedHorizontal = (box1, box2) => {
  if (box1.x >= box2.x && box1.x + box1.w <= box2.x + box2.w) {
    return true;
  }
  return false;
};

//box 1 completely in box 2 y
const completelyBoundedVertical = (box1, box2) => {
  if (box1.y >= box2.y && box1.y + box1.h <= box2.y + box2.h) {
    return true;
  }
  return false;
};

const moveToRightOfRect = (rectToMove, rect) => {
  rectToMove.x = rect.x + rect.w + 1;
};

const moveToLeftOfRect = (rectToMove, rect) => {
  rectToMove.x = rect.x - rectToMove.w - 1;
};

const setMax = (val, max) => {
  ret = val;
  if (val < 0) {
    if (val <= max * -1) {
      ret = max * -1;
    }
  } else {
    if (val >= max) {
      ret = max;
    }
  }
  return ret;
};

const invertY = (y) => {
  return groundPos - y;
};

const pointInPolygon = function (polygon, point) {
  //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
  let odd = false;
  //For each edge (In this case for each point of the polygon and the previous one)
  for (let i = 0, j = polygon.xp.length - 1; i < polygon.xp.length; i++) {
    //If a line from the point into infinity crosses this edge
    if (
      polygon.yp[i] > point[1] !== polygon.yp[j] > point[1] && // One point needs to be above, one below our y coordinate
      // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
      point[0] <
        ((polygon.xp[j] - polygon.xp[i]) * (point[1] - polygon.yp[i])) /
          (polygon.yp[j] - polygon.yp[i]) +
          polygon.xp[i]
    ) {
      // Invert odd
      odd = !odd;
    }
    j = i;
  }
  //If the number of crossings was odd, the point is in the polygon
  return odd;
};

// returns true if the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
const lineIntersects = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  let det, gamma, lambda;
  det = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);
  if (det === 0) {
    return false;
  } else {
    lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / det;
    gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
};

const rectInPolygon = (rect, polygon) => {
  rx1 = rect.x;
  rx2 = rect.x + rect.w;
  ry1 = rect.y;
  ry2 = rect.y + rect.h;

  points = [
    [rx1, ry1],
    [rx2, ry1],
    [rx1, ry2],
    [rx2, ry2],
  ];
  for (let i = 0; i < points.length; i++) {
    if (pointInPolygon(polygon, points[i])) {
      return true;
    }
  }

  for (let i = 0; i < 4; i++) {
    thisPoint = points[i];
    nextPoint = points[(i + 1) % 4];
    for (let j = 0; j < polygon.xp.length; j++) {
      polyXPoint = polygon.xp[j];
      polyNextXPoint = polygon.xp[(j + 1) % polygon.xp.length];
      polyYPoint = polygon.yp[j];
      polyNextYPoint = polygon.yp[(j + 1) % polygon.xp.length];
      if (
        lineIntersects(
          thisPoint[0],
          thisPoint[1],
          nextPoint[0],
          nextPoint[1],
          polyXPoint,
          polyYPoint,
          polyNextXPoint,
          polyNextYPoint
        )
      ) {
        return true;
      }
    }
  }
  return false;
};
