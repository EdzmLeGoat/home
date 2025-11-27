//clear rect y and h need to be 0 before this
const levelClearDown = async (objectList) => {
  const max = ground.y + ground.h;
  let animationId = null;
  let isRunning = true;

  return new Promise((resolve) => {
    const animate = () => {
      if (!isRunning) return;

      clearRect.h += transitionSpeed;
      if (clearRect.h >= max) {
        isRunning = false;
        cancelAnimationFrame(animationId);
        resolve();
        return;
      }
      drawEverything(objectList);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    animations.push({
      type: "animation",
      id: animationId,
      cancel: () => {
        isRunning = false;
        cancelAnimationFrame(animationId);
      },
    });
  });
};
//clear rect h needs to be the height of the canvas
const levelClearUp = async (objectList, drawNothing) => {
  const max = ground.y + ground.h;
  let animationId = null;
  let isRunning = true;

  return new Promise((resolve) => {
    const animate = () => {
      if (!isRunning) return;

      clearRect.y += transitionSpeed;
      clearRect.h -= transitionSpeed;
      if (clearRect.y >= max) {
        clearRect.y = 0;
        clearRect.h = 0;
        isRunning = false;
        cancelAnimationFrame(animationId);
        resolve();
        return;
      }
      drawEverything(objectList, drawNothing);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    animations.push({
      type: "animation",
      id: animationId,
      cancel: () => {
        isRunning = false;
        cancelAnimationFrame(animationId);
      },
    });
  });
};
