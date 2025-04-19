<script>
    import { onMount } from 'svelte';
    
    // Store for the guild tags data
    let guildTags = [];
    let priorityTags = [];
    let regularTags = [];
    let thanksCount = 0;
    let showThanks = false;
    let thanksMessage = '';
    
    // Function to handle the thanks button
    async function handleThanks() {
        // Check if user has already thanked
        if (typeof window !== 'undefined' && localStorage.getItem('has_thanked')) {
            thanksMessage = "You've already thanked!";
            showThanks = true;
            
            // Hide the thanks message after 3 seconds
            setTimeout(() => {
                showThanks = false;
            }, 3000);
            return;
        }
        
        try {
            const response = await fetch('/api/thanks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                thanksCount = data.count;
                thanksMessage = "Thank you! ❤️";
                showThanks = true;
                
                // Save that this user has thanked
                if (typeof window !== 'undefined') {
                    localStorage.setItem('has_thanked', 'true');
                }
                
                // Hide the thanks message after 3 seconds
                setTimeout(() => {
                    showThanks = false;
                }, 3000);
            }
        } catch (error) {
            console.error('Error sending thanks:', error);
        }
    }
    
    // Process the guild tags data to remove duplicates
    onMount(async () => {
        // This would normally fetch from an API, but for now we'll use the hardcoded data
        const tagsData = [
            { tag: "BRUH", memberCount: 13125, name: "La cueva de Cosi", inviteLink: "https://discord.gg/la-cueva-de-cosi-844285068275875890", iconUrl: "https://cdn.discordapp.com/clan-badges/844285068275875890/c08ecb1ef98d938294b1db84ca629ef7.png?size=16" },
            { tag: "CYBR", memberCount: 21330, name: "Cyber Info", inviteLink: "https://discord.gg/cyberinfo", iconUrl: "https://cdn.discordapp.com/clan-badges/543652415870730240/4b70e09b6b8ddf55b5f9dc6816636760.png?size=16" },
            { tag: "DEV", memberCount: 25924, name: "Reaction Roles Support", inviteLink: "https://discord.gg/reactionroles", iconUrl: "https://cdn.discordapp.com/clan-badges/547906569489350657/8e228078dc56d4ad8bdccb696d4e90be.png?size=16" },
            { tag: "DUAL", memberCount: 114017, name: "DualView", inviteLink: "https://discord.gg/dualview", iconUrl: "https://cdn.discordapp.com/clan-badges/476454574715174912/0d4b5852e84385476bd9b1142eb36e6a.png?size=16" },
            { tag: "EZ", memberCount: 26867, name: "VALORANT IL", inviteLink: "https://discord.gg/valorantil", iconUrl: "https://cdn.discordapp.com/clan-badges/986691543102529546/500be9a65c7c74da48866d6bba3d3b2f.png?size=16" },
            { tag: "GCA", memberCount: 25420, name: "Creators Area", inviteLink: "https://discord.gg/Sq5Pjy3xrh", iconUrl: "https://cdn.discordapp.com/clan-badges/223070469148901376/aef7738ba114e121d617c8c20bf7f1d6.png?size=16" },
            { tag: "iOS", memberCount: 139059, name: "r/Jailbreak", inviteLink: "https://discord.gg/jb", iconUrl: "https://cdn.discordapp.com/clan-badges/349243932447604736/dea97e909a0211e2479d75cd11c2ec41.png?size=16" },
            { tag: "LGBT", memberCount: 15683, name: "Pridecord", inviteLink: "https://discord.gg/lgbtqia", iconUrl: "https://cdn.discordapp.com/clan-badges/1077258761443483708/0453d6f081e4f524e447f2158ddc9c63.png?size=16" },
            { tag: "MEOW", memberCount: 49395, name: "Shaun's Cloud ✦", inviteLink: "https://discord.gg/8wJKvYmEwc", iconUrl: "https://cdn.discordapp.com/clan-badges/427067963137589258/83a619b6cb389b1912f76873337334a4.png?size=16" },
            { tag: "miku", memberCount: 135, name: "Hood Network", inviteLink: "https://discord.gg/discord-hq-1029315212005888060", iconUrl: "https://cdn.discordapp.com/clan-badges/1029315212005888060/0a10d67e89ca4f6759ba290d0ae580ad.png?size=16" },
            { tag: "moco", memberCount: 150064, name: "joinmoco", inviteLink: "https://discord.gg/moco", iconUrl: "https://cdn.discordapp.com/clan-badges/1151156552888238183/4ef966b9bdd3ca7155e184e893314cd6.png?size=16" },
            { tag: "RAWR", memberCount: 931, name: "╚» Gameland & Friends «╝", inviteLink: "https://discord.gg/kCh734XdZv", iconUrl: "https://cdn.discordapp.com/clan-badges/804032421678153819/6245505dfa39c9fd91f02cda71c56d07.png?size=16" },
            { tag: "Soul", memberCount: 15001, name: "Soulobby", inviteLink: "https://discord.gg/soulobby", iconUrl: "https://cdn.discordapp.com/clan-badges/534940241002233896/1379429e0cfd3dab1ba1de9d0b0324b6.png?size=16" },
            { tag: "SOUL", memberCount: 11611, name: "Celestrial Boundaries", inviteLink: "https://discord.gg/xFrgMAzmUc", iconUrl: "https://cdn.discordapp.com/clan-badges/786437953299021844/856cecbf8055036b98cf05fd54cd8872.png?size=16" },
            { tag: "STAR", memberCount: 32890, name: "SolarBalls", inviteLink: "https://discord.gg/solarballs", iconUrl: "https://cdn.discordapp.com/clan-badges/1044698006395555960/bdf7998de2b7f8d2153aa572b8cf2e82.png?size=16" },
            { tag: "TIT", memberCount: 27279, name: "TitsRP", inviteLink: "https://discord.gg/titsrp", iconUrl: "https://cdn.discordapp.com/clan-badges/247434867527122945/40a7aa796426347d6b76d20dfed2c273.png?size=16" },
            { tag: "VALC", memberCount: 11729, name: "Valcraft - play.valc.gg", inviteLink: "https://discord.gg/mqGmVhntRt", iconUrl: "https://cdn.discordapp.com/clan-badges/1350807682520711199/2358a3b47ad661897e3c165821b35a10.png?size=16" },
            { tag: "VIP", memberCount: 24819, name: "Nico's Safe Space", inviteLink: "https://discord.gg/TvTaJMFhQZ", iconUrl: "https://cdn.discordapp.com/clan-badges/710871326557995079/83a083caeb028f56086ec619735b231f.png?size=16" },
            { tag: "YEVA", memberCount: 814, name: "Yeva is cEDH?", inviteLink: "https://discord.gg/ascEJHWhpx", iconUrl: "https://cdn.discordapp.com/clan-badges/622156491796905995/6082c2553b03b47ccaea5203567df3cf.png?size=16" }
        ];
        
        // Remove duplicates by tag (case insensitive)
        const uniqueTags = {};
        tagsData.forEach(tag => {
            const lowerTag = tag.tag.toLowerCase();
            if (!uniqueTags[lowerTag] || tag.memberCount > uniqueTags[lowerTag].memberCount) {
                uniqueTags[lowerTag] = tag;
            }
        });
        
        // Convert back to array
        const allTags = Object.values(uniqueTags);
        
        // Separate priority tags (MEOW and DEV)
        priorityTags = allTags.filter(tag => 
            tag.tag.toUpperCase() === 'MEOW' || 
            tag.tag.toUpperCase() === 'DEV'
        );
        
        // All other tags sorted by member count (descending)
        regularTags = allTags
            .filter(tag => 
                tag.tag.toUpperCase() !== 'MEOW' && 
                tag.tag.toUpperCase() !== 'DEV'
            )
            .sort((a, b) => b.memberCount - a.memberCount);
        
        // Fetch initial thanks count
        try {
            const response = await fetch('/api/thanks');
            if (response.ok) {
                const data = await response.json();
                thanksCount = data.count;
            }
        } catch (error) {
            console.error('Error fetching thanks count:', error);
        }
        
        // Check if user has already thanked
        if (typeof window !== 'undefined') {
            const hasThanksBefore = localStorage.getItem('has_thanked') === 'true';
            if (hasThanksBefore) {
                console.log('User has already thanked before');
            }
        }
    });
