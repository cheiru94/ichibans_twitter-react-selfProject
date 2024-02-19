/* 
  initializeApp - Firebase 앱을 초기화하는 함수
  FirebaseApp - Firebase 앱의 타입
  getApp - 이미 초기화된 Firebase 앱의 인스턴스를 가져오는 함수
*/
import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ! Firestore 데이터베이스 : 특정 Firebase 앱과 연결된 Firestore 데이터베이스 인스턴스를 얻기 위해 사용

import { getStorage } from "firebase/storage"; // ! Firestore Storage :

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

/*  Firestore 데이터베이스의 인스턴스를 반환하는 함수 */
export const db = getFirestore(app);
// ! db라는 상수를 만들고, 이를 getFirestore 함수를 app 변수와 함께 호출하여 반환된 값으로 설정합니다. 이렇게 함으로써 Firestore 데이터베이스와의 연결이 설정
// ! 핵심은 getFirestore(app)입니다.
// ! 이 함수는 app 변수를 인자로 받아와서 해당 앱과 연결된 Firestore 데이터베이스의 인스턴스를 생성합니다.
// ! 그리고 이 인스턴스를 db라는 상수에 할당함으로써, 이후 코드에서는 db를 사용하여 Firestore 데이터베이스와 상호 작용할 수 있습니다
// ! 간단히 말하면, db는 Firebase 앱과 연결된 Firestore 데이터베이스를 가리키는 변수이며, 이를 통해 애플리케이션에서 데이터베이스 작업을 수행할 수 있습니다.

/*  Firestorage*/
export const storage = getStorage(app); /// 제공된 앱 인스턴스와 관련된 Firebase Storage 서비스에 대한 참조를 생성하고 반환
/// 이 내보내기가 다른 모듈이나 파일에서 사용 가능해지면, storage 상수를 사용하여 Firebase Storage와 상호 작용할 수 있습니다.

export default firebase;
