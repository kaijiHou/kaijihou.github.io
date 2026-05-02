<script setup>
import { computed, ref } from 'vue'
import { site } from './content/site'

const active = ref('about')

const nav = computed(() => [
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'honors', label: 'Honors' },
  { id: 'contact', label: 'Contact' },
])

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function nonEmptyLinks(obj) {
  if (!obj) return []
  return Object.entries(obj)
    .filter(([, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([k, v]) => ({ key: k, href: v }))
}

const linkLabel = {
  github: 'GitHub',
  scholar: 'Scholar',
  cv: 'CV',
  homepage: 'Homepage',
  paper: 'Paper',
  arxiv: 'arXiv',
  code: 'Code',
  project: 'Project',
  repo: 'Repo',
  demo: 'Demo',
}

const openAbs = ref(new Set())
function toggleAbs(i) {
  const next = new Set(openAbs.value)
  next.has(i) ? next.delete(i) : next.add(i)
  openAbs.value = next
}
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="topbar__inner">
        <div class="brand" @click="scrollTo('top')" role="button" tabindex="0">
          <span class="brand__dot"></span>
          <span class="brand__name">{{ site.person.name }}</span>
        </div>

        <nav class="nav">
          <button
            v-for="n in nav"
            :key="n.id"
            class="nav__item"
            :class="{ 'is-active': active === n.id }"
            @click="scrollTo(n.id)"
          >
            {{ n.label }}
          </button>
        </nav>
      </div>
    </header>

    <div id="top" class="container">
      <!-- HERO -->
      <section class="hero card">
        <div class="hero__left">
          <div class="avatar">
            <div class="avatar__placeholder">HK</div>
          </div>
        </div>

        <div class="hero__right">
          <h1 class="hero__title">
            {{ site.person.name }}
            <span v-if="site.person.nameEn" class="hero__titleEn">/ {{ site.person.nameEn }}</span>
          </h1>
          <p class="hero__tagline">{{ site.person.tagline }}</p>

          <div class="hero__meta">
            <div class="meta-item">
              <span class="meta-k">Location</span>
              <span class="meta-v">{{ site.person.location }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-k">Email</span>
              <a class="meta-v link" :href="`mailto:${site.person.email}`">{{ site.person.email }}</a>
            </div>
          </div>

          <div class="actions">
            <a
              v-for="l in nonEmptyLinks(site.person.links)"
              :key="l.key"
              class="btn"
              :href="l.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ linkLabel[l.key] ?? l.key }}
            </a>
            <button class="btn btn--ghost" @click="scrollTo('publications')">View Publications</button>
            <button class="btn btn--ghost" @click="scrollTo('projects')">View Projects</button>
          </div>

          <div class="tags">
            <span v-for="t in site.person.focus" :key="t" class="tag tag--soft">{{ t }}</span>
          </div>
        </div>
      </section>

      <!-- ABOUT -->
      <section id="about" class="section">
        <div class="section__header">
          <h2 class="section__title">About</h2>
          <p class="section__desc">个人简介、研究方向与技能概览</p>
        </div>

        <div class="grid grid--2">
          <div class="card">
            <h3 class="card__title">简介</h3>
            <p class="p">{{ site.person.about }}</p>
          </div>

          <div class="card">
            <h3 class="card__title">Skills</h3>
            <div class="tags">
              <span v-for="s in site.person.skills" :key="s" class="tag">{{ s }}</span>
            </div>
            <div class="spacer"></div>
            <h3 class="card__title">Quick Facts</h3>
            <ul class="list">
              <li><span class="muted">Phone:</span> {{ site.person.phone }}</li>
              <li><span class="muted">Email:</span> {{ site.person.email }}</li>
              <li><span class="muted">Focus:</span> {{ site.person.focus.slice(0, 3).join(' · ') }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- PUBLICATIONS -->
      <section id="publications" class="section">
        <div class="section__header">
          <h2 class="section__title">Publications</h2>
          <p class="section__desc">论文列表（支持配图、链接、摘要展开）</p>
        </div>

        <div class="stack">
          <article v-for="(p, i) in site.publications" :key="p.title" class="card pub">
            <div class="pub__media">
              <div v-if="p.image" class="media">
                <img class="media__img" :src="p.image" :alt="p.title" />
              </div>
              <div v-else class="media media--placeholder">
                <div class="media__ph">Paper Figure</div>
              </div>
            </div>

            <div class="pub__body">
              <div class="pub__top">
                <h3 class="pub__title">{{ p.title }}</h3>
                <div class="pub__meta">
                  <span class="chip">{{ p.venue }}</span>
                  <span class="chip">{{ p.year }}</span>
                  <span v-if="p.highlight" class="chip chip--accent">{{ p.highlight }}</span>
                </div>
                <div class="pub__authors muted">{{ p.authors }}</div>
              </div>

              <div class="tags">
                <span v-for="t in p.tags ?? []" :key="t" class="tag tag--soft">{{ t }}</span>
              </div>

              <div class="pub__links actions actions--compact">
                <a
                  v-for="l in nonEmptyLinks(p.links)"
                  :key="l.key"
                  class="btn btn--small"
                  :href="l.href"
                  target="_blank"
                  rel="noreferrer"
                >
                  {{ linkLabel[l.key] ?? l.key }}
                </a>
                <button class="btn btn--small btn--ghost" @click="toggleAbs(i)">
                  {{ openAbs.has(i) ? 'Hide Abstract' : 'Show Abstract' }}
                </button>
              </div>

              <div v-if="openAbs.has(i)" class="pub__abstract">
                <p class="p">{{ p.abstract }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- PROJECTS -->
      <section id="projects" class="section">
        <div class="section__header">
          <h2 class="section__title">Projects</h2>
          <p class="section__desc">精选项目（支持配图、要点、链接按钮）</p>
        </div>

        <div class="grid grid--2">
          <article v-for="pr in site.projects" :key="pr.name" class="card project">
            <div class="project__media">
              <div v-if="pr.image" class="media">
                <img class="media__img" :src="pr.image" :alt="pr.name" />
              </div>
              <div v-else class="media media--placeholder">
                <div class="media__ph">Project Image</div>
              </div>
            </div>

            <div class="project__body">
              <div class="project__top">
                <h3 class="card__title">{{ pr.name }}</h3>
                <div class="muted">{{ pr.period }}</div>
              </div>

              <p class="p">{{ pr.summary }}</p>

              <ul class="bullets">
                <li v-for="b in pr.bullets" :key="b">{{ b }}</li>
              </ul>

              <div class="tags">
                <span v-for="s in pr.stack ?? []" :key="s" class="tag">{{ s }}</span>
              </div>

              <div class="actions actions--compact">
                <a
                  v-for="l in nonEmptyLinks(pr.links)"
                  :key="l.key"
                  class="btn btn--small"
                  :href="l.href"
                  target="_blank"
                  rel="noreferrer"
                >
                  {{ linkLabel[l.key] ?? l.key }}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- EXPERIENCE -->
      <section id="experience" class="section">
        <div class="section__header">
          <h2 class="section__title">Experience</h2>
          <p class="section__desc">实习与工作经历</p>
        </div>

        <div class="stack">
          <article v-for="e in site.experience" :key="e.company + e.period" class="card timeline">
            <div class="timeline__head">
              <div>
                <h3 class="card__title">{{ e.company }}</h3>
                <div class="muted">{{ e.team }}</div>
              </div>
              <div class="timeline__right">
                <div class="chip chip--accent">{{ e.title }}</div>
                <div class="muted">{{ e.period }}</div>
              </div>
            </div>

            <ul class="bullets">
              <li v-for="b in e.bullets" :key="b">{{ b }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- EDUCATION -->
      <section id="education" class="section">
        <div class="section__header">
          <h2 class="section__title">Education</h2>
          <p class="section__desc">教育背景</p>
        </div>

        <div class="grid grid--2">
          <article v-for="ed in site.education" :key="ed.school" class="card">
            <h3 class="card__title">{{ ed.school }}</h3>
            <div class="muted">{{ ed.degree }}</div>
            <div class="muted">{{ ed.period }}</div>
            <div class="spacer"></div>
            <ul class="bullets bullets--compact">
              <li v-for="n in ed.notes" :key="n">{{ n }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- HONORS -->
      <section id="honors" class="section">
        <div class="section__header">
          <h2 class="section__title">Honors</h2>
          <p class="section__desc">荣誉与证书</p>
        </div>

        <div class="card">
          <ul class="bullets">
            <li v-for="h in site.honors" :key="h">{{ h }}</li>
          </ul>
        </div>
      </section>

      <!-- CONTACT -->
      <section id="contact" class="section">
        <div class="section__header">
          <h2 class="section__title">Contact</h2>
          <p class="section__desc">欢迎联系与交流</p>
        </div>

        <div class="grid grid--2">
          <div class="card">
            <h3 class="card__title">Email</h3>
            <p class="p">
              <a class="link" :href="`mailto:${site.person.email}`">{{ site.person.email }}</a>
            </p>
            <div class="spacer"></div>
            <h3 class="card__title">Phone</h3>
            <p class="p">{{ site.person.phone }}</p>
          </div>

          <div class="card">
            <h3 class="card__title">Links</h3>
            <div class="actions actions--wrap">
              <a
                v-for="l in nonEmptyLinks(site.person.links)"
                :key="l.key"
                class="btn"
                :href="l.href"
                target="_blank"
                rel="noreferrer"
              >
                {{ linkLabel[l.key] ?? l.key }}
              </a>
              <span v-if="nonEmptyLinks(site.person.links).length === 0" class="muted">
                （暂无链接：你可以在 src/content/site.js 里补充）
              </span>
            </div>
          </div>
        </div>

        <footer class="footer muted">
          <span>© {{ new Date().getFullYear() }} {{ site.person.name }}</span>
          <span class="sep">·</span>
          <span>Built with Vue + Vite + GitHub Pages</span>
        </footer>
      </section>
    </div>
  </div>
</template>