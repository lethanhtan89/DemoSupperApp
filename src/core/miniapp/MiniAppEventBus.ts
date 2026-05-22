import { MiniAppEvent } from './MiniAppEvent';

type MiniAppEventListener = (event: MiniAppEvent) => void;

class MiniAppEventBus {
  private listeners = new Set<MiniAppEventListener>();

  subscribe(listener: MiniAppEventListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  emit(event: MiniAppEvent) {
    this.listeners.forEach(listener => {
      listener(event);
    });
  }
}

export const miniAppEventBus = new MiniAppEventBus();
