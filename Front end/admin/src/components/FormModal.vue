<template>
  <!-- Main modal -->
  <div
    v-if="isOpen"
    id="authentication-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-[2000] flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50"
  >
    <div class="relative w-full overflow-y-auto max-w-3xl max-h-[500px]">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          @click="handleCloseForm"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
        >
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
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <h3
            v-if="!productLocal._id"
            class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
          >
            Thêm sản phẩm
          </h3>
          <h3 v-else class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Cập nhật sản phẩm
          </h3>
          <Form @submit="onSubmit" :validation-schema="schemaProduct">
            <div class="mb-2">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ảnh đại diện sản phẩm</label
              >
              <Field
                id="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="image"
                v-model="productLocal.image"
              />
              <ErrorMessage
                name="image"
                class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
              />
            </div>
            <div class="grid grid-cols-12 gap-3 mb-10">
              <div class="col-span-6 sm:col-span-6 lg:col-span-7">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Tên sản phẩm</label
                >
                <Field
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="name"
                  v-model="productLocal.name"
                />
                <ErrorMessage
                  name="name"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-4">
                <div>
                  <label
                    for="category"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Danh mục sản phẩm</label
                  >
                  <Field
                    name="category"
                    id="category"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    as="select"
                    v-model="productLocal.category._id"
                  >
                    <option value="" disabled>Chọn danh mục</option>
                    <option v-for="category in _category" :key="category._id" :value="category._id">
                      {{ category.name }}
                    </option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                  />
                </div>
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-1 mt-7">
                <button
                  type="button"
                  @click="handleCreateCategory"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3 mb-2">
              <div class="col-span-6 sm:col-span-6 lg:col-span-6">
                <label
                  for="price_before_discount"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Giá gốc sản phẩm</label
                >
                <Field
                  id="price_before_discount"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="price_before_discount"
                  v-model="productLocal.price_before_discount"
                />
                <ErrorMessage
                  name="price_before_discount"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-6">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Giá sau khi giảm giá</label
                >
                <Field
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="price"
                  v-model="productLocal.price"
                />
                <ErrorMessage
                  name="price"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3 mb-2">
              <div class="col-span-6 sm:col-span-6 lg:col-span-12">
                <label
                  for="quantity"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Số lượng sản phẩm</label
                >
                <Field
                  id="quantity"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="quantity"
                  v-model="productLocal.quantity"
                />
                <ErrorMessage
                  name="quantity"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3 mb-2">
              <div class="col-span-6 sm:col-span-6 lg:col-span-4">
                <label
                  for="rating"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Đánh giá sản phẩm</label
                >
                <Field
                  id="rating"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="rating"
                  v-model="productLocal.rating"
                />
                <ErrorMessage
                  name="rating"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-4">
                <label
                  for="sold"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Số lượng đã bán</label
                >
                <Field
                  id="sold"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="sold"
                  v-model="productLocal.sold"
                />
                <ErrorMessage
                  name="sold"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
              <div class="col-span-6 sm:col-span-6 lg:col-span-4">
                <label
                  for="view"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Số lượt xem</label
                >
                <Field
                  id="view"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="view"
                  v-model="productLocal.view"
                />
                <ErrorMessage
                  name="view"
                  class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
                />
              </div>
            </div>
            <div class="mb-2">
              <label
                for="images"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ảnh chi tiết sản phẩm</label
              >
              <Field
                id="images"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="images"
                as="textarea"
                cols="30"
                rows="3"
                v-model="images"
              />
              <ErrorMessage
                name="images"
                class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
              />
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                v-if="!productLocal._id"
                class="inline-flex justify-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
              >
                Thêm
              </button>
              <button
                type="submit"
                v-else
                class="inline-flex justify-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
              >
                Cập nhật
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { ErrorMessage, Field, Form, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import http from '@/utils/http'
import type { ResponseSuccess } from '@/types/auth'
import type { Category, Product } from '@/types/product'
export default defineComponent({
  name: 'FormModal',
  // eslint-disable-next-line vue/no-reserved-component-names
  components: { Form, Field, ErrorMessage },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  setup(props, { emit }) {
    const productLocal = ref(props.product)
    const images = ref(props.product.images.join('\n'))
    watch(
      () => props.product,
      (newVal) => {
        productLocal.value = newVal
        images.value = newVal.images.join('\n')
        console.log(productLocal.value)
      }
    )
    console.log(productLocal.value)

    const _category = ref<Category[]>([])
    onMounted(() => {
      http.get('/categories').then((res) => {
        const data = res.data as ResponseSuccess<Category[]>
        _category.value = data.data
      })
    })
    const schemaProduct = yup.object({
      name: yup.string().required('Tên sản phẩm không được để trống'),
      price: yup
        .number()
        .required('Giá sản phẩm không được đ ể trống')
        .test(
          'is-greater',
          'Giá sau khi giảm phải nhỏ hơn hoặc bằng giá gốc sản phẩm',
          function (price) {
            const priceBeforeDiscount = this.resolve(yup.ref('price_before_discount')) as number
            return price <= priceBeforeDiscount
          }
        )
        .min(1, 'Giá sản phẩm phải lớn hơn 0'),
      price_before_discount: yup
        .number()
        .required('Giá trước khi giảm giá không được để trống')
        .min(1, 'Giá trước khi giảm giá phải lớn hơn 0'),
      quantity: yup
        .number()
        .required('Số lượng sản phẩm không được để trống')
        .min(1, 'Số lượng sản phẩm phải lớn hơn 0'),
      image: yup.string().required('Ảnh sản phẩm không được để trống'),
      category: yup.string().required('Danh mục sản phẩm không được để trống'),
      images: yup.string().required('Ảnh sản phẩm không được để trống'),
      rating: yup
        .number()
        .required('Đánh giá sản phẩm không được để trống')
        .min(0, 'Đánh giá sản phẩm phải lớn hơn 0'),
      sold: yup
        .number()
        .required('Số lượng đã bán không được để trống')
        .min(0, 'Số lượng đã bán phải lớn hơn 0'),
      view: yup
        .number()
        .required('Số lượt xem không được để trống')
        .min(0, 'Số lượt xem phải lớn hơn 0')
    })
    const { errors, resetForm } = useForm({
      validationSchema: toTypedSchema(schemaProduct)
    })
    const handleCloseForm = () => {
      resetForm()
      emit('onClickClose', false)
    }
    // change productLocal.images from array to string to show in input
    function onSubmit() {
      productLocal.value.images = images.value.split('\n')
      emit('onSubmitFormProduct', productLocal.value)
    }
    const handleCreateCategory = () => {
      const category = prompt('Nhập tên danh mục sản phẩm')
      if (category) {
        http
          .post('/categories', {
            name: category
          })
          .then(() => {
            http.get('/categories').then((res) => {
              const data = res.data as ResponseSuccess<Category[]>
              _category.value = data.data
            })
          })
      }
    }
    return {
      errors,
      handleCloseForm,
      onSubmit,
      productLocal,
      _category,
      schemaProduct,
      images,
      handleCreateCategory
    }
  }
})
</script>
