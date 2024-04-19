<template>
  <q-page class="row items-center justify-evenly j-container">
    <div v-for="category in categories" :key="category.id" class="col-4">
      <AdminCategoryCartComponent :id="category.id" :name="category.name" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { getCategories } from 'src/axios-requests';
import { Category } from 'src/signatures';
import { ref } from 'vue';
import { onMounted } from 'vue';
import AdminCategoryCartComponent from 'src/components/admin/AdminCategoryCardComponent.vue';

const categories = ref<Array<Category>>([]);
onMounted(() => {
  getCategories().then((res) => {
    categories.value = res;
  });
});
</script>
