<script>
	import { PlusSolid } from 'flowbite-svelte-icons';
	import { Button } from 'flowbite-svelte';
</script>

<div class="p-2">
	<Button color="green" class="w-full" href="/log"
		><PlusSolid class="w-3 h-3 me-2" />Add Entry</Button
	>
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
