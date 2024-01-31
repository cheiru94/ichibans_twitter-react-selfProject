import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
export default function PostForm() {
  //

  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const handleFileUpload = () => {};

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        content: content, // 입력 받는 내용
        createAt: new Date()?.toLocaleDateString("ko", {
          // toLocaleDateString까지 넣어줘야 날짜를 인식한다
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        uid: user?.uid,
        email: user?.email,
      });
      setContent("");
      toast.success(" ✏️ 게시글이 작성되었습니다!");
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
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
