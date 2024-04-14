<template>
  <div>
    <q-card class="my-card">
      <img :src="url + props.image" width="300" height="200" />

      <q-card-section>
        <div class="text-h6 ellipsis">{{ props.title }}</div>
        <div class="text-subtitle2 ellipsis">by {{ props.author }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none ellipsis">
        {{ props.brief }}
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn flat :to="{ name: 'article', params: { article: props.title } }">
          Read
        </q-btn>

        <q-space />
        <q-btn flat>Share</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'author', 'brief', 'image']);

const url = process.env.API;
</script>
