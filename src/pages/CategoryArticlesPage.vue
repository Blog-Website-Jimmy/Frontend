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
          @click="
            page.page > 0 && --page.page;
            shouldFetch = true;
          "
          icon="navigate_before"
        />

        <q-btn
          class="page-button"
          v-for="index in totalPageNumbers"
          :key="index"
          @click="
            page.page = index - 1;
            shouldFetch = true;
          "
          :class="[page.page == index - 1 ? backgroundColor : '']"
          >{{ index }}</q-btn
        >
        <q-btn
          class="page-button"
          @click="
            page.page < totalPageNumbers - 1 && ++page.page;
            shouldFetch = true;
          "
          icon="navigate_next"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { getCategoryPosts } from 'src/axios-requests';
import { useArticleStore } from 'src/stores/article-store';
import { useRoute } from 'vue-router';
import { bus } from 'src/axios-requests';
import ArticleCardComponent from 'src/components/ArticleCardComponent.vue';
import { getMianImage } from 'src/components/models';

const articleStore = useArticleStore();
const route = useRoute();
const totalPageNumbers = ref(0);
const backgroundColor = ref('bg-blue-5');
const page = reactive({
  page: 0,
  size: 9,
});
const shouldFetch = ref(true);

onMounted(() => {
  bus.on('givePermissionToFetchData', () => {
    console.log('bus worked');

    shouldFetch.value = true;
  });
  getCategoryPosts(page.page, page.size, route.params.category as string)
    .then((totalPages) => (totalPageNumbers.value = totalPages))
    .catch((error) => {
      console.error('Error:', error);
    });
});

watch([page, () => route.params.category], async (newPage, oldPage) => {
  if (shouldFetch.value) {
    console.log(newPage[1]);
    console.log(oldPage[1]);
    if (newPage[1] != oldPage[1]) {
      page.page = 0;
      page.size = 9;
      shouldFetch.value = false;
      console.log('router tirgger');
    }
    getCategoryPosts(page.page, page.size, route.params.category as string)
      .then((totalPages) => {
        totalPageNumbers.value = totalPages;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});
</script>
