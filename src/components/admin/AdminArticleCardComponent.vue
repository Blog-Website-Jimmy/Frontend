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
        <q-btn flat @click="editArticle"> Edit </q-btn>

        <q-space />
        <q-btn flat @click="deletePost(props.id)">Delete</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'author', 'brief', 'image', 'id']);
import { deleteArticle } from 'src/axios-requests';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const url = process.env.API;
const $q = useQuasar();
const router = useRouter();
const editArticle = () => {
  let path = 'article/edit/' + props.title;
  router.push({ path: path });
};

const deletePost = (id: number) => {
  $q.notify({
    message: 'Are you sure?',
    color: 'negative',
    position: 'center',
    actions: [
      {
        label: 'Delete',
        color: 'yellow',
        handler: () => {
          deleteArticle(id).then((data) => {
            $q.notify({
              message: data,
              type: 'positive',
            });
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
