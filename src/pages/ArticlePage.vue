<template>
  <q-page>
    <q-scroll-area :visible="false" style="height: 100vh; max-width: 100vw">
      <div class="row items-center justify-evenly article-page">
        <div>
          <h3 class="full-width">
            {{ title }}
          </h3>
          <div v-html="article?.content" class="article-content"></div>
        </div>
      </div>

      <div class="comments full-width text-subtitle1">
        <div class="text-bold text-h6 row q-gutter-sm">
          {{ article?.comments.length }} {{ commentsText }}
          <q-space />
          <div class="q-mr-xl">
            <q-icon
              :name="like"
              size="35px"
              color="teal"
              class="cursor-pointer"
              @click="likeTheArticle()"
            />
            <span class="q-ma-sm">
              {{ likeCounts }}
            </span>
          </div>
        </div>
        <q-form class="q-gutter-md q-mb-xl">
          <q-input
            v-model="author"
            style="max-width: 200px"
            dense
            placeholder="Name"
            clearable
          />
          <q-input
            v-model="comment"
            dense
            :type="commentTextAreaType"
            placeholder="Your comment"
            clearable
            @focus="commentTextAreaType = 'textarea'"
          />
          <q-btn color="primary" @click="addCommentToArticle"
            >Add Comment</q-btn
          >
        </q-form>
        <div
          v-for="comment in article?.comments"
          :key="comment.id"
          class="row no-wrap q-my-sm"
        >
          <div>
            <q-icon
              name="account_circle"
              size="70px"
              color="primary"
              class="q-mr-sm col-2"
            />
          </div>
          <div>
            <div class="text-bold q-mt-sm col-10">{{ comment.author }}</div>
            <div>{{ comment.comment }}</div>
          </div>
        </div>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useArticleStore } from 'src/stores/article-store';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { Post } from 'src/signatures';
import { computed } from 'vue';
import {
  addComment,
  likeArticle,
  dislikeArticle,
  getOneArticle,
} from 'src/axios-requests';
import { useQuasar } from 'quasar';
import { nextTick } from 'vue';
import { copytext, copyCode } from 'src/helpers';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const articleStore = useArticleStore();
const route = useRoute();
const title = route.params.article;
const article = ref<Post>();
const author = ref('Guest');
const comment = ref('');
const commentTextAreaType = ref('text');
const like = ref('thumb_up_off_alt');
const $q = useQuasar();
let likeCounts = ref(article.value?.likes || 0);

const commentsText = computed(() => {
  let articles = articleStore.posts.filter((post) => post.title == title)[0];
  return articles?.comments.length > 1 ? 'comments' : 'comment';
});
const addCommentToArticle = () => {
  addComment(author.value, comment.value, article.value.id)
    .then((data) => {
      article.value?.comments.unshift({
        author: author.value,
        comment: comment.value,
        id: 99,
      });
      console.log(data);
      author.value = 'Guest';
      comment.value = '';
      $q.notify({
        message: data,
        type: 'positive',
      });
    })
    .catch((err) => {
      $q.notify({
        message: 'Something is wrong',
        type: 'negative',
      });
    });
};

const likeTheArticle = () => {
  if (like.value == 'thumb_up_off_alt') {
    likeArticle(article.value?.id).then((res) => {
      console.log(res);
      likeCounts.value++;
      $q.notify({
        message: res,
        type: 'positive',
      });
    });
    like.value = 'thumb_up_alt';
  } else {
    dislikeArticle(article.value?.id).then((res) => {
      likeCounts.value--;
      $q.notify({
        message: res,
        type: 'negative',
      });
    });
    like.value = 'thumb_up_off_alt';
  }
};
const highlightCodeBlocks = () => {
  const blocks = document.querySelectorAll('code');
  blocks.forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
};

onMounted(() => {
  if (articleStore.posts.length > 0) {
    article.value = articleStore.posts.filter((post) => post.title == title)[0];
    likeCounts.value = article.value?.likes;
  } else {
    getOneArticle(route.params.article)
      .then((data) => {
        article.value = data;
      })
      .catch((err) => {
        $q.notify({
          message: err,
          type: 'negative',
        });
      });
  }
  nextTick(() => {
    const copyBtns = document.getElementsByClassName('copy-btn');
    if (copyBtns.length > 0) {
      for (let i = 0; i < copyBtns.length; i++) {
        copyBtns[i].addEventListener('click', copytext);
      }
    } else {
      console.log('No elements with class "copy-btn" found.');
    }
    const copyCommandBtns = document.getElementsByClassName('copy-command-btn');
    if (copyCommandBtns.length > 0) {
      for (let i = 0; i < copyCommandBtns.length; i++) {
        copyCommandBtns[i].addEventListener('click', copyCode);
      }
    } else {
      console.log('No elements with class "copy-btn" found.');
    }
    highlightCodeBlocks();
  });
});
</script>
