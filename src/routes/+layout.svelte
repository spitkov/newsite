<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let { children } = $props();
	
	const name = "spitkov";
	const title = "full-stack dev & cybersec";
	const email = "bence@spitkov.hu";
	const github = "spitkov";
	
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'auto' });
	}
	
	onMount(() => {
		const dotContainer = document.createElement('div');
		dotContainer.id = 'dot-background';
		document.body.appendChild(dotContainer);
		
		const styles = getComputedStyle(document.documentElement);
		const dotSize = parseInt(styles.getPropertyValue('--dot-size').trim() || '4');
		const dotSpacing = parseInt(styles.getPropertyValue('--dot-space').trim() || '30');
		
		const spacing = dotSpacing;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const dotsX = Math.ceil(windowWidth / spacing);
		const dotsY = Math.ceil(windowHeight / spacing);
		
		const dots = [];
		for (let y = 0; y < dotsY; y++) {
			for (let x = 0; x < dotsX; x++) {
				const dot = document.createElement('div');
				dot.className = 'dot';
				dot.style.width = `${dotSize}px`;
				dot.style.height = `${dotSize}px`;
				dot.style.left = `${x * spacing}px`;
				dot.style.top = `${y * spacing}px`;
				dotContainer.appendChild(dot);
				dots.push({
					element: dot,
					x: x * spacing,
					y: y * spacing
				});
			}
		}
		
		document.addEventListener('mousemove', (e) => {
			const mouseX = e.clientX;
			const mouseY = e.clientY;
			
			dots.forEach(dot => {
				const dx = dot.x - mouseX;
				const dy = dot.y - mouseY;
				const distance = Math.sqrt(dx * dx + dy * dy);
				
				const radius = 150;
				
				if (distance < radius) {
					const scale = 1 + (radius - distance) / radius * 3;
					const opacity = 0.15 + (radius - distance) / radius * 0.85;
					
					dot.element.style.transform = `scale(${scale})`;
					dot.element.style.opacity = opacity;
					const glowIntensity = Math.min(8, (radius - distance) / radius * 12);
					dot.element.style.boxShadow = `0 0 ${glowIntensity}px ${glowIntensity/2}px rgba(113, 165, 185, ${opacity})`;
				} else {
					dot.element.style.transform = 'scale(1)';
					dot.element.style.opacity = '0.15';
					dot.element.style.boxShadow = 'none';
				}
			});
		});
		
		window.addEventListener('resize', () => {
			dotContainer.innerHTML = '';
			
			const newWindowWidth = window.innerWidth;
			const newWindowHeight = window.innerHeight;
			const newDotsX = Math.ceil(newWindowWidth / spacing);
			const newDotsY = Math.ceil(newWindowHeight / spacing);
			
			const styles = getComputedStyle(document.documentElement);
			const currentDotSize = parseInt(styles.getPropertyValue('--dot-size').trim() || '4');
			
			dots.length = 0;
			for (let y = 0; y < newDotsY; y++) {
				for (let x = 0; x < newDotsX; x++) {
					const dot = document.createElement('div');
					dot.className = 'dot';
					dot.style.width = `${currentDotSize}px`;
					dot.style.height = `${currentDotSize}px`;
					dot.style.left = `${x * spacing}px`;
					dot.style.top = `${y * spacing}px`;
					dotContainer.appendChild(dot);
					dots.push({
						element: dot,
						x: x * spacing,
						y: y * spacing
					});
				}
			}
		});
		
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
		script.onload = () => {
			window.particlesJS('particles-js', {
				"particles": {
					"number": {
						"value": 15,
						"density": {
							"enable": true,
							"value_area": 800
						}
					},
					"color": {
						"value": "#71A5B9"
					},
					"shape": {
						"type": "circle",
						"stroke": {
							"width": 0,
							"color": "#000000"
						}
					},
					"opacity": {
						"value": 0.15,
						"random": false,
						"anim": {
							"enable": false,
							"speed": 1,
							"opacity_min": 0.1,
							"sync": false
						}
					},
					"size": {
						"value": 4,
						"random": true,
						"anim": {
							"enable": false,
							"speed": 40,
							"size_min": 0.1,
							"sync": false
						}
					},
					"line_linked": {
						"enable": true,
						"distance": 150,
						"color": "#71A5B9",
						"opacity": 0.15,
						"width": 1
					},
					"move": {
						"enable": true,
						"speed": 0.6,
						"direction": "none",
						"random": false,
						"straight": false,
						"out_mode": "out",
						"bounce": false,
						"attract": {
							"enable": false,
							"rotateX": 600,
							"rotateY": 1200
						}
					}
				},
				"interactivity": {
					"detect_on": "window",
					"events": {
						"onhover": {
							"enable": true,
							"mode": "repulse"
						},
						"onclick": {
							"enable": true,
							"mode": "push"
						},
						"resize": true
					},
					"modes": {
						"repulse": {
							"distance": 100,
							"duration": 0.4
						},
						"push": {
							"particles_nb": 4
						}
					}
				},
				"retina_detect": true
			});
		};
		document.body.appendChild(script);
	});
</script>

<div id="particles-js"></div>
<div class="min-h-screen bg-transparent text-[#ffffff] font-mono p-4 flex flex-col content-container">
	<div class="max-w-2xl mx-auto w-full flex flex-col flex-grow">
		<header class="mb-10">
			<nav class="flex justify-center mb-3">
				<div class="inline-flex items-center"><a href="/" class="px-3 py-1 {$page.url.pathname === '/' ? 'text-[#8fC6d9] font-bold' : 'text-[#71A5B9]'}">./home</a><div class="w-[1px] h-8 bg-[#333333] mx-4"></div><a href="/portfolio" class="px-3 py-1 {$page.url.pathname === '/portfolio' ? 'text-[#8fC6d9] font-bold' : 'text-[#71A5B9]'}">./portfolio</a><div class="w-[1px] h-8 bg-[#333333] mx-4"></div><a href="/tools" class="px-3 py-1 {$page.url.pathname === '/tools' ? 'text-[#8fC6d9] font-bold' : 'text-[#71A5B9]'}">./tools</a></div>
			</nav>
			<div class="border-b border-[#333333] w-full"></div>
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
				<div class="text-[#71A5B9]">:3</div>
			</div>
		</footer>
	</div>
</div>
