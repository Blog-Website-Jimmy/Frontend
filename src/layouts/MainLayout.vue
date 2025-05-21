<template>
  <section class="main-layout">
    <header>
      <span class="logo"> <img src="Logo.png" alt="" /> </span>
      <ul>
        <li><span class="menu">Java</span></li>
        <li><span class="menu">Spring boot</span></li>
        <li><span class="menu">Linux</span></li>
        <li><span class="menu">JavaScript</span></li>
        <li><span class="menu">Algorithms</span></li>
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
            <li>Kotlin</li>
            <li>C++</li>
            <li>Desktop</li>
            <li>Mobile</li>
            <li>All</li>
          </ul>
        </li>
      </ul>
      <button>
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
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import SideBar from 'src/components/user/SideBar.vue';
import { useRouter, useRoute } from 'vue-router';
import FooterComponent from 'src/components/user/FooterComponent.vue';

const route = useRoute();
const router = useRouter();

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
</style>
