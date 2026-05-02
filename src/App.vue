<script setup>
const profile = {
  name: 'kaijiHou',
  title: '前端开发 / 个人博客作者',
  location: 'China',
  email: 'your.email@example.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/kaijiHou' },
    { label: 'Repo', href: 'https://github.com/kaijiHou/kaijihou.github.io' },
  ],
  skills: ['Vue 3', 'Vite', 'JavaScript', 'HTML', 'CSS'],
}
</script>

<template>
  <div class="page">
    <header class="card hero">
      <div class="avatar" aria-hidden="true">K</div>
      <div>
        <h1 class="hero__title">{{ profile.name }}</h1>
        <p class="hero__subtitle">{{ profile.title }}</p>
        <p class="hero__small">
          <span>{{ profile.location }}</span>
          <span class="dot">·</span>
          <a class="link" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </p>

        <div class="hero__links">
          <a
            v-for="l in profile.links"
            :key="l.href"
            class="btn"
            :href="l.href"
            target="_blank"
            rel="noreferrer"
          >
            {{ l.label }}
          </a>
        </div>
      </div>
    </header>

    <main class="grid">
      <section class="card">
        <h2>关于我</h2>
        <p>这是一个 Vue3 + Vite 的个人介绍 Demo，并通过 GitHub Actions 自动部署到 GitHub Pages。</p>
        <ul class="tags">
          <li v-for="s in profile.skills" :key="s" class="tag">{{ s }}</li>
        </ul>
      </section>

      <section class="card">
        <h2>下一步</h2>
        <ol class="steps">
          <li>把邮箱、简介、技能等信息换成你的真实内容。</li>
          <li>要作品集：继续加项目卡片、图片、链接。</li>
          <li>要博客：加 Vue Router + Markdown 渲染。</li>
        </ol>
      </section>
    </main>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
      <span class="dot">·</span>
      <span>Built with Vue + GitHub Actions</span>
    </footer>
  </div>
</template>

<style scoped>
.hero { display:flex; gap:16px; align-items:center; }
.avatar{
  width:64px;height:64px;border-radius:18px;
  background:linear-gradient(135deg, rgba(99,102,241,.95), rgba(34,211,238,.85));
  display:grid;place-items:center;font-weight:800;font-size:26px;color:white;
}
.hero__title{ margin:0; font-size:26px; }
.hero__subtitle{ margin:4px 0 8px; color:var(--muted); }
.hero__small{ margin:0; color:var(--muted); font-size:14px; }
.hero__links{ margin-top:12px; display:flex; flex-wrap:wrap; gap:10px; }

.grid{ margin-top:16px; display:grid; grid-template-columns:repeat(12,1fr); gap:14px; }
.grid > section:nth-child(1){ grid-column:span 12; }
.grid > section:nth-child(2){ grid-column:span 12; }

.tags{ list-style:none; padding:0; margin:12px 0 0; display:flex; flex-wrap:wrap; gap:8px; }
.tag{ padding:6px 10px; border:1px solid var(--border); border-radius:999px; font-size:13px; color:var(--muted); }

.steps{ margin:12px 0 0; color:var(--muted); }
.footer{ margin:18px 0 6px; color:var(--muted); font-size:13px; display:flex; flex-wrap:wrap; gap:8px; justify-content:center; }
</style>