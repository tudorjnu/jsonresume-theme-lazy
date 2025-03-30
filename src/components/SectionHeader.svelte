<script lang="ts">
	let { title } = $props();
</script>

<div class="section-header">
	<h2>{title}</h2>
	<hr />
</div>

<style>
	div {
		display: flex;
		align-items: center;
		margin: var(--space-md) 0 var(--space-xs) 0;
	}

	hr {
		flex-grow: 1;
		align-self: center;
		border-top: 2px solid var(--neutral-700);
		margin-left: var(--font-size-2xl);
	}
</style>
