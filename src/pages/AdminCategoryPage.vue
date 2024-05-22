<template>
  <q-page class="row items-center justify-evenly j-container">
    <div v-for="category in categories" :key="category.id" class="col-4">
      <AdminCategoryCartComponent
        :id="category.id"
        :name="category.name"
        :priority="category.priority"
      />
    </div>
    <q-dialog v-model="openAddCategory">
      <q-card>
        <q-card-section>
          <span class="text-h6">Add Category</span>
          <q-form @submit="postCategory">
            <q-input v-model="categoryName" outlined class="q-my-lg"></q-input>
            <q-btn type="submit">submit</q-btn>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { getCategories, addCategory } from 'src/axios-requests';
import { Category } from 'src/signatures';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { bus } from 'src/axios-requests';
import { useQuasar } from 'quasar';
import AdminCategoryCartComponent from 'src/components/admin/AdminCategoryCardComponent.vue';

const categories = ref<Array<Category>>([]);
const openAddCategory = ref(false);
const categoryName = ref('');
const $q = useQuasar();
const postCategory = () => {
  addCategory(categoryName.value, 0)
    .then((data) => {
      $q.notify({
        message: data,
        type: 'positive',
      });
      openAddCategory.value = false;
      getCategories().then((res) => {
        categories.value = res;
      });
    })
    .catch((error) => [
      $q.notify({
        message: error.response.data,
        type: 'negative',
      }),
    ]);
};

onMounted(() => {
  getCategories().then((res) => {
    categories.value = res;
  });
  bus.on('add-category', () => {
    openAddCategory.value = true;
  });
  bus.on('update-categories', () => {
    getCategories().then((res) => {
      categories.value = res;
    });
  });
});
</script>
