import PostForm from "components/posts/PostForm";
import PostBox from "components/posts/PostBox";

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

/* 🟢 메인 홈페이지 */
export default function Homepage() {
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
        {posts?.map((post) => (
          <PostBox post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
