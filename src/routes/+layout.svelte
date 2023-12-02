<script>
import 'mdui/mdui.css';
import 'mdui/components/button-icon.js';
import 'mdui/components/collapse.js';
import 'mdui/components/collapse-item.js';
import 'mdui/components/divider.js';
import 'mdui/components/dropdown.js';
import 'mdui/components/layout.js';
import 'mdui/components/layout-main.js';
import 'mdui/components/list.js';
import 'mdui/components/list-item.js';
import 'mdui/components/menu.js';
import 'mdui/components/menu-item.js';
import 'mdui/components/navigation-drawer.js';
import 'mdui/components/top-app-bar.js';
import 'mdui/components/top-app-bar-title.js';

// import 'material-icons/iconfont/material-icons.css';

import { onMount } from 'svelte';
import { page } from '$app/stores';
import { beforeNavigate, onNavigate } from '$app/navigation'

/** @type {import('./$types').LayoutData} */
export let data;

let oems = data.response;
let currentDevice = '';

onMount(() => {
    const navigationDrawer = document.querySelector(".navigation-drawer");

    const toggleButton = document.querySelector(".drawer-toggle");
    toggleButton.addEventListener("click", () => navigationDrawer.open = !navigationDrawer.open);

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1080)
            navigationDrawer.style = "top: 64px; bottom: 0px; left: 0px; display: block;"
        navigationDrawer.open = window.innerWidth >= 1080
    });

    const currentPath = $page.url.pathname;
    const device = currentPath.match(/\/devices\/(.+?)\/builds/);
    if (device) {
        currentDevice = device[1];
        const item = document.getElementById(`device-item-${currentDevice}`);
        if (item) {
            item.active = true;
            const cll = item.closest("mdui-collapse-item");
            if (cll && cll.parentElement)  cll.parentElement.value = cll.value;
        }
    }

    if (window.innerWidth >= 1080) {
        navigationDrawer.style = "top: 64px; bottom: 0px; left: 0px; display: block;"
        navigationDrawer.open = true;
    }
});

beforeNavigate(() => {
    const otaSelector = document.getElementById("collapse-ota-selector");
    if (otaSelector)  otaSelector.value = undefined;
})

onNavigate(() => {
    document.querySelectorAll('[id^="device-item-"]').forEach((device) => {
        if (device.active && device.id != `device-item-${currentDevice}`)
            device.active = false;
    })
})

</script>

<mdui-layout>

    <mdui-layout-main style="padding: 64px 0px 0px 360px;">
        <div style="margin-left: 1rem"><slot /></div>
        <div style="height: 100vh"></div>
    </mdui-layout-main>

    <mdui-top-app-bar>
        <mdui-button-icon class="drawer-toggle" icon="menu"></mdui-button-icon>
        <mdui-top-app-bar-title>
            <a href="/" style="color: inherit; text-decoration: none;"
                on:click={() => { currentDevice = '';
                    document.getElementById("collapse-device-selector").value = undefined;
                }}>Project ICE</a>
        </mdui-top-app-bar-title>
        <div style="flex-grow: 1"></div>
        <mdui-dropdown trigger="click" placement="bottom-end">
            <mdui-button-icon slot="trigger" icon="more_vert"></mdui-button-icon>
            <mdui-menu>
                <mdui-menu-item href="https://github.com/Project-1CE" target="_blank" rel="noopener noreferrer">GitHub Mirror</mdui-menu-item>
                <mdui-menu-item href="https://review.project-ice.org" target="_blank" rel="noopener noreferrer">Gerrit Code Review</mdui-menu-item>
                <mdui-divider />
                <mdui-menu-item href="https://caf.project-ice.org" target="_blank" rel="noopener noreferrer">CodeLinaro Tracker</mdui-menu-item>
            </mdui-menu>
        </mdui-dropdown>
    </mdui-top-app-bar>

    <mdui-navigation-drawer close-on-overlay-click contained class="navigation-drawer" placement="left">
        <mdui-list>
            <mdui-collapse accordion id="collapse-device-selector">
                {#each oems as {devices, name}, i}
                <mdui-collapse-item value="oem-item-{i}">
                    <mdui-list-item rounded alignment="center" slot="header" icon="android" end-icon="expand_more">{name}</mdui-list-item>
                    <div style="margin-left: 2.5rem">
                        {#each devices as {model, name}, j}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-interactive-supports-focus -->
                        <mdui-list-item rounded alignment="center" id="device-item-{model}"
                            role="button" on:click={(c) => {
                                currentDevice = model; c.currentTarget.active = true;
                                const navigationDrawer = document.querySelector(".navigation-drawer");
                                if (navigationDrawer.mobile)  navigationDrawer.open = false;
                            }}
                            href="/devices/{model}/builds" aria-current={$page.url.pathname === "/devices/{model}/builds"}
                        >{name}</mdui-list-item>
                        {/each}
                    </div>
                </mdui-collapse-item>
                {/each}
            </mdui-collapse>
        </mdui-list>
    </mdui-navigation-drawer>

</mdui-layout>
