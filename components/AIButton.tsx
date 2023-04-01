import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import styled from 'styled-components/native'
import { Fonts } from '../utils/fonts'



type Props = {
    buttonTitle: string
    onPress: () => void
    disabled?: boolean
}

export default function AiButton({ buttonTitle, onPress, disabled = false }: Props) {

    const animation = React.useRef(null)

    return (
        <>

            <Wrapper disabled={disabled}>
                <Button disabled={disabled} onPress={onPress}>
                    <AnimatedLottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: 'transparent',
                        }}
                        source={require('../assets/robot.json')}
                    />
                </Button>
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
  width: 100px;
  height: 100px;
  background-color: orange;
  opacity: ${(props) => props.disabled ? 0.7 : 1};
  justify-content: 'center';
    align-items: 'center';
border-radius: 100%;
        margin-top: 40px;     
        box-shadow: 2px 2px 2px lightgrey; 
        position: absolute;
        bottom: 40px;
        right: 16px;

`