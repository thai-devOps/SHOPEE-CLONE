<template>
  <div class="bg-gray-50 py-6">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-3 bg-gray-50">
          <AsideFilter :categories="categories" :query-params="queryParams" />
        </div>
        <div class="col-span-9">
          <SortProductList
            :query-params="queryParams"
            :current-page="paginate.page"
            :limit="paginate.limit"
            :page-size="paginate.page_size"
            @handleSort="onHandleSort"
          />
          <div v-if="!isLoading">
            <div
              v-if="products.length > 0"
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            >
              <ProductItem v-for="product in products" :key="product._id" :product="product" />
            </div>
            <div v-else class="bg-white mt-5 py-5 px-5 grid place-items-center h-[50vh]">
              <img src="../../public/img/empty_order.png" alt="" />
              <div class="text-center text-gray-500">Không tìm thấy sản phẩm</div>
            </div>
          </div>
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5"
          >
            <LoadingProductSkeleton v-for="index in 10" :key="index" />
          </div>
          <!-- pagiante -->
          <nav aria-label="Page navigation example" class="flex justify-center my-5">
            <ul class="flex items-center gap-5 -space-x-px h-10 text-xl">
              <li>
                <router-link
                  v-if="paginate.page > 1"
                  :to="{
                    name: 'home-page',
                    query: {
                      ...queryParams,
                      page: paginate.page - 1,
                      limit: paginate.limit
                    }
                  }"
                  class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </router-link>
                <div
                  v-else
                  class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </div>
              </li>
              <li v-for="page in paginate.page_size" :key="page">
                <router-link
                  :to="{
                    name: 'home-page',
                    query: {
                      ...queryParams,
                      page: page,
                      limit: paginate.limit
                    }
                  }"
                  :class="
                    Number(queryParams.page ?? 1) === page
                      ? 'z-10 flex items-center justify-center px-4 h-10 leading-tight text-white border-blue-300 bg-shopeeOrange rounded-sm'
                      : 'flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  "
                >
                  {{ page }}
                </router-link>
              </li>
              <li>
                <router-link
                  v-if="paginate.page < paginate.page_size"
                  :to="{
                    name: 'home-page',
                    query: {
                      ...queryParams,
                      page: paginate.page + 1,
                      limit: paginate.limit
                    }
                  }"
                  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </router-link>
                <div
                  v-else
                  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
import AsideFilter from '@/components/AsideFilter.vue'
import SortProductList from '@/components/SortProductList.vue'
import LoadingProductSkeleton from '@/components/LoadingProductSkeleton.vue'
import { useQuery } from '@tanstack/vue-query'
import http from '@/utils/http'
import type { Product, ProductListQuery, ProductListResponse } from '@/types/product'
import type { ResponseSuccess } from '@/types/auth'
import { useQueryParams } from '@/hook/useQueryParams'
import type { Category } from '@/types/category'
import router from '@/router'
import { sortProductBy } from '@/constants/product'
// import Paginate from '@/components/Paginate.vue'
const LIMIT = '10'
export default defineComponent({
  name: 'HomeView',
  components: {
    ProductItem,
    AsideFilter,
    SortProductList,
    LoadingProductSkeleton
    // Paginate
  },
  setup() {
    const tempParams = useQueryParams()
    const queryParams = ref<ProductListQuery>(tempParams.value)
    const onHandleSort = (newQueryParams: ProductListQuery) => {
      console.log(newQueryParams)
      queryParams.value = newQueryParams
      router.push({
        name: 'home-page',
        query: {
          ...queryParams.value
        }
      })
    }
    const products = ref<Product[]>([])
    const categories = ref<Category[]>([])
    const getProducts = (query: any) =>
      http
        .get<ResponseSuccess<ProductListResponse>>('/products', {
          params: query
        })
        .then((res) => res.data.data)
    watch(tempParams, () => {
      queryParams.value = tempParams.value
    })
    const { data, isLoading } = useQuery<ProductListResponse>(
      ['products', queryParams],
      () =>
        getProducts({
          ...queryParams.value,
          page: Number(queryParams.value.page) || 1,
          limit: LIMIT,
          sort_by: queryParams.value.sort_by || sortProductBy.view
        }),
      {
        keepPreviousData: true,
        retry: false,
        staleTime: 3 * 60 * 1000
      }
    )
    const { data: categoriesData } = useQuery({
      queryKey: ['categories'],
      queryFn: () => http.get<ResponseSuccess<Category[]>>('/categories')
    })
    watch(categoriesData, () => {
      categories.value = categoriesData.value?.data.data ?? []
      console.log(categories.value)
    })
    const paginate = ref<{
      page: number
      limit: number
      totalItems: number
      page_size: number
    }>({
      page: data.value?.paginate.page ?? 1,
      limit: data.value?.paginate.limit ?? 0,
      totalItems: data.value?.paginate.totalItems ?? 0,
      page_size: data.value?.paginate.page_size ?? 0
    })
    // Watch for changes in queryParams and refetch data when they change

    // Watch for changes in data and update products and paginate
    watch(data, () => {
      products.value = data.value?.products ?? []
      paginate.value = {
        page: data.value?.paginate.page ?? 1,
        limit: data.value?.paginate.limit ?? 0,
        totalItems: data.value?.paginate.totalItems ?? 0,
        page_size: data.value?.paginate.page_size ?? 0
      }
    })

    onMounted(() => {
      // Fetch initial data when the component is mounted
      products.value = data.value?.products ?? []
      categories.value = categoriesData.value?.data.data ?? []
      paginate.value = {
        page: data.value?.paginate.page ?? 1,
        limit: data.value?.paginate.limit ?? 0,
        totalItems: data.value?.paginate.totalItems ?? 0,
        page_size: data.value?.paginate.page_size ?? 0
      }
    })

    return {
      onHandleSort,
      products,
      paginate,
      queryParams,
      isLoading,
      categories
    }
  }
})
</script>
