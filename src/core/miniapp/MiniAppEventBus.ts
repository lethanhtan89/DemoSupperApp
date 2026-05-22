import { MiniAppEvent } from './MiniAppEvent';

type Listener = (event: MiniAppEvent) => void;

const listeners = new Set<Listener>();

export const miniAppEventBus = {
  subscribe(listener: Listener) {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  },

  emit(event: MiniAppEvent) {
    console.log('[MiniAppEventBus]', event);

    listeners.forEach(listener => {
      listener(event);
    });
  },
};
