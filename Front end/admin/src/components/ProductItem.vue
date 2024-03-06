<template>
  <div
    class="bg-white shadow-md my-3 rounded-sm hover:translate-y-[-0.05rem] hover:shadow-lg duration-100 transition-transform overflow-hidden cursor-pointer"
  >
    <router-link
      :to="{
        name: 'product-detail',
        params: {
          id: product._id
        }
      }"
    >
      <div class="w-full pt-[100%] relative">
        <img
          :src="product.image"
          class="absolute top-0 left-0 w-full h-full object-cover"
          :alt="product.name"
          loading="lazy"
        />
      </div>
      <div class="p-2 overflow-hidden">
        <div class="min-h-[2rem] line-clamp-2 text-xs">
          {{ product.name }}
        </div>
        <div class="flex items-center mt-3">
          <div class="truncate max-w-[50%] line-through text-gray-500">
            <span class="text-xs">₫</span>
            <span>{{ priceBeforeDiscount }}</span>
          </div>
          <div class="text-shopeeOrange ml-1 truncate">
            <span class="text-xs">₫</span>
            <span>{{ price }}</span>
          </div>
        </div>
        <div class="flex items-center mt-3 justify-end">
          <ProductRatingVue :rating="product.rating" />
          <div class="ml-2 text-xs">
            <span>Đã bán</span>
            <span class="ml-1">{{ sold }}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import type { Product } from '@/types/product'
import { formatCurrency, formatNumberToSocialStyle } from '@/utils/utils'
import { defineComponent, computed } from 'vue'
import ProductRatingVue from './ProductRating.vue'
export default defineComponent({
  name: 'ProductItem',
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  components: {
    ProductRatingVue
  },
  setup(props) {
    // Handle logic here --> use composition API (reactive, ref, computed, watch, lifecycle hooks)
    const price = computed(() => formatCurrency(props.product.price))
    const priceBeforeDiscount = computed(() => formatCurrency(props.product.price_before_discount))
    const sold = computed(() => formatNumberToSocialStyle(props.product.sold))
    return {
      price,
      priceBeforeDiscount,
      sold
    }
  }
})
</script>
