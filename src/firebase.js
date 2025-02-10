import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import config from '../firebase.json';

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
    }//uri가 'https'로 시작하면 업로드할 필요x

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