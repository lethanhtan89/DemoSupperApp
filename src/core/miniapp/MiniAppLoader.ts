import { MiniAppManifest } from './MiniAppManifest';
import { MiniAppModule } from './MiniAppModule';
import { miniAppRegistry } from './MiniAppRegistry';

export async function loadMiniAppModule(
  manifest: MiniAppManifest,
): Promise<MiniAppModule | null> {
  const module = miniAppRegistry[manifest.key];

  if (!module) {
    return null;
  }

  if (module.version !== manifest.version) {
    console.warn(
      `[MiniAppLoader] version mismatch for ${manifest.key}: manifest=${manifest.version}, module=${module.version}`,
    );
  }

  return module;
}
