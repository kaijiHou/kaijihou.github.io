<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { site } from './content/site'

const route = useRoute()
const router = useRouter()
const isNovelPage = computed(() => route.path === '/novels')

const active = ref('about')
const showBackTop = ref(false)
const activeProject = ref(0)
const lightboxSrc = ref(null)

function projectPos(i) {
  const diff = i - activeProject.value
  if (diff === 0) return 'center'
  if (diff === -1 || diff === site.projects.length - 1) return 'left'
  if (diff === 1 || diff === -(site.projects.length - 1)) return 'right'
  return 'hidden'
}

function prevProject() {
  activeProject.value = (activeProject.value - 1 + site.projects.length) % site.projects.length
}
function nextProject() {
  activeProject.value = (activeProject.value + 1) % site.projects.length
}
function goProject(i) {
  activeProject.value = i
}

let touchStartX = 0
function onTouchStart(e) { touchStartX = e.touches[0].clientX }
function onTouchEnd(e, i) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) {
    diff > 0 ? nextProject() : prevProject()
  }
}

const nav = computed(() => [
  { id: 'about', label: '关于我' },
  { id: 'publications', label: '论文' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '项目' },
  { id: 'education', label: '教育' },
  { id: 'honors', label: '荣誉' },
  { id: 'contact', label: '联系' },
  { id: 'novels', label: '小说', isPage: true },
])

let pendingScroll = null

function scrollTo(id) {
  const n = nav.value.find(x => x.id === id)
  if (n && n.isPage) {
    router.push('/novels')
    return
  }
  active.value = id
  if (isNovelPage.value) {
    pendingScroll = id
    router.push('/')
    return
  }
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// After navigating back from novels page, scroll to the target section
watch(isNovelPage, (val) => {
  if (!val && pendingScroll) {
    const target = pendingScroll
    pendingScroll = null
    nextTick(() => {
      setTimeout(() => {
        const el = document.getElementById(target)
        if (el) {
          active.value = target
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)
    })
  }
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function nonEmptyLinks(obj) {
  if (!obj) return []
  return Object.entries(obj)
    .filter(([, v]) => typeof v === 'string' && v.trim().length > 0)
    .map(([k, v]) => ({ key: k, href: v }))
}

const linkLabel = {
  github: 'GitHub 链接',
  scholar: 'Scholar',
  cv: 'CV',
  homepage: 'Homepage',
  paper: '论文',
  arxiv: 'arXiv',
  code: '代码',
  project: '项目链接',
  repo: '仓库',
  demo: 'Demo',
}

const openAbs = ref(new Set())
function toggleAbs(i) {
  const next = new Set(openAbs.value)
  next.has(i) ? next.delete(i) : next.add(i)
  openAbs.value = next
}

// ── Scroll spy ──
let observer = null
function setupScrollSpy() {
  const ids = nav.value.map(n => n.id)
  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible.length) {
        active.value = visible[0].target.id
      }
    },
    { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
  )
  ids.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
}

// ── Back to top visibility ──
function onScroll() {
  showBackTop.value = window.scrollY > 500
  const bar = document.querySelector('.topbar')
  if (bar) bar.classList.toggle('scrolled', window.scrollY > 10)
}

// ── Entrance animations ──
let animObserver = null
function setupAnimObserver() {
  animObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          animObserver.unobserve(e.target)
        }
      })
    },
    { rootMargin: '0px 0px -60px 0px', threshold: 0.1 }
  )
  nextTick(() => {
    document.querySelectorAll('.anim-up').forEach(el => animObserver.observe(el))
  })
}

