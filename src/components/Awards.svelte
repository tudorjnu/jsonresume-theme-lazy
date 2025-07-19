<script lang="ts">
  let { awardItems } = $props();

  import { formatDate } from '@/lib';
</script>

{#if awardItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Awards</h2>
      <hr />
    </div>
    <div class="margin-container-md">
      {#each awardItems as award (award.title + award.awarder)}
        <div class="award-entry">
          <div class="date">
            {#if award.date}
              {formatDate(award.date)}
            {/if}
          </div>

          <h3 class="title">{award.title}</h3>

          <span class="awarder">
            <h3>{award.awarder}</h3>
          </span>

          {#if award.summary}
            <p class="summary">{award.summary}</p>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .award-entry {
    display: grid;
    grid-template-columns: 100px 1fr auto;
  }

  .award-entry .date {
    text-align: left;
    grid-row: span 10;
  }

  .award-entry .awarder {
    margin-left: var(--space-md);
    align-self: start;
    text-align: right;
  }

  .award-entry .summary {
    grid-column: 2 / span 2;
  }
</style>
