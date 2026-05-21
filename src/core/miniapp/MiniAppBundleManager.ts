import {MiniAppManifest} from './MiniAppManifest';

type PrepareMiniAppBundleResult = {
  ready: boolean;
};

export async function prepareMiniAppBundle(
  manifest: MiniAppManifest,
): Promise<PrepareMiniAppBundleResult> {
  if (!manifest.enabled) {
    return {ready: false};
  }

  return {ready: true};
}
