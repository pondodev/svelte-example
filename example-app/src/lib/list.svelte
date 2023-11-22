<script lang=ts>
    const itemList: string[] = [ "yeah", "nah", "mate" ];

    let classNames: string = "";
    export { classNames as class };
</script>

<style>
    div {
        width: fit-content;
        height: fit-content;
    }
</style>

<div class={classNames}>
    <h2>a list (but very cool)</h2>
    <hr />

    <ol>
    {#each itemList as item}
        <li>{item}</li>
    {/each}
    </ol>
</div>