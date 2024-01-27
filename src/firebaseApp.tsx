/* 
  initializeApp - Firebase 앱을 초기화하는 함수
  FirebaseApp - Firebase 앱의 타입
  getApp - 이미 초기화된 Firebase 앱의 인스턴스를 가져오는 함수
*/
import { initializeApp, FirebaseApp, getApp } from "firebase/app";

/* 
  이 부분에서는 app이라는 이름의 변수를 선언하고, 이 변수의 타입을 FirebaseApp으로 설정
  이 변수는 나중에 "Firebase 앱의 인스턴스"를 저장하는 데 사용
*/
export let app: FirebaseApp;

// firebaseConfig 객체를 생성 : 웹 앱의 Firebase 구성 (환경설정)
const firebaseConfig = {
  //firebaseConfig 객체는 Firebase 프로젝트를 설정하는 데 필요한 설정 정보
  apiKey: process.env.REACT_APP_APIKEY, // Firebase 프로젝트의 고유 키
  authDomain: process.env.REACT_APP_AUT_DOMAIN, // 인증 도메인으로, Firebase 인증을 사용할 때 필요
  projectId: process.env.REACT_APP_PROJECT_ID, //  Firebase 프로젝트의 고유 아이디
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, // Firebase의 Cloud Storage에 대한 참조
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, // Cloud Messaging을 사용할 때 필요한 ID
  appId: process.env.REACT_APP_API_ID, // Firebase 앱의 고유 아이디
};

// initialize 매번 호출하는게 아니라 처음에 initialize가 되어 있으면 getApp을 통해서 해당 App을 가져오고
//그게 아닌 경우에만 initialize 하기 위함
try {
  app = getApp("app");
} catch (e) {
  // Firebase 초기화 : 마지막으로 initializeApp 함수에 firebaseConfig를 전달하여 Firebase 앱을 초기화
  app = initializeApp(firebaseConfig, "app"); // => 이 "app" 객체를 통해 Firebase의 다양한 기능을 사용할 수 있다
  // =>  한 프로젝트 내에서 여러 개의 Firebase 앱을 동시에 사용하려면, 각 Firebase 앱에 고유한 이름을 지정해야 한다.
}

const firebase = initializeApp(firebaseConfig); // try-catch 구문과 관계없이 항상 실행

export default firebase;
