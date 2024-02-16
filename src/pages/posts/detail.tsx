import Loader from "components/loader/Loader";
import PostBox from "components/posts/PostBox";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { IoMdArrowBack } from "react-icons/io";

export default function PostDetail() {
  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const getPost = useCallback(async () => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
    }
  }, [id]);

  useEffect(() => {
    if (id) getPost();
  }, [getPost, id]);

  return (
    <div className="post">
      <div className="post__header">
        <button
          className="post__header-btn"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoMdArrowBack />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  );
}
