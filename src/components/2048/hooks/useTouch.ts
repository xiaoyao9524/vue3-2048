import { reactive } from 'vue';
import type {
  GameDirection
} from '../types/gameType';


interface TouchHandler {
  up: () => void;
  left: () => void;
  right: () => void;
  down: () => void;
}

function useTouch(touchHandler: TouchHandler) {
  const {
    up,
    down,
    left,
    right
  } = touchHandler;

  const startPosition = reactive({
    x: 0,
    y: 0
  })

  const endPosition = reactive({
    x: 0,
    y: 0
  })

  const handlerTouchStart = (e: TouchEvent) => {
    const {
      clientX,
      clientY
    } = e.touches[0];

    startPosition.x = clientX;
    startPosition.y = clientY;
  }

  const handlerTouchMove = (e: TouchEvent) => {
    const {
      clientX,
      clientY
    } = e.touches[0];

    endPosition.x = clientX;
    endPosition.y = clientY;
  }

  const handlerTouchEnd = () => {
    const startX = startPosition.x;
    const startY = startPosition.y;

    const endX = endPosition.x;
    const endY = endPosition.y;

    console.log(startX, startY, endX, endY)

    if ([startX, startY, endX, endY].includes(0)) {
      return
    }

    const moveX = endX - startX;
    const moveY = endY - startY;

    let direction: GameDirection | null = null;

    if (Math.abs(moveX) >= Math.abs(moveY)) {
      // 判断为横向移动
      direction = startX >= endX ? 'left' : 'right';
    } else {
      // 判断为纵向移动
      direction = startY >= endY ? 'up' : 'down';
    }

    console.log('direction: ', direction)
    switch (direction) {
      case 'up':
        up();
        break;
      case 'down':
        down();
        break;
      case 'left':
        left();
        break;
      case 'right':
        right();
        break;
    }

    startPosition.x = 0;
    startPosition.y = 0;

    endPosition.x = 0;
    endPosition.y = 0;
  }

  // el.addEventListener('touchstart', handlerTouchStart);
  // el.addEventListener('touchmove', handlerTouchMove);
  // document.addEventListener('touchend', handlerTouchEnd);

  // onUnmounted(() => {
  //   el.removeEventListener('touchstart', handlerTouchStart);
  //   el.addEventListener('touchmove', handlerTouchMove);
  //   document.removeEventListener('touchend', handlerTouchEnd);
  // });

  return {
    handlerTouchStart,
    handlerTouchMove,
    handlerTouchEnd
  }
}

export default useTouch;
