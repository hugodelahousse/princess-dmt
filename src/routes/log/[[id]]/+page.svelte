<script lang="ts">
	import { Button, Checkbox, Helper, Input, Label, Select } from 'flowbite-svelte';
	import { superForm, dateProxy } from 'sveltekit-superforms/client';
	import type { PageData } from '../../../../.svelte-kit/types/src/routes';
	import { page } from '$app/stores';
	import { DIVE_TYPES } from '$lib/diveType';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form);

	let interns = data.interns.map((intern) => ({ value: intern.id, name: intern.name }));

	const proxyDate = dateProxy(form, 'date', { format: 'date' });
</script>

{#if $message}
	<h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}
<form method="POST" class="grid grid-cols-6 sm:grid-cols-6 gap-6" use:enhance>
	<input type="hidden" name="id" bind:value={$form.id} />

	<div class="col-span-6">
		<Label for="name" class="block mb-2">Date</Label>
		<Input name="date" type="date" bind:value={$proxyDate} />
		{#if $errors.date}<Helper class="mt-2" color="red">{$errors.date}</Helper>{/if}
	</div>

	<div class="col-span-6">
		<Label for="internId" class="block mb-2">Intern</Label>
		<Select name="internId" items={interns} bind:value={$form.internId} />
		{#if $errors.internId}<Helper class="mt-2" color="red">{$errors.internId}</Helper>{/if}
	</div>

	<div class="col-span-6 flex flex-col gap-2">
		<Checkbox name="morningDive" bind:checked={$form.morningDive} class="text-xl"
			>Morning Dive</Checkbox
		>
		{#if $errors.morningDive}<Helper class="mt-2" color="red">{$errors.morningDive}</Helper>{/if}

		{#if $form.morningDive}
			<Label for="morningDiveType" class="block">Dive type</Label>
			<Select
				name="morningDiveType"
				items={DIVE_TYPES.map((type) => ({ value: type, name: type.toUpperCase() }))}
				bind:value={$form.morningDiveType}
			/>
			{#if $errors.morningDiveType}<Helper class="mt-2" color="red"
					>{$errors.morningDiveType}</Helper
				>{/if}

			<Checkbox name="morningDive" bind:checked={$form.morningDiveGuided}>Was dive guide</Checkbox>
		{/if}
	</div>

	<div class="col-span-6 flex flex-col gap-2">
		<Checkbox name="afternoonDive" bind:checked={$form.afternoonDive} class="text-xl"
			>Afternoon Dive</Checkbox
		>
		{#if $errors.afternoonDive}<Helper class="mt-2" color="red">{$errors.afternoonDive}</Helper
			>{/if}

		{#if $form.afternoonDive}
			<Label for="afternoonDiveType" class="block">Dive type</Label>
			<Select
				name="afternoonDiveType"
				items={DIVE_TYPES.map((type) => ({ value: type, name: type.toUpperCase() }))}
				bind:value={$form.afternoonDiveType}
			/>
			{#if $errors.afternoonDiveType}<Helper class="mt-2" color="red"
					>{$errors.afternoonDiveType}</Helper
				>{/if}

			<Checkbox name="afternoonDive" bind:checked={$form.afternoonDiveGuided}
				>Was dive guide</Checkbox
			>
		{/if}
	</div>

	<div class="col-span-6 flex flex-col gap-2">
		<Checkbox name="lunchPacking" bind:checked={$form.lunchPacking} class="text-xl"
			>Packing - Lunch</Checkbox
		>
	</div>
	<div class="col-span-6 flex flex-col gap-2">
		<Checkbox name="eveningPacking" bind:checked={$form.eveningPacking} class="text-xl"
			>Packing - Evening</Checkbox
		>
	</div>

	<Button color="green" type="submit" class="col-span-6">Save</Button>
</form>
