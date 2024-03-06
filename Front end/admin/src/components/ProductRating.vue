<template>
  <div class="flex items-center">
    <div class="relative" v-for="index in 5" :key="index">
      <div
        class="absolute top-0 left-0 h-full overflow-hidden"
        :style="{ width: handleWidthStar(index).value }"
      >
        <svg
          enable-background="new 0 0 15 15"
          viewBox="0 0 15 15"
          x="0"
          y="0"
          class="w-4 h-4 fill-yellow-300"
        >
          <polygon
            points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
          ></polygon>
        </svg>
      </div>
      <svg
        enable-background="new 0 0 15 15"
        viewBox="0 0 15 15"
        x="0"
        y="0"
        class="w-4 h-4 fill-current text-gray-300"
      >
        <polygon
          points="7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
        ></polygon>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductRating',
  props: {
    rating: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const handleWidthStar = (order: number) =>
      computed(() => {
        if (props.rating >= order) {
          return '100%'
        }
        if (props.rating < order && props.rating > order - 1) {
          return `${(props.rating - (order - 1)) * 100}%`
        }
        return '0%'
      }) // 0% 100% 100% 100% 100%
    return {
      handleWidthStar
    }
  }
})
</script>
