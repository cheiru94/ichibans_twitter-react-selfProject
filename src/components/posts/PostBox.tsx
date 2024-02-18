import AuthContext from "context/AuthContext";
import { PostProps } from "pages/home";
import { useContext } from "react";
import { FaCircleUser, FaHeart, FaRegComment } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext); // * context 가져오기
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirm = window.confirm("ほんまに消してええんかい?");
    if (confirm) {
      try {
        if (post) {
          const docRef = doc(db, "posts", post?.id);
          await deleteDoc(docRef);
          toast.success("削除しました!");
          navigate("/");
        }
      } catch (e: any) {
        console.log(e);
      }
    }
  };
  return (
    /* POST BOX */
    <div className="post__box" key={post?.id}>
      {/* 각 POST 마다 해당 id값의 링크 연결 */}
      <Link to={`/posts/${post?.id}`}>
        {/* 프로필 전체를 감싸는 div */}
        <div className="post__box-profile">
          {/* 1. flex되는 부분 */}
          <div className="post__flex">
            {post.profileUrl ? (
              /* 1.1. 유저 이미지  */
              <img
                src={post?.profileUrl}
                alt="profile"
                className="post__box-profile-img"
              />
            ) : (
              <FaCircleUser className="post__box-profile-icon" />
            )}
            {/* 1.2. 이메일 */}
            <div className="post__email">{post?.email}</div>
            {/* 1.3. 날짜 */}
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>

          {/* 2. 내용 */}
          {/* 2.1. content */}
          <div className="post__box-content">{post?.content}</div>
          {/* 2.2 hashTag */}
          <div className="post-form__hashTag-outputs">
            {post?.hashTags?.map((tag, index) => (
              <span className="post-form__hashtags-tag">#{tag}</span>
            ))}
          </div>
        </div>
      </Link>

      {/* 3. post footer */}
      {/* post.uid === user.uid 일 떄 */}
      <div className="post__box-footer">
        {user?.uid === post?.uid && (
          <>
            {/* 3.1 Delete */}
            <button
              type="button"
              className="post__delete"
              onClick={handleDelete}
            >
              Delete
            </button>
            {/* 3.2 Edit */}
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post.id}`}>Edit</Link>
            </button>
          </>
        )}

        {/* 3.3 하트*/}
        <button type="button" className="post__likes">
          <FaHeart />
          {post?.likeCount || 0}
        </button>
        {/* 3.4 코맨트 */}
        <button type="button" className="post__comments">
          <FaRegComment />
          {post.comments?.length || 0}
        </button>
      </div>
    </div>
  );
}
