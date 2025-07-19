<script lang="ts">
  let { publicationItems } = $props();

  import { formatDate, mdToHtml } from '@/lib';
</script>

{#if publicationItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Publications</h2>
      <hr />
    </div>
    <div class="margin-container-md">
      {#each publicationItems as publication (publication.name + publication.releaseDate)}
        <div class="publication-entry">
          <div class="date">
            {#if publication.releaseDate}
              {formatDate(publication.releaseDate)}
            {/if}
          </div>

          {#if publication.formattedCitation}
            <div class="title">
              {@html mdToHtml(publication.formattedCitation)}
            </div>
          {:else}
            <h3 class="title">
              {publication.name}
              {#if publication.publisher}
                {#if publication.website}
                  , <a href={publication.website} target="_blank" rel="noopener noreferrer"
                    >{publication.publisher}</a
                  >
                {:else}
                  , {publication.publisher}
                {/if}
              {/if}
            </h3>

            {#if publication.authors}
              <div class="authors">
                {@html mdToHtml(publication.authors)}
              </div>
            {/if}
          {/if}

          {#if publication.summary}
            <div class="summary">
              {@html mdToHtml(publication.summary)}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .publication-entry {
    display: grid;
    grid-template-columns: 100px 1fr auto;
  }

  .publication-entry .date {
    text-align: left;
    grid-row: span 10;
  }

  .publication-entry .authors,
  .publication-entry .summary {
    grid-column: 2 / span 2;
  }

  .publication-entry .title {
    text-align: left;
  }

  .publication-entry .summary {
    padding-left: 0;
  }
</style>
