<template>
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
    <div class="q-my-lg">
      <span class="image-tag">COMMAND to HTML</span>
      <q-icon
        class="q-ml-sm cursor-pointer"
        size="25px"
        name="content_copy"
        @click="copyTextToClipboard(copyCommand)"
      />
    </div>
    <div class="q-my-lg">
      <span class="image-tag">CODE to HTML</span>
      <q-icon
        class="q-ml-sm cursor-pointer"
        size="25px"
        name="content_copy"
        @click="copyTextToClipboard(copyCode)"
      />
    </div>
    <div class="column q-mt-md">
      <div
        class="row justify-between q-mt-sm"
        v-for="path in imagePaths"
        :key="path"
      >
        <span class="image-path">
          {{ shortenPath(path) }}
        </span>

        <q-icon
          class="q-ml-sm cursor-pointer"
          size="25px"
          name="content_copy"
          @click="copyTextToClipboard(path)"
        />
      </div>
      <div v-if="article">
        <div
          class="row justify-between q-mt-sm"
          v-for="image in article.images"
          :key="image.name"
        >
          <span class="image-path">
            {{ shortenPath(image.pathOrURL) }}
          </span>

          <q-icon
            class="q-ml-sm cursor-pointer"
            size="25px"
            name="content_copy"
            @click="copyTextToClipboard(image.pathOrURL)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Category, Post } from 'src/signatures';
import { shortenPath, copyTextToClipboard } from 'src/helpers';
import { computed } from 'vue';
import {} from 'quasar';

const copyCommand = computed(() => {
  return '<div class="copy-text-content"><span class="content"> copy me to clipboard</span><span class="copy-btn">copy</span></div>';
});
const copyCode = computed(() => {
  return '<!--Code starts here --> \n<div class="copy-code-content"><pre class="raw-code"><code class="java"> \n\n raw code to here \n\n</code> </pre><span class="copy-command-btn">copy</span></div>\n<!--Code ends here -->';
});

const category = defineModel<string>('category', { required: true });
const categoryOptions = defineModel<Array<Category>>('categoryOptions', {
  required: true,
});
const imageTag = defineModel<string>('imageTag', { required: true });
const imagePaths = defineModel<Array<string>>('imagePaths', { required: true });
const article = defineModel<Array<Post>>('article', { required: false });
</script>
