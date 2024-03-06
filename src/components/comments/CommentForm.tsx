import { PostProps } from "pages/home";
import { useState } from "react";

export interface CommentProps {
  post: PostProps | null; // post를 작성할 때의 interface와 동일하다

  /* export interface PostProps {
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
} */
}

export default function CommentForm({ post }: CommentProps) {
  const [comment, setComment] = useState<string>("");

  const onSubmit = () => {};
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value, name },
    } = e;

    if (name === "comment") {
      setComment(value);
    }
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        name="comment"
        id="comment"
        required
        placeholder="コメントを入力してください。"
        onChange={onChange}
        value={comment}
      />
      <div className="post-form__submit-area">
        <div />
        <input
          type="submit"
          value="Comment"
          className="post-form__submit-btn"
          disabled={!comment}
        />
      </div>
    </form>
  );
}
