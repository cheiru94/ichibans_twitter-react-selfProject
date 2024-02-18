import { useContext, useEffect, useState } from "react";
import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";
import AuthContext from "context/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: number;
  likeCount?: number;
  comments?: any;
  hashTags: string[];
}

/* 🟢 메인 홈페이지 */
export default function Homepage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  console.log("posts: ", posts);

  useEffect(() => {
    if (user) {
      // ! post 컬렉션을 참조
      let postsRef = collection(db, "posts"); // !  Firestore에서 posts 컬렉션을 참조  / db는 Firebase에서 초기화한 Firestore 인스턴스
      let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

      // ! onSnapshot 함수는 지정된 쿼리의 결과에 대한 실시간 업데이트를 처리하는 이벤트 핸들러를 등록
      // snapShot 매개변수는 해당 쿼리 결과의 스냅샷을 나타냅니다.
      onSnapshot(postsQuery, (snapShot) => {
        console.log("snapShot: ", snapShot);
        // ! docs 속성은 해당 쿼리 결과로 반환된 문서들의 배열
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(), //! doc.data()는 Firestore 문서에 저장된 모든 필드와 값을 가져오는 메서드
          id: doc?.id, //!  doc?.id를 통해 각 문서의 고유 ID를 새로운 객체에 추가
        }));
        setPosts(dataObj as PostProps[]);
      });
    }
  }, [user]);

  return (
    /* HOME */
    <div className="home">
      <div className="home__top">
        {/* 1. HOME TITLE */}
        <div className="home__title">ホーム</div>
        {/* 2. HOME TABS :  アナタへ | フォロー */}
        <div className="home__tabs">
          <div className="home__tab home__tab--active">アナタへ</div>
          <div className="home__tab">フォロー</div>
        </div>
      </div>

      {/* 3. POST FORM 태그 : textarea , label , input_file , input_submit*/}
      <PostForm />

      {/* 4. TWEET FORM 태그 */}
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
  );
}
