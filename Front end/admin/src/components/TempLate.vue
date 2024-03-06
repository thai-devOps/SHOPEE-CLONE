<template>
     <form class="space-y-6" >
            <div>
              <label
                for="product-image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ảnh sản phẩm đại diện
              </label>
              <Field
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="image"
                type="text"
              />
              <ErrorMessage
                name="image"
                class="animate__animated animate__bounceIn text-sm text-red-600 dark:text-red-500"
              />
            </div>
            <!-- <InputField
              class="col-span-6 sm:col-span-6 lg:col-span-8"
              :label="'Ảnh sản phẩm đại diện'"
              :error-message="errors.image"
              :name="'image'"
              :placeholder="'Link ảnh sản phẩm...'"
              :type="'text'"
              :value="image"
              v-model="image"
            ></InputField>
            <div class="grid grid-cols-12 gap-3">
              <InputField
                class="col-span-6 sm:col-span-6 lg:col-span-8"
                :label="'Tên sản phẩm'"
                :error-message="errors.name"
                :name="'name'"
                :placeholder="'Tên sản phẩm'"
                :type="'text'"
                :value="name"
                v-model="name"
              ></InputField>
              <SelectFíeld
                :categories="_category"
                class="col-span-6 sm:col-span-6 lg:col-span-4"
                :label="'Danh mục sản phẩm'"
                :error-message="errors.category"
                :name="'category'"
                :placeholder="'Danh mục sản phẩm'"
                :value="category"
                v-model="category"
              />
            </div>
            <div class="grid grid-cols-12 gap-3">
              <InputField
                class="col-span-6 sm:col-span-6 lg:col-span-6"
                :label="'Giá gốc sản phẩm'"
                :error-message="errors.price_before_discount"
                :name="'price_before_discount'"
                :placeholder="'Giá gốc sản phẩm'"
                :type="'number'"
                :value="price_before_discount"
                v-model="price_before_discount"
              ></InputField>
              <InputField
                class="col-span-6"
                :label="'Giá sản phẩm sau khi giảm'"
                :error-message="errors.price"
                :name="'price'"
                :placeholder="'Giá sản phẩm'"
                :type="'number'"
                :value="price"
                v-model="price"
              ></InputField>
            </div>
            <div class="grid grid-cols-12 gap-3">
              <InputField
                class="col-span-6 sm:col-span-6 lg:col-span-12"
                :label="'Số lượng sản phẩm'"
                :error-message="errors.quantity"
                :name="'quantity'"
                :placeholder="'Số lượng sản phẩm'"
                :type="'number'"
                :value="quantity"
                v-model="quantity"
              ></InputField>
            </div>
            <div class="grid grid-cols-12 gap-3">
              <InputField
                class="col-span-6 sm:col-span-6 lg:col-span-4"
                :label="'Đánh giá sản phẩm'"
                :error-message="errors.rating"
                :name="'rating'"
                :placeholder="'Đánh giá sản phẩm'"
                :type="'number'"
                :value="rating"
                v-model="rating"
              ></InputField>
              <InputField
                class="col-span-6 sm:col-span-6 lg:col-span-4"
                :label="'Số lượng đã bán'"
                :error-message="errors.sold"
                :name="'sold'"
                :placeholder="'Số lượng đã bán'"
                :type="'number'"
                :value="sold"
                v-model="sold"
              ></InputField>
              <InputField
                class="col-span-6 sm:col-span-6 lg:col-span-4"
                :label="'Số lượt xem'"
                :error-message="errors.view"
                :name="'view'"
                :placeholder="'Số lượt xem'"
                :type="'number'"
                :value="view"
                v-model="view"
              ></InputField>
            </div>
            <TextAreaFieldVue
              :label="'Ảnh sản phẩm chi tiết'"
              :error-message="errors.images"
              :name="'images'"
              :rows="3"
              :cols="40"
              :value="images"
              v-model="images"
            ></TextAreaFieldVue> -->
            <!-- button submit form -->
            <div class="flex justify-end">
              <button
                type="submit"
                class="inline-flex justify-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg"
              >
                Thêm
              </button>
            </div>
          </form>
</template>