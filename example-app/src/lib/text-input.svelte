<script lang="ts">
    import { createEventDispatcher, type EventDispatcher } from "svelte";

    // props
    export let name: string | null              = null;
    export let labelText: string | null         = null;
    export let placeholderText: string | null   = null;

    const dispatch: EventDispatcher<any> = createEventDispatcher();

    // state
    let value: string           = "";
    let editValue: string       = "";
    let displayedValue: string  = "";
    let edited: boolean         = false;
    let classes: string         = "";

    // public functions
    export function getValue() : string {
        return value;
    }

    export function getEditValue() : string {
        return edited ? editValue : "";
    }

    export function setValue(newValue: string) : void {
        value = newValue;

        if (! edited)
            displayedValue = newValue;
    }

    export function setEditValue(newValue: string) : void {
        editValue = newValue;
        setEdited(true);
    }

    export function commit() : void {
        if (! edited)
            return;

        setEdited(false);
        setValue(editValue);
    }

    export function revert() : void {
        if (! edited)
            return;

        setEdited(false);
        setValue(value);
    }

    // private functions
    function emitChangeEvent() : void {
        setEditValue(displayedValue);
        dispatch("input", null);
    }

    function setEdited(value: boolean) : void {
        if (edited == value)
            return;

        edited = value;
        classes = edited ? "modified" : "";
    }

    // init
    if (name == null) {
        console.error("name cannot be null");
        name = "error!";
    }

    if (labelText == null) {
        console.error("labelText cannot be null");
        labelText = "error!";
    }

    if (placeholderText == null) {
        console.error("placeholderText cannot be null");
        placeholderText = "error!";
    }
</script>

<style>
    :root {
        --input-border-thickness: 0.1rem;
        --input-border-radius: 0.2rem;
    }

    input[type=text] {
        padding: 0.3rem;
        border-radius: var(--input-border-radius);
        border: var(--input-border-thickness) solid #444;
    }

    .modified {
        filter: drop-shadow(0 0 0.2rem #ffe100);
    }
</style>

<div class="form-row">
    <label for={name}>{labelText}</label>
    <input type="text" class={classes} bind:value={displayedValue} on:input={emitChangeEvent} id={name} name={name} placeholder={placeholderText} />
</div>