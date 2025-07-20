<script lang="ts">
  import { formatLocation, formatPhone } from '@/lib';
  let { name, label, email, phone, url, summary, location, profiles } = $props();

  const iconMap = {
    GitHub: 'fab fa-github',
    LinkedIn: 'fab fa-linkedin'
  };

  const staticLinks = [
    location && {
      icon: 'fas fa-map-marker-alt',
      text: formatLocation(location)
    },
    phone && {
      icon: 'fas fa-phone',
      href: `tel:${phone}`,
      text: formatPhone(phone)
    },
    email && {
      icon: 'fas fa-envelope',
      href: `mailto:${email}`,
      text: email
    },
    url && {
      icon: 'fas fa-globe',
      href: url,
      text: url
    }
  ].filter(Boolean);
</script>

<div class="header-container">
  <div class="title">
    <span class="name">{name}</span>
    {#if label}
      <span class="separator">|</span>
      <span class="label">{label}</span>
    {/if}
  </div>

  <hr />

  <ul class="profiles">
    {#each staticLinks as link, i (i)}
      <li>
        <i class={link.icon}></i>
        {#if link.href}
          <a href={link.href}>{link.text}</a>
        {:else}
          <span>{link.text}</span>
        {/if}
      </li>
    {/each}

    {#each profiles as profile (profile.network)}
      <li>
        <i class={iconMap[profile.network] || 'fas fa-link'}></i>
        <a href={profile.url}>
          {profile.username ?? profile.url.replace(/^https?:\/\//, '')}
        </a>
      </li>
    {/each}
  </ul>

  {#if summary}
    <hr />
    <p>{summary}</p>
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
