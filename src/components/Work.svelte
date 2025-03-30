<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import { mdToHtml, formatDate } from '../lib/index.ts';
	let { workItems } = $props();
</script>

{#if workItems?.length}
	<div class="section-container">
		<SectionHeader title="Work" />
		<div class="margin-container-md">
			{#each workItems as work (work.startDate + work.position)}
				<div class="work-entry">
					<div class="date">
						{formatDate(work.startDate)} –<br />
						{formatDate(work.endDate)}
					</div>

					<h3 class="title">{work.position}</h3>

					<h3 class="name">
						{#if work.url}
							<a href={work.url} target="_blank" rel="noopener noreferrer">{work.name}</a>
						{:else}
							{work.name}
						{/if}
					</h3>

					{#if work.summary}
						<p class="summary">{work.summary}</p>
					{/if}

					{#if work.highlights?.length}
						<ul class="highlights">
							{#each work.highlights as highlight, i (i)}
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
	.work-entry {
		display: grid;
		grid-template-columns: 100px 1fr auto;
	}

	.work-entry .date {
		text-align: left;
		grid-row: span 10;
	}

	.work-entry .summary,
	.work-entry .highlights {
		grid-column: 2 / span 2;
		margin: 4px 0 0;
	}

	.work-entry .highlights {
		padding-left: 0;
	}

	.work-entry .highlights li {
		margin-left: 16px;
	}

	.work-entry p {
		margin: 0;
	}
</style>
