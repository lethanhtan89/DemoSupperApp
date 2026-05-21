export type MiniAppEvent =
  | { type: 'miniapp.close' }
  | {
      type: 'miniapp.success';
      payload: {
        transactionId: string;
        amount: number;
      };
    }
  | {
      type: 'payment.success';
      payload: {
        transactionId: string;
        amount: number;
      };
    };

export type MiniAppContext = {
  userId: string;
  accessToken: string;
  language: 'vi' | 'en';
  close: () => void;
  navigate: (route: string, param?: unknown) => void;
  emitEvent: (event: MiniAppEvent) => void;
  callApi: <T>(path: string, body?: unknown) => Promise<T>;
};
