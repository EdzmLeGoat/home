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
  const halfWidth = gamePlayerOne.w / 2;

  let playerOneMid = gamePlayerOne.x + halfWidth;
  let playerTwoMid = gamePlayerTwo.x + halfWidth;
  let playerOneDanger = playerOneMid > canvCenter;
  let playerTwoDanger = playerTwoMid < canvCenter;
  let oneFIG = 0;
  let twoFIG = 0;

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

        playerOneMid = gamePlayerOne.x + halfWidth;
        playerTwoMid = gamePlayerTwo.x + halfWidth;
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

const doThreePlayerLoop = (level) => {
  let objList = level[0];
  let platList = level[1];
  let movingPlats = level[2];
  let frame = 1;
  let deadFrames = [];
  let invulnerableFrames = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    deadFrames.push(fps * initialTimeout);
  }

  let isRunning = true;
  let tiebreaker = 0;
  gamePlayers[tiebreaker].flagged = true;
  gamePlayers[tiebreaker].movementSpeed = flaggedSpeed;

  let threePlayerResetAll = () => {
    //all players colliding
    tiebreaker = (tiebreaker + 1) % 3;
    resetAll(level);
    for (let i = 0; i < 3; i++) {
      deadFrames[i] = fps * initialTimeout;
    }
    gamePlayers[tiebreaker].flagged = true;
    gamePlayers[tiebreaker].movementSpeed = flaggedSpeed;
  };
  let changeCrown = (giver, holder) => {
    deadFrames[giver.index] = threePlayerReset(giver, level);
    holder.flagged = true;
    holder.movementSpeed = flaggedSpeed;
    invulnerableFrames[holder.index] = fps * 2;
  };
  let scoreElements = [
    threePlayerRedScore,
    threePlayerBlueScore,
    threePlayerGreenScore,
  ];
  return new Promise((resolve) => {
    const loopInterval = setInterval(() => {
      if (!isRunning) return;

      // decrement death frames
      for (let player of gamePlayers) {
        if (deadFrames[player.index] > 0) {
          deadFrames[player.index]--;
          if (deadFrames[player.index] == 0) {
            player.a = 1;
            player.oc = "white";
          }
        }
        if (invulnerableFrames[player.index] > 0) {
          invulnerableFrames[player.index]--;
        }
      }

      threePlayerDoEverything(objList, platList, movingPlats, [
        deadFrames[0] < 1,
        deadFrames[1] < 1,
        deadFrames[2] < 1,
      ]);

      inDangers = [false, false, false];

      for (let player of gamePlayers) {
        if (player.flagged) {
          crownRect.x = player.x;
          crownRect.y = player.y - player.h;
          if (invulnerableFrames[player.index] == 0) {
            inDangers[player.index] = true;
          }
          if (frame > fps * 2) {
            if (frame % fps == 0) {
              const el = scoreElements[player.index];
              const currentScore =
                parseInt((el && el.textContent) || "0", 10) || 0;
              const newScore = currentScore + 1;
              if (el) el.textContent = `${newScore}`;
              if (newScore >= threePlayerMaxScore) {
                isRunning = false;
                clearInterval(loopInterval);
                resolve(player.n);
                return;
              }
            }
          }
        }
      }

      if (inDangers[0]) {
        twoColliding =
          rectsColliding(gamePlayerOne, gamePlayerTwo) && deadFrames[1] == 0;
        threeColliding =
          rectsColliding(gamePlayerOne, gamePlayerThree) && deadFrames[2] == 0;
        if (twoColliding && threeColliding) {
          threePlayerResetAll();
        } else if (twoColliding) {
          changeCrown(gamePlayerOne, gamePlayerTwo);
        } else if (threeColliding) {
          changeCrown(gamePlayerOne, gamePlayerThree);
        }
      }
      if (inDangers[1]) {
        oneColliding =
          rectsColliding(gamePlayerOne, gamePlayerTwo) && deadFrames[0] == 0;
        threeColliding =
          rectsColliding(gamePlayerTwo, gamePlayerThree) && deadFrames[2] == 0;
        if (oneColliding && threeColliding) {
          threePlayerResetAll();
        } else if (oneColliding) {
          changeCrown(gamePlayerTwo, gamePlayerOne);
        } else if (threeColliding) {
          changeCrown(gamePlayerTwo, gamePlayerThree);
        }
      }
      if (inDangers[2]) {
        oneColliding =
          rectsColliding(gamePlayerOne, gamePlayerThree) && deadFrames[0] == 0;
        twoColliding =
          rectsColliding(gamePlayerTwo, gamePlayerThree) && deadFrames[1] == 0;
        if (twoColliding && oneColliding) {
          threePlayerResetAll();
        } else if (twoColliding) {
          changeCrown(gamePlayerThree, gamePlayerTwo);
        } else if (oneColliding) {
          changeCrown(gamePlayerThree, gamePlayerOne);
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

const resetCrown = (level) => {
  crownRect.x = level[4][0];
  crownRect.y = level[4][1];
};

const resetAll = (level) => {
  if (numPlayers == 2) {
    reset(gamePlayerOne, level);
    reset(gamePlayerTwo, level);
    resetFlags();
  } else {
    threePlayerResults.style.display = "none";
    threePlayerReset(gamePlayerOne, level);
    threePlayerReset(gamePlayerTwo, level);
    threePlayerReset(gamePlayerThree, level);
    resetCrown(level);
  }
};

const runLevel = async (levelNumber) => {
  if (numPlayers === 2) {
    let level = levelList[levelNumber];
    resetAll(level);
    return await doTwoPlayerLoop(level);
  } else {
    let level = threePlayerLevelList[levelNumber];
    resetAll(level);
    return await doThreePlayerLoop(level);
  }
};

document.addEventListener("onkeyup", function (e) {
  if (e.key == "Space") {
    changeLevel();
  }
});

const changeLevel = () => {
  if (numPlayers == 2) {
    levelNum = (levelNum + 1) % numLevels;
  } else {
    levelNum = (levelNum + 1) % threePlayerNumLevels;
  }
};

const redScoreText = document.getElementById("redScore");
const blueScoreText = document.getElementById("blueScore");
const greenScoreText = document.getElementById("greenScore");
const threeRedScoreText = document.getElementById("threePlayerRedScore");
const threeBlueScoreText = document.getElementById("threePlayerBlueScore");
const threeGreenScoreText = document.getElementById("threePlayerGreenScore");
const centerText = document.getElementById("results");
const threePlayerResults = document.getElementById("threePlayerResults");
let levelNum = startingLevelIndex;

const runGame = async () => {
  if (numPlayers == 2) {
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
  } else {
    //three player mode
    threeRedScoreText.innerText = `0`;
    threeBlueScoreText.innerText = `0`;
    threeGreenScoreText.innerText = `0`;

    let objlist = threePlayerLevelList[levelNum][0];

    let result = await runLevel(levelNum);
    threePlayerResults.style.display = "block";
    if (result == "one") {
      redScore++;
      threePlayerResults.innerText = "RED WINS!";
    } else if (result == "two") {
      blueScore++;
      threePlayerResults.innerText = "BLUE WINS!";
    } else {
      threePlayerResults.innerText = "GREEN WINS!";
    }
    await levelClearDown(objlist);

    render.clearRect(0, 0, canvWidth, canvHeight);
    await levelClearUp([], true);
  }
};

runGame();

document.getElementById("restart").onclick = () => {
  animations.forEach((animation) => animation.cancel());
  if (!mapLocked) changeLevel();
  runGame();
};

document.getElementById("players").onclick = () => {
  animations.forEach((animation) => animation.cancel());
  if (numPlayers == 2) {
    numPlayers = 3;
    document.getElementById("players").innerText = "2 Players";
    document.getElementById("twoPlayerContainer").style.display = "none";
    document.getElementById("threePlayerContainer").style.display = "flex";
    document.getElementById("twoPlayerInstructions").style.display = "none";
    document.getElementById("threePlayerInstructions").style.display = "flex";
    levelNum = threePlayerStartingIndex;
    listsToThree();
    flagSpeedDebuff = 0.94;
  } else {
    numPlayers = 2;
    document.getElementById("players").innerText = "3 Players";
    document.getElementById("twoPlayerContainer").style.display = "flex";
    document.getElementById("threePlayerContainer").style.display = "none";
    document.getElementById("twoPlayerInstructions").style.display = "flex";
    document.getElementById("threePlayerInstructions").style.display = "none";
    threePlayerResults.style.display = "none";
    levelNum = startingLevelIndex;
    listsToTwo();
    flagSpeedDebuff = 0.94;
  }
  runGame();
};
