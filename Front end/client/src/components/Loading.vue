<script lang="ts">
export default {
  name: 'LoadingHandler'
}
</script>

<template>
  <div class="fixed top-0 left-0 z-[2000] h-full w-full bg-white">
    <div class="grid place-content-center place-items-center min-h-[100vh]">
      <div class="custom-loader"></div>
      <div class="font-bold text-xl mt-5">Đang tải dữ liệu</div>
    </div>
  </div>
</template>

<style scoped>
.custom-loader {
  width: 50px;
  height: 50px;
  display: grid;
  border-radius: 50%;
  -webkit-mask: radial-gradient(farthest-side, #0000 40%, #000 41%);
  background:
    linear-gradient(0deg, #766df480 50%, #766df4ff 0) center/4px 100%,
    linear-gradient(90deg, #766df440 50%, #766df4bf 0) center/100% 4px;
  background-repeat: no-repeat;
  animation: s3 1s infinite steps(12);
}
.custom-loader::before,
.custom-loader::after {
  content: '';
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}
.custom-loader::after {
  opacity: 0.83;
  transform: rotate(60deg);
}

@keyframes s3 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
