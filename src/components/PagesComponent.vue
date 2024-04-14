<template>
  <!-- This component is too hard to finish, but I will some day -->
  <div class="row items-center justify-center q-gutter-md">
    <q-btn
      class="page-button"
      @click="
        page.page > 0 && --page.page;
        shouldFetch = true;
      "
      icon="navigate_before"
    />

    <q-btn
      class="page-button"
      v-for="index in totalPageNumbers"
      :key="index"
      @click="
        page.page = index - 1;
        shouldFetch = true;
      "
      :class="[page.page == index - 1 ? backgroundColor : '']"
      >{{ index }}</q-btn
    >
    <q-btn
      class="page-button"
      @click="
        page.page < totalPageNumbers - 1 && ++page.page;
        shouldFetch = true;
      "
      icon="navigate_next"
    />
  </div>
</template>

<script setup lang="ts"></script>
