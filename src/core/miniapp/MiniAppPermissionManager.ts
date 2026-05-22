import { MiniAppManifest, MiniAppPermission } from './MiniAppManifest';

const hostAllowedPermissions: MiniAppPermission[] = [
  'payment',
  'user.profile.read',
  'wallet.balance.read',
  'booking.hotel.read',
  'location',
];

export function canGrantMiniAppPermissions(manifest: MiniAppManifest): boolean {
  return manifest.permissions.every(permision =>
    hostAllowedPermissions.includes(permision),
  );
}

export async function requestMiniAppPermission(
  permision: MiniAppPermission,
): Promise<boolean> {
  console.log('[Permission] request: ', permision);
  if (!hostAllowedPermissions.includes(permision)) {
    return false;
  }
  return true;
}
