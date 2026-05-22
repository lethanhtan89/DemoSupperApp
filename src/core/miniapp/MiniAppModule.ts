import React from 'react';
import { MiniAppContext } from './MiniAppContext';
import { MiniAppKey } from './MiniAppManifest';

export type MiniAppModule = {
  key: MiniAppKey;
  version: string;

  bootstrap?: (context: MiniAppContext) => Promise<void>;

  render: (props: { context: MiniAppContext }) => React.ReactElement;

  destroy?: () => void;
};
