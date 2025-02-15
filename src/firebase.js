import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../firebase.json';
import { getFirestore,collection,doc,setDoc,addDoc } from 'firebase/firestore';


const app=initializeApp(config);

const auth=getAuth(app);

const storage=getStorage(app);

export const signin = async({email,password})=>{
    const {user} = await signInWithEmailAndPassword(auth,email,password);
    return user;
};



const uploadImage=async (uri) => {
    if(uri.startsWith('https')) {
        return uri;
    }//uri가 'https'로 시작하면 업로드할 필요x -> 기존 url 그대로 사용

    const blob = await new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onload=function (){resolve(xhr.response)}
        xhr.onerror=function () {reject(new TypeError('Network request failed'))}
        xhr.responseType='blob';
        xhr.open('GET',uri,true);
        xhr.send(null);

    });

    const user = auth.currentUser;
    const imageRef=ref(storage, `/profile/${user.uid}/photo.png`);
    await uploadBytes(imageRef, blob);
    blob.close();

    return await getDownloadURL(imageRef); 
};

export const signup=async({name,email,password,photo})=>{
    const {user}=await createUserWithEmailAndPassword(auth,email,password);
    const photoURL=await uploadImage(photo);
    await updateProfile(user,{displayName: name, photoURL});
    return user;
};

export const getCurrentUser = () => {
    const {uid,displayName,email,photoURL}=auth.currentUser;
    return {uid, name:displayName,email, photo:photoURL};
};

export const updateUserInfo=async photo =>{
    const photoURL= await uploadImage(photo);
    await auth.currentUser.updateProfile({photoURL});
    return photoURL;
};

export const signout=async ()=>{
    await auth.signOut();
    return{};
};

const DB=getFirestore(app);

export const createChannel = async ({ title, desc }) => {
    const newChannelRef = doc(collection(DB, "channels")); // 자동 ID 생성
    const id = newChannelRef.id;
    const newChannel = {
        id,
        title,
        description: desc,
        createdAt: Date.now(),
    };
    await setDoc(newChannelRef, newChannel);
    return id;
};
export {DB};



export const createMessage = async ({ channelId, message }) => {
   
       await setDoc(doc(DB, "channels", channelId, "messages", message._id), {
          ...message,
          createdAt: Date.now()
       });
 
       
 };