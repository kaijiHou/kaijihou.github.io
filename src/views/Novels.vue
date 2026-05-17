<script setup>
import { ref, watch, onMounted } from 'vue'
import { marked } from 'marked'
import { novels } from '../content/novels.js'

const currentNovel = ref(novels[0])
const currentChapter = ref(currentNovel.value.chapters[0])
const chapterContent = ref('')
const loading = ref(false)

async function loadChapter() {
  if (!currentChapter.value) return
  loading.value = true
  try {
    const resp = await fetch(currentChapter.value.file)
    if (!resp.ok) throw new Error('Not found')
    const md = await resp.text()
    chapterContent.value = marked.parse(md)
  } catch (e) {
    chapterContent.value = '<p style="color: var(--muted)">章节内容加载失败，请检查文件是否存在。</p>'
  } finally {
    loading.value = false
  }
}

function selectNovel(novel) {
  currentNovel.value = novel
  currentChapter.value = novel.chapters[0]
}

function selectChapter(ch) {
  currentChapter.value = ch
}

watch(currentChapter, loadChapter)

onMounted(loadChapter)
</script>

<template>
  <div class="container">
    <a href="/#/" class="btn btn--ghost" style="margin-bottom:16px;">← 返回首页</a>

    <div class="section__header">
      <h2 class="section__title">📖 小说</h2>
      <p class="section__desc">Novels</p>
    </div>

    <div class="novel-layout">
      <!-- Sidebar -->
      <aside class="novel-sidebar">
        <!-- Novel list -->
        <div class="novel-sidebar__title">📚 作品列表</div>
        <button
          v-for="nv in novels"
          :key="nv.id"
          class="novel-item"
          :class="{ 'is-active': currentNovel.id === nv.id }"
          @click="selectNovel(nv)"
        >
          <span class="novel-item__title">{{ nv.title }}</span>
          <span class="novel-item__author">{{ nv.author }}</span>
        </button>

        <hr class="novel-sidebar__hr" />

        <!-- Chapter list -->
        <div class="novel-sidebar__title">📑 {{ currentNovel.title }} · 目录</div>
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
.novel-content :deep(ul),
.novel-content :deep(ol) {
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
.novel-content :deep(blockquote) {
  border-left: 3px solid var(--text);
  padding: 4px 0 4px 16px;
  margin: 16px 0;
  color: var(--text-secondary);
  font-style: italic;
  font-size: 15px;
}
</style>
