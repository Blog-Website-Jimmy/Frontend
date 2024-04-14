<template>
  <div>
    <q-card class="my-card text-center">
      <q-card-section class="text-h5 q-ma-md">
        <q-input
          v-model="categoryName"
          :borderless="readonly"
          :readonly="readonly"
          input-style="text-align: center; font-size: 20px"
        />
        <q-input
          v-model="categoryPriority"
          :borderless="readonly"
          :readonly="readonly"
          input-style="text-align: center; font-size: 20px"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat v-if="!changed" @click="toggleReadony"> Edit </q-btn>
        <q-btn flat v-else color="teal" @click="update"> Apply </q-btn>

        <q-space />
        <q-btn v-if="!changed" flat @click="postDeleteCategory"> Delete </q-btn>
        <q-btn flat v-else color="negative" @click="cancelChanges"
          >Cancel</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { ref } from 'vue';
import { updateCategory, deleteCategory, bus } from 'src/axios-requests';
import { useQuasar } from 'quasar';

const props = defineProps(['id', 'name', 'priority']);

const readonly = ref(true);
const changed = ref(false);
const $q = useQuasar();

const categoryName = ref(props.name);
const categoryPriority = ref(props.priority);
const cancelChanges = () => {
  toggleReadony();
  changed.value = !changed.value;
  categoryName.value = props.name;
  categoryPriority.value = props.priority;
};

const toggleReadony = () => {
  readonly.value = !readonly.value;
};
const update = () => {
  updateCategory(categoryName.value, props.id, categoryPriority.value)
    .then((data) => {
      changed.value = false;
      readonly.value = true;
      $q.notify({
        message: data,
        type: 'positive',
      });
    })
    .catch(() => {
      $q.notify({
        message: 'Something is wrong',
        type: 'negative',
      });
    });
};
const postDeleteCategory = () => {
  $q.notify({
    message: 'Are you sure?',
    color: 'negative',
    position: 'center',
    actions: [
      {
        label: 'Delete',
        color: 'yellow',
        handler: () => {
          deleteCategory(props.id)
            .then((data) => {
              $q.notify({
                message: data,
                type: 'positive',
              });
              bus.emit('update-categories');
            })
            .catch(() => {
              $q.notify({
                message: 'Something is wrong!',
                type: 'negative',
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
watch(categoryName, (newVal) => {
  changed.value = newVal !== props.name;
});
watch(categoryPriority, (newVal) => {
  changed.value = newVal !== props.name;
});
</script>
