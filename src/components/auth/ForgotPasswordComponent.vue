<template>
  <div class="login">
    <span class="icon close" @click="closeModal()">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 18L18 30M18 18L30 30M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
          stroke="#F3F3F3"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="icon account">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 36 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.775 26.15C10.05 25.175 11.475 24.4062 13.05 23.8438C14.625 23.2812 16.275 23 18 23C19.725 23 21.375 23.2812 22.95 23.8438C24.525 24.4062 25.95 25.175 27.225 26.15C28.1 25.125 28.7813 23.9625 29.2688 22.6625C29.7563 21.3625 30 19.975 30 18.5C30 15.175 28.8313 12.3438 26.4938 10.0063C24.1563 7.66875 21.325 6.5 18 6.5C14.675 6.5 11.8438 7.66875 9.50625 10.0063C7.16875 12.3438 6 15.175 6 18.5C6 19.975 6.24375 21.3625 6.73125 22.6625C7.21875 23.9625 7.9 25.125 8.775 26.15ZM18 20C16.525 20 15.2813 19.4938 14.2688 18.4813C13.2563 17.4688 12.75 16.225 12.75 14.75C12.75 13.275 13.2563 12.0313 14.2688 11.0188C15.2813 10.0063 16.525 9.5 18 9.5C19.475 9.5 20.7188 10.0063 21.7313 11.0188C22.7438 12.0313 23.25 13.275 23.25 14.75C23.25 16.225 22.7438 17.4688 21.7313 18.4813C20.7188 19.4938 19.475 20 18 20ZM18 33.5C15.925 33.5 13.975 33.1062 12.15 32.3187C10.325 31.5312 8.7375 30.4625 7.3875 29.1125C6.0375 27.7625 4.96875 26.175 4.18125 24.35C3.39375 22.525 3 20.575 3 18.5C3 16.425 3.39375 14.475 4.18125 12.65C4.96875 10.825 6.0375 9.2375 7.3875 7.8875C8.7375 6.5375 10.325 5.46875 12.15 4.68125C13.975 3.89375 15.925 3.5 18 3.5C20.075 3.5 22.025 3.89375 23.85 4.68125C25.675 5.46875 27.2625 6.5375 28.6125 7.8875C29.9625 9.2375 31.0312 10.825 31.8187 12.65C32.6062 14.475 33 16.425 33 18.5C33 20.575 32.6062 22.525 31.8187 24.35C31.0312 26.175 29.9625 27.7625 28.6125 29.1125C27.2625 30.4625 25.675 31.5312 23.85 32.3187C22.025 33.1062 20.075 33.5 18 33.5Z"
          fill="#FEF7FF"
        />
      </svg>
    </span>
    <div class="center">
      <span class="title">Forgot password </span>
      <input type="text" placeholder="Type mobile phone or email ... " />
      <div class="numbers">
        <input
          v-for="n in otpControls.length"
          :key="n"
          type="text"
          inputmode="numeric"
          pattern="\d*"
          maxlength="1"
          v-model="otp[n - 1]"
          @input="onInput($event, n)"
          @keydown="onKeyDown($event, n)"
        />
      </div>
    </div>
    <div class="bottom">
      <button v-if="timer == 60" @click="startTimer()">Get Code</button>
      <button v-else @click="switchToReset()">Confirm {{ timer }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onUnmounted } from 'vue';
const emit = defineEmits(['toggle-login', 'reset']);
const timer = ref(60);
let otp: string[] = ['', '', '', '', '', ''];
let otpControls = new Array(6);
let intervalId: any = null;

const closeModal = () => {
  resetTimer();
  emit('toggle-login');
};
const onInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9]/g, '');
  otp[index] = input.value;

  if (input.value && index < otpControls.length) {
    const nextInput = input.nextElementSibling as HTMLInputElement;
    nextInput?.focus();
  }
};

const onKeyDown = (event: KeyboardEvent, index: number) => {
  const input = event.target as HTMLInputElement;

  if (event.key === 'Backspace' && !input.value && index > 0) {
    const prevInput = input.previousElementSibling as HTMLInputElement;
    prevInput?.focus();
  }
};
const startTimer = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  timer.value = 59;

  intervalId = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      resetTimer();
    }
  }, 1000);
};
const resetTimer = () => {
  timer.value = 60;
  if (intervalId) clearInterval(intervalId);
  intervalId = null;
};
const switchToReset = () => {
  emit('reset', 'reset');
};
onUnmounted(() => {
  resetTimer();
});
</script>

<style scoped lang="scss">
.login {
  --font-size: 1.5rem;
  --pading-value: 12px;
  --item-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: calc(var(--pading-value) * 3);
  background-color: var(--background-main);
  max-width: 1000px;
  max-height: max-content;
  border: 1px solid var(--outline-main);
  border-radius: 24px;
  font-size: var(--font-size);
  font-weight: bold;
  padding: 64px 150px;
  position: relative;
}
.account {
  --size: calc(var(--item-size) * 10);
  width: var(--size);
  height: var(--size);
  max-width: var(--size);
  max-height: var(--size);
}
.close {
  --size: calc(var(--item-size) * 3);
  width: var(--size);
  height: var(--size);
  max-width: var(--size);
  max-height: var(--size);
  position: absolute;
  top: calc(var(--pading-value) * 2);
  right: calc(var(--pading-value) * 2);
  cursor: pointer;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: calc(var(--pading-value) * 3);
  color: var(--text-color);
  width: 100%;
  .numbers {
    display: flex;
    width: 100%;
    gap: calc(var(--pading-value) * 2);
    justify-content: space-between;
  }
  > input {
    width: 100%;
    outline: none;
    background-color: inherit;
    padding: calc(var(--pading-value) - 2px);
    border-radius: 12px;
    color: var(--text-color);
    &::placeholder {
      color: var(--text-color);
    }
    border: 1px solid var(--text-color);
    font-size: calc(var(--font-size) - 4px);
  }
  > .numbers input {
    width: 100%;
    max-width: calc(var(--item-size) * 7.5);
    height: calc(var(--item-size) * 12.5);
    outline: none;
    background-color: inherit;
    padding: calc(var(--pading-value) - 2px);
    border-radius: 12px;
    color: var(--text-color);
    font-size: calc(var(--font-size) * 4);
    border: 1px solid var(--text-color);
    text-align: center;
  }
}
.bottom {
  width: 100%;
  display: flex;
  text-align: center;
  button {
    width: 100%;
    color: var(--text-color);
    background-color: var(--button-main);
    padding: calc(var(--pading-value) - 2px);
    border-radius: var(--item-size);
  }
}
@media screen and (max-width: 1000px) {
  .login {
    --font-size: 1rem;
    --pading-value: 8px;
    --item-size: 8px;
    padding: 32px 75px;
    gap: calc(var(--pading-value) * 1);
    max-width: 400px;
  }
  .center {
    > .numbers input {
      width: 25px;
      height: 25px;
      border-radius: 1px;
      font-size: var(--font-size);
    }
    .title {
      font-size: calc(var(--font-size) + 5px);
    }
    input {
      font-size: var(--font-size);
    }
  }
}
</style>
