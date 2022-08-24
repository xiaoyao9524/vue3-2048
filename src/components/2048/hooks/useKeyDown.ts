import { ref, onMounted, onUnmounted } from 'vue';

interface KeyDownHandler {
  up: () => void;
  left: () => void;
  right: () => void;
  down: () => void;
}

function useKeyDown({ up, left, right, down }: KeyDownHandler) {
  const keyNowDown = ref(false);

  function handlerKeyDownFn(e: KeyboardEvent) {
    
    if (keyNowDown.value) {
      return;
    }
    keyNowDown.value = true;
    switch (e.code) {
      case 'ArrowUp':
        up();
        e.preventDefault();
        break;
      case 'ArrowLeft':
        left();
        e.preventDefault();
        break;
      case 'ArrowRight':
        right();
        e.preventDefault();
        break;
      case 'ArrowDown':
        down();
        e.preventDefault();
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
