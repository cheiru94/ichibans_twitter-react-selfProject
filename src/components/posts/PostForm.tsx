import { FiImage } from "react-icons/fi";

export default function PostForm() {
  //
  const handleFileUpload = () => {};
  return (
    <form className="post-form">
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="what is happening"
      ></textarea>
      <div className="post-form__submit-area">
        {/* 이미지 추가 아이콘 */}
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        {/* 이미지 추가 */}
        <input
          type="file"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        {/* Tweet 버튼 */}
        <input type="submit" value="Tweet" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
