<template>
  <div>
    <q-card class="my-card text-center">
      <q-card-section class="text-h5 q-ma-md">
        <q-input
          v-model="categoryName"
          borderless
          :readonly="readonly"
          input-style="text-align: center; font-size: 20px"
        />
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat @click="toggleReadony"> Edit </q-btn>

        <q-space />
        <q-btn flat>Delete</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';

const props = defineProps(['id', 'name']);

const readonly = ref(true);

const categoryName = computed(() => {
  return props.name;
});

const toggleReadony = () => {
  readonly.value = !readonly.value;
};

const url = process.env.API;
</script>
