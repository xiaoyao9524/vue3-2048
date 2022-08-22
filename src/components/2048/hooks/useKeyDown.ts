import { ref, onMounted, onUnmounted } from 'vue';

interface KeyDownHandler {
  up: () => any;
  left: () => any;
  right: () => any;
  down: () => any;
}

function useKeyDown({ up, left, right, down }: KeyDownHandler) {
  const keyNowDown = ref(false);

  function handlerKeyDownFn(e: KeyboardEvent) {
    console.log('keyNowDown: ', keyNowDown.value);
    
    if (keyNowDown.value) {
      return;
    }
    keyNowDown.value = true;
    switch (e.code) {
      case 'ArrowUp':
        up();
        break;
      case 'ArrowLeft':
        left();
        break;
      case 'ArrowRight':
        right();
        break;
      case 'ArrowDown':
        down();
        break;
    }
  }

  function handlerKeyUpFn () {
    keyNowDown.value = false;
  }

  onMounted(() => {
    document.addEventListener('keydown', handlerKeyDownFn);
    document.addEventListener('keyup', handlerKeyUpFn);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handlerKeyDownFn);
    document.removeEventListener('keyup', handlerKeyUpFn);
  });
}

export default useKeyDown;