</script>

<section class="mt-12 mb-8 border border-[#333333] rounded-sm p-5 bg-[#222020] shadow-md">
    <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
            <svg class="h-5 w-5 mr-3 text-[#71A5B9]" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5728 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
            </svg>
            <h2 class="text-[#71A5B9] text-lg font-bold">discord guild tags</h2>
        </div>
        
        <div class="relative">
            <button 
                on:click={handleThanks}
                class="px-3 py-1 text-sm bg-[#1d1c1c] border border-[#333333] text-[#71A5B9] rounded-sm hover:bg-[#2a2a2a] transition-colors duration-200"
            >
                Thanks ({thanksCount})
            </button>
            
            {#if showThanks}
                <div class="absolute right-0 top-full mt-2 px-3 py-2 bg-[#2a2a2a] border border-[#333333] rounded-sm text-[#71A5B9] text-xs animate-fadeIn z-10">
                    {thanksMessage}
                </div>
            {/if}
        </div>
    </div>
    
    <!-- Priority tags section (MEOW and DEV) -->
    {#if priorityTags.length > 0}
        <div class="mb-4 border-b border-[#333333] pb-4">
            <h3 class="text-sm text-[#71A5B9] mb-3 font-bold">Featured Tags</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {#each priorityTags as tag}
                    <div class="border border-[#333333] rounded-sm p-3 bg-[#1d1c1c] hover:bg-[#252323] transition-colors duration-200">
                        <div class="flex items-center gap-2 mb-2">
                            <img src={tag.iconUrl} alt={tag.tag} class="w-5 h-5" />
                            <span class="font-bold text-[#ffffff]">{tag.tag}</span>
                            <span class="text-xs text-[#777777] ml-auto">{tag.memberCount.toLocaleString()}</span>
                        </div>
                        <div class="text-sm text-[#aaaaaa] truncate">{tag.name}</div>
                        <div class="mt-2">
                            <a 
                                href={tag.inviteLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="text-xs text-[#71A5B9] hover:underline flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                                    <path d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
                                </svg>
                                Join Server
                            </a>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
    
    <!-- Regular tags section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {#each regularTags as tag}
            <div class="border border-[#333333] rounded-sm p-3 bg-[#1d1c1c] hover:bg-[#252323] transition-colors duration-200">
                <div class="flex items-center gap-2 mb-2">
                    <img src={tag.iconUrl} alt={tag.tag} class="w-5 h-5" />
                    <span class="font-bold text-[#ffffff]">{tag.tag}</span>
                    <span class="text-xs text-[#777777] ml-auto">{tag.memberCount.toLocaleString()}</span>
                </div>
                <div class="text-sm text-[#aaaaaa] truncate">{tag.name}</div>
                <div class="mt-2">
                    <a 
                        href={tag.inviteLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="text-xs text-[#71A5B9] hover:underline flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                            <path d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
                        </svg>
                        Join Server
                    </a>
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeIn {
        animation: fadeIn 0.3s ease-out forwards;
    }
</style>
