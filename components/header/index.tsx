import React from 'react'
import { Image, Pressable, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'




export default function Header({ }) {

    const navigation = useNavigation()

    const canGoBack = navigation.canGoBack()

    return (
        <Wrapper>
            <SafeAreaView>
                <Content>
                    {canGoBack ?
                        <Pressable onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle-outline" size={48} color="black" />
                        </Pressable>
                        :
                        <Image source={require('../../assets/logo.png')} style={{ width: 75, height: 75 }} />}


                </Content>
            </SafeAreaView>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    height: 150px;
    width: 100%;
    background-color: orange;
`
const Content = styled.View`
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 24px;

`
