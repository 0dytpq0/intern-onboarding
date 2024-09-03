import { useEffect, useRef, useState } from "react";
import { useModal } from "../../contexts/modal.context";
import { Validator } from "../../utils/validateSignup";
import Input from "../atom/Input";

function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isUserId, setIsUserId] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modal = useModal();

  useEffect(() => {
    if (isUserId && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isUserId]);

  const passwordInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-[480px] min-h-[700px] mx-auto flex flex-col justify-center gap-y-4">
      <h1 className="text-2xl font-bold">로그인</h1>
      <Input
        formType="login"
        inputValue={userId}
        setInputValue={setUserId}
        label="아이디"
        type="text"
        handleSubmit={() => {
          setIsUserId(true);
        }}
        validator={Validator.signup.userId}
      />
      <Input
        formType="login"
        inputValue={userPassword}
        setInputValue={setUserPassword}
        label="비밀번호"
        type="password"
        ref={passwordInputRef}
        innerClassName={`${isUserId ? "visible" : "invisible"} `}
        handleSubmit={() => {
          // login.mutate(
          //   { userId, userPassword },
          //   {
          //     onSuccess: () => {
          //       router.push("/");
          //     },
          //     onError: () => {
          //       modal.open({ title: MESSAGE.ERROR_MESSAGE.login });
          //     },
          //   }
          // );
        }}
        validator={Validator.signup.userPassword}
      />
    </div>
  );
}

export default LoginForm;
