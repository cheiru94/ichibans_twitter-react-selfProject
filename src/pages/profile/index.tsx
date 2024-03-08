import { languageState } from "atom";
import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

type TabType = "my" | "like";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("my");
  const [myPosts, setMyPosts] = useState<PostProps[]>([]);
  const [likePosts, setLikePosts] = useState<PostProps[]>([]);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const PROFILE_DEFAULT_URL = "/tiger.png";

  const [language, setLanguage] = useRecoilState(languageState);
  console.log("lang: ", language);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts"); // 컬렉션 선택

      const myPostsQuery = query(
        postsRef, // "posts" 컬렉션에 대한 참조
        where("uid", "==", user.uid), // "uid" 필드가 현재 사용자의 UID와 일치하는 도큐먼트를 검색
        orderBy("createdAt", "desc") // "createdAt" 필드를 기준으로 내림차순으로 정렬
      );
      const likePostsQuery = query(
        postsRef,
        where("likes", "array-contains", user.uid),
        orderBy("createdAt", "desc")
      );

      /* onSnapshot : 실시간 업데이트를 수신 , 업데이트가 발생하면 콜백 함수가 호출 */

      //  myPosts
      onSnapshot(myPostsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setMyPosts(dataObj as PostProps[]);
      });

      //  likePosts
      onSnapshot(likePostsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setLikePosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  const onClickLanguage = () => {
    setLanguage(language === "ko" ? "jp" : "ko");
    localStorage.setItem("language", language === "ko" ? "jp" : "ko");
  };

  return (
    <div className="home">
      <div className="home__top">
        {/* 1. HOME TITLE */}
        <div className="home__title">Profile</div>

        {/* 프로필 이미지 */}
        <div className="profile">
          <img
            src={user?.photoURL || PROFILE_DEFAULT_URL}
            alt="PROFILE"
            className="profile__image"
            width={100}
            height={100}
          />
        </div>

        <div className="profile__flex">
          <button
            type="button"
            className="profile__btn--language"
            onClick={() => navigate("/profile/edit")}
          >
            Profileを編集
          </button>
          <button
            type="button"
            className="profile__btn"
            onClick={onClickLanguage}
          >
            {language === "ko" ? "한국어" : "日本語"}
          </button>
        </div>

        <div className="profile__text">
          <div className="profile__name">{user?.displayName || "利用者"}</div>
          <div className="profile__name">{user?.email || "利用者"}</div>
        </div>

        {/* 2. HOME TABS :  アナタへ | フォロー */}
        <div className="home__tabs">
          <div
            className={`home__tab ${activeTab === "my" && "home__tab--active"}`}
            onClick={() => setActiveTab("my")}
          >
            For you
          </div>
          <div
            className={`home__tab ${
              activeTab === "like" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("like")}
          >
            Likes
          </div>
        </div>

        {/* 3. post */}

        {activeTab === "my" && (
          <div className="post">
            {myPosts?.length > 0 ? (
              myPosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className="post__no-posts">
                <div className="posts__text">まだ投稿がありません</div>
              </div>
            )}
          </div>
        )}
        {activeTab === "like" && (
          <div className="post">
            {likePosts?.length > 0 ? (
              likePosts?.map((post) => <PostBox post={post} key={post.id} />)
            ) : (
              <div className="post__no-posts">
                <div className="posts__text">まだ投稿がありません</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
