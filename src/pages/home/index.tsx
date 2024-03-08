import { useCallback, useContext, useEffect, useState } from "react";
import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
  hashTags: string[];
  imageUrl?: string;
}

interface UserProps {
  id: string;
}

type tabType = "all" | "following";

/* 🟢 메인 홈페이지 */
export default function Homepage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<tabType>("all");
  const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([""]);
  const t = useTranslation();
  console.log("followingIds: ", followingIds);

  // 실시간 동기화로 user의 팔로잉 id 배열 가져오기
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, "following", user?.uid);
      onSnapshot(ref, (doc) => {
        // 가져오기전 내용 초기화
        setFollowingIds([""]);
        doc?.data()?.users?.map((user: UserProps) =>
          /* 이전 값이 있는 경우 새로운 값을 추가 아니면 빈배열로   */
          setFollowingIds((prev: string[]) => (prev ? [...prev, user?.id] : []))
        );
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user) {
      // ! post 컬렉션을 참조
      let postsRef = collection(db, "posts"); // !  Firestore에서 posts 컬렉션을 참조  / db는 Firebase에서 초기화한 Firestore 인스턴스
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));
      let followingQuery = query(
        postsRef,
        where("uid", "in", followingIds),
        orderBy("createdAt", "desc")
      );

      // ! onSnapshot 함수는 지정된 쿼리의 결과에 대한 실시간 업데이트를 처리하는 이벤트 핸들러를 등록
      // snapShot 매개변수는 해당 쿼리 결과의 스냅샷을 나타냅니다.
      onSnapshot(postsQuery, (snapShot) => {
        // ! docs 속성은 해당 쿼리 결과로 반환된 문서들의 배열
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(), //! doc.data()는 Firestore 문서에 저장된 모든 필드와 값을 가져오는 메서드
          id: doc?.id, //!  doc?.id를 통해 각 문서의 고유 ID를 새로운 객체에 추가
        }));
        setPosts(dataObj as PostProps[]);
      });

      onSnapshot(followingQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollowingPosts(dataObj as PostProps[]);
      });
    }
  }, [followingIds, user]);

  useEffect(() => {
    if (user?.uid) getFollowingIds();
  }, [getFollowingIds, user?.uid]);

  return (
    /* HOME */
    <div className="home">
      <div className="home__top">
        {/* 1. HOME TITLE */}
        <div className="home__title">{t("MENU_HOME")}</div>
        {/* 2. HOME TABS :  アナタへ | フォロー */}
        <div className="home__tabs">
          <div
            className={`home__tab ${
              activeTab === "all" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("all")}
          >
            {t("TAB_ALL")}
          </div>
          <div
            className={`home__tab ${
              activeTab === "following" && "home__tab--active"
            }`}
            onClick={() => setActiveTab("following")}
          >
            {t("TAB_FOLLOWING")}
          </div>
        </div>
      </div>

      {/* 3. POST FORM 태그 : textarea , label , input_file , input_submit*/}
      <PostForm />

      {/* 4. TWEET FORM 태그 */}
      {activeTab === "all" && (
        <div className="post">
          {posts?.length > 0 ? (
            posts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{t("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
      {activeTab === "following" && (
        <div className="post">
          {followingPosts?.length > 0 ? (
            followingPosts?.map((post) => <PostBox post={post} key={post.id} />)
          ) : (
            <div className="post__no-posts">
              <div className="post__text">{t("NO_POSTS")}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
