<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="j-form">
      <div class="q-mb-xl text-h3">Login</div>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input v-model="username" label="Username" hint="Email" outlined />

        <q-input type="password" v-model="password" label="Password" outlined />

        <div class="row justify-between">
          <q-btn label="Login" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="negative" class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { loginUser } from 'src/axios-requests';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const username = ref('');
const password = ref('');
const router = useRouter();
const $q = useQuasar();
const onReset = () => {
  username.value = '';
  password.value = '';
};

const onSubmit = () => {
  loginUser(username.value, password.value)
    .then((res) => {
      console.log(res);
      router.push('/admin');
    })
    .catch((error) => {
      console.log(error.response.data);
      $q.notify({
        message: error.response.data,
        type: 'negative',
      });
    });
};
</script>
