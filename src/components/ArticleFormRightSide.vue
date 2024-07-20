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
      <span class="image-tag">Click me to copy code to HTML</span>
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
    </div>
  </div>
</template>
<script setup lang="ts">
import { copyToClipboard, useQuasar } from 'quasar';
import { Category } from 'src/signatures';
import { computed } from 'vue';
import {} from 'quasar';

const category = defineModel<string>('category', { required: true });
const categoryOptions = defineModel<Array<Category>>('categoryOptions', {
  required: true,
});
const imageTag = defineModel<string>('imageTag', { required: true });
const copyCode = defineModel<string>('copyCode', { required: true });
const imagePaths = defineModel<Array<string>>('imagePaths', { required: true });

const $q = useQuasar();

const shortenPath = (path: string) => {
  return computed(() => {
    let array = path.split('/');
    return array[array.length - 1];
  });
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
