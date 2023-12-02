<script>
    import 'mdui/mdui.css';
    import 'mdui/components/card.js';
    import 'mdui/components/collapse.js';
    import 'mdui/components/collapse-item.js';
    import 'mdui/components/list.js';
    import 'mdui/components/list-item.js';

    /** @type {import('./$types').PageData} */
    export let data;

    function capitalize([first='', ...rest]) {
        return first.toUpperCase() + rest.join('');
    }

    function unixtime2str(datetime) {
        const dateobj = new Date(datetime * 1000)
        return dateobj.toLocaleString('en-US', { day: "numeric", month: "long", year: "numeric" })
    }
</script>

<svelte:head>
    <title>Project ICE Downloads</title>
</svelte:head>

<mdui-collapse accordion id="collapse-ota-selector">
    {#each data.response as {id, datetime, filename, size, url, version}, i}
    <mdui-collapse-item value="ota-item-{i}">
        <mdui-list-item rounded alignment="center" slot="header" icon="system_update">
            <p style="text-align: center; line-height: 1.08">{capitalize(version)} | {unixtime2str(datetime)}</p>
        </mdui-list-item>
        <mdui-card clickable variant="outlined" href="{url}" style="min-height: 3.5rem; display: block; padding: 12px">
            <p style="text-align: center; word-break: break-all">{filename} ({(size / 1024 / 1024).toFixed(1)}M)</p>
            <p style="text-align: center; word-break: break-all">SHA256: {id}</p>
        </mdui-card>
    </mdui-collapse-item>
    {/each}
</mdui-collapse>
