<script lang="ts">
	import { Card, Dropdown, DropdownItem, Avatar, Button } from 'flowbite-svelte';
	import { DotsHorizontalOutline, PlusSolid } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-2">
	<Button color="green" class="w-full" href="/interns/edit"
		><PlusSolid class="w-3 h-3 me-2" />Add Intern</Button
	>
</div>

<div class="p-2 flex gap-1">
	{#each data.interns as intern}
		<a href="/interns/{intern.id}">
			<Card padding="sm">
				<div class="flex justify-end">
					<DotsHorizontalOutline />
					<Dropdown class="w-36">
						<DropdownItem href="interns/edit/{intern.id}">Edit</DropdownItem>
						<DropdownItem class="text-danger">Delete</DropdownItem>
					</Dropdown>
				</div>
				<div class="flex flex-col items-center pb-4">
					<Avatar size="lg" src="https://picsum.photos/300/300" />
					<h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{intern.name}</h5>
					<span class="text-sm text-gray-500 dark:text-gray-400"
						>{intern.startDate.toLocaleDateString()} - {intern.endDate.toLocaleDateString()}</span
					>
				</div>
			</Card>
		</a>
	{/each}
</div>
