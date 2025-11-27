const doTwoPlayerLoop = (level) => {
  let objList = level[0];
  let platList = level[1];
  let dangerList = level[2];
  let movingPlats = level[3];
  let movingDanger = level[4];
  let frame = 1;
  let playerOneDeadFrames = fps * initialTimeout;
  let playerTwoDeadFrames = fps * initialTimeout;

  // Cache commonly accessed properties
  const gamePlayerOneHalfWidth = gamePlayerOne.w / 2;
  const gamePlayerTwoHalfWidth = gamePlayerTwo.w / 2;

  let playerOneMid = gamePlayerOne.x + gamePlayerOneHalfWidth;
  let playerTwoMid = gamePlayerTwo.x + gamePlayerTwoHalfWidth;
  let playerOneDanger = playerOneMid > canvCenter;
  let playerTwoDanger = playerTwoMid < canvCenter;
  let oneFIG = 0;
  let twoFIG = 0;

  // Frame timing variables for requestAnimationFrame
  let lastTime = 0;
  const targetFrameTime = 1000 / fps;
  let animationId = null;
  let isRunning = true;
  let dangers = dangerList.concat(movingDanger);

  return new Promise((resolve) => {
    const loopInterval = setInterval(() => {
      if (!isRunning) return;

      // decrement death frames
      if (playerOneDeadFrames > 0) {
        playerOneDeadFrames--;
        if (playerOneDeadFrames == 0) {
          gamePlayerOne.a = 1;
          gamePlayerOne.oc = "white";
        }
      }
      if (playerTwoDeadFrames > 0) {
        playerTwoDeadFrames--;
        if (playerTwoDeadFrames == 0) {
          gamePlayerTwo.a = 1;
          gamePlayerTwo.oc = "white";
        }
      }

      // Early exit if both players are dead (skip most collision checks)
      let bothPlayersDead = playerOneDeadFrames > 0 && playerTwoDeadFrames > 0;

      doEverything(objList, platList, dangerList, movingPlats, movingDanger, [
        playerOneDeadFrames < 1,
        playerTwoDeadFrames < 1,
      ]);

      if (!bothPlayersDead) {
        if (gamePlayerOne.flagged) {
          blueFlag.x = gamePlayerOne.x;
          blueFlag.y = gamePlayerOne.y - gamePlayerOne.h;
        }
        if (gamePlayerTwo.flagged) {
          redFlag.x = gamePlayerTwo.x;
          redFlag.y = gamePlayerTwo.y - gamePlayerTwo.h;
        }

        playerOneMid = gamePlayerOne.x + gamePlayerOneHalfWidth;
        playerTwoMid = gamePlayerTwo.x + gamePlayerTwoHalfWidth;
        playerOneDanger = playerOneMid > canvCenter || gamePlayerOne.flagged;
        playerTwoDanger = playerTwoMid < canvCenter || gamePlayerTwo.flagged;

        if (
          gamePlayerOne.flagged &&
          completelyBoundedHorizontal(gamePlayerOne, redSafeZone) &&
          gamePlayerTwo.flagged &&
          completelyBoundedHorizontal(gamePlayerTwo, blueSafeZone)
        ) {
          oneFIG++;
          twoFIG++;
        } else if (
          gamePlayerTwo.flagged &&
          completelyBoundedHorizontal(gamePlayerTwo, blueSafeZone)
        ) {
          twoFIG++;
        } else if (
          gamePlayerOne.flagged &&
          completelyBoundedHorizontal(gamePlayerOne, redSafeZone)
        ) {
          oneFIG++;
        }

        if (
          twoFIG >= framesNecessaryToScore &&
          oneFIG >= framesNecessaryToScore
        ) {
          isRunning = false;
          clearInterval(loopInterval);
          resolve("tie");
          return;
        }
        if (oneFIG >= framesNecessaryToScore) {
          isRunning = false;
          clearInterval(loopInterval);
          resolve("one");
          return;
        }
        if (twoFIG >= framesNecessaryToScore) {
          isRunning = false;
          clearInterval(loopInterval);
          resolve("two");
          return;
        }

        if (!gamePlayerOne.flagged && rectsColliding(gamePlayerOne, blueFlag)) {
          gamePlayerOne.flagged = true;
          gamePlayerOne.movementSpeed = flaggedSpeed;
        }
        if (!gamePlayerTwo.flagged && rectsColliding(gamePlayerTwo, redFlag)) {
          gamePlayerTwo.flagged = true;
          gamePlayerTwo.movementSpeed = flaggedSpeed;
        }

        if (
          playerOneDeadFrames == 0 &&
          playerTwoDeadFrames == 0 &&
          rectsColliding(gamePlayerOne, gamePlayerTwo)
        ) {
          if (playerOneDanger && playerTwoDanger) {
            //both players are in danger
            playerOneDeadFrames = reset(gamePlayerOne, level);
            playerTwoDeadFrames = reset(gamePlayerTwo, level);
            gamePlayerOne.flagged = false;
            gamePlayerTwo.flagged = false;
            resetFlags();
          } else if (playerOneDanger) {
            //player one is in danger
            playerOneDeadFrames = reset(gamePlayerOne, level);
            gamePlayerOne.flagged = false;
            resetBlueFlag();
          } else if (playerTwoDanger) {
            //player two is in danger
            playerTwoDeadFrames = reset(gamePlayerTwo, level);
            gamePlayerTwo.flagged = false;
            resetRedFlag();
          }
        }

        // Optimize moving danger collision detection - combine similar logic
        for (let i = 0; i < dangers.length; i++) {
          const danger = dangers[i];
          if (
            danger.n !== "reddanger" &&
            rectsColliding(gamePlayerOne, danger)
          ) {
            playerOneDeadFrames = reset(gamePlayerOne, level);
            gamePlayerOne.flagged = false;
            resetBlueFlag();
          }
          if (
            danger.n !== "bluedanger" &&
            rectsColliding(gamePlayerTwo, danger)
          ) {
            playerTwoDeadFrames = reset(gamePlayerTwo, level);
            gamePlayerTwo.flagged = false;
            resetRedFlag();
          }
        }
      }

      frame++;
    }, targetFrameTime);

    animations.push({
      type: "interval",
      id: loopInterval,
      cancel: () => {
        isRunning = false;
        clearInterval(loopInterval);
      },
    });
  });
};

