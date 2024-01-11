<script>
	import { page } from '$app/stores';
	import '../app.css';
	import logo from '$lib/assets/logo.png';
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';

	$: activeUrl = $page.url.pathname;
</script>

<Navbar>
	<NavBrand href="/">
		<img src={logo} class="me-3 h-6 sm:h-9" alt="Princess Divers Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>Princess Divers DMT</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Dashboard</NavLi>
		<NavLi href="/interns">Interns</NavLi>
	</NavUl>
</Navbar>

<main class="container mx-auto py-6 px-2">
	<slot />
</main>
