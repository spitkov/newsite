<script>
    const softwareItems = [
        {
            name: "Internet Download Manager v6.37.16",
            description: "Download accelerator and manager (cracked)",
            url: "https://t.3xx.pw/idm_cracked/Internet.Download.Manager.v6.37.16.exe"
        },
        {
            name: "People Playground v1.27.5",
            description: "Physics sandbox game (cracked)",
            url: "https://t.3xx.pw/games/People.Playground.v1.27.5.zip"
        }
    ];
    
    const quickLinks = [
        {
            name: "Tomcat Repo",
            description: "A collection of useful tools and resources",
            url: "https://t.3xx.pw"
        }
    ];
</script>

<div class="text-[#ffffff] max-w-xl mx-auto">
    <h1 class="text-xl text-[#ffffff] font-bold mb-8">tools</h1>
    
    <section class="mb-8 border border-[#333333] rounded-sm p-5 bg-[#222020] shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-lg font-bold text-[#71A5B9] mb-4">vmware downloads</h2>
        <p class="text-[#aaaaaa] text-sm mb-4">
            VMware got acquired by Broadcom and made it near impossible to find any downloads. 
            Here you can find all versions directly from VMware's software update server.
        </p>
        <a href="https://softwareupdate.vmware.com/cds/vmw-desktop/ws/" class="text-[#71A5B9] flex items-center w-fit px-3 py-1 border border-transparent hover:border-[#71A5B9] rounded-sm transition-colors duration-200">
            <span>→ browse vmware workstation versions</span>
        </a>
    </section>
    
    <section class="mb-8 border border-[#333333] rounded-sm p-5 bg-[#222020] shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-lg font-bold text-[#71A5B9] mb-4">software</h2>
        <div class="space-y-5">
            {#each softwareItems as item}
                <div class="pb-4 border-b border-[#333333] last:border-0 last:pb-0">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div>
                            <h3 class="text-base font-medium text-[#ffffff]">{item.name}</h3>
                            <p class="text-[#aaaaaa] text-sm">{item.description}</p>
                        </div>
                        <a href={item.url} class="text-[#71A5B9] flex items-center whitespace-nowrap px-3 py-1 border border-transparent hover:border-[#71A5B9] rounded-sm transition-colors duration-200">
                            <span>[download]</span>
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </section>
    
    <section class="mb-8 border border-[#333333] rounded-sm p-5 bg-[#222020] shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 class="text-lg font-bold text-[#71A5B9] mb-4">quick links</h2>
        <div class="space-y-5">
            {#each quickLinks as link}
                <div class="pb-4 border-b border-[#333333] last:border-0 last:pb-0">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div>
                            <h3 class="text-base font-medium text-[#ffffff]">{link.name}</h3>
                            <p class="text-[#aaaaaa] text-sm">{link.description}</p>
                        </div>
                        <a href={link.url} class="text-[#71A5B9] flex items-center whitespace-nowrap px-3 py-1 border border-transparent hover:border-[#71A5B9] rounded-sm transition-colors duration-200">
                            <span>visit →</span>
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    </section>
</div> 