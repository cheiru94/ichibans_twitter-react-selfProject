import { FiImage } from "react-icons/fi";

export default function PostForm() {
  //
  const handleFileUpload = () => {};
  return (
    /* POST_FORM */
    <form className="post-form">
      {/* 1. textarea : 입력받을 내용 */}
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="何が起こっているの?"
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
