<template>
  <q-page class="row items-center justify-evenly">
    <div
      v-for="post in articleStore.posts"
      :key="post.id"
      class="j-card q-pa-sm"
    >
      <ArticleCardComponent
        :title="post.title"
        :author="post.author.name"
        :brief="post.brief"
        :image="getMianImage(post.images)"
      />
    </div>
    <div class="full-width q-ma-xl">
      <div class="row items-center justify-center q-gutter-md">
        <q-btn
          class="page-button"
          @click="page.page > 0 && --page.page"
          icon="navigate_before"
        />

        <q-btn
          class="page-button"
          v-for="index in totalPageNumbers"
          :key="index"
          @click="page.page = index - 1"
          :class="[page.page == index - 1 ? backgroundColor : '']"
          >{{ index }}</q-btn
        >
        <q-btn
          class="page-button"
          @click="page.page < totalPageNumbers - 1 && ++page.page"
          icon="navigate_next"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { getPosts } from 'src/axios-requests';
import { useArticleStore } from 'src/stores/article-store';
import { getMianImage } from 'src/components/models';
import ArticleCardComponent from 'src/components/user/ArticleCardComponent.vue';

const articleStore = useArticleStore();

const totalPageNumbers = ref(0);
const backgroundColor = ref('bg-blue-5');

const page = reactive({
  page: 0,
  size: 9,
});
onMounted(() => {
  getPosts(page.page, page.size)
    .then((totalPages) => (totalPageNumbers.value = totalPages))
    .catch((error) => {
      console.error('Error:', error);
    });
});

watch(page, async () => {
  getPosts(page.page, page.size)
    .then((totalPages) => (totalPageNumbers.value = totalPages))
    .catch((error) => {
      console.error('Error:', error);
    });
});
</script>
