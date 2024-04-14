<template>
  <div
    class="row justify-aroud bg-primary shadow-up-5 text-center q-pa-xl text-white"
  >
    <div class="col-4">
      <div class="row column">
        <span>This website is created by Jimmy Shukurov@</span>
      </div>
    </div>
    <div class="col-4 text-subtitle1">
      <div class="row column">
        <span class="cursor-pointer">Ask a question</span>
        <span class="cursor-pointer">Contacts</span>
        <span class="cursor-pointer">Portfolio</span>
        <span class="cursor-pointer">menu 1</span>
      </div>
    </div>
    <div class="col-2">
      <div class="column justify-around">
        <span class="row no-wrap">
          <q-input
            outlined
            v-model="subscribe"
            bg-color="white"
            input-style="'width:20px'"
            dense
            class="q-mr-sm"
            placeholder="example@mail.com"
          />
          <q-btn dark color="teal">subscribe</q-btn>
        </span>
        <div class="q-mt-xl">
          <q-btn color="teal">get premium</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const subscribe = ref('');
</script>
