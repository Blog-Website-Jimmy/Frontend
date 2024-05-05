<template>
  <div class="j-side-bar">
    <div class="drawer-close">
      <q-icon
        name="close"
        size="20px"
        class="drawer-close--btn"
        @click="closeDrawer"
      />
    </div>
    <q-form @submit.prevent="handleSubmit">
      <q-input
        rounded
        bottom-slots
        v-model="search"
        outlined
        dense
        class="q-field--focused q-field--highlighted"
        placeholder="search ..."
      >
        <template v-slot:prepend>
          <q-icon name="verified" color="primary" />
        </template>
        <template v-slot:append>
          <q-icon
            name="search"
            color="primary"
            class="cursor-pointer"
            @click="handleSubmit"
          />
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
import { bus, getCategories, searchPost } from 'src/axios-requests';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

const goToCategory = (category: string) => {
  bus.emit('givePermissionToFetchData');
  router.push('/category/' + category);
};

const handleSubmit = () => {
  search.value = search.value ? search.value : ' ';
  searchPost(search.value, 0, 5).then(() => {
    $q.notify({
      message: 'Articles were found!',
      type: 'positive',
    });
  });
};

const search = ref('');
const categories = ref<Array<Category>>([]);
onMounted(() => {
  getCategories().then((data) => {
    categories.value = data;
  });
});

const closeDrawer = () => {
  bus.emit('closeDrawer');
};
</script>
