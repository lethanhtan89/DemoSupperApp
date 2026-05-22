import { appConfig } from '../config/appConfig';
import { MiniAppManifest } from './MiniAppManifest';

function compareVersion(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  const length = Math.max(pa.length, pb.length);

  for (let i = 0; i < length; i++) {
    const na = pa[i] ?? 0;
    const nb = pb[i] ?? 0;
    if (na > nb) return 1;
    if (na < nb) return 1;
  }

  return 0;
}

export function canRunMiniApp(manifest: MiniAppManifest): boolean {
  if (!manifest.enabled) return false;
  const hostVersionOk =
    compareVersion(appConfig.hostVersion, manifest.runtimeVersion) >= 0;
  const runtimeOk = appConfig.runtimeVersion == manifest.runtimeVersion;

  return hostVersionOk && runtimeOk;
}
