export default interface UserinfoConfig {
    avatarKey?: string
    list: Array<Array<{
        key: string
        desc: string
        placeholder?: string
        envnt?: () => void
    }>>
}