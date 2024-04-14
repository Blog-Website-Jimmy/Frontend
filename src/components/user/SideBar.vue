<template>
  <div class="j-side-bar">
    <q-form>
      <q-input
        rounded
        bottom-slots
        v-model="search"
        outlined
        dense
        @focus="focus"
        @blur="unFocus"
        class="q-field--focused q-field--highlighted"
      >
        <template v-slot:prepend>
          <q-icon name="verified" color="primary" />
        </template>
        <template v-slot:append>
          <q-icon name="search" color="primary" class="cursor-pointer" />
        </template>
      </q-input>
    </q-form>

    <q-list separator class="bg-blue-7 text-white side-bar-menu text-subtitle1">
      <q-item-label header class="text-h6 text-white">Categories</q-item-label>
      <q-separator />
      <q-item
        v-for="category in categories"
        :key="category.id"
        clickable
        v-ripple
        @click="goToCategory(category.name)"
      >
        <q-item-section>{{ category.name }}</q-item-section>
      </q-item>
    </q-list>

    <q-list
      separator
      class="bg-blue-7 text-white side-bar-top-posts text-subtitle1"
    >
      <q-item-label header class="text-h6 text-white">Top posts</q-item-label>
      <q-separator />
      <q-item clickable v-ripple>
        <q-item-section>Single line item</q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>Item with caption</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { Category } from 'src/signatures';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { bus, getCategories } from 'src/axios-requests';

const router = useRouter();

const goToCategory = (category: string) => {
  bus.emit('givePermissionToFetchData');
  router.push('/category/' + category);
};

const focus = () => {
  search.value = search.value == 'search ...' ? '' : search.value;
};
const unFocus = () => {
  search.value = search.value == '' ? 'search ...' : search.value;
};

const search = ref('search ...');
const categories = ref<Array<Category>>([]);
onMounted(() => {
  getCategories().then((data) => {
    categories.value = data;
  });
});
</script>
