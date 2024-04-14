<template>
  <q-page class="row items-center justify-evenly q-pt-xl">
    <q-form autocorrect autocapitalize autocomplete spellcheck class="q-my-xl">
      <div class="row q-gutter-sm">
        <q-input v-model="title" outlined />
        <q-select
          v-model="author"
          :options="authorOptions"
          option-label="name"
          option-value="id"
          outlined
        />
      </div>
      <q-input class="q-mt-sm" v-model="brief" outlined />
      <q-editor
        v-model="content"
        :dense="$q.screen.lt.md"
        min-height="60vh"
        max-height="60vh"
        class="q-mt-xl"
        :toolbar="[
          [
            {
              label: $q.lang.editor.align,
              icon: $q.iconSet.editor.align,
              fixedLabel: true,
              list: 'only-icons',
              options: ['left', 'center', 'right', 'justify'],
            },
          ],
          ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
          ['token', 'hr', 'link', 'custom_btn'],
          ['print', 'fullscreen'],
          [
            {
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
            },
            {
              label: $q.lang.editor.fontSize,
              icon: $q.iconSet.editor.fontSize,
              fixedLabel: true,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'size-1',
                'size-2',
                'size-3',
                'size-4',
                'size-5',
                'size-6',
                'size-7',
              ],
            },
            {
              label: $q.lang.editor.defaultFont,
              icon: $q.iconSet.editor.font,
              fixedIcon: true,
              list: 'no-icons',
              options: [
                'default_font',
                'arial',
                'arial_black',
                'comic_sans',
                'courier_new',
                'impact',
                'lucida_grande',
                'times_new_roman',
                'verdana',
              ],
            },
            'removeFormat',
          ],
          ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

          ['undo', 'redo'],
          ['viewsource'],
        ]"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana',
        }"
      />
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
    <div>
      <span class="text-h5">Category</span>
      <q-select
        outlined
        v-model="category"
        :options="categoryOptions"
        option-label="name"
        option-value="id"
        class="q-mt-sm"
      />
      <div class="q-my-lg">
        <span class="image-tag">{{ imageTag }}</span>
        <q-icon
          class="q-ml-sm cursor-pointer"
          size="25px"
          name="content_copy"
          @click="copyTextToClipboard(imageTag)"
        />
      </div>
      <div class="column q-mt-md">
        <div
          class="row justify-between q-mt-sm"
          v-for="path in imagePaths"
          :key="path"
        >
          <span class="image-path">
            {{ path }}
          </span>

          <q-icon
            class="q-ml-sm cursor-pointer"
            size="25px"
            name="content_copy"
            @click="copyTextToClipboard(path)"
          />
        </div>
      </div>
      <div class="absolute-bottom-right q-ma-xl">
        <div class="row">
          <q-btn class="q-mr-xl" color="primary" @click="saveWork">save</q-btn>
          <q-btn color="negative">reset</q-btn>
        </div>
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
import { copyToClipboard } from 'quasar';

const category = ref('Select One');
const content = ref('');
const title = ref('title');
const author = ref('author');
const brief = ref('brief');
const imageIds = ref<Array<string>>([]);
const imagePaths = ref<Array<string>>([]);
const url = process.env.API;
const imageTag = computed(() => {
  return (
    '<img src="' + url?.substring(0, url.length - 1) + '" alt="" width="600" />'
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
});

const saveWork = () => {
  postArticle(
    title.value,
    brief.value,
    author.value,
    content.value,
    category.value,
    imageIds.value
  )
    .then((res) => {
      console.log(res);
      clearAllData();
      $q.notify({
        message: res,
        type: 'positive',
      });
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

const copyTextToClipboard = (text: string) => {
  copyToClipboard(text)
    .then(() => {
      $q.notify({
        message: 'Text was copied',
        type: 'positive',
      });
    })
    .catch(() => {
      // fail
    });
};
</script>
