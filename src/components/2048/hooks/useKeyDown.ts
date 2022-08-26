import { ref, onMounted, onUnmounted } from 'vue';

interface KeyDownHandler {
  up: () => void;
  left: () => void;
  right: () => void;
  down: () => void;
}


function useKeyDown({ up, left, right, down }: KeyDownHandler) {
  const keyNowDown = ref(false);
  const keyDownTimer = ref(-1);

  function handlerKeyDownFn(e: KeyboardEvent) {

    if (keyNowDown.value) {
      console.log('无效按键')
      return;
    }

    keyNowDown.value = true;
    clearTimeout(keyDownTimer.value);

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

  function handlerKeyUpFn() {
    keyDownTimer.value = setTimeout(() => {
      keyNowDown.value = false;
    }, 200)
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
