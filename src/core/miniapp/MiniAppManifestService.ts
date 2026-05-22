import {miniAppManifestMock} from './miniAppManifest.mock';
import {MiniAppManifest} from './MiniAppManifest';
import {canRunMiniApp} from './MiniAppVersionChecker';
import { apiGet } from '../../api/apiClient';


type ManifestResponse = {
  runtimeVersion: string;
  miniApps: MiniAppManifest[];
};

export async function fetchMiniAppManifests(): Promise<MiniAppManifest[]> {
    try {
    const response = await apiGet<ManifestResponse>(
      '/super-app/mini-apps/manifest',
    );

    return response.miniApps.filter(canRunMiniApp);
  } catch (error) {
    console.log('[ManifestService] fallback to mock manifest', error);

    return miniAppManifestMock.filter(canRunMiniApp);
  }
}
