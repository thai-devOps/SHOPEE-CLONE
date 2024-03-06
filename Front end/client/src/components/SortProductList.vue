<template>
  <div class="bg-gray-300/40 py-4 px-2 rounded-md">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center flex-wrap gap-2">
        <div class="text-gray-600">Sắp xếp theo</div>
        <button
          @click="onSortByClick(sortProductBy.view)"
          :class="{
            'bg-shopeeOrange/90 rounded-md py-2 px-3 text-white': isActiveSortBy(
              sortProductBy.view
            ),
            'hover:bg-white rounded-md py-2 px-3 hover:text-black bg-white text-gray-900':
              !isActiveSortBy(sortProductBy.view)
          }"
        >
          <span>Phổ Biến</span>
        </button>
        <button
          @click="onSortByClick(sortProductBy.createdAt)"
          :class="{
            'bg-shopeeOrange/90 rounded-md py-2 px-3 text-white': isActiveSortBy(
              sortProductBy.createdAt
            ),
            'hover:bg-white rounded-md py-2 px-3 hover:text-black bg-white text-gray-900':
              !isActiveSortBy(sortProductBy.createdAt)
          }"
        >
          <span>Mới nhất</span>
        </button>
        <button
          @click="onSortByClick(sortProductBy.sold)"
          :class="{
            'bg-shopeeOrange/90 rounded-md py-2 px-3 text-white': isActiveSortBy(
              sortProductBy.sold
            ),
            'hover:bg-white rounded-md py-2 px-3 hover:text-black bg-white text-gray-900':
              !isActiveSortBy(sortProductBy.sold)
          }"
        >
          <span>Bán chạy</span>
        </button>
        <div>
          <select
            :class="{
              'bg-shopeeOrange/90 text-white border border-gray-300 rounded-md px-2 py-2.5 focus:outline-none focus:ring-2':
                isActiveSortBy(sortProductBy.price),
              'border border-gray-300 rounded-md px-2 py-2.5 focus:outline-none focus:ring-2 focus:ring-shopeeOrange/90 cursor-pointer text-gray-900':
                !isActiveSortBy(sortProductBy.price)
            }"
            v-model="selectedValue"
          >
            <option value="" disabled>Giá</option>
            <option :value="orderProduct.asc">Giá: Thấp đến cao</option>
            <option :value="orderProduct.desc">Giá: Cao đến thấp</option>
          </select>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <div>
          <span class="text-shopeeOrange">{{ currentPage }}</span>
          <span>/</span>
          <span>{{ pageSize }}</span>
        </div>
        <div>
          <router-link
            v-if="currentPage > 1"
            :to="{
              name: 'home-page',
              query: {
                ...queryParams,
                page: currentPage - 1
              }
            }"
            class="border border-r-2"
          >
            <button class="py-2 px-2 bg-gray-100 hover:bg-gray-50 rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </router-link>
          <span v-else class="border border-r-2">
            <button class="py-2 px-2 bg-gray-100 cursor-default rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </span>
          <router-link
            v-if="currentPage < pageSize"
            :to="{
              name: 'home-page',
              query: {
                ...queryParams,
                page: currentPage + 1
              }
            }"
          >
            <button class="py-2 px-2 bg-gray-100 hover:bg-gray-50 rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </router-link>
          <span v-else>
            <button class="py-2 px-2 bg-gray-100 cursor-default rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-3 h-3"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { sortProductBy, orderProduct } from '@/constants/product'
import type { ProductListQuery } from '@/types/product'
import { omit } from 'lodash'

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    queryParams: {
      type: Object as () => ProductListQuery,
      required: true
    }
  },
  setup(props, { emit }) {
    const queryParamSort = ref(props.queryParams)
    const selectedValue = ref(queryParamSort.value.order || '')
    watch(
      () => props.queryParams,
      (newQueryParams) => {
        queryParamSort.value = newQueryParams
      }
    )
    onMounted(() => {
      queryParamSort.value = props.queryParams
    })
    const isActiveSortBy = (valueSortBy: Exclude<ProductListQuery['sort_by'], undefined>) => {
      if (!queryParamSort.value.sort_by) return sortProductBy.view === valueSortBy
      return queryParamSort.value.sort_by === valueSortBy
    }

    const sendForParentHandleSort = (
      sortByValue: Exclude<ProductListQuery['sort_by'], undefined>
    ) => {
      // send new query params to parent component
      const newQueryParams = {
        ...omit(props.queryParams, ['order']),
        sort_by: sortByValue
      }
      emit('handleSort', newQueryParams)
    }
    const handlePriceOrder = (value: Exclude<ProductListQuery['order'], undefined>) => {
      const newQueryParams = {
        ...props.queryParams,
        sort_by: sortProductBy.price,
        order: value
      }
      emit('handleSort', newQueryParams)
    }
    watch(selectedValue, () => {
      if (selectedValue.value) {
        handlePriceOrder(selectedValue.value as Exclude<ProductListQuery['order'], undefined>)
      }
    })
    const onSortByClick = (sortByValue: Exclude<ProductListQuery['sort_by'], undefined>) => {
      if (!isActiveSortBy(sortByValue)) {
        sendForParentHandleSort(sortByValue)
      }
    }
    return {
      isActiveSortBy,
      sortProductBy,
      onSortByClick,
      queryParamSort,
      selectedValue,
      handlePriceOrder,
      orderProduct
    }
  }
})
</script>
