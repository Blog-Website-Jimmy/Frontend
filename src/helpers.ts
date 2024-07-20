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
  }, 5000);
};
export const copyCode = (event: Event) => {
  event.target.innerHTML = 'copied';
  let commandToCopy = event.target.parentNode.querySelector('code').textContent;
  commandToCopy = reformatCodeText(commandToCopy);

  copyToClipboard(commandToCopy)
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
  }, 5000);
};

const reformatCodeText = (code: string) => {
  let updated = code;
  const pointsToAddNewine = ['{', '}'];
  for (let i = 0; i < updated.length; i++) {
    if (
      i < updated.length - 1 &&
      ((updated.charAt(i) == '}' && updated.charAt(i + 1) == ';') ||
        (updated.charAt(i) == '{' && updated.charAt(i + 1) == '}'))
    ) {
      continue;
    }
    if (pointsToAddNewine.some((el) => el == updated.charAt(i))) {
      updated = updated.substring(0, i + 1) + '\n' + updated.substring(i + 1);
    }
  }
  return updated;
};
