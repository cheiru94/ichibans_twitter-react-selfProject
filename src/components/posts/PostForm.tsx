import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";

import { toast } from "react-toastify";
export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");

  const [tags, setTags] = useState<string[]>([]);
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
        /* 5. 해시태그 */
        hashTags: tags,
      });
      setTags([]);
      setHashTag("");
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

  const removeTag = (tag: string) => {
    // 삭제 하려는 태그를 제외하고 나머지 태그들을 반환
    setTags(tags?.filter((val) => val !== tag));
  };

  const onChangeHashTag = (e: any) => {
    setHashTag(e.target.value?.trim());
  };

  const handleKeyUp = (e: any) => {
    // 32 = SPACE , 값이 있는 경우에만 태그를 생성
    if (e.keyCode === 32 && e.target.value.trim() !== "") {
      // if 같은 태그가 있다면 에러를 띄움
      // else 태그를 생성함
      if (tags?.includes(e.target.value?.trim())) {
        toast.error("同じタグが存在しています");
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag("");
      }
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
      />
      {/* 2. hashtags: #해시태그 */}
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags.map((tag, index) => (
            <span
              className="post-form__hashtags-tag"
              key={index}
              onClick={() => {
                removeTag(tag);
              }}
            >
              #{tag}
            </span>
          ))}
        </span>
        <input
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="ハッシュタグ　＋　スペースバー"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp} // space를 눌렀을 떄로 지정해 놓았다.
          value={hashTag}
        />
      </div>

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
