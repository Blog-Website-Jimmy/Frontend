<template>
  <div class="my-card">
    <img :src="url + props.image" />

    <section class="details">
      <div class="title">{{ props.title }}</div>
      <div class="brief">
        {{ props.brief }}
      </div>
      <div class="author-date">
        <span>by {{ props.author }}</span>
        <span>23.08.2024</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'author', 'brief', 'image']);

const url = process.env.API;
</script>
<style scoped lang="scss">
.my-card {
  --font-size: 1.5rem;
  --border-raduis: var(--card-border-radius);
  --margin-value: 12px;
  position: relative;
  display: flex;
  width: var(--item-width);
  height: var(--item-height);
  color: var(--text-color);
  border-radius: var(--border-raduis);
  overflow: hidden;
  box-shadow: 0 0 4px 4px var(--outline-main);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      #003049 0%,
      #002f4985 60%,
      #ffffff00 97%
    );
    z-index: 2;
  }
  &:hover {
    border-radius: 0;
    box-shadow: 0 0 4px 4px var(--secondary-color);
    &::after {
      background: linear-gradient(
        to top,
        #003049 0%,
        #002f49c5 60%,
        #ffffff00 97%
      );
    }
  }
}
.title {
  font-size: calc(var(--font-size) + 4px);
  font-weight: 700;
  margin-bottom: var(--margin-value);
  color: var(--text-color);
}
.author-date {
  display: flex;
  justify-content: space-between;
}
.brief {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.details {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  padding: 20px 12px;
  font-size: var(--font-size);
  z-index: 3;
  width: var(--item-width);
  color: var(--text-color-2);
  width: 100%;
}
@media screen and (max-width: 1400px) {
  .my-card {
    --card-width: 25vw;
    --card-height: calc(var(--card-width) * 0.75);
    --font-size: 1rem;
    width: var(--card-width);
    height: var(--card-height);
  }
}
@media screen and (max-width: 1000px) {
  .my-card {
    --card-width: 35vw;
    --card-height: calc(var(--card-width) * 0.75);
    width: var(--card-width);
    height: var(--card-height);
  }
}
@media screen and (max-width: 700px) {
  .my-card {
    width: var(--item-width);
    height: var(--item-height);
  }
}
</style>
