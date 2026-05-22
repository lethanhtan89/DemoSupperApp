import { MiniAppKey } from './MiniAppManifest';
import { WalletMiniAppModule } from './wallet/WalletMiniApp';
import { MiniAppModule } from './MiniAppModule';
import { BookingMiniAppModule } from './booking/BookingMiniApp';

export const miniAppRegistry: Record<MiniAppKey, MiniAppModule> = {
  wallet: WalletMiniAppModule,
  booking: BookingMiniAppModule,
};
