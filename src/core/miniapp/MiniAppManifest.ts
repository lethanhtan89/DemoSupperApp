export type MiniAppKey = 'wallet' | 'booking';

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
};
