export const LEVEL_THRESHOLDS = [0, 100, 200, 400, 700, 1000];

export const getLevelFromPoints = (points = 0) => {
  const safePoints = Math.max(0, points);
  let level = 1;
  for (let index = 0; index < LEVEL_THRESHOLDS.length; index += 1) {
    if (safePoints >= LEVEL_THRESHOLDS[index]) {
      level = index + 1;
    }
  }
  return level;
};

export const getNextLevelTarget = (level) => LEVEL_THRESHOLDS[level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
