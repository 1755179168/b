import defaultSettings from '@/settings'

const title = defaultSettings.title || '个人空间后台系统'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}