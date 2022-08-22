import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

function useResize() {
  const innerWidth = ref(window.innerWidth);

  const handlerResize = () => {
    nextTick(() => {
      innerWidth.value = window.innerWidth;
    });
  };

  onMounted(() => {
    window.addEventListener("resize", handlerResize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handlerResize);
  })

  return innerWidth;
}

export default useResize;
