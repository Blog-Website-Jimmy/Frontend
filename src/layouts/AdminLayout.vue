<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />
        <q-btn
          flat
          no-caps
          no-wrap
          class="q-ml-xs"
          to="/admin"
          v-if="$q.screen.gt.xs"
        >
          <q-icon name="admin_panel_settings" color="blue" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            My Blog
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap">
          <q-input
            dense
            outlined
            square
            v-model="search"
            placeholder="Search"
            class="bg-white col"
          />
          <q-btn
            class="YL__toolbar-input-btn"
            color="grey-3"
            text-color="grey-8"
            icon="search"
            unelevated
          />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="add_box"
            @click="createNode"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip v-if="route.fullPath == '/admin/articles'">
              Create a post
            </q-tooltip>
            <q-tooltip v-else> Create a category </q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="apps"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Apps</q-tooltip>
          </q-btn>
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="message"
            v-if="$q.screen.gt.sm"
          >
            <q-tooltip>Messages</q-tooltip>
          </q-btn>
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating> 2 </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn round flat @click="toggleAccountSeetings">
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
          <q-list
            bordered
            separator
            :class="accountDialog"
            class="absolute-top-right q-mt-xl"
          >
            <q-item clickable class="bg-blue-10 text-white">
              <q-item-section @click="logoutUser">Logout</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-toolbar>
    </q-header>

    <AdminSideBar :left-drawer-open="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AdminSideBar from 'src/components/admin/AdminSideBar.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { bus } from 'src/axios-requests';

const route = useRoute();
const router = useRouter();
const accountDialog = ref('hidden');

onMounted(() => {
  if (localStorage.getItem('token') == '') router.push('/login');
});
watch(route, () => {
  console.log('route is => ', route.fullPath);
});

const leftDrawerOpen = ref(true);
const search = ref('');
const createNode = () => {
  if (route.fullPath == '/admin/articles') {
    router.push({ path: '/add-article' });
    return;
  }
  if (route.fullPath == '/admin/categories') {
    bus.emit('add-category');
    return;
  }
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const toggleAccountSeetings = () => {
  if (accountDialog.value == 'hidden') {
    accountDialog.value = 'block';
  } else {
    accountDialog.value = 'hidden';
  }
};
const logoutUser = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<style lang="sass">
.YL

  &__toolbar-input-container
    min-width: 100px
    width: 55%

  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
