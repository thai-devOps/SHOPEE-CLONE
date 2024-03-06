<template>
  <div class="popover__wrapper">
    <button>
      <h2 class="popover__title flex mt-2">
        <div class="w-6 h-6 mr-2 flex-shrink-0">
          <img
            src="https://media.istockphoto.com/id/1312136351/vi/anh/h%C3%ACnh-minh-h%E1%BB%8Da-3d-c%E1%BB%A7a-ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-ho%E1%BA%A1t-h%C3%ACnh-d%E1%BB%85-th%C6%B0%C6%A1ng-v%E1%BB%9Bi-k%C3%ADnh-m%E1%BA%AFt-trong-%C3%A1o-s%C6%A1-mi-m%C3%A0u-xanh-v%E1%BB%9Bi.jpg?b=1&s=612x612&w=0&k=20&c=2ca486b96QE95aOh_BYFiD3ObSqzrQVHhKNVjKcAqYo="
            alt="avatar-user"
            class="w-full h-full rounded-full object-cover"
          />
        </div>
        <!-- <div>chauthai</div> -->
      </h2>
    </button>
    <div class="popover__content">
      <div
        class="w-full text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <router-link
          to="/my-account"
          class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          <svg
            class="w-6 h-6 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
            />
          </svg>
          Tài khoản của tôi
        </router-link>
        <router-link
          to="/cart"
          class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Đơn mua
        </router-link>
        <button
          type="button"
          class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-teal-700 focus:z-10 focus:ring-2 focus:ring-teal-700 focus:text-teal-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          Đăng xuất
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PopoverF',
  setup() {
    return {
      visible: false
    }
  }
})
</script>
<style lang="css" scoped>
/* Base styling*/

/* Popover styling */

.popover__wrapper {
  position: relative;
  display: inline-block;
}
.popover__content {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: -150px;
  transform: translate(0, 20px);
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
  width: auto;
}
.popover__content:before {
  position: absolute;
  z-index: -1;
  content: '';
  right: calc(50% - 60px);
  top: -8px;
  border-style: solid;
  border-width: 0 10px 10px 10px;
  border-color: transparent transparent #fff transparent;
  transition-duration: 0.3s;
  transition-property: transform;
}
.popover__wrapper:hover .popover__content {
  z-index: 10;

  opacity: 1;
  visibility: visible;
  transform: translate(0, 0px);
  transition: all 0.5s cubic-bezier(0.75, -0.02, 0.2, 0.97);
}
.popover__message {
  text-align: center;
}
</style>
