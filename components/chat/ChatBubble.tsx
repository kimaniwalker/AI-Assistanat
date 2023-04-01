import React from 'react'
import styled from 'styled-components/native'
import { Fonts, FontSize } from '../../utils/fonts'
import { MessageBubbleProps } from '../../utils/types'
import Loading from '../Loading'

export default function ChatBubble({ direction, message, color, isLoading = false }: MessageBubbleProps) {

    return (
        <ChatWrapper direction={direction} color={color}>
            {!isLoading ? <Message>{message?.trim()}</Message> : <Loading width={75} height={75} />}
        </ChatWrapper>
    )
}

const ChatWrapper = styled.View<{ direction: string, color?: string }>`
    max-width: 280px;
    background-color: ${({ color }) => color || 'blue'};
    min-height: 20px;
    border-radius: 8px; 
    padding: 16px;
    margin: 16px 0;
    align-self: ${({ direction }) => direction};
`
const Message = styled.Text`
    font-size: ${FontSize.Small};
    font-family: ${Fonts.Regular};
    color: black;
    text-align: left;
`
