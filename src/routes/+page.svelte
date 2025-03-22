<script>
    import { onMount, onDestroy } from 'svelte';
    
    const name = "spitkov";
    const title = "full-stack dev & cybersec";
    const profilePic = "https://x.spitkov.hu/raw/aMSOMT.png";
    const email = "bence@spitkov.hu";
    const github = "spitkov";
    
    let data = null;
    let previousData = null;
    const DISCORD_ID = 1092100801478004816;
    let updateInterval;
    
    function getStatusColor(status) {
        if (!status) return 'bg-white/20';
        switch (status) {
            case 'online': return 'bg-[#43b581]';
            case 'idle': return 'bg-[#faa61a]';
            case 'dnd': return 'bg-[#f04747]';
            default: return 'bg-[#747f8d]';
        }
    }
    
    function getStatusText(status) {
        if (!status) return 'offline';
        switch (status) {
            case 'online': return 'online';
            case 'idle': return 'idle';
            case 'dnd': return 'do not disturb';
            default: return 'offline';
        }
    }
    
    function getElapsedTime(timestamp) {
        const start = new Date(timestamp);
        const now = new Date();
        const elapsed = Math.floor((now - start) / 1000);
    
        if (elapsed < 60) return 'just now';
        if (elapsed < 3600) return `${Math.floor(elapsed / 60)}m elapsed`;
        if (elapsed < 86400) return `${Math.floor(elapsed / 3600)}h ${Math.floor((elapsed % 3600) / 60)}m elapsed`;
        return `${Math.floor(elapsed / 86400)}d ${Math.floor((elapsed % 86400) / 3600)}h elapsed`;
    }
    
    function getActivityIcon(activity) {
        if (activity.type === 2 && activity.id === 'spotify:1') {
            return activity.assets?.large_image?.startsWith('spotify:')
                ? 'https://i.scdn.co/image/' + activity.assets.large_image.slice(8)
                : activity.assets?.large_image;
        }
    
        if (activity.assets?.large_image) {
            if (activity.assets.large_image.startsWith('mp:external')) {
                return activity.assets.large_image.replace(/mp:external\/.*\/https\//, 'https://');
            }
            return 'https://cdn.discordapp.com/app-assets/' + activity.application_id + '/' + activity.assets.large_image + '.png';
        }
    
        if (activity.assets?.small_image) {
            return 'https://cdn.discordapp.com/app-assets/' + activity.application_id + '/' + activity.assets.small_image + '.png';
        }
    
        return 'https://cdn.discordapp.com/app-icons/' + activity.application_id + '/favicon.png';
    }
    
    async function fetchDiscordStatus() {
        try {
            const response = await fetch('https://api.lanyard.rest/v1/users/1092100801478004816');
            const result = await response.json();
            
            if (result.success && JSON.stringify(result.data) !== JSON.stringify(previousData)) {
                data = result.data;
                previousData = result.data;
            }
        } catch (error) {
            console.error('Error fetching Discord status:', error);
        }
    }
    
    onMount(() => {
        fetchDiscordStatus();
        updateInterval = setInterval(fetchDiscordStatus, 5000);
    });
    
    onDestroy(() => {
        if (updateInterval) {
            clearInterval(updateInterval);
        }
    });
</script>

<div class="text-[#ffffff] max-w-xl mx-auto">
    <section class="mb-10">
        <div class="text-center">
            <div class="mb-6 flex justify-center">
                <img src={profilePic} alt="profile" class="rounded-full w-32 h-32 object-cover border-2 border-[#333333] shadow-md" />
            </div>
            <p class="text-2xl font-bold text-[#ffffff] mb-1">{name}</p>
            <p class="text-[#777777] mb-6">{title}</p>
            
            <div class="flex justify-center flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0 items-center">
                <a href="mailto:{email}" class="text-[#71A5B9] flex items-center px-3 py-1 border border-transparent hover:border-[#71A5B9] rounded transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {email}
                </a>
                <a href="https://github.com/{github}" class="text-[#71A5B9] flex items-center px-3 py-1 border border-transparent hover:border-[#71A5B9] rounded transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    @{github}
                </a>
            </div>
        </div>
    </section>
    
    <section class="mt-12 mb-8 border border-[#333333] rounded-sm p-5 bg-[#222020] shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
            <svg class="h-5 w-5 mr-3 text-[#71A5B9]" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5728 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
            </svg>
            <h2 class="text-[#71A5B9] text-lg font-bold">discord status</h2>
        </div>
        
        {#if !data}
            <div class="text-[#777777] px-2">connecting to discord...</div>
        {:else}
            <div class="space-y-4 px-2">
                <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full {getStatusColor(data.discord_status)}"></div>
                    <span class="text-sm text-[#aaaaaa]">{getStatusText(data.discord_status)}</span>
                </div>

                {#if data.activities && data.activities.length > 0}
                    {#each data.activities as activity (activity.name + (activity.timestamps?.start || ''))}
                        <div class="border border-[#333333] rounded-sm p-4 mt-3 bg-[#1d1c1c] hover:border-[#444444] transition-colors duration-300">
                            <div class="flex items-center space-x-4">
                                <img 
                                    src={getActivityIcon(activity)} 
                                    class="w-12 h-12 rounded bg-[#252323] shadow-sm"
                                    loading="lazy"
                                    alt={activity.name + ' icon'}
                                />
                                <div class="text-sm text-[#aaaaaa]">
                                    <p class="font-medium text-[#ffffff]">{activity.name}</p>
                                    {#if activity.details}<p class="text-[#777777]">{activity.details}</p>{/if}
                                    {#if activity.state}<p class="text-[#777777]">{activity.state}</p>{/if}
                                    {#if activity.timestamps?.start}
                                        <p class="text-[#555555] text-xs mt-2">
                                            {getElapsedTime(activity.timestamps.start)}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <div class="text-[#777777] text-sm italic px-2 py-1 border-l-2 border-[#333333]">
                        i'm currently not doing anything...
                    </div>
                {/if}
            </div>
        {/if}
    </section>
</div>
