<script lang="ts">
  let { projectItems } = $props();

  import { formatDate, mdToHtml } from '@/lib';
</script>

{#if projectItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Projects</h2>
      <hr />
    </div>
    <div class="margin-container-md">
      {#each projectItems as project (project.name)}
        <div class="project-entry">
          <div class="date">
            {#if project.startDate}
              {formatDate(project.startDate)} -
            {/if}
            <br />
            {#if project.endDate}
              {formatDate(project.endDate)}
            {/if}
          </div>

          <h3 class="title">
            {project.name}
            {#if project.roles?.length}
              {' (' + project.roles.join(', ') + ')'}
            {/if}
          </h3>

          <span class="entity">
            <h3>
              {#if project.url}
                <a href={project.url} target="_blank" rel="noopener noreferrer">{project.entity}</a>
              {:else}
                {project.entity}
              {/if}
            </h3>
          </span>

          {#if project.description}
            <p class="description">{project.description}</p>
          {/if}

          {#if project.keywords?.length}
            <p class="keywords">
              <strong>Keywords:</strong>
              {project.keywords.join(', ')}.
            </p>
          {/if}

          {#if project.highlights?.length}
            <ul class="highlights">
              {#each project.highlights as highlight}
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
  .project-entry {
    display: grid;
    grid-template-columns: 100px 1fr auto;
  }

  .project-entry .date {
    text-align: left;
    grid-row: span 10;
  }

  .project-entry .entity {
    align-self: start;
    text-align: right;
  }

  .project-entry .description,
  .project-entry .highlights,
  .project-entry .keywords,
  .project-entry .roles {
    grid-column: 2 / span 2;
    margin: 2px 0 0;
  }

  .project-entry .highlights {
    padding-left: 0;
  }

  .project-entry .highlights li {
    margin-left: 16px;
  }
</style>
