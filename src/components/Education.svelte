<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import { mdToHtml, formatDate } from '../lib/index.ts';
	let { educationItems } = $props();
</script>

{#if educationItems?.length}
	<div class="section-container">
		<SectionHeader title="Education" />

		<div class="margin-container-md">
			{#each educationItems as edu (edu.startDate + edu.institution)}
				<div class="education-entry no-break">
					<div class="date">
						{formatDate(edu.startDate)} –<br />
						{formatDate(edu.endDate)}
					</div>

					<h3>
						{edu.studyType} in {edu.area}
						{#if edu.score}
							({' '}{edu.score})
						{/if}
					</h3>

					<h3 class="institution">
						{#if edu.url}
							<a href={edu.url} target="_blank" rel="noopener noreferrer">{edu.institution}</a>
						{:else}
							{edu.institution}
						{/if}
					</h3>

					{#if edu.summary}
						<div class="summary" innerHTML={mdToHtml(edu.summary)} />
					{/if}

					{#if edu.courses?.length}
						<p class="course">
							<strong>Courses:</strong>
							{edu.courses.join(', ')}.
						</p>
					{/if}

					{#if edu.highlights?.length}
						<ul class="highlights">
							{#each edu.highlights as highlight, i (i)}
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
	.education-entry {
		display: grid;
		grid-template-columns: 100px 1fr auto;
	}

	.education-entry .date {
		text-align: left;
		grid-row: span 10;
	}

	.education-entry .institution {
		margin-left: var(--space-md);
		align-self: start;
		text-align: right;
	}

	.education-entry .summary,
	.education-entry .course,
	.education-entry .highlights {
		grid-column: 2 / span 2;
		margin: 4px 0 0;
	}

	.education-entry .highlights {
		padding-left: 0;
	}

	.education-entry .highlights li {
		margin-left: 16px;
	}

	.education-entry p {
		margin: 0;
	}
</style>
