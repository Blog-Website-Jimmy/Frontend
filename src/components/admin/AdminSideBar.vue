<template>
  <div>
    <q-drawer
      v-model="isDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            v-for="link in links1"
            :key="link.text"
            v-ripple
            clickable
            :to="link.to"
          >
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links2" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- <q-separator class="q-mt-md q-mb-xs" /> -->

          <!-- <q-item-label header class="text-weight-bold text-uppercase">
            More from Youtube
          </q-item-label> -->

          <!-- <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item> -->

          <q-separator class="q-mt-md q-mb-lg" />

          <div class="q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons1"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  leftDrawerOpen: Boolean,
});

const isDrawerOpen = computed(() => {
  return props.leftDrawerOpen;
});

const links1 = [
  { icon: 'article', text: 'Articles', to: '/admin/articles' },
  { icon: 'category', text: 'Categories', to: '/admin/categories' },
  { icon: 'subscriptions', text: 'Subscriptions', to: '/subscriptions' },
];
const links2 = [
    { icon: 'thumb_up', text: 'Likes', to: '/likes' },
    { icon: 'account_circle', text: 'users', to: '/users' },
    // { icon: 'watch_later', text: 'Watch later' },
    // { icon: 'thumb_up_alt', text: 'Liked videos' },
  ],
  // links3 = [
  //   { icon: fabYoutube, text: 'YouTube Premium' },
  //     { icon: 'local_movies', text: 'Movies & Shows' },
  //     { icon: 'videogame_asset', text: 'Gaming' },
  //     { icon: 'live_tv', text: 'Live' },
  // ],
  // links4 = [
  //   { icon: 'settings', text: 'Settings' },
  //   { icon: 'flag', text: 'Report history' },
  //   { icon: 'help', text: 'Help' },
  //   { icon: 'feedback', text: 'Send feedback' },
  // ],
  buttons1 = [
    { text: 'About' },
    { text: 'Press' },
    { text: 'Copyright' },
    { text: 'Contact us' },
    { text: 'Creators' },
    { text: 'Advertise' },
    { text: 'Developers' },
  ],
  buttons2 = [
    { text: 'Terms' },
    { text: 'Privacy' },
    { text: 'Policy & Safety' },
    { text: 'Test new features' },
  ];
</script>
