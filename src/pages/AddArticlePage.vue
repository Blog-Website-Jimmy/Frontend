<template>
  <q-page class="row items-center justify-evenly q-pt-xl">
    <q-form autocorrect autocapitalize autocomplete spellcheck class="q-my-xl">
      <ArticleFormHeader
        :titleReadOnly="false"
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
    </q-form>
    <ArticleFormRightSide
      v-model:category="category"
      v-model:category-options="categoryOptions"
      v-model:image-paths="imagePaths"
      v-model:image-tag="imageTag"
    />
    <div class="absolute-bottom-right q-ma-xl">
      <div class="row">
        <q-btn class="q-mr-xl" color="primary" @click="saveWork">save</q-btn>
        <q-btn color="negative">reset</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { getCategories, getAuthors, postArticle } from 'src/axios-requests';
import { Author, Category } from 'src/signatures';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // You can choose a different style
import CustomTextEditor from 'src/components/CustomTextEditor.vue';
import ArticleFormHeader from 'src/components/ArticleFormHeader.vue';
import ArticleFormRightSide from 'src/components/ArticleFormRightSide.vue';
import { nextTick } from 'vue';

const category = ref('Select One');
const content = ref('');
const title = ref('title');
const author = ref('author');
const brief = ref('brief');
const router = useRouter();
const imageIds = ref<Array<string>>([]);
const imagePaths = ref<Array<string>>([]);
const url = process.env.API;
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
  getCategories().then((data) => {
    console.log(categoryOptions);
    categoryOptions.value = data;
  });
  getAuthors().then((data) => {
    console.log(data);
    authorOptions.value = data;
  });
  nextTick(() => {
    document.querySelectorAll('pre code.highlight').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  });
});

const checkMainImageExists = () => {
  return imagePaths.value.some((path) => {
    return path.split('/')[3].includes('Main');
  });
};
const saveWork = () => {
  if (!checkMainImageExists()) {
    $q.notify({
      message: 'There is no Main Image!',
      type: 'warning',
      position: 'center',
      timeout: 1000,
    });
    return;
  }
  postArticle(
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
  console.log(id);
  console.log(path);
  imageIds.value.push(id);
  imagePaths.value.push(path);
};
</script>
