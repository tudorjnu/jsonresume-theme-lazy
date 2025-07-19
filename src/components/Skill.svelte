<script lang="ts">
  let { skillItems } = $props();
</script>

{#if skillItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Skills</h2>
      <hr />
    </div>
    <div class="margin-container-xs">
      {#each skillItems as skill (skill.name)}
        <div class="skill">
          <p>
            <strong>
              {skill.name}
              {#if skill.level}
                ({skill.level})
              {/if}
              :
            </strong>
            {#if skill.keywords?.length}
              {skill.keywords.join(', ')}
            {/if}
          </p>
        </div>
      {/each}
    </div>
  </div>
{/if}
