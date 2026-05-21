import {MiniAppManifest} from './MiniAppManifest';

export const miniAppManifests: MiniAppManifest[] = [
  {
    key: 'wallet',
    name: 'Wallet',
    version: '1.0.0',
    enabled: true,
    minHostVersion: '1.0.0',
    entry: 'wallet',
  },
  {
    key: 'booking',
    name: 'Booking',
    version: '1.0.0',
    enabled: true,
    minHostVersion: '1.0.0',
    entry: 'booking',
  },
];
