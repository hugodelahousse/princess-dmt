<script lang="ts">
	import type PageData from './$type';
	import {
		Avatar,
		Button,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { getDiveTypeLabel } from '$lib/diveType';

	export let data: PageData;

	const intern = data.intern;

	// compute dive count, packing count, and guided count in one object with a reduce
	const { diveCount, packingCount, guidedCount } = intern.InternLog.reduce(
		(acc, log) => {
			if (log.morningDive) {
				acc.diveCount++;
				if (log.morningDiveGuided) {
					acc.guidedCount++;
				}
			}
			if (log.afternoonDive) {
				acc.diveCount++;
				if (log.afternoonDiveGuided) {
					acc.guidedCount++;
				}
			}
			if (log.lunchPacking) {
				acc.packingCount++;
			}
			if (log.eveningPacking) {
				acc.packingCount++;
			}
			return acc;
		},
		{ diveCount: 0, packingCount: 0, guidedCount: 0 }
	);

	function formatDive(hadDive: boolean, type: string | null, guided: boolean | null) {
		if (!hadDive) {
			return 'No';
		}
		if (type === null) {
			return 'Yes';
		}

		return `${getDiveTypeLabel(type)} ${guided ? '(Guided)' : ''}`;
	}
</script>

<div class="flex flex-col items-center">
	<Avatar size="xl" src="https://picsum.photos/300/300" />
	<h1 class="mb-1 text-3xl font-medium text-gray-900 dark:text-white">{intern.name}</h1>
	<span class="text-sm text-gray-500 dark:text-gray-400"
		>{intern.startDate.toLocaleDateString()} - {intern.endDate.toLocaleDateString()}</span
	>
</div>

<section class="py-8">
	<div class="container mx-auto grid auto-cols-auto grid-flow-col gap-8">
		<!-- Stat Card 1 -->
		<div class="bg-blue-100 p-8 rounded-lg text-center">
			<p class="text-gray-700 mb-2">Dives</p>
			<h3 class="text-3xl font-bold text-blue-700">{diveCount} dives</h3>
		</div>

		<!-- Stat Card 2 -->
		<div class="bg-green-100 p-8 rounded-lg text-center">
			<p class="text-gray-700 mb-2">Packed</p>
			<h3 class="text-3xl font-bold text-green-700">{packingCount} times</h3>
		</div>

		<!-- Stat Card 3 -->
		<div class="bg-yellow-100 p-8 rounded-lg text-center">
			<p class="text-gray-700 mb-2">Guided</p>
			<h3 class="text-3xl font-bold text-yellow-700">{guidedCount} times</h3>
		</div>
	</div>
</section>

<Table hoverable={true} class="mt-6">
	<TableHead>
		<TableHeadCell>Date</TableHeadCell>
		<TableHeadCell>Morning Dive</TableHeadCell>
		<TableHeadCell>Afternoon Dive</TableHeadCell>
		<TableHeadCell>Packing</TableHeadCell>
		<TableHeadCell>Edit</TableHeadCell>
	</TableHead>
	<TableBody class="divide-y">
		{#each intern.InternLog as log}
			<TableBodyRow>
				<TableBodyCell>{log.date.toLocaleDateString()}</TableBodyCell>
				<TableBodyCell
					>{formatDive(log.morningDive, log.morningDiveType, log.morningDiveGuided)}</TableBodyCell
				>
				<TableBodyCell
					>{formatDive(
						log.afternoonDive,
						log.afternoonDiveType,
						log.afternoonDiveGuided
					)}</TableBodyCell
				>
				<TableBodyCell>{log.lunchPacking || log.eveningPacking ? 'Yes' : 'No'}</TableBodyCell>
				<TableBodyCell><Button size="xs" href="/logs/{log.id}">Edit</Button></TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table>
