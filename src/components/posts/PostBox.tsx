import { PostProps } from "pages/home";
import { FaCircleUser, FaHeart, FaRegComment } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  //
  const handleDelete = () => {};
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
          <div className="post__box-content">{post?.content}</div>
        </div>
      </Link>

      {/* 3. post footer */}
      {/* post.uid === user.uid 일 떄 */}
      <div className="post__box-footer">
        <>
          {/* 3.1 Delete */}
          <button type="button" className="post__delete" onClick={handleDelete}>
            Delete
          </button>
          {/* 3.2 Edit */}
          <button type="button" className="post__edit">
            <Link to={`/posts/edit/${post.id}`}>Edit</Link>
          </button>
        </>
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
