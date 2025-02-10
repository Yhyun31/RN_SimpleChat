import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import { UserContext,ProgressContext } from '../contexts';
import Main from './Main';
import {Spinner} from '../components';

const Navigation=()=>{
    const {user}=useContext(UserContext);
    const {inProgress}=useContext(ProgressContext);
    
    return (
    <NavigationContainer>
        {user.uid ?<Main/> : <Auth/>}
        {inProgress && <Spinner/>}
    </NavigationContainer>
    ); //UserContext의 user 정보에 따라 Auth 네비게이션 렌더링
};
export default Navigation;