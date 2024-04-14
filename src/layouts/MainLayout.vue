<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="j-container">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          v-if="$q.screen.width < 1340"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title @click="toHome" class="cursor-pointer">
          My Blog
        </q-toolbar-title>

        <div>Blog App v{{ version }}</div>
      </q-toolbar>
    </q-header>

    <q-breadcrumbs class="j-breadcrumbs j-container">
      <q-breadcrumbs-el label="Home" to="/" />
      <q-breadcrumbs-el
        v-if="route.fullPath != '/'"
        :label="route.params.category"
      />
    </q-breadcrumbs>

    <div class="row j-container">
      <aside class="j-aside col-2">
        <SideBar />
      </aside>
      <q-drawer v-model="leftDrawerOpen" overlay bordered class="q-ma-sm">
        <SideBar />
      </q-drawer>

      <q-page-container class="col-9">
        <router-view />
      </q-page-container>
    </div>
    <FooterComponent class="q-mt-xl" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideBar from 'src/components/user/SideBar.vue';
import { useQuasar } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import FooterComponent from 'src/components/user/FooterComponent.vue';
import { bus } from 'src/axios-requests';
import { onMounted } from 'vue';

const route = useRoute();
const $q = useQuasar();
console.log($q.screen.width);
const router = useRouter();
const toHome = () => {
  router.push({ path: '/' });
};

const leftDrawerOpen = ref(false);

const version = ref('0.0.1');

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

onMounted(() => {
  bus.on('closeDrawer', () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  });
});
</script>
