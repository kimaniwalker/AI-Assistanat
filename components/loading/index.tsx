import React from 'react'
import styled from 'styled-components/native'
import Loading from '../Loading'

export default function LoadingScreen() {


    return (
        <Wrapper>
            <Loading />
        </Wrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`