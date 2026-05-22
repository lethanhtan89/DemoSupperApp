import { HostApiRequest } from '../../api/HostApiGateway';
import { MiniAppEvent } from './MiniAppEvent';
import { MiniAppPermission } from './MiniAppManifest';

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
