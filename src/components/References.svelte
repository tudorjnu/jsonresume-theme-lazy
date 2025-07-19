<script lang="ts">
  let { referenceItems } = $props();
</script>

{#if referenceItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>References</h2>
      <hr />
    </div>
    <div class="margin-container-md">
      {#each referenceItems as ref (ref.name)}
        <p class="margin-container-xs">
          <strong>{ref.name}:</strong>
          {#if ref.reference}
            <em> "{ref.reference}"</em>
          {/if}
        </p>
      {/each}
    </div>
  </div>
{/if}
