export type MiniAppEvent =
  | {type: 'miniapp.ready'; source: string}
  | {type: 'miniapp.close'; source: string}
  | {
      type: 'payment.success';
      source: string;
      payload: {
        transactionId: string;
        amount: number;
      };
    }
  | {
      type: 'analytics.track';
      source: string;
      payload: {
        name: string;
        params?: Record<string, unknown>;
      };
    }
  | {type: 'auth.expired'; source: string};