'use client';

import * as React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import debounce from 'lodash/debounce';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ApiResponse, Kyc } from '@/interfaces';
import { callApi } from '@/lib';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function KycTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [error, setError] = React.useState<string | null>(null);
	const queryClient = useQueryClient();

	const {
		data: kyc,
		isLoading: loading,
		error: queryError,
	} = useQuery<Kyc[], Error>({
		queryKey: ['kyc'],
		queryFn: async () => {
			const { data: responseData, error } = await callApi<ApiResponse<Kyc[]>>('/kyc/all');
			if (error) {
				throw new Error(error.message || 'Something went wrong while fetching users Kyc.');
			}
			if (!responseData?.data) {
				throw new Error('No user data returned');
			}
			toast.success('Users Kyc Fetched', { description: 'Successfully fetched users KYC.' });
			return responseData.data;
		},
	});

	useEffect(() => {
		if (queryError) {
			const errorMessage = queryError.message || 'An unexpected error occurred while fetching users kyc.';
			setError(errorMessage);
			toast.error('Failed to Fetch Users KYC', { description: errorMessage });
		}
	}, [queryError]);

	const onUpdateUser = async (userId: string, status: string) => {
		try {
			const { data: responseData, error } = await callApi<ApiResponse<null>>(`/kyc/update`, {
				userId,
				status,
			});

			if (error) throw new Error(error.message);
			if (responseData?.status === 'success') {
				toast.success(`User KYC ${status}`, {
					description: responseData.message || `The user KYC has been ${status.toLowerCase()} successfully.`,
				});
				return true;
			}
			return false;
		} catch (err) {
			toast.error('KYC update Failed', {
				description: err instanceof Error ? err.message : 'An unexpected error occurred.',
			});
			return false;
		}
	};

	const columns: ColumnDef<Kyc>[] = [
		{
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		},
		{
			id: 'name',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Name
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => {
				const name = row.original.name;

				return (
					<div className="flex items-center space-x-2">
						<Avatar>
							<AvatarImage src={'/icons/Frame 7.svg'} className="object-cover w-full h-full" />
							<AvatarFallback>
								{/* <Image src="/icons/Frame 7.svg" alt="Fallback Icon" width={100} height={100} /> */}
								US
							</AvatarFallback>
						</Avatar>
						<span className="lowercase ml-3">{`${name}`}</span>
					</div>
				);
			},
			accessorFn: (row) => `${row.name}`,
		},
		{
			accessorKey: 'dob',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						DOB
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase ml-3">{row.getValue('dob')}</div>,
		},
		{
			accessorKey: 'nationality',
			header: ({ column }) => {
				return (
					<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
						Nationality
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => <div className="lowercase ml-3">{row.getValue('nationality')}</div>,
		},
		{
			accessorKey: 'address',
			header: 'Address',
			cell: ({ row }) => <div className="lowercase">{row.getValue('address')}</div>,
		},
		{
			accessorKey: 'city',
			header: 'City',
			cell: ({ row }) => <div className="lowercase">{row.getValue('city')}</div>,
		},
		{
			accessorKey: 'documentType',
			header: 'Document Type',
			cell: ({ row }) => <div className="lowercase">{row.getValue('documentType')}</div>,
		},
		{
			id: 'document',
			header: ({}) => {
				return (
					<Button variant="ghost">
						Document
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => {
				const document = row.original.document;

				return (
					<div className="flex items-center space-x-2">
						<a href={document} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
							<span className="lowercase ml-3">{`${document}`}</span>
						</a>
					</div>
				);
			},
			accessorFn: (row) => `${row.document}`,
		},
		{
			id: 'selfie',
			header: ({}) => {
				return (
					<Button variant="ghost">
						Selfie
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => {
				const selfie = row.original.selfie;

				return (
					<div className="flex items-center space-x-2">
						{/* <Avatar>
							<AvatarImage src={'/icons/Frame 7.svg'} className="object-cover w-full h-full" />
							<AvatarFallback>
							
								US
							</AvatarFallback>
						</Avatar> */}
						<a href={selfie} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
							<span className="lowercase ml-3">{`${selfie}`}</span>
						</a>
					</div>
				);
			},
			accessorFn: (row) => `${row.selfie}`,
		},
		{
			id: 'proofOfAddress',
			header: ({}) => {
				return (
					<Button variant="ghost">
						Proof of Address
						<ArrowUpDown />
					</Button>
				);
			},
			cell: ({ row }) => {
				const proofOfAddress = row.original.proofOfAddress;

				return (
					<div className="flex items-center space-x-2">
						<a href={proofOfAddress} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
							<span className="lowercase ml-3">{`${proofOfAddress}`}</span>
						</a>
					</div>
				);
			},
			accessorFn: (row) => `${row.proofOfAddress}`,
		},
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => <div className="lowercase">{row.getValue('status')}</div>,
		},
		{
			accessorKey: 'created_at',
			header: () => <div>Created At</div>,
			cell: ({ row }) => {
				const date = row.getValue('created_at');

				if (!date) return <div className="text-right">—</div>;

				const formattedDate =
					typeof date === 'string' || typeof date === 'number' ? format(new Date(date), 'EEE do, MMM') : 'Invalid Date';

				return <div className="">{formattedDate}</div>;
			},
		},
		{
			id: 'actions',
			enableHiding: false,
			cell: ({ row }) => {
				const kyc = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild className="hover:cursor-pointer">
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem onClick={() => navigator.clipboard.writeText(kyc.userId)} className="hover:cursor-pointer">
								Copy user ID
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							{/* <DropdownMenuItem
								className="hover:cursor-pointer"
								onClick={async () => {
									const success = await onPromoteUser(row.original.id, row.original.role !== 'admin');
									if (success) await queryClient.invalidateQueries({ queryKey: ['users'] });
								}}
							>
								{row.original.role === 'user' ? 'Promote User' : 'Demote User'}
							</DropdownMenuItem> */}
							{kyc.status !== 'approved' && (
								<>
									<DropdownMenuItem
										className="hover:cursor-pointer"
										onClick={async () => {
											const success = await onUpdateUser(row.original.userId, 'approved');
											if (success) {
												await queryClient.invalidateQueries({ queryKey: ['kyc'] });
												await queryClient.invalidateQueries({ queryKey: ['users'] });
											}
										}}
									>
										Approve
									</DropdownMenuItem>
									<DropdownMenuItem
										className="hover:cursor-pointer"
										onClick={async () => {
											const success = await onUpdateUser(row.original.userId, 'rejected');
											if (success) {
												await queryClient.invalidateQueries({ queryKey: ['kyc'] });
												await queryClient.invalidateQueries({ queryKey: ['users'] });
											}
										}}
									>
										Reject
									</DropdownMenuItem>
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data: kyc ?? [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const debouncedFilter = React.useCallback(
		(value: string) => {
			const filterFunc = debounce((filterValue: string) => {
				table.getColumn('name')?.setFilterValue(filterValue);
			}, 2000);
			filterFunc(value);
		},
		[table]
	);

	return (
		<>
			<div className="flex flex-col w-full">
				{loading ? (
					<div className="w-full bg-white rounded-md px-6 py-6">
						<div className="flex items-center py-4">
							<div className="h-10 w-48 bg-gray-200 rounded animate-pulse max-w-sm"></div>

							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<div className="h-10 w-32 bg-gray-200 rounded ml-auto animate-pulse"></div>
								</DropdownMenuTrigger>
							</DropdownMenu>
						</div>

						<div className="rounded-md border">
							<Table>
								<TableHeader>
									<TableRow className="bg-[#F8F8F8]">
										{table
											.getHeaderGroups()
											.map((headerGroup) =>
												headerGroup.headers.map((header) => (
													<TableHead key={header.id}>
														{header.isPlaceholder
															? null
															: flexRender(header.column.columnDef.header, header.getContext())}
													</TableHead>
												))
											)}
									</TableRow>
								</TableHeader>
								<TableBody>
									{Array.from({ length: 10 }).map((_, index) => (
										<TableRow key={index} className="animate-pulse">
											{columns.map((_, cellIndex) => (
												<TableCell key={cellIndex}>
													<div className="h-4 bg-gray-200 rounded w-full"></div>
												</TableCell>
											))}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</div>
				) : error ? (
					<div className="w-full bg-white rounded-md px-6 py-4 text-center text-red-500">
						<p>Error: {error}</p>
					</div>
				) : (
					<div className="w-full bg-white rounded-md px-6">
						<div className="flex items-center py-4">
							<Input
								placeholder="Filter names..."
								// value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
								// onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
								defaultValue={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
								onChange={(event) => debouncedFilter(event.target.value)}
								className="max-w-sm"
							/>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="ml-auto hover:cursor-pointer">
										Columns <ChevronDown />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									{table
										.getAllColumns()
										.filter((column) => column.getCanHide())
										.map((column) => {
											return (
												<DropdownMenuCheckboxItem
													key={column.id}
													className="capitalize"
													checked={column.getIsVisible()}
													onCheckedChange={(value) => column.toggleVisibility(!!value)}
												>
													{column.id}
												</DropdownMenuCheckboxItem>
											);
										})}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									{table.getHeaderGroups().map((headerGroup) => (
										<TableRow key={headerGroup.id} className="bg-[#F8F8F8]">
											{headerGroup.headers.map((header) => {
												return (
													<TableHead key={header.id}>
														{header.isPlaceholder
															? null
															: flexRender(header.column.columnDef.header, header.getContext())}
													</TableHead>
												);
											})}
										</TableRow>
									))}
								</TableHeader>
								<TableBody>
									{table.getRowModel().rows?.length ? (
										table.getRowModel().rows.map((row) => (
											<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
												{row.getVisibleCells().map((cell) => (
													<TableCell key={cell.id}>
														{flexRender(cell.column.columnDef.cell, cell.getContext())}
													</TableCell>
												))}
											</TableRow>
										))
									) : (
										<TableRow>
											<TableCell colSpan={columns.length} className="h-24 text-center">
												No results.
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
						</div>
						<div className="flex items-center py-4 px-0">
							<div className="text-sm text-muted-foreground mr-4 w-full">
								{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
								selected.
							</div>

							<Pagination className="ml-auto mb-0">
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											onClick={() => table.previousPage()}
											className={
												!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'hover:cursor-pointer'
											}
										/>
									</PaginationItem>

									{[...Array(table.getPageCount())].map((_, index) => {
										if (table.getPageCount() <= 3 || index < 2 || index === table.getPageCount() - 1) {
											return (
												<PaginationItem key={index}>
													<PaginationLink
														onClick={() => table.setPageIndex(index)}
														isActive={table.getState().pagination.pageIndex === index}
														className="hover:cursor-pointer"
													>
														{index + 1}
													</PaginationLink>
												</PaginationItem>
											);
										}
										if (index === 2 && table.getPageCount() > 3) {
											return (
												<PaginationItem key={index} className="mb-auto text-xl">
													...
													{/* <PaginationEllipsis className='mb-0'/> */}
												</PaginationItem>
											);
										}
										return null;
									})}

									<PaginationItem>
										<PaginationNext
											onClick={() => table.nextPage()}
											className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'hover:cursor-pointer'}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
