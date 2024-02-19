import { useEffect, useState, useContext } from "react";
import PostHeader from "components/posts/PostHeader";
import { FiImage } from "react-icons/fi";
import AuthContext from "context/AuthContext";
import {
  ref,
  deleteObject,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
// import useTranslation from "hooks/useTranslation";

import { v4 as uuidv4 } from "uuid";
import { storage } from "firebaseApp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const STORAGE_DOWNLOAD_URL_STR = "https://firebasestorage.googleapis.com";

export default function ProfileEdit() {
  const [displayName, setDisplayName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const t = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    setDisplayName(value);
  };

  const onSubmit = async (e: any) => {
    /* 현재 사용자의 UID와 UUID를 조합하여 고유한 경로를 생성 */
    //  이미지 삭제와 업로드를 하기 위해 storageRef가 필요
    let key = `${user?.uid}/${uuidv4()}`; // Firebase Storage에서 파일을 저장할 경로를 생성
    const storageRef = ref(storage, key); //  Firebase Storage에서 파일을 참조하기 위한 참조(Reference)를 생성 : storage는 Firebase Storage의 인스턴스를 나타내며, key는 위에서 생성한 파일 경로
    // 이렇게 생성된 storageRef를 사용하면 해당 경로에 파일을 저장하거나 해당 파일을 읽어올 수 있다.

    let newImageUrl = null;

    e.preventDefault();

    try {
      // 기존 사진 지우고 새로운 사진 업로드
      if (
        user?.photoURL &&
        user?.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR)
      ) {
        // 🟡  기존 이미지가 있다면, 해당 이미지를 삭제
        const imageRef = ref(storage, user?.photoURL);
        if (imageRef) {
          //  Firebase Storage에서 파일을 삭제
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
        }

        // 🟡  새로운 파일 있다면 업로드
        if (imageUrl) {
          const data = await uploadString(storageRef, imageUrl, "data_url"); // 문자열을 Firebase Storage에 업로드, 데이터 URL 형식의 이미지 파일을 업로드
          newImageUrl = await getDownloadURL(data?.ref); // 업로드된 파일의 다운로드 URL가져오기
        }

        // ３。updateProfile 호출
        if (user) {
          await updateProfile(user, {
            displayName: displayName || "",
            photoURL: newImageUrl || "",
          })
            .then(() => {
              toast.success("プロフィールが更新されました。");
              navigate("/profile");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageUrl(result);
    };
  };

  const handleDeleteImage = () => {
    setImageUrl(null);
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageUrl(user?.photoURL);
    }
    if (user?.displayName) {
      setDisplayName(user?.displayName);
    }
  }, [user?.displayName, user?.photoURL]);

  return (
    <div className="post">
      <PostHeader />
      <form className="post-form" onSubmit={onSubmit}>
        <div className="post-form__profile">
          <input
            type="text"
            name="displayName"
            className="post-form__input"
            // placeholder={t("NAME_PLACEHOLDER")}
            onChange={onChange}
            value={displayName}
          />
          {imageUrl && (
            <div className="post-form__attachment">
              <img src={imageUrl} alt="attachment" width={100} height={100} />
              <button
                type="button"
                onClick={handleDeleteImage}
                className="post-form__clear-btn"
              >
                x{/* {t("BUTTON_DELETE")} */}
              </button>
            </div>
          )}

          <div className="post-form__submit-area">
            <div className="post-form__image-area">
              <label className="post-form__file" htmlFor="file-input">
                <FiImage className="post-form__file-icon" />
              </label>
            </div>
            <input
              type="file"
              name="file-input"
              id="file-input"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <input
              type="submit"
              // value={t("BUTTON_EDIT_PROFILE")}
              className="post-form__submit-btn"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
