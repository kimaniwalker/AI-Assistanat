import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import { Presets } from '../../data/presets'
import { PresetsProps } from '../../utils/types'
import StyledButton from '../StyledButton'
import { useNavigation } from '@react-navigation/native';
import AiButton from '../AIButton'


export default function Prompts({ }) {

    const navigation: any = useNavigation()

    const handlePress = (act: string) => {
        navigation.navigate('Home', {
            act: act
        })
    }



    return (
        <>
            <Wrapper>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {Presets.sort((a, b) => a.act < b.act ? -1 : a.act > b.act ? 1 : 0).map((preset: PresetsProps, index) => (
                        <StyledButton key={index} buttonTitle={preset.act} onPress={() => handlePress(preset.prompt)} />
                    ))}
                </ScrollView>
                <AiButton onPress={() => navigation.navigate('Home')} buttonTitle="" />
            </Wrapper>

        </>
    )
}
const Wrapper = styled.View`
    padding: 16px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`


