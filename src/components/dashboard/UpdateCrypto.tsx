'use client';

import { useState, useEffect } from 'react';
import { callApi } from '@/lib';
import { toast } from 'sonner';
import { ApiResponse } from '@/interfaces';
import { SysCrypto } from '@/interfaces/ApiResponses';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UpdateCrypto() {
	const [crypto, setCrypto] = useState('BTC');
	const [address, setAddress] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCrypto = async () => {
			const { data: responseData, error } = await callApi<ApiResponse<SysCrypto>>('/crypto');
			if (responseData?.data) {
				setCrypto(responseData.data.crypto || 'BTC');
				setAddress(responseData.data.address || '');
			} else if (error) {
				console.error('Failed to load global crypto address', error);
			}
		};
		fetchCrypto();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!address) {
			toast.error('Address is required');
			return;
		}

		setLoading(true);
		try {
			const { data: responseData, error } = await callApi<ApiResponse>('/crypto', { crypto, address });
			
			if (error) {
				throw new Error(error.message || 'Failed to update crypto address');
			}

			toast.success(responseData?.message || 'Global Crypto Address updated successfully');
		} catch (error: any) {
			toast.error(error.message || 'An error occurred while saving.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4 border rounded-md">
			<div className="flex flex-col space-y-2">
				<label className="text-sm font-medium">Cryptocurrency Network / Coin</label>
				<Input
					type="text"
					value={crypto}
					onChange={(e) => setCrypto(e.target.value)}
					placeholder="e.g. BTC, ETH, USDT-TRC20"
				/>
			</div>
			<div className="flex flex-col space-y-2">
				<label className="text-sm font-medium">Global Wallet Address</label>
				<Input
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Global crypto receiving address"
					className="font-mono text-sm"
				/>
			</div>
			<Button
				type="submit"
				disabled={loading}
			>
				{loading ? 'Saving...' : 'Save Crypto Address'}
			</Button>
		</form>
	);
}
