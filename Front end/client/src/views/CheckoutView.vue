<template>
  <div v-if="isLoadingOrder">
    <Loading />
  </div>
  <div v-else>
    <div v-if="!isLoading && !productLoading && productLocal && purchaseLocal" class="bg-gray-100">
      <div class="text-4xl font-medium p-5 bg-white text-shopeeOrange">
        <div class="max-w-screen-xl mx-auto flex items-center justify-start gap-5">
          <div class="w-0.5 h-10 bg-shopeeOrange"></div>
          <span class="self-end">Thanh toán</span>
        </div>
      </div>
      <div class="max-w-screen-xl mx-auto p-6">
        <!-- user address information -->
        <div class="bg-white">
          <div
            class="flex items-center border-t-4 border-t-orange-600 text-2xl text-shopeeOrange p-5"
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span class="ms-3">Địa chỉ nhận hàng</span>
          </div>
          <div class="px-5 py-2 flex items-center">
            <span class="font-bold text-xl">{{ user.name }}</span>
            <span class="text-gray-900 text-xl font-bold ms-3">(+84) {{ user.phone }}</span>
            <span class="text-gray-900 text-base ms-5">{{ user.address }}</span>
            <div
              class="ms-10 py-2 px-5 border border-shopeeOrange rounded-sm text-shopeeOrange bg-white"
            >
              Mặc định
            </div>
          </div>
        </div>

        <!-- product information -->
        <div class="bg-white shadow p-5 mt-5">
          <div class="grid grid-cols-12">
            <div class="col-span-6">Sản phẩm</div>
            <div class="col-span-2 text-center">Đơn giá</div>
            <div class="col-span-2 text-center">Số lượng</div>
            <div class="col-span-2 text-end">Thành tiền</div>
          </div>
          <div class="grid grid-cols-12 items-center py-5">
            <div class="col-span-6 flex items-center">
              <img :src="productLocal.image" class="w-20 h-20 object-cover" alt="" />
              <div class="ms-5 truncate">{{ productLocal.name }}</div>
            </div>
            <div class="col-span-2 text-center">
              ₫{{ formatCurrency(productLocal.price_before_discount) }}
            </div>
            <div class="col-span-2 text-center">{{ purchaseLocal.buy_count }}</div>
            <div class="col-span-2 text-end">₫{{ formatCurrency(purchaseLocal.price) }}</div>
          </div>
        </div>
        <div class="p-10 bg-blue-50 text-right border-2 border-dashed">
          <div class="text-teal-700 text-xl">
            Đơn vị vận chuyển:
            <span class="text-gray-900 italic">Nhanh(Nhận hàng vào 24 Th11 - 27 Th11)</span>
          </div>
          <div class="text-teal-700 text-xl">
            Phí vận chuyển:
            <p class="text-gray-500">₫51.100</p>
          </div>
        </div>
        <!-- payment -->
        <div class="bg-white shadow mt-5 py-5">
          <div
            class="flex items-center border-t-4 border-t-orange-600 text-2xl text-shopeeOrange p-5"
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
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span class="ms-3">Phương thức thanh toán</span>
          </div>
          <hr />
          <div class="px-5 py-2 grid items-center grid-cols-2 gap-6">
            <!-- payment options -->
            <div class="self-start">
              <label for="Khi nhận hàng" class="flex my-5">
                <input
                  type="radio"
                  value="Khi nhận hàng"
                  v-model="payment"
                  id="Khi nhận hàng"
                  name="payment_method"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ms-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>
                <div class="ms-2">Thanh toán khi nhận hàng</div>
              </label>
              <label for="Paypal" class="flex my-5">
                <input
                  type="radio"
                  value="Paypal"
                  v-model="payment"
                  id="Paypal"
                  name="payment_method"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ms-3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>

                <div class="ms-2">Thanh toán trực tuyển qua Paypal</div>
              </label>
            </div>
            <div class="self-start space-y-4 justify-self-end md:w-1/2">
              <div class="flex justify-between">
                <h1 class="text-gray-500">Tổng tiền hàng</h1>
                <div>₫{{ formatCurrency(purchaseLocal.price) }}</div>
              </div>
              <div class="flex justify-between">
                <h1 class="text-gray-500">Phí vận chuyển</h1>
                <div>₫51.100</div>
              </div>
              <div class="flex justify-between">
                <h1 class="text-gray-500">Tổng thanh toán:</h1>
                <div class="text-3xl text-shopeeOrange font-medium">
                  ₫{{ formatCurrency(purchaseLocal.price + 51100) }}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div class="px-5 py-2 flex justify-end">
            <button
              v-if="!isLoadingOrder && payment === 'Khi nhận hàng'"
              @click="handleCheckout"
              class="text-white bg-shopeeOrange/95 hover:bg-shopeeOrange focus:ring-4 focus:outline-none focus:ring-shopeebg-shopeeOrange font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-shopeeOrange dark:hover:bg-shopeeOrange dark:focus:ring-shopeebg-shopeeOrange inline-flex items-center"
            >
              Đặt hàng
            </button>
            <div v-else>
              <TestPayMentPayPalAPI
                @onSuccessPaymentPaypal="handleCheckOutOnline"
                :amount="convertVNDtoUSD(purchaseLocal.price + 51100)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      role="status"
      class="max-w-full my-5 p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div class="flex items-center justify-between">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <div class="flex items-center justify-between pt-4">
        <div>
          <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div
    v-if="showToastOrder"
    id="toast-top-right"
    class="fixed flex items-center w-full max-w-xs space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow z-[3000] animate__animated animate__bounceIn top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
    role="alert"
  >
    <div
      id="toast-default"
      class="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"
      >
        <img src="../../public/img/order-success.png" alt="" />
        <span class="sr-only">Fire icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">Đặt hàng thành công!</div>
      <button
        type="button"
        @click="onClickCloseToastOrder"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-default"
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
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/auth'
import { defineComponent, ref, watchEffect, onUnmounted } from 'vue'
import router from '@/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import http from '@/utils/http'
import type { ResponseSuccess } from '@/types/auth'
import type { PurchaseType } from '@/types/purchase'
import type { Product } from '@/types/product'
import { formatCurrency } from '@/utils/utils'
import { toast } from 'vue3-toastify'
import Loading from '@/components/Loading.vue'
import TestPayMentPayPalAPI from '@/components/TestPayMentPayPalAPI.vue'
import { convertVNDtoUSD } from '@/utils/utils'
export default defineComponent({
  name: 'CheckoutView',
  components: {
    Loading,
    TestPayMentPayPalAPI
  },
  setup() {
    const { user } = useAuthStore()
    // get query params
    const queryClient = useQueryClient()
    const showToastOrder = ref(false)
    const onClickCloseToastOrder = () => {
      showToastOrder.value = false
    }
    const purchaseLocal = ref<PurchaseType>()
    const productLocal = ref<Product>()
    const payment = ref('Khi nhận hàng')
    const { purchase_id } = router.currentRoute.value.query
    const { data, isLoading } = useQuery({
      queryKey: ['purchase', purchase_id],
      queryFn: () =>
        http.get('/purchases/' + purchase_id).then((res) => {
          return res.data as ResponseSuccess<PurchaseType>
        })
    })
    const { data: productData, isLoading: productLoading } = useQuery({
      queryKey: ['product-checkout', data.value?.data?.product_id],
      queryFn: () =>
        http
          .get('/products/' + data.value?.data?.product_id)
          .then((res) => res.data as ResponseSuccess<Product>)
    })

    // Use watchEffect instead of watch for immediate execution
    watchEffect(() => {
      purchaseLocal.value = data.value?.data || undefined
      productLocal.value = productData.value?.data || undefined
    })
    // Use onUnmounted to cleanup
    onUnmounted(() => {
      purchaseLocal.value = undefined
      productLocal.value = undefined
    })
    // handle checkout button click
    const orderMutation = useMutation({
      mutationFn: ({
        product_id,
        buy_count,
        payment_method,
        total_price
      }: {
        product_id: string
        buy_count: number
        payment_method: string
        total_price: number
      }) => {
        return http.post('/orders', { product_id, buy_count, payment_method, total_price })
      }
    })
    const handleCheckout = () => {
      // check out order with payment on delivery
      if (purchaseLocal.value) {
        orderMutation.mutate(
          {
            product_id: purchaseLocal.value.product_id,
            buy_count: purchaseLocal.value.buy_count,
            payment_method: payment.value,
            total_price: purchaseLocal.value.price + 51100
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries(['purchases'])
              showToastOrder.value = true
              setTimeout(() => {
                router.push('/purchases')
              }, 1000)
              setTimeout(() => {
                showToastOrder.value = false
              }, 4000)
            },
            onError: () => {
              toast.error('Đặt hàng thất bại')
            }
          }
        )
      }
    }
    const handleCheckOutOnline = (value: boolean) => {
      if (value && purchaseLocal.value) {
        orderMutation.mutate(
          {
            product_id: purchaseLocal.value.product_id,
            buy_count: purchaseLocal.value.buy_count,
            payment_method: payment.value,
            total_price: purchaseLocal.value.price + 51100
          },
          {
            onSuccess: async () => {
              await queryClient.invalidateQueries(['purchases'])
              showToastOrder.value = true
              setTimeout(() => {
                router.push('/purchases')
              }, 1000)
              setTimeout(() => {
                showToastOrder.value = false
              }, 4000)
            },
            onError: () => {
              toast.error('Đặt hàng thất bại')
            }
          }
        )
      }
    }

    return {
      user,
      purchaseLocal,
      productLocal,
      payment,
      formatCurrency,
      isLoading,
      handleCheckout,
      productLoading,
      isLoadingOrder: orderMutation.isLoading,
      showToastOrder,
      onClickCloseToastOrder,
      convertVNDtoUSD,
      handleCheckOutOnline
    }
  }
})
</script>
