import { MiniAppManifest } from './MiniAppManifest';
import { MiniAppModule } from './MiniAppModule';
import { miniAppRegistry } from './MiniAppRegistry';
import { loadRemoteMiniAppModule } from './RemoteMiniAppLoader';

const ENABLE_REMOTE_MINI_APP = false;

export async function loadMiniAppModule(
  manifest: MiniAppManifest,
): Promise<MiniAppModule | null> {

  if (ENABLE_REMOTE_MINI_APP) {
    return loadRemoteMiniAppModule(manifest);
  }

  return loadStaticMiniAppModule(manifest);
}

async function loadStaticMiniAppModule(
  manifest: MiniAppManifest,
): Promise<MiniAppModule | null> {
  console.log('[MiniAppLoader] static load:', manifest.key);

  return miniAppRegistry[manifest.key] ?? null;
}
