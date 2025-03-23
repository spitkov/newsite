<script>
    import { onMount, onDestroy } from 'svelte';
    
    let data = null;
    let previousData = null;
    let progressInterval;
    let currentProgress = 0;
    let currentTime = '0:00';
    let totalTime = '0:00';
    const DISCORD_ID = "1092100801478004816";
    let updateInterval;
    
    $: if (data?.activities) {
        const spotify = data.activities.find(a => a.type === 2);
        if (spotify?.timestamps?.start && spotify?.timestamps?.end) {
            const duration = new Date(spotify.timestamps.end).getTime() - new Date(spotify.timestamps.start).getTime();
            totalTime = formatTime(duration / 1000);
            startProgressTimer(spotify.timestamps.start, spotify.timestamps.end);
        }
    }
    
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
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    function startProgressTimer(start, end) {
        if (progressInterval) clearInterval(progressInterval);
        if (!start || !end) return;
        
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const total = endTime - startTime;
        
        function updateProgress() {
            const now = new Date().getTime();
            const current = now - startTime;
            currentProgress = Math.min(Math.max(current / total * 100, 0), 100);
            currentTime = formatTime(current / 1000);
            
            if (now >= endTime) {
                clearInterval(progressInterval);
            }
        }
        
        updateProgress();
        progressInterval = setInterval(updateProgress, 1000);
        return formatTime((endTime - startTime) / 1000);
    }
    
    function getActivityIcon(activity) {
        if (activity.type === 2) {
            if (activity.assets?.large_image?.startsWith('spotify:')) {
                return 'https://i.scdn.co/image/' + activity.assets.large_image.slice(8);
            }
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
            const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
            const result = await response.json();
            
            if (result.success) {
                // Check if Spotify activity has changed
                const oldSpotify = data?.activities?.find(a => a.type === 2);
                const newSpotify = result.data?.activities?.find(a => a.type === 2);
                
                if (newSpotify?.timestamps?.start !== oldSpotify?.timestamps?.start ||
                    newSpotify?.timestamps?.end !== oldSpotify?.timestamps?.end) {
                    // Start new progress timer only if Spotify activity changed
                    const totalTime = startProgressTimer(newSpotify?.timestamps?.start, newSpotify?.timestamps?.end);
                    if (totalTime) newSpotify.totalTime = totalTime;
                }
                
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
        if (updateInterval) clearInterval(updateInterval);
        if (progressInterval) clearInterval(progressInterval);
    });
</script>

<section class="mt-12 mb-8 border border-[#333333] rounded-sm p-5 bg-[#222020] shadow-md">
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
                {#each data.activities.filter(a => a.type === 2 || a.type === 0) as activity (activity.name + (activity.timestamps?.start || ''))}
                    <div class="border border-[#333333] rounded-sm p-4 mt-3 bg-[#1d1c1c]">
                        <div class="flex gap-4">
                            <div class="shrink-0">
                                <img 
                                    src={getActivityIcon(activity)} 
                                    class="w-12 h-12 rounded bg-[#252323]"
                                    loading="lazy"
                                    alt={activity.name + ' icon'}
                                />
                            </div>
                            <div class="flex-1 min-w-0">
                                {#if activity.type === 2}
                                    <div class="flex items-center justify-between mb-1">
                                        <p class="font-medium text-[#ffffff]">Listening to Spotify</p>
                                    </div>
                                    <p class="text-[#777777] truncate">{activity.details}</p>
                                    <p class="text-[#777777] truncate mb-2">by {activity.state}</p>
                                    {#if activity.timestamps?.start && activity.timestamps?.end}
                                        <div class="mt-auto">
                                            <div class="h-1 bg-[#333333] rounded-full overflow-hidden">
                                                <div class="h-full bg-[#71A5B9] transition-all duration-1000" style="width: {currentProgress}%"></div>
                                            </div>
                                            <div class="flex justify-between text-[#555555] text-xs mt-1">
                                                <span>{currentTime}</span>
                                                <span>{totalTime}</span>
                                            </div>
                                        </div>
                                    {/if}
                                {:else}
                                    <div class="flex items-center justify-between mb-1">
                                        <p class="font-medium text-[#ffffff] truncate">{activity.name}</p>
                                        {#if activity.timestamps?.start}
                                            <p class="text-[#555555] text-xs shrink-0 ml-2">
                                                {getElapsedTime(activity.timestamps.start)}
                                            </p>
                                        {/if}
                                    </div>
                                    {#if activity.details}<p class="text-[#777777] truncate">{activity.details}</p>{/if}
                                    {#if activity.state}<p class="text-[#777777] truncate">{activity.state}</p>{/if}
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