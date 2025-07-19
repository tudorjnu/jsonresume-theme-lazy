<script lang="ts">
  let { volunteerItems } = $props();

  import { formatDate, mdToHtml } from '@/lib';
</script>

{#if volunteerItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Volunteering</h2>
      <hr />
    </div>
    <div class="margin-container-md">
      {#each volunteerItems as vol (vol.organization + vol.position)}
        <div class="volunteer-entry">
          <div class="date">
            {#if vol.startDate}
              {formatDate(vol.startDate)} -
            {/if}
            <br />
            {#if vol.endDate}
              {formatDate(vol.endDate)}
            {/if}
          </div>

          <h3 class="title">{vol.position}</h3>

          <span class="organization">
            <h3>
              {#if vol.url}
                <a href={vol.url} target="_blank" rel="noopener noreferrer">
                  {vol.organization}
                </a>
              {:else}
                {vol.organization}
              {/if}
            </h3>
          </span>

          {#if vol.summary}
            <p class="summary">{vol.summary}</p>
          {/if}

          {#if vol.highlights?.length}
            <ul class="highlights">
              {#each vol.highlights as highlight}
                <li>{@html mdToHtml(highlight)}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .volunteer-entry {
    display: grid;
    grid-template-columns: 100px 1fr auto;
  }

  .volunteer-entry .date {
    text-align: left;
    grid-row: span 10;
  }

  .volunteer-entry .organization {
    align-self: start;
    text-align: right;
    margin-left: var(--space-md);
  }

  .volunteer-entry .summary,
  .volunteer-entry .highlights {
    grid-column: 2 / span 2;
    margin: 4px 0 0;
  }

  .volunteer-entry .highlights {
    padding-left: 0;
  }

  .volunteer-entry .highlights li {
    margin-left: 16px;
  }

  .volunteer-entry p {
    margin: 0;
  }
</style>
