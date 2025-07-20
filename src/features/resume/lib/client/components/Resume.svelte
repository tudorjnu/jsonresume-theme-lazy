<script lang="ts">
  import '@/styles/normalizer.css';
  import '@/styles/global.css';
  import '@/styles/print.css';
  import Basics from './Basics.svelte';
  import Work from './Work.svelte';
  import Education from './Education.svelte';
  import Skill from './Skill.svelte';
  import Volunteer from './Volunteer.svelte';
  import Projects from './Projects.svelte';
  import Certificates from './Certificates.svelte';
  import Awards from './Awards.svelte';
  import Languages from './Languages.svelte';
  import Publications from './Publications.svelte';
  import References from './References.svelte';
  import Interests from './Interests.svelte';

  let { resume } = $props();
</script>

<div class="content">
  <Basics basics={resume.basics} />
  <Skill skillItems={resume.skills} />
  <Work workItems={resume.work} />
  <Education educationItems={resume.education} />
  <Volunteer volunteerItems={resume.volunteer} />
  <Projects projectItems={resume.projects} />
  <Certificates certificateItems={resume.certificates} />
  <Awards awardItems={resume.awards} />
  <Languages languageItems={resume.languages} />
  <Publications publicationItems={resume.publications} />
  <References referenceItems={resume.references} />
  <Interests interestItems={resume.interests} />
</div>
