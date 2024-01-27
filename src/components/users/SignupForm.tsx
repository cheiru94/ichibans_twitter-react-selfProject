/* 🟡 회원가입 로직 작성*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";

import { toast } from "react-toastify";

export default function SignupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      /* auth : Firebase Authentication 서비스의 인증 객체 */
      const auth = getAuth(app); // FirebaseApp에서 app 변수로 인증객체 생성하기 -> getAuth()
      console.log("auth: ", auth);
      /*  새로운 사용자를 등록하는 함수 : 새로운 사용자가 생성되고 Firebase Authentication 서비스에 등록*/
      await createUserWithEmailAndPassword(auth, email, password); // auth라는 인증 객체를 넣어야 createUserWithEmailAndPassword 메서드에 대한 접근 권한이 생긴다.
      navigate("/"); // 로그인 했다면 home 화면으로 전환

      toast.success("会員登録を完了しました");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // React의 이벤트 시스템은 비동기적으로 동작

    if (name === "email") {
      setEmail(value);
      const validRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!value?.match(validRegex)) {
        setError("メールの形式が正しくありません");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);
      if (value?.length < 8) {
        setError("８文字以上を入力して下さい");
      } else if (value !== password) {
        setError("パスワードが正しくありません");
      } else {
        setError("");
      }
    }

    if (name === "password_confirmation") {
      setPasswordConfirmation(value);
      if (value?.length < 8) {
        setError("８文字以上を入力して下さい");
      } else if (value !== password) {
        setError("パスワードが正しくありません");
      } else {
        setError("");
      }
    }
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      {/* 1. 회원등록 문구 */}
      <div className="form__title">会員登録</div>
      {/* 2. 이메일 */}
      <div className="form__block">
        <label htmlFor="email">メール</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      {/* 3. 비밀번호 */}
      <div className="form__block">
        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      {/* 4. 비밀번호 재확인  */}
      <div className="form__block">
        <label htmlFor="password_confirmation">パスワード再確認</label>
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={onChange}
          required
        />
      </div>
      {/* 에러 발생 시 */}
      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        もう、アカウントがありますか？
        <Link to="/users/login" className="form__link">
          ログイン
        </Link>
      </div>
      <div className="form__block">
        <button
          type="submit"
          className="form__btn-submit"
          disabled={error.length > 0} // 에러시 비활성화
        >
          新規加入
        </button>
      </div>
    </form>
  );
}
