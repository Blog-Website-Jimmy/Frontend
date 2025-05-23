<template>
  <section class="main-layout">
    <header>
      <span class="logo">
        <img src="Logo.png" alt="Logo" :width="imageWidth" />
      </span>
      <ul>
        <li v-for="n in visibleMenuNumbers" :key="n">
          <span class="menu">{{ menu[n - 1] }}</span>
        </li>

        <li class="others" @click="displayOthers()">
          <span class="menu">Others</span>
          <span class="icon chevron-down">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.5 9.5L12.5 15.5L18.5 9.5"
                stroke="#FAFAFA"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <ul class="dropdown">
            <li v-for="n in menu.length - visibleMenuNumbers + 1" :key="n">
              {{ menu[n + visibleMenuNumbers - 1] }}
            </li>
          </ul>
        </li>
      </ul>
      <button @click="toggleLogin()">
        <span>Login</span>
        <span class="icon">
          <svg
            height="100%"
            width="100%"
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
            xml:space="preserve"
            fill="#fff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  class="st0"
                  d="M155.81,0v173.889h33.417V33.417h235.592l-74.87,50.656c-8.469,5.727-13.535,15.289-13.535,25.503v286.24 H189.227V282.079H155.81v147.154h180.604v70.93c0,4.382,2.423,8.404,6.29,10.451c3.867,2.056,8.558,1.811,12.189-0.644 l119.318-80.736V0H155.81z"
                ></path>
                <path
                  class="st0"
                  d="M228.657,290.4c0,1.844,1.068,3.524,2.75,4.3c1.664,0.775,3.638,0.514,5.042-0.685l78.044-66.035 l-78.044-66.034c-1.404-1.2-3.378-1.46-5.042-0.686c-1.681,0.775-2.75,2.456-2.75,4.3v33.392H37.79v58.064h190.868V290.4z"
                ></path>
              </g>
            </g>
          </svg>
        </span>
      </button>
    </header>
    <div class="main-content">
      <router-view />
    </div>
    <footer>
      <FooterComponent />
    </footer>
    <div v-show="showLogin" class="login">
      <div class="layer"></div>
      <LoginUserComponent
        v-show="auth == 'login'"
        @toggle-login="toggleLogin"
        @swtich-to-regsiter="toggleAuth"
        @forgot-password="toggleAuth"
        class="component"
      />
      <RegisterUserComponent
        v-show="auth == 'register'"
        @toggle-login="toggleLogin"
        @register="toggleAuth"
        class="component"
      />
      <ConfirmAuthComponent
        v-show="auth == 'confirm-auth'"
        @toggle-login="toggleLogin"
        class="component"
      />
      <ForgotPasswordComponent
        v-show="auth == 'forgot-password'"
        @toggle-login="toggleLogin"
        @reset="toggleAuth"
        class="component"
      />
      <ResetPasswordComponent
        v-show="auth == 'reset'"
        @toggle-login="toggleLogin"
        class="component"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import SideBar from 'src/components/SideBar.vue';
import { useRouter, useRoute } from 'vue-router';
import FooterComponent from 'src/components/FooterComponent.vue';
import LoginUserComponent from 'src/components/auth/LoginUserComponent.vue';
import RegisterUserComponent from 'src/components/auth/RegisterUserComponent.vue';
import ConfirmAuthComponent from 'src/components/auth/ConfirmAuthComponent.vue';
import ForgotPasswordComponent from 'src/components/auth/ForgotPasswordComponent.vue';
import ResetPasswordComponent from 'src/components/auth/ResetPasswordComponent.vue';
import { useQuasar } from 'quasar';
const route = useRoute();
const router = useRouter();
const showLogin = ref(false);
const auth = ref('login');
const visibleMenuNumbers = ref(4);
const $q = useQuasar();
const menu: string[] = [
  'Java',
  'Spring boot',
  'Linux',
  'Javascript',
  'Algorithms',
  'Kotlin',
  'C++',
  'Desktop',
  'Mobile',
];

const displayOthers = () => {
  const dropdown = document.querySelector('.dropdown') as HTMLElement;
  const chevron_down = document.querySelector('.chevron-down') as HTMLElement;
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
  chevron_down.classList.toggle('up');
};
const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.querySelector('.dropdown') as HTMLElement;
  const others = document.querySelector('.others') as HTMLElement;

  if (!others.contains(event.target as Node)) {
    dropdown.style.display = 'none';
    document.querySelector('.chevron-down')?.classList.remove('up');
  }
};
const toggleLogin = () => {
  showLogin.value = !showLogin.value;
  auth.value = 'login';
};
const toggleAuth = (value: string) => {
  auth.value = value;
};

const imageWidth = computed(() => {
  if ($q.screen.lt.sm) return 190;
  if ($q.screen.width < 1400) return 150;
  return 190;
});
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<style scoped lang="scss">
.main-layout {
  --font-size: 1.5rem;
  --padding: 12px;
  --border-radius: 12px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  overflow: hidden;
}

.logo {
  cursor: pointer;
}
section {
  min-height: 100vh;
  background-color: var(--background-main);
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size);
  font-weight: bold;
  color: var(--text-color);
  padding-inline: var(--padding-inline);
  max-width: var(--max-width-of-screen);
  width: 100%;
}
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  gap: 35px;
  li {
    padding: var(--padding);
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon {
      --size: 24px;
      width: var(--size);
      height: var(--size);
      max-height: var(--size);
      max-width: var(--size);
      margin-left: 6px;
    }
    .menu {
      position: relative;
    }
    &:hover {
      .menu::after {
        content: '';
        display: block;
        width: 100%;
        position: absolute;
        bottom: 0;
        border-bottom: 2px solid var(--secondary-color);
      }
    }
  }
}
.others {
  position: relative;
  .dropdown {
    display: none;
  }
}
.up {
  transform: rotate(180deg);
}
.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  gap: 10px;
  top: 60px;
  border: 1px solid var(--outline-main);
  border-radius: var(--border-radius);
  z-index: 10;
  background-color: var(--background-main);
  li:hover {
    color: var(--secondary-color);
  }
}
button {
  display: flex;
  align-items: center;
  gap: var(--padding);
  background: var(--button-main);
  outline: none;
  color: var(--text-color);
  padding: calc(var(--padding) / 2) var(--padding);
  border-radius: var(--border-radius);
  cursor: pointer;
  .icon {
    --size: 24px;
    width: var(--size);
    height: var(--size);
    max-height: var(--size);
    max-width: var(--size);
  }
}
.main-content {
  flex-grow: 1;
  padding-inline: var(--padding-inline);
  width: 100%;
  max-width: var(--max-width-of-screen);
}
footer {
  width: 100%;
  background-color: var(--background-main-2);
  padding-block: 20px;
  margin: auto;
}
.login {
  position: fixed;
  z-index: 15;
  width: 100%;
  height: 100%;
  top: 0;
  .layer {
    --blur-amount: 2px;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(var(--blur-amount));
    -webkit-backdrop-filter: blur(var(--blur-amount));
    background-color: #002f4946;
  }
  .component {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
@media screen and (max-width: 1400px) {
  .main-layout {
    --font-size: 1rem;
  }
}
@media screen and (max-width: 1000px) {
  header {
    justify-content: center;
    ul,
    button {
      display: none;
    }
  }
}
@media screen and (max-width: 700px) {
  footer {
    border-radius: var(--card-border-radius) var(--card-border-radius) 0 0;
  }
}
</style>
