import { MiniAppManifest } from './MiniAppManifest';
import { getCachedMiniApp, saveCachedMiniApp } from './MiniAppCacheStore';

type BundlePrepareResult = {
  ready: boolean;
  localPath?: string;
  fromCache: boolean;
};

export async function prepareMiniAppBundle(
  manifest: MiniAppManifest,
): Promise<BundlePrepareResult> {
  const cached = getCachedMiniApp(manifest.key);

  if (cached?.activeVersion === manifest.version) {
    console.log('[BundleManager] use cached bundle:', cached);
    return {
      ready: true,
      localPath: cached.localPath,
      fromCache: true,
    };
  }

  console.log('[BundleManager] download new bundle:', manifest.key);

  await new Promise(resolve =>
    setTimeout(() => {
      resolve(null);
    }, 700),
  );

  const localPath = `local-cache/${manifest.key}/${manifest.version}/remoteEntry.js`;

  saveCachedMiniApp({
    key: manifest.key,
    activeVersion: manifest.version,
    localPath,
    updatedAt: Date.now(),
  });

  return {
    ready: true,
    localPath,
    fromCache: false,
  };
}
