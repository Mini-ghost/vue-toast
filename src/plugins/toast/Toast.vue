<template>
  <transition
    name="toast"
    appear
    @after-enter="handleAfterEnter"
  >
    <div
      role="alert"
      class="fixed right-4 w-[320px] flex justify-between items-center text-white pointer-events-auto duration-300 py-3 px-4 space-x-3 rounded"
      :class="[classes]"
      :style="styled"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <div class="break-words">
        {{ message }}
      </div>

      <template v-if="showClose">
        <button
          class="flex-shrink-0 p-1"
          @click="$emit('close')"
        >
          關關
        </button>
      </template>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import type CSS from 'csstype'

const noop = () => {}

export default Vue.extend({
  name: 'Toast',
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      default: 3000
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    toastContainer: {
      default: noop
    }
  },
  data: () => ({
    remain: null as number | null,
    start: null as number | null,
    timmer: null as number | null
  }),
  computed: {
    classes (): string {
      return `toast--${this.type}`
    },
    styled (): CSS.Properties {
      // @ts-expect-error
      const sibling = [...this.toastContainer.children]
      const index = sibling.indexOf(this)
      sibling.splice(index, sibling.length - index)

      const bottom = sibling.reduce((cur, vm) => {
        return cur + (vm.$el as unknown as HTMLElement).offsetHeight + 8
      }, 16)

      return {
        bottom: `${bottom}px`
      }
    },
    timeoutDuration (): number {
      return this.remain !== null ? this.remain : this.duration
    }
  },
  mounted () {
    // @ts-expect-error
    this.toastContainer.register(this)
  },
  beforeDestroy () {
    // @ts-expect-error
    this.toastContainer.unregister(this)
  },
  methods: {
    handleAfterEnter (): void {
      this.start = Date.now()
      if (this.timeoutDuration === 0) return

      this.timmer = setTimeout(() => {
        this.$emit('close')
      }, this.timeoutDuration)
      this.remain = this.timeoutDuration
    },
    onMouseenter () {
      if (this.timmer == null) return
      /**
       * 經過的時間
       */
      const elapsed = this.start !== null ? (Date.now() - this.start) : 0

      clearTimeout(this.timmer)

      this.timmer = null
      this.remain = this.timeoutDuration - elapsed
    },
    onMouseleave () {
      if (this.timeoutDuration === 0) return

      this.timmer = setTimeout(() => {
        this.$emit('close')
      }, this.timeoutDuration)
    }
  }
})
</script>

<style lang="scss">
.toast {
  &-enter,
  &-leave-to {
    opacity: 0
  }

  &--success {
    background-color: #68cd86;
  }

  &--waring {
    background-color: #ffb648;
  }

  &--error {
    background-color: #e54d42;
  }
}
</style>
