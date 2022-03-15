import { NIcon } from 'naive-ui'
import { h } from 'vue'
import SvgIcon from '@/components/svgIcon/SvgIcon.vue'

export function renderMenuIcon(iconPrefix: string, icon?: any) {
  if (!icon) {
    return undefined
  }
  return () =>
    h(NIcon, null, {
      default: () =>
        h(SvgIcon, {
          prefix: iconPrefix,
          name: icon
        })
    })
}
