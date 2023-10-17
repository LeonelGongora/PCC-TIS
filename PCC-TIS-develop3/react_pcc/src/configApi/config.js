import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyBf1oXZHXvu354gytZ9xdITq2Pj6jEGICM",
  authDomain: "react-firebase-blackcloud.firebaseapp.com",
  projectId: "react-firebase-blackcloud",
  storageBucket: "react-firebase-blackcloud.appspot.com",
  messagingSenderId: "833884096262",
  appId: "1:833884096262:web:36ffcfe95b4c516bbd8087"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); 

export async function subirImagen(file){
    const storageRef = ref(storage, v4())
    await uploadBytesResumable(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}