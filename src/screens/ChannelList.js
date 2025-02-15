import React,{useState,useEffect} from 'react';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {Button} from '../components';
import {MaterialIcons} from '@expo/vector-icons';
import {DB} from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import moment from 'moment';

const getDateOrTime= ts =>{
    const now=moment().startOf('day');
    const target=moment(ts).startOf('day');
    return moment(ts).format(now.diff(target,'day')>0 ? 'MM/DD' : 'HH:mm');
};

const ItemContainer=styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    border-bottom-width: 1px;
    border-color: ${({theme})=>theme.itemBorder};
    padding: 15px 20px;
`;

const ItemTextContainer=styled.View`
    flex:1;
    flex-direction: column;
`;

const ItmeTitle=styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: ${({theme})=>theme.text}
`;

const ItemDesc=styled.Text`
    font-size: 16px;
    margin-top: 5px;
    color: ${({theme})=>theme.itemDesc}
`;
const ItemTime= styled.Text`
    font-size:12px;
    color: ${({theme})=>theme.itemTIme}
`;
const ItemIcon=styled(MaterialIcons).attrs(({theme})=>({
    name: 'keyboard-arrow-right',
    size: 24,
    color:theme.itemIcon,
}))``;

//React.memo() 다시 랜더링 되는것 방지
const Item = React.memo(({item: {id,title,description,createdAt},onPress}) => {
    console.log(id);

    return(
        <ItemContainer onPress={()=> onPress({id,title})}>
            <ItemTextContainer>
                <ItmeTitle>{title}</ItmeTitle>
                <ItemDesc>{description}</ItemDesc>
            </ItemTextContainer>
            <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
            <ItemIcon/>
        </ItemContainer>
    );
});

const Container= styled.View`
    flex: 1;
    background-color: ${({theme})=>theme.background};
`;


const ChannelList=({navigation})=>{
    const [channels, setChannels]=useState([]);

    //마운트될 때만 동작
    useEffect(()=>{
        const q = query(collection(DB, 'channels'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setChannels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
        return ()=>unsubscribe(); /*꼭 해줘야함*/
    },[]);
    
    return(
        <Container>
           <FlatList
           data={channels}
           renderItem={({item}) => <Item item={item} 
           onPress={params => navigation.navigate('Channel',params)}/>} /*컴포넌트를 반환하는 함수 반환*/
           keyExtractor={item => item['id'].toString()}
           windowSize={5}
           />
        </Container>
    );
};

export default ChannelList;