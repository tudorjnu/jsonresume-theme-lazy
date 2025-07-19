<script lang="ts">
  let { certificateItems } = $props();

  import { formatDate } from '@/lib';
</script>

{#if certificateItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Certificates</h2>
      <hr />
    </div>
    <div class="margin-container-xs">
      {#each certificateItems as cert (cert.name + cert.issuer)}
        <div class="certificate-entry">
          <div class="date">
            {#if cert.date}
              {formatDate(cert.date)}
            {/if}
          </div>

          <h3 class="title">
            {#if cert.url}
              <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.name}</a>
            {:else}
              {cert.name}
            {/if}
          </h3>

          <h3 class="issuer">{cert.issuer}</h3>
        </div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .certificate-entry {
    display: grid;
    grid-template-columns: 100px 1fr auto;
  }

  .certificate-entry .date {
    text-align: left;
    grid-row: span 2;
  }

  .certificate-entry .title {
    margin: 0;
  }

  .certificate-entry .issuer {
    margin-left: var(--space-md);
    align-self: start;
    text-align: right;
  }

  .certificate-entry a {
    color: var(--text-color-lighter);
    text-decoration: none;
  }

  .certificate-entry a:hover {
    text-decoration: underline;
  }
</style>
