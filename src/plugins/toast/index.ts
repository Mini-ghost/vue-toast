import Vue, { PluginObject } from 'vue'
import ToastContainer from './ToastContainer.vue'

type ToastType = 'success' | 'waring' | 'error'

interface ToastOptions {
  /**
   * 訊息內容
   */
  message: string
  /**
   * 訊息狀態
   * @default 'success'
   */
  type?: ToastType
  /**
   * 顯示時間，`0` 表示不會自動關閉
   * @default 3000
   */
  duration?: number
  /**
   * 是否顯示關閉按鈕
   * @default false
   */
  showClose?: boolean
}

export const toast: {
  stack: (
    & ToastOptions
    & {
      key: string,
      resolve: () => void
    }
  )[],
} = Vue.observable({
  stack: []
})

let seed = 0
const $toast = (options: string | ToastOptions) => {
  return new Promise<void>(resolve => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }

    const key = `toast--${seed++}`
    const item = {
      ...options,
      ...{
        key,
        resolve () {
          const index = toast.stack.indexOf(item as any)
          const newStack = [...toast.stack]
          newStack.splice(index, 1)

          toast.stack = newStack
          resolve()
        }
      }
    }

    toast.stack.push(item)
  })
}

(['success', 'waring', 'error'] as const).forEach(type => {
  const handler = (options: string | Omit<ToastOptions, 'type'>) => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }

    return $toast({
      ...options,
      type
    })
  }

  Object.defineProperty($toast, type, {
    get: () => handler
  })
})

const ToastPlugin: PluginObject<undefined> = {
  install (_Vue_) {
    _Vue_.component('ToastContainer', ToastContainer)
    _Vue_.use(() => {
      Object.defineProperty(_Vue_.prototype, '$toast', {
        get: () => $toast
      })
    })
  }
}

export default ToastPlugin

type ToastShortHandler = (options: string | Omit<ToastOptions, 'type'>) => void
declare module 'vue/types/vue' {
  interface Vue {
    $toast:
      & typeof $toast
      & Record<ToastType, ToastShortHandler>
  }
}
