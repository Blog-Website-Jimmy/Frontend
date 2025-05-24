<template>
  <div class="sidebar-menu">
    <span class="close" @click="closeMenu()">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.6 28.5L7.5 26.4L15.9 18L7.5 9.6L9.6 7.5L18 15.9L26.4 7.5L28.5 9.6L20.1 18L28.5 26.4L26.4 28.5L18 20.1L9.6 28.5Z"
          fill="#FEF7FF"
        />
      </svg>
    </span>
    <span class="icon account">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 97 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.9 68.4C27.3 65.8 31.1 63.75 35.3 62.25C39.5 60.75 43.9 60 48.5 60C53.1 60 57.5 60.75 61.7 62.25C65.9 63.75 69.7 65.8 73.1 68.4C75.4333 65.6667 77.25 62.5667 78.55 59.1C79.85 55.6333 80.5 51.9333 80.5 48C80.5 39.1333 77.3833 31.5833 71.15 25.35C64.9167 19.1167 57.3667 16 48.5 16C39.6333 16 32.0833 19.1167 25.85 25.35C19.6167 31.5833 16.5 39.1333 16.5 48C16.5 51.9333 17.15 55.6333 18.45 59.1C19.75 62.5667 21.5667 65.6667 23.9 68.4ZM48.5 52C44.5667 52 41.25 50.65 38.55 47.95C35.85 45.25 34.5 41.9333 34.5 38C34.5 34.0667 35.85 30.75 38.55 28.05C41.25 25.35 44.5667 24 48.5 24C52.4333 24 55.75 25.35 58.45 28.05C61.15 30.75 62.5 34.0667 62.5 38C62.5 41.9333 61.15 45.25 58.45 47.95C55.75 50.65 52.4333 52 48.5 52ZM48.5 88C42.9667 88 37.7667 86.95 32.9 84.85C28.0333 82.75 23.8 79.9 20.2 76.3C16.6 72.7 13.75 68.4667 11.65 63.6C9.55 58.7333 8.5 53.5333 8.5 48C8.5 42.4667 9.55 37.2667 11.65 32.4C13.75 27.5333 16.6 23.3 20.2 19.7C23.8 16.1 28.0333 13.25 32.9 11.15C37.7667 9.05 42.9667 8 48.5 8C54.0333 8 59.2333 9.05 64.1 11.15C68.9667 13.25 73.2 16.1 76.8 19.7C80.4 23.3 83.25 27.5333 85.35 32.4C87.45 37.2667 88.5 42.4667 88.5 48C88.5 53.5333 87.45 58.7333 85.35 63.6C83.25 68.4667 80.4 72.7 76.8 76.3C73.2 79.9 68.9667 82.75 64.1 84.85C59.2333 86.95 54.0333 88 48.5 88Z"
          fill="#FEF7FF"
        />
      </svg>
    </span>
    <ul>
      <li v-for="n in visibleMenuNumbers" :key="n">
        <span class="menu">{{ menus[n - 1] }}</span>
      </li>

      <li class="others" @click="displayOthers()">
        <span class="menu">Others</span>
        <span class="icon chevron-down">
          <svg
            width="100%"
            height="100%"
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
        <ul class="dropdown" v-show="showOthersMenu">
          <li v-for="n in menus.length - visibleMenuNumbers + 1" :key="n">
            {{ menus[n + visibleMenuNumbers - 1] }}
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
  </div>
</template>

<script setup lang="ts">
import { Category } from 'src/signatures';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  bus,
  getCategories,
  searchPost,
  getTOpPosts,
} from 'src/axios-requests';
import { useQuasar } from 'quasar';
import { menus } from 'src/shared/menus';

const router = useRouter();
const $q = useQuasar();
const showOthersMenu = ref(false);
const visibleMenuNumbers = computed(() => {
  return 5;
});

const emit = defineEmits(['close-sidebar-menu', 'toggle-login']);

const displayOthers = () => {
  showOthersMenu.value = !showOthersMenu.value;
};
const closeMenu = () => {
  emit('close-sidebar-menu');
};
const toggleLogin = () => {
  emit('toggle-login');
};

const goToCategory = (category: string) => {
  bus.emit('givePermissionToFetchData');
  router.push('/category/' + category);
};

const handleSubmit = () => {
  search.value = search.value ? search.value : ' ';
  searchPost(search.value, 0, 5).then(() => {
    $q.notify({
      message: 'Articles were found!',
      type: 'positive',
    });
  });
};

const search = ref('');
const categories = ref<Array<Category>>([]);
const topPosts = ref<Array<string>>([]);
onMounted(() => {
  getCategories().then((data) => {
    categories.value = data;
  });
  getTOpPosts().then((data) => {
    data.forEach((el) => topPosts.value.push(el.title));
  });
});

const toThePost = (title: string) => {
  router.push('/').then(() => {
    router.push('/article/' + title);
  });
};
</script>

<style scoped lang="scss">
.sidebar-menu {
  --font-size: 1rem;
  --spacing-x: 12px;
  --border-radius: 8px;
  background-color: var(--background-main);
  font-size: var(--font-size);
  color: var(--text-color);
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-width: max-content;
  height: 100dvh;
  box-shadow: 0 0 4px 4px var(--outline-main);
  position: relative;
  font-weight: bold;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  li {
    width: 100%;
    padding: var(--spacing-x);
    position: relative;
    display: flex;
    align-items: center;
    &:hover {
      background: linear-gradient(to right, #fcc04921 36%, #ffffff00 100%);
      &:after {
        content: '';
        border: 1px solid var(--secondary-color);
        position: absolute;
        left: 0;
        height: 100%;
      }
    }
  }
}
.account {
  --size: 96px;
  width: var(--size);
  height: var(--size);
  max-width: var(--size);
  max-height: var(--size);
  margin: calc(var(--spacing-x) * 2) calc(var(--spacing-x) * 4);
}
.close {
  position: absolute;
  right: 0;
}
.others {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .dropdown {
    // display: none;
    position: absolute;
    left: 100%;
    top: 0;
    background-color: var(--background-main);
    box-shadow: 0 0 4px 4px var(--outline-main);
    width: max-content;
  }
  .icon {
    --size: 20px;
    width: var(--size);
    height: var(--size);
    max-width: var(--size);
    max-height: var(--size);
    transform: rotate(-90deg);
  }
}
button {
  position: absolute;
  bottom: calc(var(--spacing-x) * 4);
  display: flex;
  align-items: center;
  gap: var(--spacing-x);
  background: var(--button-main);
  outline: none;
  color: var(--text-color);
  padding: calc(var(--spacing-x) / 2) var(--spacing-x);
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
</style>
