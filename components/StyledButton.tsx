import React from 'react'
import styled from 'styled-components/native'
import { Fonts } from '../utils/fonts'



type Props = {
    buttonTitle: string
    onPress: () => void
    disabled?: boolean
}

export default function StyledButton({ buttonTitle, onPress, disabled = false }: Props) {


    return (
        <>
            <Wrapper disabled={disabled}>
                <Button disabled={disabled} onPress={onPress}><ButtonTitle>{buttonTitle}</ButtonTitle></Button>
            </Wrapper>

        </>
    )
}

const Button = styled.Pressable`
width: 100%;
`
const ButtonTitle = styled.Text`
color: white;
font-size: 18px;
text-align: center;
font-family: ${Fonts.Regular};
padding: 8px;
text-transform: uppercase;
`
const Wrapper = styled.View<{ disabled: boolean }>`
display: flex;
  width: 325px;
  height: 50px;
  background-color: orange;
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  padding: 5px;
  justify-content: 'center';
    align-items: 'center';
border-radius: 48px;
        margin-top: 40px;     
        box-shadow: 2px 2px 2px lightgrey; 
`