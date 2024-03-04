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

export default function ProfilePage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const PROFILE_DEFAULT_URL = "/tiger.png";
  useEffect(() => {
    if (user) {
      let postsRef = collection(db, "posts");
      let postsQuery = query(
        postsRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      // onSnapshot : 실시간 업데이트 , 업데이트가 발생하면 콜백 함수가 호출
      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

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
        <button
          type="button"
          className="profile__btn"
          onClick={() => navigate("/profile/edit")}
        >
          Profileを編集
        </button>

        <div className="profile__text">
          <div className="profile__name">{user?.displayName || "利用者"}</div>
          <div className="profile__name">{user?.email || "利用者"}</div>
        </div>

        {/* 2. HOME TABS :  アナタへ | フォロー */}
        <div className="home__tabs">
          <div className="home__tab home__tab--active">アナタ</div>
          <div className="home__tab">いいね</div>
        </div>

        {/* 3. post */}
        <div className="post">
          {posts?.length > 0 ? (
            posts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="posts__text">まだ投稿がありません</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
