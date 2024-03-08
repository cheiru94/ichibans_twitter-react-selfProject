import AuthContext from "context/AuthContext";
import { PostProps } from "pages/home";
import { useContext } from "react";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import FollowingBox from "components/following/FollowingBox";
import useTranslation from "hooks/useTranslation";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext); // * context 가져오기
  const t = useTranslation();

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

  // 좋아요 토굴
  const toggleLike = async () => {
    const postRef = doc(db, "posts", post?.id);

    if (user?.uid && post?.likes?.includes(user?.uid)) {
      // 좋아요를 이미 눌렀을 경우 -> 좋아요 취소
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid), // 현재 로그인 한 계정의 uid를 삭제
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0, // 기존 값이 있으면 -1 , 없으면 그대로 0
      });
    } else {
      // 좋아요를 안 눌렀을 경우 -> 좋아요
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid), // 현재 로그인 한 계정의 uid를 추가
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1, // 기존 값이 있으면 +1 , 없으면 1
      });
    }
  };

  return (
    /* POST BOX */
    <div className="post__box" key={post?.id}>
      {/* 각 POST 마다 해당 id값의 링크 연결 */}

      {/* 프로필 전체를 감싸는 div */}
      <div className="post__box-profile">
        {/* 1. flex되는 부분 */}
        <div className="post__flex">
          {post?.profileUrl ? (
            <img
              src={post?.profileUrl}
              alt="profile"
              className="post__box-profile-img"
            />
          ) : (
            <FaUserCircle className="post__box-profile-icon" />
          )}
          <div className="post__flex--between">
            <div className="post__flex">
              <div className="post__email">{post?.email}</div>
              <div className="post__createdAt">{post?.createdAt}</div>
            </div>
            <FollowingBox post={post} />
          </div>
        </div>

        {/* 2. 내용 */}
        {/* 2.1. content */}
        <Link to={`/posts/${post?.id}`}>
          <div className="post__box-content">{post?.content}</div>

          {/* 이미지 */}
          {post?.imageUrl && (
            <div className="post__image-div">
              <img
                className="post__image"
                src={post?.imageUrl}
                alt="postImage"
                width={200}
                height={200}
              />
            </div>
          )}

          {/* 2.2 hashTag */}
          <div className="post-form__hashTag-outputs">
            {post?.hashTags?.map((tag, index) => (
              <span className="post-form__hashtags-tag" key={index}>
                #{tag}
              </span>
            ))}
          </div>
        </Link>
      </div>

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
              {t("BUTTON_DELETE")}
            </button>
            {/* 3.2 Edit */}
            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post.id}`}>{t("BUTTON_EDIT")}</Link>
            </button>
          </>
        )}

        {/* 3.3 하트*/}
        <button type="button" className="post__likes" onClick={toggleLike}>
          {/* 유저가 있고, post likes에 해당 user의 uid가 있으면 색칠 하트 */}
          {user && post?.likes?.includes(user?.uid) ? (
            <AiFillHeart />
          ) : (
            <AiOutlineHeart />
          )}
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
