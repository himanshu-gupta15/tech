// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// import {getAuth, GoogleAuthProvider} from "firebase/auth"
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "googellogin-virtual-course.firebaseapp.com",
//   projectId: "googellogin-virtual-course",
//   storageBucket: "googellogin-virtual-course.firebasestorage.app",
//   messagingSenderId: "590759705251",
//   appId: "1:590759705251:web:f31d296b6a4336d8925d16"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth=getAuth(app)

// const provider=new GoogleAuthProvider()

// export {auth,provider}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_APIKEY",
  authDomain: "login-tech-48ca5.firebaseapp.com",
  projectId: "login-tech-48ca5",
  storageBucket: "login-tech-48ca5.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
