import AuthContext from "context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";

import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function PostForm() {
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(""); // URL 인코딩된 데이터
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // 이미지를 여러번 업로드 하지 못하게

  const [tags, setTags] = useState<string[]>([]);
  const { user } = useContext(AuthContext); // * context 가져오기

  // 이미지 올리기
  const handleFileUpload = (e: any) => {
    // 올린 이미지 파일이 file에 담겨있다.
    const {
      target: { files },
    } = e;
    const file = files?.[0];

    const fileReader = new FileReader();

    // File이나 Blob을 읽어와서 해당 파일의 데이터를 Data URL로 변환
    fileReader?.readAsDataURL(file); // 이 데이터는 이후 onloadend 이벤트 핸들러에 의해 자동으로 처리된다.

    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget; // Data URL이 얻어지고, 이 데이터 URL은
      setImageFile(result); // setImageFile(result);를 통해 상태인 imageFile에 저장
    };
  };

  const onSubmit = async (e: any) => {
    setIsSubmitting(true);

    const key = `${user?.uid}/${uuidv4()}`; // 고유한 키를 생성 :  Firebase Storage에서 이미지를 저장할 경로
    const storageRef = ref(storage, key); // Firebase Storage에서 이미지를 저장할 참조를 생성

    e.preventDefault(); // * form이 넘어 가지 않게

    try {
      // 이미지 먼저 업로드
      let imageFile = "";

      // 업로드된 이미지가 있으면
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, "data_url");
        imageFile = await getDownloadURL(data?.ref);
      }

      // 업로드된 이미지의 download url 업데이트

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
        /* 6. 이미지 Url */
        imageFile: imageFile,
      });
      setTags([]);
      setHashTag("");
      setContent("");
      toast.success(" ✏️ 게시글이 작성되었습니다!");
      setIsSubmitting(false);
      setImageFile(null);
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

  const handleDeleteImage = () => {
    setImageFile(null); // 인코딩된 url이 저장된 imageFile을 초기화하면 이미지는 사라짐
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
          placeholder="ハッシュタグ + スペースバー"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyUp} // space를 눌렀을 떄로 지정해 놓았다.
          value={hashTag}
        />
      </div>

      <div className="post-form__submit-area">
        <div className="post-form__image-area">
          {/* 2. label : 이미지 추가 아이콘 */}
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>

          {/* 3. input_file : 이미지 추가 */}
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*" // 사용자가 파일을 선택할 때 이미지 파일만 선택할 수 있도록 지정
            onChange={handleFileUpload}
            className="hidden"
          />

          {imageFile && (
            <div className="post-form__attachment">
              <img src={imageFile} alt="attachment" width={100} height={100} />
              <button
                className="post-form__clear-btn"
                type="button"
                onClick={handleDeleteImage}
              >
                X
              </button>
            </div>
          )}
        </div>

        {/* 4. input_submit : Tweet 버튼 */}
        <input
          type="submit"
          value="Tweet"
          className="post-form__submit-btn"
          disabled={isSubmitting} // 이미지는 1개만 업로드 할 수 있게
        />
      </div>
    </form>
  );
}
