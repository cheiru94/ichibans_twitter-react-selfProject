import { FiImage } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

import { Link } from "react-router-dom";

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
}

const posts: PostProps[] = [
  {
    id: "1",
    email: "test@test.com",
    content: "내용 입니다.",
    createdAt: "2024-01-26",
    uid: "123123",
  },
  {
    id: "2",
    email: "test@test.com",
    content: "내용 입니다.",
    createdAt: "2024-01-26",
    uid: "123123",
  },
  {
    id: "3",
    email: "test@test.com",
    content: "내용 입니다.",
    createdAt: "2024-01-26",
    uid: "123123",
  },
  {
    id: "4",
    email: "test@test.com",
    content: "내용 입니다.",
    createdAt: "2024-01-26",
    uid: "123123",
  },
  {
    id: "5",
    email: "test@test.com",
    content: "내용 입니다.",
    createdAt: "2024-01-26",
    uid: "123123",
  },
  {
    id: "6",
    email: "test@test.com",
    content: "내용 입니다.",
    createdAt: "2024-01-26",
    uid: "123123",
  },
];

export default function Homepage() {
  //
  const handleFileUpload = () => {};

  //
  const handleDelete = () => {};

  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For you</div>
        <div className="home__tab">Follwing</div>
      </div>

      {/* POST FORM 태그 */}
      <form className="post-form">
        <textarea
          className="post-form__textarea"
          required
          name="content"
          id="content"
          placeholder="what is happening"
        ></textarea>
        <div className="post-form__submit-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <input
            type="submit"
            value="Tweet"
            className="post-form__submit-btn"
          />
        </div>
      </form>
      {/* TWEET FORM 태그 */}
      <div className="post">
        {posts?.map((post) => (
          <div className="post__box" key={post?.id}>
            <Link to={`/posts/${post?.id}`}>
              <div className="post__box-profile">
                {/* flex되는 부분 */}
                <div className="post__flex">
                  {post.profileUrl ? (
                    <img
                      src={post?.profileUrl}
                      alt="profile"
                      className=""
                      post__box-profile-icon
                    />
                  ) : (
                    <FaCircleUser className="post_box-profile-icon" />
                  )}
                  <div className="post__email">{post?.email}</div>
                  <div className="post__createdAt">{post?.createdAt}</div>
                </div>
                <div className="post__box-content">{post?.content}</div>
              </div>
            </Link>
            {/* post.uid === user.uid 일 떄 */}
            <div className="post__box-footer">
              <>
                <button
                  type="button"
                  className="post__delete"
                  onClick={handleDelete}
                >
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
        ))}
      </div>
    </div>
  );
}
