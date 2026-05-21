import { MiniAppKey } from './MiniAppManifest';

export type MiniAppCacheRecord = {
  key: MiniAppKey;
  activeVersion: string;
  previousVersion?: string;
  localPath: string;
  updatedAt: number;
};

const memoryCache = new Map<MiniAppKey, MiniAppCacheRecord>();

export function getCachedMiniApp(key: MiniAppKey) {
  return memoryCache.get(key);
}

export function saveCachedMiniApp(record: MiniAppCacheRecord) {
  const current = memoryCache.get(record.key);

  memoryCache.set(record.key, {
    ...record,
    previousVersion: current?.activeVersion,
    updatedAt: Date.now(),
  });
}

export function rollbackMiniApp(key: MiniAppKey) {
  const current = memoryCache.get(key);

  if (!current?.previousVersion) {
    return false;
  }

  memoryCache.set(key, {
    ...current,
    activeVersion: current.previousVersion,
    previousVersion: undefined,
    localPath: `local-cache/${key}/${current.previousVersion}/remoteEntry.js`,
    updatedAt: Date.now(),
  });
  return true;
}
