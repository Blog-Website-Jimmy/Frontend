<template>
  <q-page padding>
    <div class="row q-ma-xl justify-evenly">
      <q-card class="bg-indigo-5 text-white">
        <q-card-section> active users 30 </q-card-section>
      </q-card>
      <q-card class="bg-blue-5 text-white">
        <q-card-section> active users 30 </q-card-section>
      </q-card>
      <q-card class="bg-red-5 text-white">
        <q-card-section> active users 30 </q-card-section>
      </q-card>
    </div>
    <div class="row justify-between q-ma-xl">
      <div class="questions">
        <h4>active questions</h4>
      </div>
      <q-separator vertical />
      <div class="active-comments">
        <h4>active comments</h4>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  // name: 'PageName'
});
</script>
