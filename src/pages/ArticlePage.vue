<template>
  <q-page
    class="row items-center justify-evenly q-ma-md bg-indigo-1 article-page"
  >
    <div>
      <h3 class="full-width">
        {{ title }}
      </h3>
      <p v-html="article?.content"></p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useArticleStore } from 'src/stores/article-store';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { Post } from 'src/signatures';
const articleStore = useArticleStore();
const route = useRoute();
const title = route.params.article;
const article = ref<Post>();
onMounted(() => {
  article.value = articleStore.posts.filter((post) => post.title == title)[0];
});
</script>
