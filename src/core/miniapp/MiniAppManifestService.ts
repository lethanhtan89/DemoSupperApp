import {miniAppManifestMock} from './miniAppManifest.mock';
import {MiniAppManifest} from './MiniAppManifest';
import {canRunMiniApp} from './MiniAppVersionChecker';

export async function fetchMiniAppManifests(): Promise<MiniAppManifest[]> {
  await new Promise(resolve => setTimeout(() => resolve(null), 500));

  return miniAppManifestMock.filter(canRunMiniApp);
}
