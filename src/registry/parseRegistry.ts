// Copyright 2023 Parity Technologies (UK) Ltd.

import type { IAssetsTransferApiOpts } from '../types';
import registry from './registry.json';
import type { ChainInfoRegistry } from './types';

export const parseRegistry = (
	assetsOpts: IAssetsTransferApiOpts
): ChainInfoRegistry => {
	if (assetsOpts.injectedRegistry) {
		const { injectedRegistry } = assetsOpts;
		const polkadot = injectedRegistry.polkadot;
		const kusama = injectedRegistry.kusama;
		const westend = injectedRegistry.westend;

		if (polkadot) Object.assign(registry.polkadot, polkadot);
		if (kusama) Object.assign(registry.kusama, kusama);
		if (westend) Object.assign(registry.westend, westend);
	}

	return registry;
};
