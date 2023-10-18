<script>
    import { alerts } from '../../alert/alert.json';
</script>

<section class="alert-list">
    {#each alerts as alert }
        <div class="alert" style="background-color: { alert.background }; color: { alert.color };">
            <p>{ alert.message }</p>
        </div>
    {/each}
</section>

<style>
.alert-list {
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
}
.alert {
    height: 5vh;
    text-align: center;
    width: 100%;
}
</style>