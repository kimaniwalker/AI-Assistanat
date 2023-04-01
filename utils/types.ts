import { Image } from "react-native"

export type makeRequestData = {
    data: {
        model: string,
        prompt: string
        temperature: number,
        max_tokens: number,
        top_p: number,
        frequency_penalty: number
        presence_penalty: number,
        user: string | number,
        stop: string[]
    }
    url: string
}

export type UserInfo = {
    id: string
    username: string
    phone: string
    address: string
    customer_id: string
    role: string
    push_token: string
}

export type LocalStorageProps = {
    value: string
    key: string
}

export type MessageBubbleProps = {
    direction: string
    color?: string
    message?: string
    isLoading?: boolean
}

export type BotPreferences = {
    preferences: {
        bot_name: string,
        prompt: string,
        image?: Image,
        color_scheme?: string,
        model?: string
    }
}
export type PresetsProps = {
    act: string,
    prompt: string
}