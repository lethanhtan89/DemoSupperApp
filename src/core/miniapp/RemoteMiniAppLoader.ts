import {MiniAppManifest} from './MiniAppManifest';
import {MiniAppModule} from './MiniAppModule';

export async function loadRemoteMiniAppModule(
  manifest: MiniAppManifest,
): Promise<MiniAppModule | null> {
  console.log('[RemoteMiniAppLoader]', {
    remoteName: manifest.remoteName,
    exposedModule: manifest.exposedModule,
    bundleUrl: manifest.bundleUrl,
  });

  /**
   * Phase sau sẽ thay bằng Re.Pack Module Federation.
   *
   * Concept:
   *
   * const remoteModule = await Federated.importModule(
   *   manifest.remoteName,
   *   manifest.exposedModule,
   * );
   *
   * return remoteModule.default;
   */

  return null;
}