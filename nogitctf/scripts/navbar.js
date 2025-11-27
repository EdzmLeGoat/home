const htmlBody = document.body;

ground.r = 145;
ground.g = 0;
ground.b = 25;

//dark mode constants
const darkShift = 10;
const reddangerr = 232 - darkShift;
const reddangerg = 47 - darkShift;
const reddangerb = 47 - darkShift;

const bluedangerr = 47 - darkShift;
const bluedangerg = 186 - darkShift;
const bluedangerb = 202 - darkShift;

//fullscreen changes
const fsclicker = document.querySelector(".fsClick");
const fsbutton = document.getElementById("fullscreen");

fullscreen = document.fullscreenElement;
fsclicker.onclick = () => {
  if (!fullscreen) {
    fsbutton.src = "assets/fs.png";
    document.documentElement.requestFullscreen();
    fsbutton.style.width = "40px";
    fsbutton.style.height = "40px";
  } else {
    fsbutton.src = "assets/nfs.png";
    document.exitFullscreen();
    fsbutton.style.width = "20px";
    fsbutton.style.height = "20px";
  }
  fullscreen = !fullscreen;
};

//map lock
const maplock = document.getElementById("lock");
mapLocked = false;
maplock.style.height = "50px";
maplock.onclick = () => {
  if (mapLocked) {
    maplock.src = "assets/unlock.png";
    maplock.style.height = "50px";
  } else {
    maplock.src = "assets/lock.png";
    maplock.style.height = "40px";
  }
  mapLocked = !mapLocked;
};

const desc = document.getElementById("description");
const clipPathBeginning = "circle(";
const textcolor = "rgba(255,255,255,";

const circleIn = () => {
  return new Promise((resolve) => {
    let circleSize = parseInt(
      desc.style.clipPath.slice(7, desc.style.clipPath.length - 2)
    );
    let speed = 30;
    const circleInterval = setInterval(() => {
      if (hoveringElement) {
        if (roundTo(circleSize, 0) < 100) {
          circleSize += (100 - circleSize) / speed;
          desc.style.clipPath = `${clipPathBeginning}${circleSize}%)`;
        } else {
          desc.style.clipPath = `${clipPathBeginning}100%`;
          resolve("circleInFinish");
          clearInterval(circleInterval);
        }
      } else {
        resolve("circleInFinish");
        clearInterval(circleInterval);
      }
    }, 1000 / fps / 2);
  });
};

const circleOut = () => {
  return new Promise((resolve) => {
    let circleSize = parseInt(
      desc.style.clipPath.slice(7, desc.style.clipPath.length - 2)
    );
    let speed = 20;
    const circleInterval = setInterval(() => {
      if (!hoveringElement) {
        if (roundTo(circleSize, 0) > 0) {
          circleSize -= circleSize / speed;
          desc.style.clipPath = `${clipPathBeginning}${circleSize}%)`;
        } else {
          desc.style.clipPath = `${clipPathBeginning}0%`;
          resolve("circleOutFinish");
          clearInterval(circleInterval);
        }
      } else {
        resolve("circleOutFinish");
        clearInterval(circleInterval);
      }
    }, 1000 / fps / 2);
  });
};

const textFadeIn = () => {
  return new Promise((resolve) => {
    let color = parseFloat(
      desc.style.color.slice(18, desc.style.color.length - 1)
    );
    let speed = 9;
    const fadeInterval = setInterval(() => {
      if (hoveringElement) {
        if (roundTo(color, 3) < 1) {
          color = (1 - color) / speed;
          desc.style.color = `${textcolor}${color})`;
        } else {
          resolve("fadeInFinish");
          clearInterval(fadeInterval);
        }
      } else {
        resolve("fadeInFinish");
        clearInterval(fadeInterval);
      }
    }, 1000 / fps / 2);
  });
};

const textFadeOut = () => {
  return new Promise((resolve) => {
    let color = parseFloat(
      desc.style.color.slice(18, desc.style.color.length - 1)
    );
    let speed = 9;
    const fadeInterval = setInterval(() => {
      if (hoveringElement) {
        if (roundTo(color, 3) > 0) {
          color = Math.round(color / speed, 3);
          desc.style.color = `${textcolor}${color})`;
        } else {
          resolve("fadeOutFinish");
          clearInterval(fadeInterval);
        }
      } else {
        resolve("fadeOutFinish");
        clearInterval(fadeInterval);
      }
    }, 1000 / fps / 2);
  });
};

let hoveringElement = false;

let fsHover = false;
let mapLockHover = false;
let hoverMessage = "";

const setHovering = async (message) => {
  hoveringElement = fsHover || mapLockHover;
  if (hoveringElement) {
    desc.innerText = message;
    await circleIn();
  } else {
    await circleOut();
  }
};

fsclicker.addEventListener("mouseenter", async () => {
  fsHover = true;
  setHovering("Toggles fullscreen.");
});
fsclicker.addEventListener("mouseleave", async () => {
  fsHover = false;
  setHovering();
});

maplock.addEventListener("mouseenter", async () => {
  mapLockHover = true;
  setHovering("Sets map rotation to changing or locked.");
});
maplock.addEventListener("mouseleave", async () => {
  mapLockHover = false;
  setHovering();
});
