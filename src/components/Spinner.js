import React from "react";
import styled from 'styled-components/native';

const Container=styled.View`
    position: absolute; /*항상 맨 위 위치*/
    z-index:2;
    opacity: 0.3;
    width: 100%;
    height: 100%;
    justify-content: center;
    background-color: ${({theme})=>theme.spinnerBackground};
`;

const Indicator = styled.ActivityIndicator.attrs(({theme})=>({
    size: 'large',
    color: theme.spinnerIndicator,
}))``;

const Spinner=()=>{
    return(
        <Container>
            <Indicator/>
        </Container>
    );
};

export default Spinner;