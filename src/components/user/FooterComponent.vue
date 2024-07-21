<template>
  <div
    class="row justify-aroud bg-primary shadow-up-5 text-center q-pa-xl text-white"
    :class="[$q.screen.width > 700 ? 'text-h6' : 'text-subtitle1', errorClass]"
  >
    <div class="col-xs-12 col-sm-4 q-mb-xl">
      <div class="row column">
        <span>This website is created by Jimmy Shukurov @home</span>
      </div>
    </div>
    <div class="col-xs-6 col-sm-4">
      <div class="row column no-wrap">
        <span class="cursor-pointer">Ask a question</span>
        <span class="cursor-pointer">Contacts</span>
        <span class="cursor-pointer">Portfolio</span>
        <span class="cursor-pointer">Jobs</span>
      </div>
    </div>
    <div class="col-xs-6 col-sm-2">
      <div class="column justify-around">
        <span class="subscribe-input">
          <q-input
            outlined
            v-model="subscribe"
            bg-color="white"
            dense
            class="q-mr-sm"
            placeholder="example@mail.com"
          />
          <q-btn v-if="$q.screen.width > 700" dark color="teal">
            Subscribe
          </q-btn>
          <q-btn v-else dark color="teal" no-caps> Subs </q-btn>
        </span>
        <div class="q-mt-xl get-premium-btn">
          <q-btn color="teal">get premium</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
const subscribe = ref('');
const $q = useQuasar();
</script>
