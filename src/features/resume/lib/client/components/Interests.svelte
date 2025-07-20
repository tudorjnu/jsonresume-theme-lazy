<script lang="ts">
  let { interestItems } = $props();
</script>

{#if interestItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Interests</h2>
      <hr />
    </div>
    <div class="margin-container-xs">
      {#each interestItems as interest (interest.name)}
        <p>
          <strong>{interest.name}:</strong>
          {#if interest.keywords?.length}
            {' ' + interest.keywords.join(', ')}
          {/if}
        </p>
      {/each}
    </div>
  </div>
{/if}
