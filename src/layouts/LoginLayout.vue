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
        />

        <q-toolbar-title @click="toHome" class="cursor-pointer">
          My Blog
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const toHome = () => {
  router.push({ path: '/' });
};
</script>
