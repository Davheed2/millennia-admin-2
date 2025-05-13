'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { callApi } from '@/lib';
import { toast } from 'sonner';
import { ApiResponse } from '@/interfaces';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface SysPhone {
	id: number;
	phone: string;
	created_at: string;
}

const UpdatePhone = () => {
	const {
		data: phones,
		isLoading: loading,
		error: queryError,
	} = useQuery<SysPhone[], Error>({
		queryKey: ['sysphone'],
		queryFn: async () => {
			const { data: responseData, error } = await callApi<ApiResponse<SysPhone[]>>('/user/company');
			if (error) {
				throw new Error(error.message || 'Something went wrong while fetching phone number.');
			}
			if (!responseData?.data) {
				throw new Error('No phone data returned');
			}
			toast.success('Phone Fetched', { description: 'Successfully fetched company phone.' });
			return responseData.data;
		},
	});

	const [phone, setPhone] = useState<string>('');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const queryClient = useQueryClient();

	useEffect(() => {
		if (phones && phones.length >= 1) {
			setPhone(phones[0].phone);
		}
	}, [phones]);

	useEffect(() => {
		if (queryError) {
			const errorMessage = queryError.message || 'An unexpected error occurred while fetching phone number.';
			setError(errorMessage);
			toast.error('Failed to Fetch company phone', { description: errorMessage });
		}
	}, [queryError]);

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Add '+' only if it's missing
		const formattedPhone = phone?.startsWith('+') ? phone : `+${phone}`;

		const { data: responseData, error } = await callApi<ApiResponse>('/user/company-phone', {
			phone: formattedPhone,
		});

		if (error) {
			toast.error('Error', {
				description: error.message,
			});
		} else {
			toast.success('Success', {
				description: responseData?.message || 'Phone number updated successfully.',
			});
            queryClient.invalidateQueries({ queryKey: ['sysphone'] });
		}

		setIsSubmitting(false);
	};

	return (
		<div className="flex flex-col w-full pt-8">
			<div className="w-full max-w-md space-y-6 px-6 mb-20 mx-auto">
				<div className="flex flex-col items-center space-y-2">
					<h2 className="text-center text-xl font-semibold text-gray-900">Change Phone number</h2>
					<p className="text-sm text-gray-600 text-center">Update your phone number in the input below!</p>
				</div>
				<form onSubmit={handleFormSubmit} className="flex flex-col gap-4 md:gap-6 w-full">
					<div className="mt-2">
						<div className="space-y-1">
							<label htmlFor="phone" className="text-sm font-medium text-gray-700">
								Phone Number <span className="text-red-500">*</span>
							</label>
							<Input
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								autoFocus
								type="text"
								id="phone"
								placeholder="Enter phone number"
								className="min-h-[45px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 placeholder:text-sm"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-4 text-center">
						<Button
							disabled={isSubmitting || loading}
							className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold py-5 rounded"
						>
							{isSubmitting ? 'Submitting...' : 'Submit'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdatePhone;
