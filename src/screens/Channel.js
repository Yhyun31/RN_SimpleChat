import React,{useState,useEffect,useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import { createMessage,getCurrentUser, DB } from '../firebase';
import {GiftedChat,Send} from 'react-native-gifted-chat';
import { Alert } from 'react-native';
import { collection,orderBy, query, onSnapshot } from 'firebase/firestore';
import {MaterialIcons} from '@expo/vector-icons';

const Container= styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme})=>theme.background};
`;

const SendIcon=styled(MaterialIcons).attrs(({theme,text})=>({
    name: 'send',
    size: 24,
    color: text ? theme.sendBtnActive: theme.sendBtnInactive,
}))``;

const SendButton = props =>{
    
    return (
    <Send {...props}
    containerStyle={{
        width: 44, 
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
    }}
        disabled={!props.text}
    >
        <SendIcon text={props.text} />
    </Send> 
)};

const Channel=({navigation,route})=>{
    const [messages,setMessages]=useState([]);
    const {uid,name,photo}=getCurrentUser();

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:route.params.title || 'Channel',
        });
    },[]);

    //Firestore에서 해당 채널의 메시지를 실시간으로 가져오고, 화면에 반영영
    useEffect (()=>{
        const unsubscribe= onSnapshot(
            query(collection(DB, "channels", route.params.id, "messages"), orderBy("createdAt", "desc")),
            (snapshot) => {
                const list = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    _id: doc.id,}));
                setMessages(list);
            }
        )
        return () => unsubscribe();
    },[route.params.id]);
    
    const _handleMessageSend=async messageList=>{
        const message=messageList[0];
        
        try{
            await createMessage({channelId: route.params.id,message})
        }catch(e){
            Alert.alert('Message Error', e.message);
        }
    };

    return(
        <Container>
            <GiftedChat
            placeholder='Enter a message ...'
            messages={messages}
            user={{_id:uid,name,avatar:photo}}
            onSend={_handleMessageSend}
            renderSend={props=><SendButton {...props}/>}
            scrollToBottom={true} 
            renderUsernameOnMessage={true}
            alwaysShowSend={true} //send버튼이 항상 보이게
            multiline={false}
            />
            
        </Container>
    );
};

export default Channel;