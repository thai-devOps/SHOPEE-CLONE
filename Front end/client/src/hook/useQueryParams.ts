import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useQueryParams = () => {
  const route = useRoute()
  const queryParams = ref(route.query)

  const updateQueryParams = () => {
    queryParams.value = route.query
  }

  onMounted(() => {
    updateQueryParams()
  })

  const urlChangeListener = () => {
    updateQueryParams()
  }

  onBeforeUnmount(() => {
    window.removeEventListener('popstate', urlChangeListener)
  })

  watch(
    () => route.fullPath,
    () => {
      updateQueryParams()
    }
  )

  return queryParams
}
// import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
// import { useRoute } from 'vue-router'

// export const useQueryParams = () => {
//   const route = useRoute()
//   const queryParams = ref({ ...route.query }) // Make a copy of route.query

//   const updateQueryParams = () => {
//     for (const key in route.query) {
//       if (Object.prototype.hasOwnProperty.call(route.query, key)) {
//         queryParams.value[key] = route.query[key]
//       }
//     }
//   }

//   onMounted(() => {
//     updateQueryParams()
//   })

//   const urlChangeListener = () => {
//     updateQueryParams()
//   }

//   watch(route, urlChangeListener)

//   onBeforeUnmount(() => {
//     window.removeEventListener('popstate', urlChangeListener)
//   })

//   return queryParams
// }