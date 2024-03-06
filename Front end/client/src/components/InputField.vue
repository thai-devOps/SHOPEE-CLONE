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
      <input
        :class="
          errorMessage
            ? ' animate__animated animate__headShake bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
            : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        "
        :type="type !== 'password' ? type : isShowPassword ? 'text' : 'password'"
        :name="name"
        :disabled="isDisabled"
        :id="name"
        :placeholder="placeholder"
        v-bind="value"
      />
      <p
        v-if="errorMessage"
        class="animate__animated animate__bounceIn text-sm mt-2 text-red-600 dark:text-red-500"
      >
        <span class="font-medium">Oh, snapp!</span> {{ errorMessage }}
      </p>
      <div v-if="type === 'password'">
        <svg
          v-if="!isShowPassword"
          @click="toggleShowPassword"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 absolute top-[10px] right-5 cursor-pointer text-gray-400 dark:text-gray-300"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <svg
          v-else
          @click="toggleShowPassword"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 absolute top-[10px] right-5 cursor-pointer text-gray-400 dark:text-gray-300"
        >
          <path
            d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z"
          />
          <path
            d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z"
          />
          <path
            d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
export default defineComponent({
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    errorMessage: {
      type: String
    },
    value: {
      type: Object,
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
