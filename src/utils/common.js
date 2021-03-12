import { Toast } from 'vant'
export const loading = _ => {
  Toast.loading({
    message: '操作中...',
    forbidClick: true,
    duration: 0,
    loadingType: 'spinner'
  })
}
