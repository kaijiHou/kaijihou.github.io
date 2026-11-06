<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { site } from './content/site'

const route = useRoute()
const router = useRouter()
const isNovelPage = computed(() => route.path === '/novels')
const menuOpen = ref(false)
const theme = ref('light')
const activeSection = ref('')
const activeProject = ref(0)
const project = computed(() => site.projects[activeProject.value])
const showBackTop = ref(false)
const imageDialog = ref(null)
const menuDialog = ref(null)
const selectedImage = ref({ src: '', alt: '' })
const nav = [
  { id: 'experience', label: '工作经历', en: 'Experience' },
  { id: 'publications', label: '论文研究', en: 'Publications' },
  { id: 'projects', label: '项目实践', en: 'Projects' },
  { id: 'about', label: '关于我', en: 'About' },
  { id: 'education', label: '教育背景', en: 'Education' },
  { id: 'honors', label: '荣誉奖项', en: 'Honors' },
  { id: 'novels', label: '小说创作', en: 'Writing' },
]
const linkLabel = { github: 'GitHub', scholar: 'Scholar', cv: '简历', paper: '阅读论文', code: '代码', project: '项目链接', arxiv: 'arXiv', demo: 'Demo', repo: '仓库' }
const links = obj => Object.entries(obj ?? {}).filter(([, value]) => typeof value === 'string' && value.trim()).map(([key, href]) => ({ key, href }))
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

