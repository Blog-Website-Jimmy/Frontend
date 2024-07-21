<template>
  <div>
    <div class="row q-gutter-sm">
      <q-input v-model="title" outlined :readonly="props.titleReadOnly" />
      <q-select
        v-model="author"
        :options="authorOptions"
        option-label="name"
        option-value="id"
        outlined
      />
    </div>
    <q-input class="q-mt-sm" v-model="brief" outlined />
  </div>
</template>
<script setup lang="ts">
import { Author } from 'src/signatures';

const props = defineProps(['titleReadOnly']);
const title = defineModel<string>('title', { required: true });
const author = defineModel<string>('author', { required: true });
const authorOptions = defineModel<Array<Author>>('authorOptions', {
  required: true,
});
const brief = defineModel<string>('brief', { required: true });
</script>
