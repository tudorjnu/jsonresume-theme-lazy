<script lang="ts">
  let { languageItems } = $props();
</script>

{#if languageItems?.length}
  <div class="section-container">
    <div class="section-header">
      <h2>Languages</h2>
      <hr />
    </div>
    <div class="margin-container-sm">
      <p>
        {languageItems.map((lang) => `${lang.language} (${lang.fluency})`).join(', ')}.
      </p>
    </div>
  </div>
{/if}
