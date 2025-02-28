// Copyright 2023 Parity Technologies (UK) Ltd.

import type { SubmittableExtrinsic } from '@polkadot/api/submittable/types';
import type { ISubmittableResult } from '@polkadot/types/types';

import type { ChainInfoRegistry } from './registry/types';

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
	T,
	Exclude<keyof T, Keys>
> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
	}[Keys];

export enum IDirection {
	SystemToPara = 'SystemToPara',
	SystemToRelay = 'SystemToRelay',
	ParaToPara = 'ParaToPara',
	ParaToRelay = 'ParaToRelay',
	RelayToSystem = 'RelayToSystem',
	RelayToPara = 'RelayToPara',
}

export type Format = 'payload' | 'call' | 'submittable';

export type ConstructedFormat<T> = T extends 'payload'
	? `0x${string}`
	: T extends 'call'
	? `0x${string}`
	: T extends 'submittable'
	? SubmittableExtrinsic<'promise', ISubmittableResult>
	: never;

export type IMethods =
	| 'transfer'
	| 'transferKeepAlive'
	| 'reserveTransferAssets'
	| 'limitedReserveTransferAssets'
	| 'teleportAssets'
	| 'limitedTeleportAssets';

export type IAssetsTransferApiOpts = {
	injectedRegistry?: RequireAtLeastOne<ChainInfoRegistry>;
};

export interface TxResult<T> {
	format: string;
	xcmVersion: number | null;
	direction: IDirection | 'local';
	method: IMethods;
	tx: ConstructedFormat<T>;
}

export interface ITransferArgsOpts<T extends Format> {
	/**
	 * Option that specifies the format in which to return a transaction.
	 * It can either be a `payload`, `call`, or `submittable`.
	 *
	 * Note: A `submittable` will return a `SubmittableExtrinsic` polkadot-js type, whereas
	 * a `payload` or `call` will return a hex.
	 */
	format?: T;
	/**
	 * AssetId to pay fee's on the current common good parachain.
	 * Statemint: default DOT
	 * Statemine: default KSM
	 */
	payFeeWith?: string;
	/**
	 * AssetId to pay fee's on the destination parachain.
	 */
	payFeeWithTo?: string;
	/**
	 * Boolean to declare if this will be with limited XCM transfers.
	 * Deafult is unlimited.
	 */
	isLimited?: boolean;
	/**
	 * When isLimited is true, the option for applying a weightLimit is possible.
	 * If not inputted it will default to `Unlimited`.
	 */
	weightLimit?: string;
	/**
	 * Set the xcmVersion for message construction. If this is not present a supported version
	 * will be queried, and if there is no supported version a safe version will be queried.
	 */
	xcmVersion?: number;
	/**
	 * For creating local asset transfers, this will allow for a `transferKeepAlive` as oppose
	 * to a `transfer`.
	 */
	keepAlive?: boolean;
}

export interface IChainInfo {
	specName: string;
	specVersion: string;
}
