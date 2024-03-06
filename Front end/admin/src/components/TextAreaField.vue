<template>
  <div>
    <label
      :for="name"
      :class="
        errorMessage
          ? 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500'
          : 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      "
      >{{ label }}</label
    >
    <div class="relative">
      <textarea
        :rows="rows"
        :cols="cols"
        :class="
          errorMessage
            ? ' animate__animated animate__headShake bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        "
        :name="name"
        :id="name"
        v-bind="value"
        placeholder=" Nhập các địa chỉ liên kết hình ảnh chi tiết sản phẩm ngắn cách bởi dấu phẩy , (ví dụ: https://shopee.vn/file1.jpg, https://shopee.vn/file2.jpg, https://shopee.vn/file3.jpg)"
      >
       
      </textarea>
      <p
        v-if="errorMessage"
        class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
      >
        <span class="font-medium">Oh, snapp!</span> {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
export default defineComponent({
  name: 'TextAreaField',
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String
    },
    value: {
      type: Object,
      required: true
    },
    rows: {
      type: Number,
      required: true
    },
    cols: {
      type: Number,
      required: true
    }
  },
  setup() {
    const isShowPassword = ref(false) // default is hide password
    const toggleShowPassword = () => {
      isShowPassword.value = !isShowPassword.value
    }

    return {
      isShowPassword,
      toggleShowPassword
    }
  }
})
</script>
