import { HostApiRequest } from '../../api/HostApiGateway';
import { MiniAppPermission } from './MiniAppManifest';

export type MiniAppEvent =
  | { type: 'miniapp.ready' }
  | { type: 'miniapp.close' }
  | {
      type: 'payment.success';
      payload: {
        transactionId: string;
        amount: number;
      };
    }
  | { type: 'auth.expired' }
  | {
      type: 'analytics.track';
      payload: {
        name: string;
        params?: Record<string, unknown>;
      };
    };

export type MiniAppContext = {
  userId: string;
  accessToken: string;
  language: 'vi' | 'en';
  close: () => void;
  navigate: (route: string, param?: unknown) => void;
  emitEvent: (event: MiniAppEvent) => void;
  requestPermission: (permission: MiniAppPermission) => Promise<boolean>;
  callApi: <T>(request: HostApiRequest) => Promise<T>;
};
