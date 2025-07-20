<script lang="ts">
  import { formatLocation, formatPhone } from '@/lib';
  import type { Basics, Profile } from '@/features/resume/types';
  let { basics }: { basics: Basics } = $props();

  const iconMap: Record<string, string> = {
    GitHub: 'fab fa-github',
    LinkedIn: 'fab fa-linkedin'
  };

  interface iconLink {
    icon: string;
    text: string;
    link: string;
  }

  function formatProfile(profile: Profile): iconLink {
    const icon = iconMap[profile.network] || 'fas fa-link';
    const text = profile.username ?? profile.url.replace(/^https?:\/\//, '');
    const link = profile.url;
    return { icon, text, link };
  }

  const formattedProfiles = basics.profiles.map(formatProfile);
</script>

<div class="header-container">
  <div class="title">
    <span class="name">{basics.name}</span>
    {#if basics.label}
      <span class="separator">|</span>
      <span class="label">{basics.label}</span>
    {/if}
  </div>

  <hr />

  <ul class="profiles">
    {#if basics.location}
      <li>
        <i class="fas fa-map-marker-alt"></i>
        <span>{formatLocation(basics.location)}</span>
      </li>
    {/if}

    {#if basics.phone}
      <li>
        <i class="fas fa-phone"></i>
        <a href={`tel:${basics.phone}`}>{formatPhone(basics.phone)}</a>
      </li>
    {/if}

    {#if basics.email}
      <li>
        <i class="fas fa-envelope"></i>
        <a href={`mailto:${basics.email}`}>{basics.email}</a>
      </li>
    {/if}

    {#if basics.url}
      <li>
        <i class="fas fa-globe"></i>
        <a href={basics.url}>
          {basics.url.replace(/^https?:\/\//, '')}
        </a>
      </li>
    {/if}

    {#each formattedProfiles as profile (profile.link)}
      <li>
        <i class={profile.icon}></i>
        <a href={profile.link} target="_blank" rel="noopener noreferrer">
          {profile.text}
        </a>
      </li>
    {/each}
  </ul>

  {#if basics.summary}
    <hr />
    <p>{basics.summary}</p>
  {/if}
</div>

<style>
  .header-container hr {
    margin-top: var(--space-sm);
    margin-bottom: var(--space-sm);
  }

  .header-container .title {
    display: flex;
    align-items: baseline;
    gap: 5px;
    font-size: clamp(24px, 4rem, 64px);
    line-height: 1;
    margin-bottom: var(--space-md);
  }

  .header-container .name {
    font-weight: bold;
  }

  .header-container .label,
  .header-container .separator {
    font-weight: normal;
    color: var(--neutral-700);
  }

  .header-container .profiles {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    list-style: none;
    padding: 0;
    justify-content: space-around;
  }

  .header-container .profiles li {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .header-container .profiles li::after {
    content: '•';
    margin-left: var(--space-xs);
  }

  .header-container .profiles li:last-child::after {
    content: '';
  }
</style>
