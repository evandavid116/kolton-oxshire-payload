import * as migration_20260521_234130 from './20260521_234130';

export const migrations = [
  {
    up: migration_20260521_234130.up,
    down: migration_20260521_234130.down,
    name: '20260521_234130'
  },
];