async function navigate(id) {
  closeMenu()
  if (id === 'novels') {
    await router.push('/novels')
    window.scrollTo(0, 0)
    return
  }
  if (isNovelPage.value) await router.push('/')
  await nextTick()
  document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion() ? 'instant' : 'smooth', block: 'start' })
  activeSection.value = id
}
function skipContent() { document.getElementById(isNovelPage.value ? 'novel-main' : 'main-content')?.focus() }
function openImage(src, alt) {
  selectedImage.value = { src, alt }
  imageDialog.value.showModal()
}
function closeMenu() {
  menuDialog.value?.close()
  menuOpen.value = false
}
function openMenu() {
  menuOpen.value = true
  menuDialog.value.showModal()
}
let observer
function observeSections() {
  observer?.disconnect()
  if (isNovelPage.value) return
  observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting)
    if (visible.length) activeSection.value = visible[0].target.id
  }, { rootMargin: '-20% 0px -65% 0px' })
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))
}
function onScroll() { showBackTop.value = window.scrollY > 700 }
function onResize() { if (window.innerWidth > 760 && menuOpen.value) closeMenu() }
watch(() => route.path, async () => {
  menuOpen.value = false
  activeSection.value = ''
  await nextTick()
  observeSections()
})
onMounted(() => {
  observeSections()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
})
onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <div class="portfolio" :data-theme="theme">
  <a class="skip-link" :href="isNovelPage ? '#novel-main' : '#main-content'" @click.prevent="skipContent">跳到正文</a>
  <header class="topbar">
    <div class="topbar__inner">
      <button class="brand" @click="navigate('top')" aria-label="侯开纪，返回首页">
        <img src="/avatar/me.jpg" alt="" width="34" height="34" />
        <span>{{ site.person.name }}<small>{{ site.person.nameEn }}</small></span>
      </button>
      <nav id="site-nav" class="nav" aria-label="主导航">
        <button v-for="item in nav" :key="item.id" :class="{ 'is-active': isNovelPage ? item.id === 'novels' : activeSection === item.id }" :aria-current="(isNovelPage ? item.id === 'novels' : activeSection === item.id) ? 'page' : undefined" @click="navigate(item.id)">{{ item.label }}</button>
        <button class="nav-contact" @click="navigate('contact')">联系我</button>
      </nav>
      <div class="header-tools"><button class="theme-toggle" @click="theme = theme === 'dark' ? 'light' : 'dark'" :aria-label="theme === 'dark' ? '切换浅色外观' : '切换深色外观'" :title="theme === 'dark' ? '切换浅色外观' : '切换深色外观'">{{ theme === 'dark' ? '浅色' : '深色' }}</button><button class="menu-toggle" :aria-expanded="menuOpen" aria-controls="mobile-menu" @click="openMenu">导航 <span aria-hidden="true">≡</span></button></div>
    </div>
  </header>

  <dialog id="mobile-menu" ref="menuDialog" class="menu-dialog" aria-label="网站目录" @close="menuOpen = false" @click="event => { if (event.target === menuDialog) closeMenu() }">
    <div class="menu-panel">
      <div class="menu-heading"><span>我的主页</span><button @click="closeMenu" autofocus aria-label="关闭导航">关闭 ×</button></div>
      <nav class="menu-links" aria-label="手机主导航"><button v-for="item in nav" :key="item.id" :aria-current="(isNovelPage ? item.id === 'novels' : activeSection === item.id) ? 'page' : undefined" @click="navigate(item.id)"><span>{{ item.label }}</span><small>{{ item.en }}</small></button></nav>
      <div class="menu-footer"><a :href="site.person.links.github" target="_blank" rel="noopener noreferrer">GitHub</a><button @click="navigate('contact')">联系我</button></div>
    </div>
  </dialog>

  <router-view v-if="isNovelPage" />

  <main v-else id="main-content" tabindex="-1">
    <div id="top" class="hero-wrap">
      <section class="hero page-width" aria-labelledby="hero-title">
        <div class="hero-introduction">
          <div class="hero-copy">
            <p class="hero-greeting">你好，我是</p>
            <h1 id="hero-title">{{ site.person.name }}<span>{{ site.person.nameEn }}</span></h1>
            <p class="hero-role">算法工程师 · 计算机视觉 · 智能系统开发</p>
            <p class="hero-description">聚焦声呐数据显控、视觉目标检测与企业 Agent 开发，<br class="desktop-break" />在 Qt 客户端、视觉算法和大模型应用之间推进工程落地。</p>
            <p class="hero-education">{{ site.education[0].school }} · {{ site.education[0].degree }}<span>{{ site.person.location }}</span></p>
            <div class="hero-actions"><a class="hero-contact" :href="'mailto:' + site.person.email">与我联系 <span aria-hidden="true">↗</span></a><a class="hero-github" :href="site.person.links.github" target="_blank" rel="noopener noreferrer">GitHub 代码仓库 <span aria-hidden="true">↗</span></a></div>
          </div>
          <aside class="career-overview" aria-label="工作与研究概览">
            <div class="overview-heading"><h2>我的经历</h2><button @click="navigate('experience')">查看完整经历 ↗</button></div>
            <button v-for="experience in site.experience" :key="experience.company" class="career-entry" :class="{ 'career-entry--current': experience.current }" @click="navigate('experience')"><span class="career-period">{{ experience.period }}<span v-if="experience.current" class="current-badge">当前</span></span><strong>{{ experience.company }}</strong><span class="career-role">{{ experience.title }}</span></button>
            <div class="overview-research"><span>研究方向</span><p>跨视角地理定位 / 视觉生成 / 大模型工程</p></div>
          </aside>
        </div>
        <nav class="home-directory" aria-label="首页内容入口">
          <button class="directory-research" @click="navigate('publications')">
            <span class="directory-heading"><span class="directory-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m8 5 8 1m-10 3-1 7m4 3 7-2m3-7-1 4M8 9l7 6"/><circle cx="6" cy="6" r="3"/><circle cx="19" cy="7" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="18" cy="17" r="3"/></svg></span><span class="directory-label">论文研究</span><span class="directory-arrow" aria-hidden="true">↗</span></span>
            <strong>{{ site.publications.length }} <small>篇代表论文</small></strong><p>跨视角定位与多视角生成</p>
          </button>
          <button class="directory-projects" @click="navigate('projects')">
            <span class="directory-heading"><span class="directory-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></svg></span><span class="directory-label">项目实践</span><span class="directory-arrow" aria-hidden="true">↗</span></span>
            <strong>{{ site.projects.length }} <small>个技术项目</small></strong><p>算法研发、软件与系统交付</p>
          </button>
          <button class="directory-experience" @click="navigate('experience')">
            <span class="directory-heading"><span class="directory-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="14" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a21 21 0 0 0 18 0m-9 0v4"/></svg></span><span class="directory-label">工作经历</span><span class="directory-arrow" aria-hidden="true">↗</span></span>
            <strong>{{ site.experience.length }} <small>段工作经历</small></strong><p>大模型算法与工程实践</p>
          </button>
          <button class="directory-writing" @click="navigate('novels')">
            <span class="directory-heading"><span class="directory-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c-3-2-7-2-10 0v15c3-2 7-2 10 0 3-2 7-2 10 0V5c-3-2-7-2-10 0Zm0 0v15M5 8h3m-3 4h3m8-4h3m-3 4h3"/></svg></span><span class="directory-label">小说创作</span><span class="directory-arrow" aria-hidden="true">↗</span></span>
            <strong class="directory-book">故事与创作</strong><p>工作之外，另一个世界</p>
          </button>
        </nav>
      </section>
    </div>

    <div class="page-width main-sections">
      <section id="experience" class="section" aria-labelledby="experience-title">
        <div class="section-heading"><div><h2 id="experience-title">工作与经历</h2><p>算法开发、软件工程与实际业务的连接。</p></div></div>
        <div class="experience-list"><article v-for="experience in site.experience" :key="experience.company" class="experience" :class="{ 'experience--current': experience.current }"><div class="experience-period">{{ experience.period }}<span v-if="experience.current" class="current-badge">当前任职</span></div><div><h3>{{ experience.company }}</h3><p v-if="experience.companyAlias" class="company-alias">（{{ experience.companyAlias }}）</p><p class="experience-role">{{ experience.title }}<span v-if="experience.team"> / {{ experience.team }}</span></p><p v-if="experience.summary" class="experience-summary">{{ experience.summary }}</p><ul class="bullets"><li v-for="bullet in experience.bullets" :key="bullet">{{ bullet }}</li></ul><div v-if="experience.stack" class="tags"><span v-for="skill in experience.stack" :key="skill" class="tag">{{ skill }}</span></div><figure v-if="experience.image" class="experience-showcase"><button @click="openImage(experience.image, experience.imageAlt)" :aria-label="'放大界面图：' + experience.imageAlt"><img :src="experience.image" :alt="experience.imageAlt" loading="lazy" width="1920" height="1032" /></button><figcaption>{{ experience.imageAlt }}<span>点击查看完整界面 ↗</span></figcaption></figure></div></article></div>
      </section>

      <section id="publications" class="section" aria-labelledby="publications-title">
        <div class="section-heading"><div><h2 id="publications-title">研究与论文</h2><p>关于视觉、空间与生成的探索。</p></div><span class="section-note">{{ site.publications.length }} 篇代表工作</span></div>
        <div class="publication-list">
          <article v-for="(paper, index) in site.publications" :key="paper.title" class="publication" :aria-labelledby="'paper-title-' + index">
            <header class="paper-heading">
              <div class="paper-meta"><span>{{ paper.venue }}</span><time>{{ paper.year }}</time></div>
              <h3 :id="'paper-title-' + index"><a :href="paper.links.paper" target="_blank" rel="noopener noreferrer">{{ paper.title }}</a></h3>
              <p class="paper-authors">{{ paper.authors }}</p>
            </header>
            <button class="paper-image" @click="openImage(paper.image, paper.title)" :aria-label="'放大论文配图：' + paper.title"><img :src="paper.image" :alt="paper.title + '方法图'" loading="lazy" width="280" height="190" /><span>查看配图 <span aria-hidden="true">↗</span></span></button>
            <div class="paper-body">
              <p class="paper-intro">{{ paper.abstract.split('。')[0] }}。</p>
              <p class="paper-highlight">{{ paper.highlight }}</p>
              <div class="paper-actions"><a v-for="link in links(paper.links)" :key="link.key" class="text-link" :href="link.href" target="_blank" rel="noopener noreferrer">{{ linkLabel[link.key] ?? link.key }} <span aria-hidden="true">↗</span></a></div>
              <details class="paper-abstract"><summary>阅读摘要</summary><p>{{ paper.abstract }}</p></details>
            </div>
          </article>
        </div>
      </section>

      <section id="projects" class="section" aria-labelledby="projects-title">
        <div class="section-heading"><div><h2 id="projects-title">项目与工程实践</h2><p>企业项目与个人实践，涵盖算法研发、软件开发与系统交付。</p></div><a class="text-link section-note" :href="site.person.links.github" target="_blank" rel="noopener noreferrer">更多代码 ↗</a></div>
        <div class="project-board">
          <div class="project-picker" aria-label="选择项目"><button v-for="(item, index) in site.projects" :key="item.name" :aria-pressed="activeProject === index" :class="{ 'is-active': activeProject === index }" @click="activeProject = index"><span>{{ item.name.split('（')[0] }}</span><span aria-hidden="true">↗</span></button></div>
          <article class="project-detail" :key="project.name">
            <button class="project-image" @click="openImage(project.image, project.name)" :aria-label="'放大项目图片：' + project.name"><img :src="project.image" :alt="project.name" loading="lazy" width="800" height="450" /></button>
            <div class="project-content"><div class="project-meta"><span>{{ project.role }}</span><span>{{ project.period }}</span></div><h3>{{ project.name }}</h3><p>{{ project.summary }}</p><div class="tags"><span v-for="skill in project.stack" :key="skill" class="tag">{{ skill }}</span></div><details class="project-contributions"><summary>技术细节与项目成果</summary><ul class="bullets"><li v-for="bullet in project.bullets" :key="bullet">{{ bullet }}</li></ul></details><div class="project-links"><a v-for="link in links(project.links)" :key="link.key" class="text-link" :href="link.href" target="_blank" rel="noopener noreferrer">{{ linkLabel[link.key] ?? link.key }} ↗</a></div></div>
          </article>
        </div>
      </section>

      <section id="about" class="section about-section" aria-labelledby="about-title">
        <div class="about-copy"><h2 id="about-title">关于我</h2><p>{{ site.person.about }}</p><div class="about-links"><a v-for="link in links(site.person.links)" :key="link.key" class="text-link" :href="link.href" target="_blank" rel="noopener noreferrer">{{ linkLabel[link.key] ?? link.key }} ↗</a></div></div>
        <div class="about-skills"><h3>常用技术</h3><div class="tags"><span v-for="skill in site.person.skills" :key="skill" class="tag">{{ skill }}</span></div><details v-for="strength in site.person.strengths" :key="strength.title" class="strength"><summary>{{ strength.title }}</summary><p>{{ strength.desc }}</p></details></div>
      </section>

      <section id="education" class="section" aria-labelledby="education-title"><div class="section-heading"><h2 id="education-title">教育背景</h2></div><div class="education-grid"><article v-for="education in site.education" :key="education.school" class="education"><p class="education-period">{{ education.period }}</p><h3>{{ education.school }}</h3><p>{{ education.degree }}</p><ul class="education-notes"><li v-for="note in education.notes" :key="note">{{ note }}</li></ul></article></div></section>
      <section id="honors" class="section" aria-labelledby="honors-title"><div class="section-heading"><h2 id="honors-title">荣誉与认可</h2></div><ul class="honors-list"><li v-for="honor in site.honors" :key="honor">{{ honor }}</li></ul></section>

      <section id="contact" class="contact-section" aria-labelledby="contact-title"><div><h2 id="contact-title">交流，让想法走得更远。</h2><p>关于研究、项目，或是一个有趣的想法。</p><a class="contact-email" :href="'mailto:' + site.person.email">{{ site.person.email }} <span aria-hidden="true">↗</span></a></div><div class="contact-other"><span>{{ site.person.location }}</span><a :href="'tel:' + site.person.phone">{{ site.person.phone }}</a><button class="text-link" @click="navigate('novels')">工作之外，读点故事 ↗</button></div></section>
      <footer class="footer"><span>© {{ new Date().getFullYear() }} {{ site.person.name }}</span><span>保持好奇，持续创造。</span><button @click="navigate('top')">回到顶部 ↑</button></footer>
    </div>
    <button v-if="showBackTop" class="back-to-top" @click="navigate('top')" aria-label="回到顶部">↑</button>
  </main>

  <dialog ref="imageDialog" class="image-dialog" aria-label="图片预览" @click="event => { if (event.target === imageDialog) imageDialog.close() }"><button class="image-dialog-close" @click="imageDialog.close()" aria-label="关闭图片预览" autofocus>关闭 ×</button><img :src="selectedImage.src || undefined" :alt="selectedImage.alt" /><p>{{ selectedImage.alt }}</p></dialog>
  </div>
</template>
