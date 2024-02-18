import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import { useCallback, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>("");
  const [hashTag, setHashTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();
  const handleFileUpload = () => {};

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, "posts", params.id);
      const docSnap = await getDoc(docRef);
      // docSnap만으로는 원하는 데이터를 사용할 수 없기 때문에 .data()를 붙여서 가져오고 싶은 데이터를 불러올 수 있다.
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault(); // * form이 넘어 가지 않게
    try {
      // updateDoc : 업데이트
      if (post) {
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          content: content,
          hashTags: tags,
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

  useEffect(() => {
    if (params.id) {
      getPost();
    }
  }, [getPost, params.id]);

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
        <input type="submit" value="修正" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
