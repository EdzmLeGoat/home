let keysPressed = [];
gamePlayers = [gamePlayerOne, gamePlayerTwo];
wallPushes = [0, 0];
inAirs = [false, false];
smashes = [false, false];
pushingAnims = [0, 0];

function getWallPushes() {
  return wallPushes;
}

document.addEventListener("keydown", (event) => {
  if (!keysPressed.includes(event.key.toLowerCase())) {
    keysPressed.push(event.key.toLowerCase());
  }
});

document.addEventListener("keyup", (event) => {
  keysPressed = keysPressed.filter((e) => e != event.key.toLowerCase());
});

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

//precondition: player is not in any walls before out this function is run
const physics = (gamePlayer, setAirMethod, setSmashMethod) => {
  gamePlayer.maxVel = gamePlayer.flagged ? flaggedMaxVel : maxVel;
  gamePlayer.maxVel *=
    wallPushes[gamePlayer.index] > 0 ? pushMaxVelMultiplication : 1;

  for (key of keysPressed) {
    if (key == gamePlayer.rk) {
      gamePlayer.xvel +=
        gamePlayer.movementSpeed * (wallPushes[gamePlayer.index] > 0)
          ? wallPushback
          : 1;
      if (wallPushes[gamePlayer.index] > 0) {
        pushingAnims[gamePlayer.index] = flashFrames;
        gamePlayer.yvel -= wallVertBoost;
      }
    } else if (key == gamePlayer.lk) {
      gamePlayer.xvel -=
        gamePlayer.movementSpeed * (wallPushes[gamePlayer.index] < 0)
          ? wallPushback
          : 1;
      if (wallPushes[gamePlayer.index] < 0) {
        pushingAnims[gamePlayer.index] = flashFrames;
        gamePlayer.yvel -= wallVertBoost;
      }
    } else if (key == gamePlayer.uk && !inAirs[gamePlayer.index]) {
      setAirMethod(true);
      gamePlayer.yvel = -jump;
    } else if (key.toLowerCase() == gamePlayer.dk && inAirs[gamePlayer.index]) {
      setSmashMethod(true);
      gamePlayer.xvel *= smashStop;
      if (quadraticSmash) {
        gamePlayer.yvel += smash;
      } else {
        gamePlayer.yvel = smash;
      }
    }
  }
  gamePlayer.updateX();

  gamePlayer.xvel = setMax(gamePlayer.xvel, gamePlayer.maxVel);
  gamePlayer.xvel *= friction;
};

const doHorizontalStuff = (gamePlayer, platforms, setAirMethod) => {
  checkWallColl(gamePlayer, platforms);

  groundResults = groundLevel(gamePlayer, platforms);
  let isOnPlatform = false;

  for (res of groundResults) {
    let wall = res[0];
    let pos = res[1];
    let inOut = res[2];
    if (
      pos != "on" &&
      inOut == "in" &&
      withinHorizontalBounds(gamePlayer, wall)
    ) {
      isOnPlatform = true;
    }
  }
  if (!isOnPlatform) {
    setAirMethod(true);
  }
};

const checkWallColl = (gamePlayer, platforms) => {
  // Use traditional for loop with early exit potential
  for (let i = 0; i < platforms.length; i++) {
    const wall = platforms[i];
    if (rectsColliding(gamePlayer, wall)) {
      let collisionDirection;
      if (!(wall instanceof MovingRectangle && wall.xvel != 0)) {
        //coming from right
        if (gamePlayer.xvel > 0) {
          collisionDirection = "left";
        } else {
          collisionDirection = "right";
        }

        if (collisionDirection == "left") {
          /*player's x is moved to the left the amount it execeeds
          the wall's left bound*/
          moveToLeftOfRect(gamePlayer, wall);
        } else {
          /*player's x is moved to the right the amount it execeeds
          the wall's right bound*/
          moveToRightOfRect(gamePlayer, wall);
        }

        gamePlayer.xvel *= -knockback;
        if (collisionDirection == "right") {
          wallPushes[gamePlayer.index] = pushbackFrames;
        } else {
          wallPushes[gamePlayer.index] = -pushbackFrames;
        }
      } else {
        let platVel = wall.xvel;
        let playerVel = gamePlayer.xvel;
        let collisionType;
        //plat moving to the right
        if (platVel > 0) {
          if (platVel > 0) {
            if (playerVel > platVel) {
              collisionDirection = "left";
              collisionType = "knockback";
              //move player to left of plat
            } /* player slower than plat */ else {
              collisionDirection = "right";
              collisionType = "push";
              //move player to right of plat
            }
          } /* player moving left*/ else {
            //move player to right of plat
            collisionDirection = "right";
            collisionType = "push";
          }
        } /* plat moving left */ else {
          if (playerVel < 0) {
            if (playerVel < platVel) {
              collisionDirection = "right";
              collisionType = "knockback";
              //player to right of plat
            } /* player slower than plat */ else {
              collisionDirection = "left";
              collisionType = "push";
              //player to left of plat
            }
          } /*player moving left*/ else {
            collisionDirection = "left";
            collisionType = "push";
            //player moving slower than plat
          }
        }
        if (collisionDirection == "right") {
          moveToRightOfRect(gamePlayer, wall);
          if (collisionType == "knockback") {
            wallPushes[gamePlayer.index] = pushbackFrames;
          }
        } else {
          moveToLeftOfRect(gamePlayer, wall);
          if (collisionType == "knockback") {
            wallPushes[gamePlayer.index] = -pushbackFrames;
          }
        }
        if (collisionType == "knockback") {
          gamePlayer.xvel *= knockback;
        } else {
          gamePlayer.xvel += platVel;
        }
      }
    }
  }
};

