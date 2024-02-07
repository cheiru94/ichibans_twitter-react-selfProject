import AuthContext from "context/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const handleFileUpload = () => {};

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault(); // * form이 넘어 가지 않게

    try {
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
        });
        navigate(`/posts/${post?.id}`);
        toast.success("アップデートしました!");
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "content") {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, []);

  return (
    /* POST_FORM */
    <form className="post-form" onSubmit={onSubmit}>
      {/* 1. textarea : 입력받을 내용 */}
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="何が起こっているの?"
        onChange={onChange}
        value={content}
      ></textarea>
      <div className="post-form__submit-area">
        {/* 2. label : 이미지 추가 아이콘 */}
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>

        {/* 3. input_file : 이미지 추가 */}
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* 4. input_submit : Tweet 버튼 */}
        <input type="submit" value="修正" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
