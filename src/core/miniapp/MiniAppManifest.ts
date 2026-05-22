export type MiniAppKey = 'wallet' | 'booking';

export type MiniAppPermission =
  | 'camera'
  | 'location'
  | 'payment'
  | 'user.profile.read'
  | 'wallet.balance.read'
  | 'booking.hotel.read';

export type MiniAppManifest = {
  key: MiniAppKey;
  name: string;
  version: string;
  enabled: boolean;

  minHostVersion: string;
  runtimeVersion: string;

  entry: string;
  bundleUrl?: string;
  checksum?: string;

  permissions: MiniAppPermission[];
};
