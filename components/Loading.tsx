import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';


type Props = {
    width?: number
    height?: number
}
export default function Loading({ width = 400, height = 400 }: Props) {
    const animation = useRef(null);
    useEffect(() => {
        // You can control the ref programmatically, rather than using autoPlay
        // animation.current?.play();
    }, []);

    return (
        <View>
            <LottieView
                autoPlay
                ref={animation}
                style={{
                    width,
                    height,
                    backgroundColor: 'transparent',
                }}
                source={require('../assets/loadersmall.json')}
            />
        </View>
    );
}

const Message = styled.Text`
    font-size: 20px;
    text-align: center;
    
`

