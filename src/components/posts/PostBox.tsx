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
    <div className="post__box" key={post?.id}>
      <Link to={`/posts/${post?.id}`}>
        <div className="post__box-profile">
          {/* flex되는 부분 */}
          <div className="post__flex">
            {post.profileUrl ? (
              /* 1. 유저 이미지  */
              <img
                src={post?.profileUrl}
                alt="profile"
                className="post__box-profile-img"
              />
            ) : (
              <FaCircleUser className="post__box-profile-icon" />
            )}
            {/* 2. 이메일 */}
            <div className="post__email">{post?.email}</div>
            {/* 3. 날짜 */}
            <div className="post__createdAt">{post?.createdAt}</div>
          </div>
          {/* 4. 내용 */}
          <div className="post__box-content">{post?.content}</div>
        </div>
      </Link>
      {/* post.uid === user.uid 일 떄 */}
      <div className="post__box-footer">
        <>
          <button type="button" className="post__delete" onClick={handleDelete}>
            Delete
          </button>
          <button type="button" className="post__edit">
            <Link to={`/posts/edit/${post.id}`}>Edit</Link>
          </button>
        </>
        <button type="button" className="post__likes">
          <FaHeart />
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post.comments?.length || 0}
        </button>
      </div>
    </div>
  );
}