const resetAll = (level) => {
  reset(gamePlayerOne, level);
  reset(gamePlayerTwo, level);
  resetFlags();
};

const runLevel = async (levelNumber) => {
  let level = levelList[levelNumber];
  console.log("level " + level[6]);
  resetAll(level);
  console.log("level start");
  return await doTwoPlayerLoop(level);
};

document.addEventListener("onkeyup", function (e) {
  if (e.key == "Space") {
    changeLevel();
  }
});

changeLevel = () => {
  levelNum = (levelNum + 1) % numLevels;
};

const redScoreText = document.getElementById("redScore");
const blueScoreText = document.getElementById("blueScore");
const centerText = document.getElementById("results");
let levelNum = startingLevelIndex;

const runGame = async () => {
  let runs = 1;

  let redScore = 0;
  let blueScore = 0;
  redScoreText.innerText = `${redScore}`;
  blueScoreText.innerText = `${blueScore}`;

  while (redScore < maxScore && blueScore < maxScore) {
    if (runs != 1 && !mapLocked) {
      changeLevel();
    }
    let objlist = levelList[levelNum][0];
    if (runs != 1) {
      resetAll(levelList[levelNum]);
      await levelClearUp(objlist);
    }
    centerText.innerText = "FIGHT!";
    if (redScore == maxScore - 1 || blueScore == maxScore - 1) {
      if (redScore == maxScore - 1 && blueScore == maxScore - 1) {
        centerText.innerText = "CRITICAL MATCH POINT";
      } else {
        centerText.innerText = "MATCH POINT";
      }
    }
    let result = await runLevel(levelNum);
    if (result == "one") {
      redScore++;
      redScoreText.innerText = `${redScore}`;
      centerText.innerText = "RED WINS!";
    } else if (result == "two") {
      blueScore++;
      blueScoreText.innerText = `${blueScore}`;
      centerText.innerText = "BLUE WINS!";
    } else {
      centerText.innerText = "TIE";
    }
    await levelClearDown(objlist);
    runs++;
  }

  if (redScore == maxScore) {
    centerText.innerText = "RED WINS THE GAME!";
  } else {
    centerText.innerText = "BLUE WINS THE GAME!";
  }

  render.clearRect(0, 0, canvWidth, canvHeight);
  await levelClearUp([], true);
};

runGame();

document.getElementById("restart").onclick = () => {
  animations.forEach((animation) => animation.cancel());
  if (!mapLocked) changeLevel();
  runGame();
};
