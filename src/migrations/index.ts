import * as migration_20241125_230512 from './20241125_230512';

export const migrations = [
  {
    up: migration_20241125_230512.up,
    down: migration_20241125_230512.down,
    name: '20241125_230512'
  },
];
