import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import MESSAGE from "../../constants/message";
import { useModal } from "../../contexts/modal.context";
import { User, useAuthStore } from "../../stores/auth.store";
import { Validator } from "../../utils/validateSignup";
import Button from "../atom/Button";
import Input from "../atom/Input";

function LoginForm() {
  const [userId, setUserId] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isUserId, setIsUserId] = useState<boolean>(false);
  const { putUser } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const modal = useModal();

  const { mutate: login } = useMutation({
    mutationFn: (data: Pick<User, "id" | "password">) => api.auth.logIn(data),
    onSuccess: async (data) => {
      await api.auth.setAccessToken(data.accessToken);
      delete data.accessToken;
      putUser(data);
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      navigate("/");
    },
    onError: () => modal.open({ title: MESSAGE.ERROR_MESSAGE.login }),
  });

  useEffect(() => {
    if (isUserId && passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [isUserId]);

  const passwordInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-[480px] min-h-[700px] mx-auto flex flex-col justify-center gap-y-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">로그인</h1>
        <Button onClick={() => navigate("/signup")}>회원가입</Button>
      </div>
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
          const userInfo = { id: userId, password: userPassword };
          login(userInfo);
        }}
        validator={Validator.signup.userPassword}
      />
    </div>
  );
}

export default LoginForm;
