<template>
  <div id="app">
    <ToastContainer>
      <div class="p-4 max-w-screen-sm mx-auto">
        <h1 class="text-3xl font-bold text-center">
          Vue Toast
        </h1>
        <div class="space-x-2 py-4 text-center">
          <button
            type="button"
            class="text-white py-1 px-4 bg-[#68cd86] rounded focus:outline-none"
            @click="onSuccessClick"
          >
            Success
          </button>
          <button
            type="button"
            class="text-white py-1 px-4 bg-[#ffb648] rounded focus:outline-none"
            @click="onWaringClick"
          >
            Waring
          </button>

          <button
            type="button"
            class="text-white py-1 px-4 bg-[#e54d42] rounded focus:outline-none"
            @click="onErrorClick"
          >
            Error
          </button>
        </div>
        <div>
          <form class="w-5/6 space-y-2 border border-gray-500 rounded p-4 mx-auto">
            <div class="flex items-center space-x-3">
              <label
                class="min-w-24"
                for="message"
              >
                message
              </label>
              <input
                id="message"
                v-model="message"
                type="text"
                class="w-full py-1 px-2 border border-gray-300 rounded"
              >
            </div>

            <div class="flex items-center space-x-3">
              <label
                class="min-w-24"
                for="duration"
              >
                duration
              </label>
              <input
                id="duration"
                v-model.number="duration"
                type="text"
                class="w-full py-1 px-2 border border-gray-300 rounded"
              >
            </div>
            <div class="flex items-center space-x-3">
              <label
                class="min-w-24"
                for="showClose"
              >
                showClose
              </label>
              <input
                id="showClose"
                v-model="showClose"
                type="checkbox"
              >
            </div>
          </form>
        </div>
      </div>
    </ToastContainer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component<App>({})
export default class App extends Vue {
  message = 'The Toast component is used to display a quick message to a user. Snackbars support positioning, removal delay, and callbacks.'
  duration = 3000
  showClose = true

  get options () {
    return {
      message: this.message,
      duration: this.duration,
      showClose: this.showClose
    }
  }

  onSuccessClick () {
    this.$toast(this.options)
  }

  onWaringClick () {
    this.$toast.waring(this.options)
  }

  onErrorClick () {
    this.$toast.error(this.options)
  }
}
</script>
