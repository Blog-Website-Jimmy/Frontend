<template>
  <div class="home-page">
    <section class="search-bar">
      <div class="jimi">
        <input type="text" placeholder="Search for blog ..." />
        <span class="search-icon">
          <svg
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.5 26.75L16.625 18.875C16 19.375 15.2812 19.7708 14.4687 20.0625C13.6562 20.3542 12.7917 20.5 11.875 20.5C9.60417 20.5 7.68229 19.7135 6.10938 18.1406C4.53646 16.5677 3.75 14.6458 3.75 12.375C3.75 10.1042 4.53646 8.18229 6.10938 6.60938C7.68229 5.03646 9.60417 4.25 11.875 4.25C14.1458 4.25 16.0677 5.03646 17.6406 6.60938C19.2135 8.18229 20 10.1042 20 12.375C20 13.2917 19.8542 14.1562 19.5625 14.9687C19.2708 15.7812 18.875 16.5 18.375 17.125L26.25 25L24.5 26.75ZM11.875 18C13.4375 18 14.7656 17.4531 15.8594 16.3594C16.9531 15.2656 17.5 13.9375 17.5 12.375C17.5 10.8125 16.9531 9.48438 15.8594 8.39062C14.7656 7.29688 13.4375 6.75 11.875 6.75C10.3125 6.75 8.98438 7.29688 7.89062 8.39062C6.79688 9.48438 6.25 10.8125 6.25 12.375C6.25 13.9375 6.79688 15.2656 7.89062 16.3594C8.98438 17.4531 10.3125 18 11.875 18Z"
              fill="#FEF7FF"
            />
          </svg>
        </span>
      </div>
    </section>
    <section class="recent-section">
      <div class="recent"><span>Recently added</span></div>
      <div class="cards">
        <ArticleCardComponent
          v-for="post in articleStore.posts"
          :key="post.id"
          :title="post.title"
          :author="post.author.name"
          :brief="post.brief"
          :image="getMianImage(post.images)"
        />
      </div>
    </section>
  </div>
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

<style scoped lang="scss">
.home-page {
  --margin-value: 64px;
  --font-size: 1.5rem;
  --padding-x: 12px;
  --padding-y: 16px;
  --max-width: 1084px;
  --border-radius: 24px;
}
.search-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: var(--font-size);
  .jimi {
    width: 100%;
    max-width: var(--max-width);
    position: relative;
    margin: var(--margin-value);
  }
  input {
    border-radius: var(--border-radius);
    padding: var(--padding-x) var(--padding-y);
    width: 100%;
    outline: none;
    background-color: inherit;
    border: 1px solid var(--text-color);
    color: var(--text-color);
  }
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  width: 100%;
}
.search-icon {
  cursor: pointer;
  position: absolute;
  right: calc(-1 * var(--padding-y) + 30px);
  top: var(--padding-x);
  background-color: var(--background-main);
}
.recent-section {
  padding-bottom: var(--margin-value);
}
.recent {
  color: var(--text-color);
  font-size: calc(1.28 * var(--font-size));
  font-weight: bold;
  margin-bottom: calc(var(--margin-value) / 2);
}
</style>
