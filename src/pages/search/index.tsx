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
export default function SearchPage() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [tagQuery, setTagQuery] = useState<string>("");
  const { user } = useContext(AuthContext);

  const onChange = (e: any) => {
    setTagQuery(e?.target?.value?.trim()); // trimg()으로 좌우 공백 제거
  };

  useEffect(() => {
    if (user) {
      // "posts"라는 이름의 Firestore 컬렉션에 대한 참조를 생성
      let postsRef = collection(db, "posts"); // collection 함수는 Firestore 데이터베이스에서 특정 컬렉션을 참조할 때 사용
      let postsQuery = query(
        postsRef,
        where("hashTags", "array-contains-any", [tagQuery]),
        orderBy("createdAt", "desc")
      );

      // onSnapshot : Firestore 쿼리 결과에 대한 실시간 업데이트를 수신하는 데 사용되는 메서드
      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot?.docs?.map((doc) => ({
          ...doc?.data(),
          id: doc?.id,
        }));

        setPosts(dataObj as PostProps[]);
      });
    }
  }, [tagQuery, user]);

  return (
    <div className="home">
      {/* 검색  */}
      <div className="home__top">
        <div className="home__title">
          <div className="home__title-text">Search</div>
        </div>
        <div className="home__search-div">
          <input
            className="home__search"
            placeholder="ハッシュタグ検索"
            onChange={onChange}
          />
        </div>
      </div>

      {/* 검색한 게시물들  */}
      <div className="post">
        {posts?.length > 0 ? (
          // if : 찾은 게시물이 있으면
          posts?.map((post) => <PostBox post={post} key={post.id} />)
        ) : (
          // else : 찾은 게시물이 없으면
          <div className="post__no-posts">
            <div className="posts__text">まだ投稿がありません</div>
          </div>
        )}
      </div>
    </div>
  );
}
