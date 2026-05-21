import {ComponentType} from 'react';
import {BookingMiniApp} from './booking/BookingMiniApp';
import {MiniAppContext} from './MiniAppContext';
import {MiniAppKey} from './MiniAppManifest';
import {WalletMiniApp} from './wallet/WalletMiniApp';

export type MiniAppComponent = ComponentType<{
  context: MiniAppContext;
}>;

export const miniAppRegistry: Record<MiniAppKey, MiniAppComponent> = {
  wallet: WalletMiniApp,
  booking: BookingMiniApp,
};
