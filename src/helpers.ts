import { copyToClipboard, Notify } from 'quasar';
import { computed } from 'vue';

export const getToken = () => {
  return localStorage.getItem('token')?.toString();
};

export const shortenPath = (path: string) => {
  return computed(() => {
    const array = path.split('/');
    return array[array.length - 1];
  });
};
export const copyTextToClipboard = (text: string) => {
  copyToClipboard(text);
  Notify.create({
    message: 'Text was copied',
    color: 'positive',
  });
};

export const copytext = (event: Event) => {
  event.target.innerHTML = 'copied';
  const textToCopy =
    event.target.parentNode.querySelector('.content').textContent;

  copyToClipboard(textToCopy)
    .then(() => {
      Notify.create({
        message: 'Text was copied',
        color: 'positive',
      });
    })
    .catch(() => {
      $q.notify({
        message: 'Failed to copy text',
        type: 'negative',
      });
    });
  setTimeout(() => {
    event.target.innerHTML = 'copy';
  }, 2000);
};
export const copyCode = (event: Event) => {
  event.target.innerHTML = 'copied';
  const commandToCopy =
    event.target.parentNode.querySelector('pre.raw-code code').textContent;

  let copiedCodeToText = commandToCopy;
  copiedCodeToText = copiedCodeToText.replace(/\u00A0/g, ' ');

  copyToClipboard(copiedCodeToText)
    .then(() => {
      Notify.create({
        message: 'Text was copied',
        color: 'positive',
      });
    })
    .catch(() => {
      $q.notify({
        message: 'Failed to copy text',
        type: 'negative',
      });
    });
  setTimeout(() => {
    event.target.innerHTML = 'copy';
  }, 2000);
};
