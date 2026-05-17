<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { marked } from 'marked'
import { novels } from '../content/novels.js'

const currentNovel = ref(novels[0])
const currentChapter = ref(currentNovel.value.chapters[0])
const chapterContent = ref('')
const loading = ref(false)

// Parse chapter file path to fetch
async function loadChapter() {
  loading.value = true
  try {
    const resp = await fetch(currentChapter.value.file)
    if (!resp.ok) throw new Error('File not found')
    const md = await resp.text()
    chapterContent.value = marked.parse(md)
  } catch (e) {
    chapterContent.value = '<p style="color: var(--muted)">章节内容加载失败，请检查文件是否存在。</p>'
  } finally {
    loading.value = false
  }
}

function selectChapter(ch) {
  currentChapter.value = ch
}

watch(currentChapter, loadChapter)

onMounted(loadChapter)
</script>

<template>
  <div class="container">
    <!-- Back link -->
    <router-link to="/" class="btn btn--ghost" style="margin-bottom:16px;">← 返回首页</router-link>

    <!-- Section header -->
    <div class="section__header">
      <h2 class="section__title">📖 {{ currentNovel.title }}</h2>
      <p class="section__desc">{{ currentNovel.description }}</p>
    </div>

    <div class="novel-layout">
      <!-- Sidebar -->
      <aside class="novel-sidebar">
        <div class="novel-sidebar__title">📑 章节列表</div>
        <button
          v-for="ch in currentNovel.chapters"
          :key="ch.id"
          class="novel-chapter-item"
          :class="{ 'is-active': currentChapter.id === ch.id }"
          @click="selectChapter(ch)"
        >
          {{ ch.title }}
        </button>
      </aside>

      <!-- Content -->
      <main class="novel-content">
        <div v-if="loading" class="novel-empty">
          <p>加载中...</p>
        </div>
        <div v-else v-html="chapterContent"></div>

        <div class="chapter-nav">
          <button
            class="btn btn--small"
            :disabled="currentChapter === currentNovel.chapters[0]"
            @click="selectChapter(currentNovel.chapters[currentNovel.chapters.indexOf(currentChapter) - 1])"
          >
            ← 上一章
          </button>
          <span class="muted" style="font-size:12px;">
            {{ currentNovel.chapters.indexOf(currentChapter) + 1 }} / {{ currentNovel.chapters.length }}
          </span>
          <button
            class="btn btn--small"
            :disabled="currentChapter === currentNovel.chapters[currentNovel.chapters.length - 1]"
            @click="selectChapter(currentNovel.chapters[currentNovel.chapters.indexOf(currentChapter) + 1])"
          >
            下一章 →
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles are minimal since most styling is in style.css */
.novel-content :deep(pre) {
  background: var(--accent-soft);
  padding: 14px 16px;
  border-radius: var(--radius);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.6;
  margin: 12px 0;
}
.novel-content :deep(ul), .novel-content :deep(ol) {
  margin: 8px 0;
  padding-left: 20px;
  color: var(--text-secondary);
  font-size: 14.5px;
  line-height: 1.8;
}
.novel-content :deep(img) {
  max-width: 100%;
  border-radius: var(--radius);
  margin: 12px 0;
}
</style>
