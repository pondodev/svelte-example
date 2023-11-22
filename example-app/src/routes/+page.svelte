<title>svelte form test</title>

<script lang="ts">
    import { onMount } from "svelte";
    import TextInput from "$lib/text-input.svelte";
    import List from "$lib/list.svelte";
    import { PersonData, API } from "$lib/api-utility";

    const routeBase: string = "http://localhost:8000";

    // element references
    let nameInput: TextInput;
    let ageInput: TextInput;

    // private functions
    function submitData() : void {
        const nameEditValue = nameInput.getEditValue();
        const ageEditValue = ageInput.getEditValue();

        if (nameEditValue.length === 0 && ageEditValue.length === 0)
            return;

        const nameValue = nameEditValue.length === 0 ? nameInput.getValue() : nameEditValue;
        const ageValue = ageEditValue.length === 0 ? ageInput.getValue() : ageEditValue;

        const data: PersonData = PersonData.fromFormData(nameValue, ageValue);
        API.put(
            `${routeBase}/person`,
            JSON.stringify(data),
            (response: API.APIResponse) => {
                if (response.success) {
                    nameInput.commit();
                    ageInput.commit();
                }
            }
        );
    }

    function revertData() : void {
        nameInput.revert();
        ageInput.revert();
    }

    function nameChanged() : void {
        const editValue: string = nameInput.getEditValue();
        const value = editValue == null ? nameInput.getValue() : editValue;
        console.log(`name has been changed to: ${value}`);
    }

    function pollPerson() : void {
        API.get(
            `${routeBase}/person`,
            (response: API.APIResponse) => {
                if (! response.success)
                    return;

                nameInput.setValue(response.data["name"]);
                ageInput.setValue(response.data["age"]);
            }
        );
    }

    // lifecycle hooks
    onMount(() => {
        setInterval(pollPerson, 500);
        pollPerson();
    });
</script>

<style>
    .page-container {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .form-container {
        width: fit-content;
        height: fit-content;
    }

    .form-header {
        margin: 0;
    }

    .form-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 0.5rem;
    }

    .form-button {
        border: 0 transparent solid;
        border-radius: 0.1rem;
        padding: 0.5rem 1rem;
        color: #222;
        background-color: #888;
        transition: ease 0.1s;
    }

    .form-button:hover {
        cursor: pointer;
        background-color: #222;
        color: #EEE;
        transition: ease 0.1s;
    }

    .form-button:active {
        color: #222;
        background-color: #FFF;
    }
</style>

<h1>a svelte example app</h1>

<div class="page-container">
    <form class="page-item-container form-container">
        <h2 class="form-header">a form of some description</h2>
        <hr />
        <TextInput
            bind:this={nameInput}
            on:input={nameChanged}
            name="name"
            labelText="name:"
            placeholderText="enter your name"
        />
        <TextInput
            bind:this={ageInput}
            name="age"
            labelText="age:"
            placeholderText="enter your age"
        />
        <div class="form-row">
            <button class="form-button" on:click={submitData}>submit</button>
            <button class="form-button" on:click={revertData}>revert</button>
        </div>
    </form>

    <div>
        <List class="page-item-container" />
    </div>
</div>
