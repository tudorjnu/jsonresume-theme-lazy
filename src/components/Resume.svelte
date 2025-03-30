<script lang="ts">
	import '../styles/normalizer.css';
	import '../styles/global.css';
	import '../styles/print.css';
	import Basics from './Basics.svelte';
	import Work from './Work.svelte';
	import Education from './Education.svelte';

	let { resume } = $props();
</script>

<div class="content">
	<Basics {...resume.basics} />
	<Work workItems={resume.work} />
	<Education educationItems={resume.education} />
</div>
