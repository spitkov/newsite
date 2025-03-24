<script>
    import { onMount } from 'svelte';

    let selectedVersion = '';
    let selectedOS = 'windows';

    const vmwareVersions = [
        "17.6.3-24583834", "17.6.2-24409262", "17.6.1-24319023", "17.6.0-24238078", 
        "17.5.2-23775571", "17.5.1-23298084", "17.5.0-22583795", "17.0.2-21581411", 
        "17.0.1-21139696", "17.0.0-20800274", "16.2.4-20089737", "16.2.3-19376536", 
        "16.2.2-19200509", "16.2.1-18811642", "16.2.0-18760230", "16.1.2-17966106", 
        "16.1.1-17801498", "16.1.0-17198959", "16.0.0-16894299", "15.5.7-17171714", 
        "15.5.6-16341506", "15.5.5-16285975", "15.5.2-15785246", "15.5.1-15018445", 
        "15.5.0-14665864", "15.1.0-13591040", "15.0.4-12990004", "15.0.3-12422535", 
        "15.0.2-10952284", "15.0.1-10737736", "15.0.0-10134415", "14.1.8-14921873", 
        "14.1.7-12989993", "14.1.6-12368378", "14.1.5-10950780", "14.1.4-10722678", 
        "14.1.3-9474260", "14.1.2-8497320", "14.1.1-7528167", "14.1.0-7370693", 
        "14.0.0-6661328", "12.5.9-7535481", "12.5.8-7098237", "12.5.7-5813279", 
        "12.5.6-5528349", "12.5.5-5234757", "12.5.4-5192485", "12.5.3-5115892", 
        "12.5.2-4638234", "12.5.1-4542065", "12.5.0-4352439", "12.1.1-3770994", 
        "12.1.0-3272444", "12.0.1-3160714", "12.0.0-2985596", "10.0.2-1744117", 
        "9.0.4-1945795", "8.0.6-1035888", "7.1.6-744570"
    ];


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
            <br>
            Update: the software update server was shut down for good, till there is a better solution all files from the update server were saved from the Internet Archive and for ease of use unzipped
            <br>
            Click <a target="_blank" href="https://web.archive.org/web/*/https://softwareupdate.vmware.com/cds/vmw-desktop/ws/*" class="text-[#71A5B9]">here</a> for the original list of links from the Internet Archive

        </p>
        <div class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <select
                        bind:value={selectedVersion}
                        class="w-full bg-[#333333] text-[#ffffff] border-[#444444] rounded-sm px-3 py-1.5 text-sm focus:border-[#71A5B9] focus:ring-[#71A5B9]">
                        <option value="">Select Version</option>
                        {#each vmwareVersions as version}
                            <option value={version}>{version}{version === vmwareVersions[0] ? ' (latest)' : ''}</option>
                        {/each}
                    </select>
                </div>
                <div class="flex-1">
                    <select
                        bind:value={selectedOS}
                        class="w-full bg-[#333333] text-[#ffffff] border-[#444444] rounded-sm px-3 py-1.5 text-sm focus:border-[#71A5B9] focus:ring-[#71A5B9]">
                        <option value="windows">Windows</option>
                        <option value="linux" disabled>Linux (Coming Soon)</option>
                    </select>
                </div>
            </div>
            <div class="flex">
                <a
                    href="https://t.3xx.pw/vmware/windows/VMware-workstation-{selectedVersion}.exe"
                    class="text-[#71A5B9] flex items-center whitespace-nowrap px-3 py-1 border border-transparent hover:border-[#71A5B9] rounded-sm transition-colors duration-200 {!selectedVersion ? 'opacity-50 cursor-not-allowed' : ''}"
                    class:pointer-events-none={!selectedVersion}>
                    <span>[download]</span>
                </a>
            </div>
        </div>
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