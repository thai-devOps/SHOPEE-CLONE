<template>
  <div
    id="toast-top-right"
    v-if="showToast"
    class="fixed flex animate__animated animate__bounceIn items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    role="alert"
  >
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
    >
      <img src="../../public/img/add-to-cart.png" alt="" />
      <span class="sr-only">Check icon</span>
    </div>
    <div class="ms-3 text-base font-normal">Đã thêm vào giỏ hàng.</div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
      data-dismiss-target="#toast-success"
      aria-label="Close"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
  <div class="bg-gray-200 py-6">
    <div class="py-4">
      <div class="max-w-screen-lg mx-auto">
        <div v-if="!isLoading && product" class="grid grid-cols-12 gap-9 bg-white py-4 px-4">
          <div class="col-span-5">
            <div class="relative w-full pt-[100%]">
              <img
                :src="product.image"
                class="absolute top-0 left-0 shadow w-full h-full object-cover"
              />
            </div>
            <div class="relative mt-4 grid grid-cols-5 gap-1">
              <button
                class="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  class="w-5 h-5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <div v-for="(img, index) in filterImages" :key="img">
                <div class="relative w-full pt-[100%]">
                  <img
                    :src="img"
                    class="absolute top-0 cursor-pointer left-0 shadow w-full h-full object-cover"
                  />
                  <div
                    class="absolute inset-0 border-2 border-shopeeOrange rounded-md"
                    v-if="index === 0"
                  ></div>
                </div>
              </div>
              <button
                class="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="col-span-7">
            <h1 class="text-xl font-medium capitalize">{{ product.name }}</h1>
            <div class="mt-8 flex items-center">
              <div class="flex items-center">
                <span class="mr-1 border-b border-b-shopeeOrange text-shopeeOrange">{{
                  product?.rating
                }}</span>
                <ProductRatingVue
                  :rating="product?.rating || 5"
                  :active-class="'w-4 h-4 fill-shopeeOrange'"
                />
              </div>
              <span class="mx-3">|</span>
              <div class="flex items-center">
                <span class="text-gray-500"
                  >{{ formatNumberToSocialStyle(product.sold) }} Đã bán</span
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-gray-600 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex mt-8 bg-gray-50 px-5 py-4 items-center">
              <span class="text-gray-500 line-through"
                >₫ {{ formatCurrency(product.price_before_discount) }}</span
              >
              <div class="text-3xl ml-3 font-medium text-shopeeOrange">
                ₫{{ formatCurrency(product.price) }}
              </div>
              <div class="text-white ml-5 rounded-md py-2.5 px-2 bg-shopeeOrange">
                {{ rateSalePrice(product.price_before_discount, product.price) }}% Giảm giá
              </div>
            </div>
            <div class="flex mt-10 items-center">
              <div class="capitalize text-gray-600">Số Lượng</div>
              <div class="flex items-center ml-10">
                <button
                  @click="decreaseQuantity"
                  class="flex w-8 h-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  :max="product?.quantity"
                  class="w-12 h-8 text-center border border-l-0 border-gray-300 text-gray-600"
                  v-model="quantity"
                />
                <button
                  @click="increaseQuantity"
                  class="flex w-8 h-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600 border-l-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <span class="text-gray-500 ml-4">{{ product?.quantity }} sản phẩm sẵn có</span>
            </div>
            <div class="flex items-center mt-16 flex-wrap">
              <button
                @click="handleAddToCart"
                class="flex items-center bg-[#FFEEE8] border-2 transition-transform delay-75 rounded-sm border-shopeeOrange justify-center gap-3 flex-wap text-shopeeOrange p-2.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span>Thêm vào giỏ hàng</span>
              </button>
              <button
                @click="handleCheckout"
                class="flex items-center ml-5 bg-shopeeOrange text-white transition-transform delay-75 rounded-smjustify-center flex-wap px-10 py-3 hover:bg-shopeeOrange/75"
              >
                <span>Mua ngay</span>
              </button>
            </div>
          </div>
        </div>
        <div
          v-else
          role="status"
          class="space-y-8 bg-white p-20 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
        >
          <div
            class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700"
          >
            <svg
              class="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
              />
            </svg>
          </div>
          <div class="w-full">
            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ProductRatingVue from '@/components/ProductRating.vue'
import router from '@/router'
import type { ResponseSuccess } from '@/types/auth'
import type { Product } from '@/types/product'
import type { PurchaseType } from '@/types/purchase'
import http from '@/utils/http'
import { formatCurrency, formatNumberToSocialStyle, rateSalePrice } from '@/utils/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { defineComponent, watch, ref, onMounted, computed } from 'vue'

export default defineComponent({
  name: 'ProductDetailView',
  components: { ProductRatingVue },
  setup() {
    const id = router.currentRoute.value.params.id
    const quantity = ref(1)
    const product = ref<Product>()
    const { data, isLoading } = useQuery({
      queryKey: ['produc-detail', id],
      queryFn: () =>
        http.get('/products/' + id).then((res) => res.data as ResponseSuccess<Product>),
      enabled: !!id
    })
    const addToCartMutation = useMutation({
      mutationFn: ({ product_id, buy_count }: { product_id: string; buy_count: number }) =>
        http.post('/purchase/add-to-cart', { product_id, buy_count })
    })
    watch(data, () => {
      product.value = data.value?.data
    })
    onMounted(() => {
      if (!id) {
        router.push('/products')
      }
      product.value = data.value?.data
    })
    const filterImages = computed(() => {
      return product.value?.images.slice(0, 5)
    })
    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--
      }
    }
    const increaseQuantity = () => {
      const productQuantity = product.value?.quantity || 0
      if (quantity.value < productQuantity) {
        quantity.value++
      }
    }
    const showToast = ref(false)
    const queryClient = useQueryClient()
    const handleAddToCart = () => {
      addToCartMutation.mutate(
        {
          product_id: id as string,
          buy_count: quantity.value
        },
        {
          onSuccess: async () => {
            showToast.value = true
            await queryClient.invalidateQueries(['cart'])
            setTimeout(() => {
              showToast.value = false
            }, 3000)
          },
          onError: () => {
            alert('Thêm vào giỏ hàng thất bại')
          }
        }
      )
    }
    const handleCheckout = async () => {
      const result = await http
        .post('/purchase/add-to-cart', {
          product_id: id as string,
          buy_count: quantity.value
        })
        .then((res) => {
          return res.data as ResponseSuccess<PurchaseType>
        })
      router.push({
        name: 'checkout',
        query: {
          purchase_id: result.data._id
        }
      })
    }

    return {
      product,
      filterImages,
      quantity,
      decreaseQuantity,
      increaseQuantity,
      isLoading,
      handleAddToCart,
      showToast,
      formatCurrency,
      formatNumberToSocialStyle,
      rateSalePrice,
      handleCheckout
    }
  }
})
</script>

<style>
/* Hide the number input spinner arrows */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield; /* Firefox */
  appearance: textfield; /* Standard */
}
</style>
