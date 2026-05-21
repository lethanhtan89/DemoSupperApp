import { MiniAppManifest } from './MiniAppManifest';

export const miniAppManifestMock: MiniAppManifest[] = [
  {
    key: 'wallet',
    name: 'Wallet',
    version: '1.0.0',
    enabled: true,
    minHostVersion: '1.0.0',
    runtimeVersion: 'rn-demo-runtime-v1',
    entry: 'WalletMiniApp',
    bundleUrl: 'https://cdn.demo.com/wallet/1.0.0/remoteEntry.js',
    checksum: 'sha256-demo-wallet',
  },
  {
    key: 'booking',
    name: 'Booking',
    version: '1.0.0',
    enabled: true,
    minHostVersion: '1.0.0',
    runtimeVersion: 'rn-demo-runtime-v1',
    entry: 'BookingMiniApp',
    bundleUrl: 'https://cdn.demo.com/booking/1.0.0/remoteEntry.js',
    checksum: 'sha256-demo-booking',
  },
];
