<script>
    const projects = [
        {
            name: "mx.spitkov.hu",
            description: "My email service with domains like: blahaj.fun peakfemboy.cfd, gays.cfd and so on.",
            url: "https://mx.spitkov.hu"
        },
        {
            name: "git.spitkov.hu",
            description: "Self-hosted Forgejo Git server for personal projects and development.",
            url: "https://git.spitkov.hu"
        },
        {
            name: "cloudbin.cfd",
            description: "5tb public archival storage",
            url: "https://cloudbin.cfd"
        },
        {
            name: "fileb.in",
            description: "Simple and fast file sharing service no registration required.",
            url: "https://fileb.in"
        },
        {
            name: "sxbin.gay",
            description: "file uploader link shortener pastebin, sharex support.",
            url: "https://sxbin.gay"
        },
        {
            name: "techtalk.spitkov.hu",
            description: "Twitter clone xd.",
            url: "https://techtalk.spitkov.hu"
        }
    ];
</script>

<div class="text-[#ffffff] max-w-xl mx-auto">
    <h1 class="text-xl text-[#ffffff] font-bold mb-8">portfolio</h1>
    
    <div class="space-y-6">
        {#each projects as project}
            <div class="border border-[#333333] rounded-sm p-5 bg-[#222020] shadow-md hover:shadow-lg transition-shadow duration-300">
                <div class="grid grid-cols-[1fr_auto] gap-4 items-center">
                    <div>
                        <h2 class="text-lg font-bold text-[#71A5B9] mb-2">{project.name}</h2>
                        <p class="text-[#aaaaaa] text-sm">{project.description}</p>
                    </div>
                    <div>
                        <a href={project.url} target="_blank" rel="noopener noreferrer" 
                           class="text-[#71A5B9] flex items-center whitespace-nowrap px-3 py-1 border border-transparent hover:border-[#71A5B9] rounded-sm transition-colors duration-200">
                            <span>visit</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div> 