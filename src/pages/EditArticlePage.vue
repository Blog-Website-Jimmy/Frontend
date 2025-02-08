<template>
  <q-page class="row items-center justify-evenly q-pt-xl">
    <q-form autocorrect autocapitalize autocomplete spellcheck class="q-my-xl">
      <ArticleFormHeader
        :titleReadOnly="true"
        v-model:title="title"
        v-model:author="author"
        v-model:author-options="authorOptions"
        v-model:brief="brief"
      />
      <CustomTextEditor v-model:content="content" />
      <div class="row justify-evenly q-mt-xl">
        <q-uploader
          :url="imageUplaodURL"
          label="Main Image"
          style="max-width: 300px"
          field-name="image"
          @uploaded="uploadIt"
        />
        <q-uploader
          :url="imageUplaodURL"
          label="Other images"
          multiple
          style="max-width: 300px"
          field-name="image"
          @uploaded="uploadIt"
        />
      </div>
      <div class="row q-mt-xl no-wrap uploaded-images">
        <q-card
          v-for="image in article.images"
          :key="image.name"
          class="edit-article-my-card q-mx-xl"
        >
          <q-img :src="url + image.pathOrURL.substring(1)">
            <div class="absolute-bottom">
              <div class="text-h6">{{ image.name }}</div>
              <div class="text-subtitle2">by Jimmy</div>
            </div>
          </q-img>
          <q-card-actions class="row justify-between">
            <q-btn dark @click="deleteArticleImage(image.id)">Delete</q-btn>
            <q-btn dark>Rename</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </q-form>
    <ArticleFormRightSide
      v-model:category="category"
      v-model:category-options="categoryOptions"
      v-model:image-paths="imagePaths"
      v-model:image-tag="imageTag"
      v-model:article="article"
    />
    <div class="absolute-bottom-right q-ma-xl">
      <div class="row">
        <q-btn class="q-mr-xl" color="primary" @click="updateWork">
          update
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {
  getCategories,
  getAuthors,
  updateArticle,
  deleteImage,
} from 'src/axios-requests';
import { Author, Category, Post } from 'src/signatures';
import { onMounted, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { useArticleStore } from 'src/stores/article-store';
import CustomTextEditor from 'src/components/CustomTextEditor.vue';
import ArticleFormHeader from 'src/components/ArticleFormHeader.vue';
import ArticleFormRightSide from 'src/components/ArticleFormRightSide.vue';
import { nextTick } from 'vue';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const articleStore = useArticleStore();
const category = ref('Select One');
const content = ref('');
const title = ref('title');
const author = ref('author');
const brief = ref('brief');
const imageIds = ref<Array<string>>([]);
const imagePaths = ref<Array<string>>([]);
const url = process.env.API;
const route = useRoute();
const router = useRouter();
const article = ref<Array<Post>>([]);
const imageTag = computed(() => {
  return (
    '<img src="' +
    url?.substring(0, url.length - 1) +
    '" alt="" class="article-image" />'
  );
});

const imageUplaodURL = computed(() => {
  return process.env.API + 'article/upload/image/' + title.value;
});
const $q = useQuasar();
const categoryOptions = ref<Array<Category>>([]);
const authorOptions = ref<Array<Author>>([]);

onMounted(() => {
  let editArticleTitle = route.params.title;
  article.value = articleStore.posts.filter(
    (post) => post.title == editArticleTitle
  )[0];
  title.value = article.value.title;
  brief.value = article.value.brief;
  content.value = article.value.content;
  author.value = article.value.author;
  category.value = article.value.category;

  getCategories().then((data) => {
    categoryOptions.value = data;
  });
  getAuthors().then((data) => {
    authorOptions.value = data;
  });
  // nextTick(() => {
  //   document.querySelectorAll('pre code.highlight').forEach((block) => {
  //     hljs.highlightElement(block as HTMLElement);
  //   });
  // });
});

const updateWork = () => {
  if (!checkMainImageExists()) {
    $q.notify({
      message: 'There is no Main Image!',
      type: 'warning',
      position: 'center',
      timeout: 1000,
    });
    return;
  }
  updateArticle(
    title.value,
    brief.value,
    author.value,
    content.value,
    category.value,
    imageIds.value
  )
    .then((res) => {
      clearAllData();
      $q.notify({
        message: res,
        type: 'positive',
      });
      router.push({ path: '/admin/articles' });
    })
    .catch((error) => {
      if (error.response.status == 400) {
        console.log(error.response.data.errors);
        error.response.data.errors.forEach((err: string) => {
          $q.notify({
            message: err,
            type: 'negative',
          });
        });
        return;
      }

      $q.notify({
        message: error.response.data,
        type: 'negative',
      });
    });
};

const clearAllData = () => {
  title.value = '';
  brief.value = '';
  content.value = '';
  author.value = '';
  category.value = '';
};

const uploadIt = (response: any) => {
  let result = response.xhr.response;
  let parsedresult = JSON.parse(result);
  let id = parsedresult.id;
  let path = parsedresult.path;
  imageIds.value.push(id);
  imagePaths.value.push(path);
};

const checkMainImageExists = () => {
  return (
    article.value.images.some((image) => image.name === 'Main') ||
    imagePaths.value.some((path) => {
      return path.split('/')[3].includes('Main');
    })
  );
};

const deleteArticleImage = (id: number) => {
  $q.notify({
    message: 'Are you sure?',
    color: 'negative',
    position: 'center',
    actions: [
      {
        label: 'Delete',
        color: 'yellow',
        handler: () => {
          deleteImage(id).then((data) => {
            $q.notify({
              message: data,
              type: 'positive',
            });
            article.value.images = article.value.images.filter(
              (item) => item.id !== id
            );
          });
        },
      },
      {
        label: 'Cancel',
        color: 'white',
        handler: () => {
          /* cancel deletion */
        },
      },
    ],
  });
};
</script>
