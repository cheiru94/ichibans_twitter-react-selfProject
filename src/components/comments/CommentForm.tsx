import AuthContext from "context/AuthContext";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

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
  const { user } = useContext(AuthContext);

  // 10자까지 끊고 그 이후로는 ...
  const truncate = (str: string) => {
    return str?.length > 10 ? str?.substring(0, 10) + "..." : str;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (post && user) {
      const postRef = doc(db, "posts", post?.id);

      const commentObj = {
        comment: comment,
        uid: user?.uid,
        email: user?.email,
        createdAt: new Date()?.toLocaleDateString("ko", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      // 새로운 배열에 코맨트 객체 추가
      await updateDoc(postRef, {
        comments: arrayUnion(commentObj),
      });

      // 댓글 생성 알림
      if (user?.uid !== post?.uid) {
        await addDoc(collection(db, "notifications"), {
          createdAt: new Date()?.toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          uid: post?.uid,
          isRead: false,
          url: `/posts/${post?.id}`,
          content: `"${truncate(
            post?.content
          )}" にコメントが書き込まれました。`,
        });
      }

      toast.success("コメントを作成しました");
      setComment("");

      try {
      } catch (e: any) {
        console.log(e);
      }
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
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