//precondition: player is not in any walls before this function is run
const checkFloor = (gamePlayer, platforms, setAirMethod, setSmashMethod) => {
  groundResults = groundLevel(gamePlayer, platforms);
  // Use traditional for loop with cached length
  for (let i = 0; i < platforms.length; i++) {
    const wall = platforms[i];
    if (rectsColliding(gamePlayer, wall)) {
      if (!(wall instanceof MovingRectangle && wall.yvel != 0)) {
        if (gamePlayer.yvel >= 0) {
          //coming from top
          setAirMethod(false);
          setSmashMethod(false);
          gamePlayer.y = wall.y - gamePlayer.h;
          if (wall instanceof MovingRectangle) {
            gamePlayer.xvel = wall.xvel;
          }
        } else {
          //coming from bottom
          gamePlayer.y = wall.y + wall.h + 1;
          gamePlayer.xvel *= headBoost;
        }
        gamePlayer.yvel = 0;
      } else {
        let platVel = wall.yvel;
        let platXVel = wall.xvel;
        let onTop = false;
        //platform moving down
        if (platVel > 0) {
          //player moving down
          if (gamePlayer.yvel > 0) {
            //player moving slower than platform
            if (gamePlayer.yvel < platVel) {
              // console.log('plat down player down player slower than plat from below');
              //then we have to be coming from the bottom
              //move to bottom of platform
            } else {
              // console.log('plat down player down player faster than plat');
              //we're coming from the top
              //move to top
              onTop = true;
            }
            //player is still
          } else if (gamePlayer.yvel == 0) {
            // console.log('plat down player still');
            //botom
          } else {
            //we have to be coming from below
            //move to bottom of platform
            // console.log('plat move down player move up');
          }
        } /*platform moving up*/ else {
          //player moving down
          if (gamePlayer.yvel > 0) {
            // console.log('plat moving up player moving down')
            //coming from the top
            onTop = true;
          } else if (gamePlayer.yvel == 0) {
            /*player not moving*/ // console.log('plat moving up player not moving
            //top
            onTop = true;
          } /*player moving up */ else {
            //player is moving up slower than platform
            if (gamePlayer.yvel > platVel) {
              // console.log('plat moving up player moving up player slower than plat')
              //we're coming from the top
              //move to top
              onTop = true;
              //player is moving up faster than platform
            } else {
              //coming from below
            }
          }
        }
        //coming from top
        if (onTop) {
          if (Math.abs(platXVel) > 0) {
            gamePlayer.xvel = platXVel;
          }
          gamePlayer.yvel = 0;
          gamePlayer.y = wall.y - gamePlayer.h;
          setAirMethod(false);
          setSmashMethod(false);
        } /*coming from bottom*/ else {
          //if platform is going up
          if (platVel < 0) {
            gamePlayer.yvel = Math.abs(platVel) * knockback;
          } else {
            gamePlayer.yvel = platVel;
          }
          setSmashMethod(false);
          gamePlayer.y = wall.y + wall.h + 1;
          gamePlayer.xvel *= headBoost;
        }
      }
    }
  }
};

const updateXPlatforms = (movingPlats) => {
  movingPlats.forEach((movingPlat) => {
    if (movingPlat.sm) {
      movingPlat.updateXSmooth();
    } else {
      movingPlat.updateX();
    }
  });
};

