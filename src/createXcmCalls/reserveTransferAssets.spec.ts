// Copyright 2023 Parity Technologies (UK) Ltd.

import type { ApiPromise } from '@polkadot/api';

import { mockSystemApi } from '../testHelpers/mockSystemApi';
import { Direction } from '../types';
import { reserveTransferAssets } from './reserveTransferAssets';

describe('reserveTransferAssets', () => {
	describe('SystemToPara', () => {
		it('Should correctly construct a tx for a system parachain with V2', () => {
			const ext = reserveTransferAssets(
				mockSystemApi,
				Direction.SystemToPara,
				'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
				['1'],
				['100'],
				'1000',
				2
			);

			expect(ext.toHex()).toBe(
				'0xf8041f020100010100f5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b01010100a10f01040000020432050400910100000000'
			);
		});
		it('Should error when a api does not support the required pallets', () => {
			const mockApi = { tx: {} } as unknown as ApiPromise;
			const err = () =>
				reserveTransferAssets(
					mockApi,
					Direction.SystemToPara,
					'0xf5d5714c084c112843aca74f8c498da06cc5a2d63153b825189baa51043b1f0b',
					['1'],
					['100'],
					'1000',
					2
				);

			expect(err).toThrowError(
				"Can't find the `polkadotXcm` or `xcmPallet` pallet with the given API"
			);
		});
	});
});
