<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="j-form">
      <div class="q-mb-xl text-h3">Login</div>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input v-model="username" label="Username" hint="Email" outlined />

        <q-input
          :type="passwordType"
          v-model="password"
          label="Password"
          outlined
        >
          <template v-slot:append>
            <q-icon
              :name="passwordTypeIcon"
              @click="changePasswordType"
              class="cursor-pointer"
            />
          </template>
        </q-input>

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
import { useUserStore } from 'src/stores/user-store';

const username = ref('');
const password = ref('');
const userStore = useUserStore();
let passwordType = ref(<'password' | 'text'>'password');
let passwordTypeIcon = ref('visibility');
const router = useRouter();
const $q = useQuasar();
const onReset = () => {
  username.value = '';
  password.value = '';
};

const changePasswordType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text';
    passwordTypeIcon.value = 'visibility_off';
  } else {
    passwordType.value = 'password';
    passwordTypeIcon.value = 'visibility';
  }
};

const onSubmit = () => {
  loginUser(username.value, password.value)
    .then((res) => {
      localStorage.setItem('token', res.token);
      userStore.user = 'jimi';
      userStore.token = res.token;

      router.push('/admin');
    })
    .catch((error) => {
      console.log(error.response);
      $q.notify({
        message: error.response,
        type: 'negative',
      });
    });
};
</script>
