<template>
  <Fragment name="toast">
    <slot name="default" />
    <div class="relative inset-0 pointer-events-none">
      <Toast
        v-for="toast in toasts"
        :key="toast.key"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        :show-close="toast.showClose"
        @close="() => toast.resolve()"
      />
    </div>
  </Fragment>
</template>

<script lang="ts">
import Vue from 'vue'
import { Fragment } from 'vue-fragment'

import Toast from './Toast.vue'
import { toast } from './index'

type ToastInstance = InstanceType<typeof Toast>

export default Vue.extend({
  name: 'ToastContainer',
  components: {
    Toast,
    Fragment
  },
  provide () {
    return {
      toastContainer: this
    }
  },
  data () {
    return {
      children: [] as ToastInstance[]
    }
  },
  computed: {
    toasts: {
      get () {
        return toast.stack
      }
    }
  },
  methods: {
    register (vm: ToastInstance): void {
      this.children.push(vm)
    },
    unregister (vm: ToastInstance): void {
      this.children.splice(this.children.indexOf(vm), 1)
    }
  }
})
</script>
