<script>
    export let message = "";
    function handleClick(e) {
    document.body.removeChild(this.parentElement);
    }
    function handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === 'Space') {
            // Handle the keyboard event as needed
            handleClick();
        }
    }
</script>

<div class="alert">
    <span role="button" on:click={handleClick} on:keydown={handleKeyDown} tabindex="0">X</span>
    <p>{message}</p>
</div>

<style>
    .alert {
        background-color: orange;
        display: flex;
        padding: 5px;
        align-items: center;
    }
    .alert p {
        padding: 10px;
    }
</style>