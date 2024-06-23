// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAj2M9U1-3KfZRjDsviqRW3EmaES9QawQc",
	authDomain: "cd-web-image.firebaseapp.com",
	projectId: "cd-web-image",
	storageBucket: "cd-web-image.appspot.com",
	messagingSenderId: "422564166866",
	appId: "1:422564166866:web:874132673dbd3db048810b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);