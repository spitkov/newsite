<script>
    import DiscordStatus from '$lib/components/DiscordStatus.svelte';
    import DiscordGuildTags from '$lib/components/DiscordGuildTags.svelte';
    
    const name = "spitkov";
    const title = "full-stack dev";
    const profilePic = "/artworks-PBUoUMCK8utPRMJ7-NIcXIQ-t500x500.png"
    const email = "bence@spitkov.hu";
    const github = "spitkov";
</script>

<div class="text-[#ffffff] max-w-xl mx-auto">
    <section class="mb-10">
        <div class="text-center">
            <div class="mb-6 flex justify-center">
                <img src={profilePic} alt="profile" class="rounded-xl w-32 h-32 object-cover border-2 border-[#333333] shadow-md" />
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
    
    <DiscordStatus />
    
    <DiscordGuildTags />
</div>
