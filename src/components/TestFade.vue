<template>
  <div class="test-fade">
    <div class="btns">
      <button @click="flag = !flag">测试: {{ flag }}</button>
      <button @click="direction = 'up'">上</button>
      <button @click="direction = 'down'">下</button>
      <button @click="direction = 'left'">左</button>
      <button @click="direction = 'right'">右</button>
    </div>
    <div class="wrapper">
      <Transition :name="transitionName">
        <div class="box" v-if="flag">box</div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const flag = ref(false);
const direction = ref<'up' | 'left' | 'right' | 'down'>("up");

const transitionName = computed(() => {
  return `fade-${direction.value}`;
})

const list = ref([
  {
    id: 1,
    x: 0,
    y: 0,
  },
  {
    id: 2,
    x: 110,
    y: 0,
  },
  // {
  //   id: 3,
  //   x: 220,
  //   y: 0
  // }
]);


</script>

<style scoped lang="scss">
.test-fade {
  margin-top: 100px;
  .wrapper {
    display: flex;
    position: relative;
    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
      border-radius: 5px;
      background-color: pink;
    }
    // active 
    .fade-up-enter-active {
      transition: all .3s;
    }

    // up
    .fade-up-enter-from {
      top: 0;
    }
    .fade-up-enter-to {
      top: 100px;
    }
    
    
  }
}
</style>
