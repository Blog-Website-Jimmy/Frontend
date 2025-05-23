<template>
  <footer>
    <section>This website was created by Jimmy @home</section>
    <section>
      <ul>
        <li>Ask Question</li>
        <li>Portfolio</li>
        <li>Linkedin</li>
        <li>Jobs</li>
      </ul>
    </section>
    <section>
      <div class="subscribe">
        <input type="email" placeholder="example@gmail.com" />
        <button>subscribe</button>
      </div>
      <button>
        <span class="icon diamond">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 25 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.25 0C19.5557 0 19.8421 0.13962 20.0303 0.3746L20.1048 0.48102L24.3548 7.481C24.5556 7.8118 24.5459 8.2249 24.3395 8.5435L24.2634 8.6459L13.2634 21.6459C12.8906 22.0865 12.2317 22.1159 11.8207 21.7341L11.7366 21.6459L0.736622 8.6459C0.486632 8.3505 0.431822 7.941 0.586052 7.5941L0.645222 7.481L4.89522 0.48102C5.05388 0.21969 5.32182 0.04741 5.6204 0.00841999L5.75001 0H19.25ZM16.015 9H8.984L12.499 17.672L16.015 9ZM21.344 9H18.173L15.256 16.195L21.344 9ZM6.826 9H3.655L9.742 16.193L6.826 9ZM8.174 2H6.31101L3.275 7H6.745L8.174 2ZM14.746 2H10.253L8.824 7H16.175L14.746 2ZM18.688 2H16.825L18.254 7H21.724L18.688 2Z"
              fill="#FAFAFA"
            />
          </svg>
        </span>
        Get Premuim
      </button>
    </section>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
footer {
  width: 100%;
  --font-size: 1.25rem;
  --padding-value: 8px;
  --border-radius: 12px;
  --margin-value: 12px;
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size);
  font-weight: bold;
  color: var(--text-color);
  padding-inline: var(--padding-inline);
  max-width: var(--max-width-of-screen);
}
section {
  width: var(--item-width);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  input {
    background-color: inherit;
    outline: none;
    border: 1px solid var(--button-main);
    border-radius: var(--border-radius);
    padding: var(--padding-value);
    color: var(--text-color);
    &::placeholder {
      color: var(--text-color);
    }
  }
  button {
    padding: var(--padding-value);
    border-radius: var(--border-radius);
    background-color: var(--button-main);
    color: var(--text-color);
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    box-sizing: border-box;
  }
}
.diamond {
  --size: 24px;
  width: var(--size);
  height: var(--size);
  max-width: var(--size);
  max-height: var(--size);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    padding-bottom: 10px;
    position: relative;
  }
  li:hover {
    color: var(--secondary-color);
    cursor: pointer;
    &::after {
      content: '';
      display: block;
      width: 50%;
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: 1px solid var(--secondary-color);
    }
  }
}
.subscribe {
  display: flex;
  gap: 10px;
  margin-bottom: var(--margin-value);
}
</style>
