<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import { dateProxy, superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const { form: intern, errors, enhance, message } = superForm(data.form);

	const proxyStartDate = dateProxy(intern, 'startDate', { format: 'date' });
	const proxyEndDate = dateProxy(intern, 'endDate', { format: 'date' });
</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}
<form method="POST" class="grid grid-cols-6 sm:grid-cols-6 gap-6" use:enhance>
	<input type="hidden" name="id" bind:value={$intern.id} />

	<div class="col-span-6">
		<Label for="name" class="block mb-2">Name</Label>
		<Input name="name" type="text" placeholder="Intern's name" bind:value={$intern.name} />
		{#if $errors.name}<Helper class="mt-2" color="red">{$errors.name}</Helper>{/if}
	</div>

	<div class="col-span-3">
		<Label for="startDate" class="block mb-2">Start date</Label>
		<Input
			name="startDate"
			color={$errors.startDate ? 'red' : undefined}
			type="date"
			bind:value={$proxyStartDate}
		/>
		{#if $errors.startDate}<Helper class="mt-2" color="red">{$errors.startDate}</Helper>{/if}
	</div>
	<div class="col-span-3">
		<Label for="endDate" class="block mb-2">End date</Label>
		<Input
			name="endDate"
			color={$errors.endDate ? 'red' : undefined}
			type="date"
			bind:value={$proxyEndDate}
		/>
		{#if $errors.endDate}<Helper class="mt-2" color="red">{$errors.endDate}</Helper>{/if}
	</div>

	<Button type="submit" class="col-span-6" color="green"
		>{$intern.id ? 'Edit' : 'Create'} intern</Button
	>
</form>
