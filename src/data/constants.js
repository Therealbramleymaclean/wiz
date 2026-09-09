/* Shared timing and tuning constants. */
const MIN = 60000;
const T = {
  callerBase: 3.2 * MIN,
  callerFloor: 1.0 * MIN,
  study: 1.5 * MIN,
  ponder: 3.0 * MIN,
  grow: 9 * MIN,
  trickle: 14 * MIN,
  broom: 5 * MIN,
};
const SEARCH_CD_MS = 1000;
/* Offline catch-up: at most a day of sim time, no matter how long you were away. */
const OFFLINE_CAP = 24 * 3600 * 1000;
const INTUIT_COST = 3;
const BASE_STORE = 14;
/* Struggle threshold: the consume appears when this many net failures stack up. */
const STRUGGLE_MAX = 4;
