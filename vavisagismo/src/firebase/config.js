
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const apiKeyenv = process.env.REACT_APP_APIKEY
const authDomainenv = process.env.REACT_APP_AUTHDOMAIN
const projectIdenv = process.env.REACT_APP_PROJECTID
const storageBucketenv = process.env.REACT_APP_STORAGEBUCKET
const messagingSenderIdenv = process.env.REACT_APP_MESSAGINGSENDERID
const appIdenv = process.env.REACT_APP_APPID

const firebaseConfig = {
  apiKey: `${apiKeyenv}`,
  authDomain: `${authDomainenv}`,
  projectId: `${projectIdenv}`,
  storageBucket: `${storageBucketenv}`,
  messagingSenderId: `${messagingSenderIdenv}`,
  appId:`${appIdenv}`,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
