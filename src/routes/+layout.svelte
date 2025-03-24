<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let { children } = $props();
	
	const name = "spitkov";
	const description = "home";
	const email = "bence@spitkov.hu";
	const github = "spitkov";
	
	const pageTitle = $derived(
		$page.url.pathname === '/' 
			? name + ' | ' + description 
			: name + ' | ' + $page.url.pathname.substring(1)
	);
	
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'auto' });
	}
	
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content="{description}" />
</svelte:head>

<div class="min-h-screen bg-transparent text-[#ffffff] font-mono p-4 flex flex-col content-container">
	<div class="max-w-2xl mx-auto w-full flex flex-col flex-grow">
		<header class="mb-10 text-center">
			<nav class="flex justify-center space-x-4">
				<a href="/" class="px-3 py-1 {$page.url.pathname === '/' ? 'text-[#8fC6d9] font-bold' : 'text-[#71A5B9]'}">./home</a>
				<a href="/portfolio" class="px-3 py-1 {$page.url.pathname === '/portfolio' ? 'text-[#8fC6d9] font-bold' : 'text-[#71A5B9]'}">./portfolio</a>
				<a href="/tools" class="px-3 py-1 {$page.url.pathname === '/tools' ? 'text-[#8fC6d9] font-bold' : 'text-[#71A5B9]'}">./tools</a>
			</nav>

			<div class="mt-3 border-b border-[#333333] w-full"></div>
		</header>
		
		<main class="pb-8 flex-grow">
			{@render children()}
		</main>
		
		<footer class="mt-auto pt-6">
			<div class="border-t border-[#333333] w-full mb-6"></div>
			<div class="flex justify-between items-center text-xs text-[#777777] pb-4">
				<div>
					© {new Date().getFullYear()} {name}
				</div>
				<button onclick={scrollToTop} class="text-[#71A5B9]">:3</button>
			</div>
		</footer>
	</div>
</div>