const updateYPlatforms = (movingPlats) => {
  movingPlats.forEach((movingPlat) => {
    if (movingPlat.sm) {
      movingPlat.updateYSmooth();
    } else {
      movingPlat.updateY();
    }
  });
};

const moveDangers = (dangers) => {
  dangers.forEach((danger) => {
    if (danger.sm) {
      danger.updateXSmooth();
      danger.updateYSmooth();
    } else {
      danger.updateX();
      danger.updateY();
    }
  });
};

const resetRedFlag = () => {
  redFlag.x = redFlagx;
  redFlag.y = redFlagy;
};

const resetBlueFlag = () => {
  blueFlag.x = blueFlagx;
  blueFlag.y = blueFlagy;
};

const resetFlags = () => {
  resetRedFlag();
  resetBlueFlag();
};

const doEverything = (
  objects,
  platforms,
  dangers,
  movingPlats,
  movingDangers,
  areMoving
) => {
  /* gravity, horizontal movement */
  let playersPlatforms = [];
  //allows the colored stuff's x and y's to be moved separately.
  let updatedMovingPlats = [
    ...movingPlats,
    ...movingDangers.filter((platform) => platform.r > 0),
  ];

  for (const player of gamePlayers) {
    let playerPlatforms = [
      ...platforms,
      ...dangers.filter(
        (platform) =>
          (player.n === "one" && platform.n === "reddanger") ||
          (player.n === "two" && platform.n === "bluedanger")
      ),
      ...movingDangers.filter(
        (platform) =>
          (player.n === "one" && platform.n === "reddanger") ||
          (player.n === "two" && platform.n === "bluedanger")
      ),
    ];
    playersPlatforms.push(playerPlatforms);
  }

  for (const player of gamePlayers) {
    if (!player.flagged) {
      if (player.n === "one") {
        playersPlatforms[player.index].push(redSafeZone);
      } else {
        playersPlatforms[player.index].push(blueSafeZone);
      }
    }

    if (areMoving[player.index]) {
      physics(
        player,
        (set) => {
          inAirs[player.index] = set;
        },
        (set) => {
          smashes[player.index] = set;
        }
      );
    }

    wallPushes[player.index] =
      wallPushes[player.index] > 0
        ? wallPushes[player.index] - 1
        : wallPushes[player.index] < 0
        ? wallPushes[player.index] + 1
        : 0;
    if (pushingAnims[player.index] > 0) {
      pushingAnims[player.index]--;
    }

    if (areMoving[player.index]) {
      doHorizontalStuff(player, playersPlatforms[player.index], (set) => {
        inAirs[player.index] = set;
      });
    }
  }

  /* updates x platforms ONCE */
  updateXPlatforms(updatedMovingPlats);

  /* updates y platforms ONCE */
  updateYPlatforms(updatedMovingPlats);

  for (const player of gamePlayers) {
    if (areMoving[player.index]) {
      player.yvel += gravity;
      player.updateY();
      checkFloor(
        player,
        playersPlatforms[player.index],
        (set) => {
          inAirs[player.index] = set;
        },
        (set) => {
          smashes[player.index] = set;
        }
      );
    }
  }

  /*moves za dangers */
  //makes sure the colored plats aren't in here because
  //they r already moved
  moveDangers([...movingDangers.filter((platform) => platform.r === 0)]);

  for (const player of gamePlayers) {
    if (pushingAnims[player.index]) {
      colors = [0, 0, 0];
      colors[player.index] = 255;
      player.oc = `rgba(${colors[0]},${colors[2]},${colors[1]},1)`;
      player.outlineWidth = reboundWidth;
    } else {
      player.oc = "white";
      player.outlineWidth = outlineWidth;
    }
  }

  /* updates the canvas */
  drawEverything(objects);
};

function reset(gamePlayer, level) {
  let whichPlayer = gamePlayer.index;
  console.log(level[5][whichPlayer]);
  gamePlayer.x = level[5][whichPlayer][0];
  gamePlayer.y = level[5][whichPlayer][1];
  gamePlayer.xvel = 0;
  gamePlayer.yvel = 0;
  gamePlayer.movementSpeed = movementSpeed;
  gamePlayer.maxVel = maxVel;
  gamePlayer.flagged = false;
  wallPushes[whichPlayer] = 0;
  smashes[whichPlayer] = false;
  pushingAnims[whichPlayer] = false;
  inAirs[whichPlayer] = level[5][whichPlayer][2];

  gamePlayer.a = playerVisibility;
  gamePlayer.oc = `rgba(255,255,255,${playerVisibility})`;

  return fps * revivalTimeout;
}
