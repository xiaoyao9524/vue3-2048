<template>
  <Transition name="fade">
    <div class="game-over" v-show="visible">
      <div class="message">游戏结束!</div>
      <div class="operation-row">
        <button class="try-again-btn" @click="tryAgain">再试一次</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose } from "vue";

const emit = defineEmits<{
  (e: "tryAgain"): void;
}>();

const visible = ref(false);

const open = () => {
  visible.value = true;
};

const tryAgain = () => {
  visible.value = false;
  emit("tryAgain");
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.game-over {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(238, 228, 218, 0.73);
  .message {
    /* flex: 1; */
    width: 100%;
    font-size: 70px;
    font-weight: bold;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #776e65;
    font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  }
  .operation-row {
    margin-top: 30px;
    .try-again-btn {
      padding: 0 20px;
      /* flex:1; */
      width: 100%;
      text-decoration: none;
      color: #f9f6f2;
      height: 40px;
      line-height: 42px;
      border: none;
      background: #8f7a66;
      border-radius: 3px;
      cursor: pointer;
    }
  }
}

.fade-enter-active{
  transition: .6s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
</style>
