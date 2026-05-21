import {MiniAppManifest} from './MiniAppManifest';

const HOST_VERSION = '1.0.0';
const RUNTIME_VERSION = '1.0.0';

function parseVersion(version: string) {
  return version.split('.').map(part => Number(part) || 0);
}

function isVersionAtLeast(current: string, minimum: string) {
  const currentParts = parseVersion(current);
  const minimumParts = parseVersion(minimum);
  const length = Math.max(currentParts.length, minimumParts.length);

  for (let index = 0; index < length; index += 1) {
    const currentPart = currentParts[index] ?? 0;
    const minimumPart = minimumParts[index] ?? 0;

    if (currentPart > minimumPart) {
      return true;
    }

    if (currentPart < minimumPart) {
      return false;
    }
  }

  return true;
}

export function canRunMiniApp(manifest: MiniAppManifest) {
  return (
    manifest.enabled &&
    isVersionAtLeast(HOST_VERSION, manifest.minHostVersion) &&
    isVersionAtLeast(RUNTIME_VERSION, manifest.runtimeVersion)
  );
}