onMounted(() => {
  setupScrollSpy()
  setupAnimObserver()
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  if (animObserver) animObserver.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="app">
    <!-- Animated background mesh -->
    <div class="bg-mesh">
      <div class="bg-mesh__orb bg-mesh__orb--1"></div>
      <div class="bg-mesh__orb bg-mesh__orb--2"></div>
      <div class="bg-mesh__orb bg-mesh__orb--3"></div>
    </div>

    <!-- Topbar -->
    <header class="topbar">
      <div class="topbar__inner">
        <div class="brand" @click="scrollToTop" role="button" tabindex="0">
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

    <router-view v-if="isNovelPage" />

    <div v-else id="top" class="container">
      <!-- ═══════════ HERO ═══════════ -->
      <section class="hero card anim-up">
        <div class="hero__left">
          <div class="avatar">
            <img
              src="/avatar/me.jpg"
              alt="侯开纪"
              class="avatar__img"
              @error="$event.target.style.display='none'"
            />
          </div>
        </div>

        <div class="hero__right">
          <h1 class="hero__title">
            {{ site.person.name }}
            <span v-if="site.person.nameEn" class="hero__titleEn">/ {{ site.person.nameEn }}</span>
          </h1>
          <p class="hero__tagline">{{ site.person.tagline }}</p>

          <div class="hero__meta">
            <div
              class="meta-item"
            >
              <span class="meta-k">📍</span>
              <span class="meta-v">{{ site.person.location }}</span>
            </div>
            <div
              class="meta-item"
            >
              <span class="meta-k">📧</span>
              <a class="meta-v link" :href="`mailto:${site.person.email}`">{{ site.person.email }}</a>
            </div>
            <div
              class="meta-item"
            >
              <span class="meta-k">📱</span>
              <span class="meta-v">{{ site.person.phone }}</span>
            </div>
          </div>

          <div
            class="actions"
          >
            <a
              v-for="l in nonEmptyLinks(site.person.links)"
              :key="l.key"
              class="btn btn--primary"
              :href="l.href"
              target="_blank"
              rel="noreferrer"
            >
              {{ linkLabel[l.key] ?? l.key }}
            </a>
            <button class="btn" @click="scrollTo('publications')">📄 查看论文</button>
            <a class="btn" href="https://github.com/BistuCS" target="_blank" rel="noreferrer">🚀 查看项目</a>
            <a class="btn" @click="router.push('/novels')">📖 小说</a>
          </div>

          <div class="tags">
            <span v-for="t in site.person.focus" :key="t" class="tag tag--soft">{{ t }}</span>
          </div>
        </div>
      </section>

      <!-- ═══════════ ABOUT / 个人优势 ═══════════ -->
      <section id="about" class="section anim-up">
        <div class="section__header">
          <h2 class="section__title">💪 个人优势</h2>
          <p class="section__desc">Strengths & Skills</p>
        </div>

        <p class="p" style="margin-bottom:18px;max-width:800px;">{{ site.person.about }}</p>

        <div class="grid grid--3">
          <div v-for="s in site.person.strengths" :key="s.title" class="card strength-card">
            <span class="strength-card__icon">{{ s.icon }}</span>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>

        <div class="card" style="margin-top:16px">
          <h3 class="card__title">🛠️ 技能栈</h3>
          <div class="tags" style="margin-top:10px">
            <span v-for="sk in site.person.skills" :key="sk" class="tag">{{ sk }}</span>
          </div>
        </div>
      </section>

      <!-- ═══════════ PUBLICATIONS ═══════════ -->
      <section id="publications" class="section anim-up">
        <div class="section__header">
          <h2 class="section__title">📝 论文发表</h2>
          <p class="section__desc">Publications</p>
        </div>

        <div class="stack">
          <article v-for="(p, i) in site.publications" :key="p.title" class="card pub">
            <div class="pub__media">
              <div v-if="p.image" class="media media--clickable" @click="lightboxSrc = p.image">
                <img class="media__img" :src="p.image" :alt="p.title" />
              </div>
              <div v-else class="media media--placeholder">
                <div class="media__ph">📊 Paper Figure</div>
              </div>
            </div>

            <div class="pub__body">
              <h3 class="pub__title">{{ p.title }}</h3>
              <div class="pub__meta">
                <span class="chip">{{ p.venue }}</span>
                <span class="chip">{{ p.year }}</span>
                <span v-if="p.highlight" class="chip chip--accent">{{ p.highlight }}</span>
              </div>
              <div class="pub__authors muted">{{ p.authors }}</div>

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
                  🔗 {{ linkLabel[l.key] ?? l.key }}
                </a>
                <button class="btn btn--small btn--ghost" @click="toggleAbs(i)">
                  {{ openAbs.has(i) ? '▲ 收起摘要' : '▼ 展开摘要' }}
                </button>
              </div>

              <div v-if="openAbs.has(i)" class="pub__abstract">
                <p class="p">{{ p.abstract }}</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══════════ EXPERIENCE ═══════════ -->
      <section id="experience" class="section anim-up">
        <div class="section__header">
          <h2 class="section__title">💼 工作/实习经历</h2>
          <p class="section__desc">Experience</p>
        </div>

        <div class="stack">
          <article v-for="e in site.experience" :key="e.company + e.period" class="card timeline">
            <div class="timeline__head">
              <div>
                <h3 class="card__title">{{ e.company }}</h3>
                <div class="muted" style="font-size:13px;">{{ e.team }}</div>
              </div>
              <div class="timeline__right">
                <div class="chip chip--accent">{{ e.title }}</div>
                <div class="muted" style="font-size:12px;">{{ e.period }}</div>
              </div>
            </div>

            <ul class="bullets" style="margin-top:12px;">
              <li v-for="b in e.bullets" :key="b">{{ b }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ═══════════ PROJECTS ═══════════ -->
      <section id="projects" class="section anim-up">
        <div class="section__header">
          <h2 class="section__title">🚀 项目经历</h2>
          <p class="section__desc">Projects</p>
        </div>

        <div class="project-carousel">
          <button class="carousel-btn carousel-btn--prev" @click="prevProject" aria-label="上一个项目">‹</button>

          <div
            class="project-carousel__stage"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
            <article
              v-for="(pr, i) in site.projects"
              :key="pr.name"
              class="project-card"
              :data-pos="projectPos(i)"
            >
              <div class="project-card__top">
                <h3 class="project-card__title">{{ pr.name }}</h3>
                <div class="chip chip--accent">{{ pr.role }}</div>
              </div>
              <div class="muted" style="font-size:12.5px;">{{ pr.period }}</div>

              <div class="project-card__media">
                <img
                  v-if="pr.image"
                  :src="pr.image"
                  :alt="pr.name"
                  @error="$event.target.style.display='none'"
                />
                <div v-else class="project-card__media-placeholder">🖼️ Project Image</div>
              </div>

              <p class="p">{{ pr.summary }}</p>

              <ul class="bullets">
                <li v-for="b in pr.bullets" :key="b">{{ b }}</li>
              </ul>

              <div class="tags">
                <span v-for="s in pr.stack ?? []" :key="s" class="tag">{{ s }}</span>
              </div>

              <div v-if="nonEmptyLinks(pr.links).length" class="project-card__links">
                <a
                  v-for="l in nonEmptyLinks(pr.links)"
                  :key="l.key"
                  class="btn btn--primary btn--small"
                  :href="l.href"
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 {{ linkLabel[l.key] ?? l.key }}
                </a>
              </div>
            </article>
          </div>

          <button class="carousel-btn carousel-btn--next" @click="nextProject" aria-label="下一个项目">›</button>
        </div>

        <div class="carousel-dots">
          <button
            v-for="(pr, i) in site.projects"
            :key="'dot-' + i"
            class="carousel-dot"
            :class="{ 'is-active': activeProject === i }"
            @click="goProject(i)"
            :aria-label="'项目 ' + (i + 1)"
          ></button>
        </div>
      </section>

      <!-- ═══════════ EDUCATION ═══════════ -->
      <section id="education" class="section anim-up">
        <div class="section__header">
          <h2 class="section__title">🎓 教育背景</h2>
          <p class="section__desc">Education</p>
        </div>

        <div class="grid grid--2">
          <article v-for="ed in site.education" :key="ed.school" class="card">
            <h3 class="card__title">{{ ed.school }}</h3>
            <div class="muted" style="font-size:14px;">{{ ed.degree }}</div>
            <div class="muted" style="font-size:13px;">{{ ed.period }}</div>
            <div class="spacer"></div>
            <ul class="bullets bullets--compact">
              <li v-for="n in ed.notes" :key="n">{{ n }}</li>
            </ul>
          </article>
        </div>
      </section>

      <!-- ═══════════ HONORS ═══════════ -->
      <section id="honors" class="section anim-up">
        <div class="section__header">
          <h2 class="section__title">🏆 荣誉奖项</h2>
          <p class="section__desc">Honors & Awards</p>
        </div>

        <div class="card">
          <ul class="bullets">
            <li v-for="h in site.honors" :key="h">{{ h }}</li>
          </ul>
        </div>
      </section>

      <!-- ═══════════ CONTACT ═══════════ -->
      <section id="contact" class="section anim-up">
        <div class="section__header">
          <h2 class="section__title">📬 联系方式</h2>
          <p class="section__desc">Contact</p>
        </div>

        <div class="grid grid--2">
          <div class="card">
            <h3 class="card__title">📧 邮箱</h3>
            <p class="p">
              <a class="link" :href="`mailto:${site.person.email}`">{{ site.person.email }}</a>
            </p>
            <div class="spacer"></div>
            <h3 class="card__title">📱 电话</h3>
            <p class="p">{{ site.person.phone }}</p>
            <div class="spacer"></div>
            <h3 class="card__title">📍 所在地</h3>
            <p class="p">{{ site.person.location }}</p>
          </div>

          <div class="card">
            <h3 class="card__title">🔗 链接</h3>
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
                （暂无链接）
              </span>
            </div>
          </div>
        </div>

        <footer class="footer muted">
          <span>© {{ new Date().getFullYear() }} {{ site.person.name }}</span>
          <span class="sep">·</span>
          <span>Built with Vue 3 + Vite + GitHub Pages</span>
        </footer>
      </section>
    </div>

    <!-- Back to Top (main page only) -->
    <button
      v-if="!isNovelPage"
      class="back-to-top"
      :class="{ visible: showBackTop }"
      @click="scrollToTop"
      aria-label="回到顶部"
    >
      ↑
    </button>

    <!-- Lightbox -->
    <Teleport to="body">
      <div v-if="lightboxSrc" class="lightbox" @click="lightboxSrc = null">
        <button class="lightbox__close" @click="lightboxSrc = null" aria-label="关闭">✕</button>
        <img :src="lightboxSrc" class="lightbox__img" @click.stop />
      </div>
    </Teleport>
  </div>
</template>
