import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
export default function PostForm() {
  //

  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext); // * context 가져오기
  const handleFileUpload = () => {};

  const onSubmit = async (e: any) => {
    e.preventDefault(); // * form이 넘어 가지 않게

    try {
      // db : Firestore 데이터베이스를 나타내는 객체
      await addDoc(collection(db, "posts"), {
        //  addDoc(collection(데이터베이스 , 컬렉션 이름) , {생성할 데이터} )
        // Firestore app에서 생성한 Firestore db와 컬렉션 이름을 적는다.

        /* 1. 내용 */
        content: content, // 입력 받는 내용
        /* 2. createAt */
        createdAt: new Date()?.toLocaleDateString("ko", {
          // toLocaleDateString까지 넣어줘야 날짜를 인식한다
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        /* 3. 작성자 */
        uid: user?.uid,
        /* 4. 이메일 */
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
