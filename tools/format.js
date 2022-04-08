/**
 * Usage: node tools/format.js <difficulty...>
 *
 * Sorts fields, removes default values, and formats the specified difficulties in place.
 */

const fs = require('fs');

const base = JSON.parse(fs.readFileSync('base.cd.json'));

const paths = process.argv.slice(2);

const keys = [
  'Name',
  'MaxActiveCritters',
  'MaxActiveSwarmers',
  'MaxActiveEnemies',
  'ResupplyCost',
  'StartingNitra',
  'ExtraLargeEnemyDamageResistance',
  'ExtraLargeEnemyDamageResistanceB',
  'ExtraLargeEnemyDamageResistanceC',
  'ExtraLargeEnemyDamageResistanceD',
  'EnemyDamageResistance',
  'SmallEnemyDamageResistance',
  'EnemyDamageModifier',
  'EnemyCountModifier',
  'EncounterDifficulty',
  'StationaryDifficulty',
  'EnemyWaveInterval',
  'EnemyNormalWaveInterval',
  'EnemyNormalWaveDifficulty',
  'EnemyDiversity',
  'StationaryEnemyDiversity',
  'VeteranNormal',
  'VeteranLarge',
  'DisruptiveEnemyPoolCount',
  'MinPoolSize',
  'MaxActiveElites',
  'EnvironmentalDamageModifier',
  'PointExtractionScalar',
  'FriendlyFireModifier',
  'WaveStartDelayScale',
  'SpeedModifier',
  'AttackCooldownModifier',
  'ProjectileSpeedModifier',
  'HealthRegenerationMax',
  'ReviveHealthRatio',
  'EliteCooldown',
  'EnemyDescriptors',
  'EnemyPool',
  'CommonEnemies',
  'SpecialEnemies',
  'DisruptiveEnemies',
  'StationaryEnemies',
  'SeasonalEvents',
  'EscortMule'
];

keyOrder = new Map(keys.map((i, k) => [i, k]));

const specialKeys = new Map([
  ['min', 'max'],
  ['weight', 'range'],
  ['clear', 'add', 'remove']
].map((o, i) => o.map((k, j) => [k, `_${String(j).padStart(4, '0')}_${k}`])).flat());

function compareSet(a, b) {
  if (a.length !== b.length) return false;
  return a.every(v => b.has(v));
}

function getKeys(obj) {
  const toReturn = [];
  const keys = Array.isArray(obj) ? obj.keys() : Object.keys(obj);
  for (let i of keys) {
    toReturn.push([i])
    if ((typeof obj[i]) == 'object') {
      for (let j of getKeys(obj[i])) {
        toReturn.push([i, ...j]);
      }
    }
  }
  return toReturn;
};

function getKeyIndex(key, index) {
  if (key.length <= index) throw new Error(`Index out of of bounds for key`);
  return key[index];
}

function getKeyIndexDifficulty(key, index) {
  if (key.length <= index) throw new Error(`Index out of of bounds for key`);
  const v = key[index];
  if (index === 0) {
    if (!keyOrder.has(v)) throw new Error(`Unknown property: "${v}"`);
    return keyOrder.get(v);
  } else {
    return specialKeys.has(v) ? specialKeys.get(v) : v;
  }
}

function compareValue(a, b) {
  if (typeof a !== typeof b) {
    throw new Error(`Mismatched types: "${typeof a}" and "${typeof b}"`);
  }
  if (typeof a === 'string') {
    return a.localeCompare(b);
  } else if (typeof a === 'number') {
    return a - b;
  }
  throw new Error('Unknown type');
}

function getComparator(mappingFn) {
  return (a, b) => {
    for (let i = 0; ; i++) {
      if (a.length !== b.length) {
        if (a.length <= i) return -1;
        if (b.length <= i) return 1;
      }
      const diff = compareValue(mappingFn(a, i), mappingFn(b, i));
      if (diff !== 0) return diff;
    }
  }
}

function getSortedKeys(difficulty, mappingFn) {
  return getKeys(difficulty).sort(getComparator(mappingFn));
}

function sortedStringify(obj) {
  return JSON.stringify(obj, getSortedKeys(obj, getKeyIndex).flat());
}

function deepEquals(a, b) {
  return sortedStringify(a) === sortedStringify(b);
}

function formatDifficulty(path) {
  const difficulty = JSON.parse(fs.readFileSync(path));
  for (let key of Object.keys(difficulty)) {
    if (deepEquals(difficulty[key], base[key])) {
      delete difficulty[key];
    }
  }
  fs.writeFileSync(path, JSON.stringify(difficulty, getSortedKeys(difficulty, getKeyIndexDifficulty).flat(), 2));
}

for (let path of paths) {
  formatDifficulty(path);
}
