import { atom } from "recoil";

export type LanguageType = "ko" | "jp";

export const languageState = atom<LanguageType>({
  key: "languageState",
  default: (localStorage.getItem("language") as LanguageType) || "ko",
});
