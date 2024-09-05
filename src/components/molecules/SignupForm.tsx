import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { User } from "../../stores/auth.store";
import { Validator } from "../../utils/validateSignup";
import Button from "../atom/Button";
import Input from "../atom/Input";

type formDataType = {
  userId: string;
  userPassword: string;
  verifyPassword: string;
  nickName: string;
};

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataType>({
    userId: "",
    userPassword: "",
    verifyPassword: "",
    nickName: "",
  });

  const { mutate: signup } = useMutation({
    mutationFn: (userInfo: Omit<User, "avatar">) => api.auth.signUp(userInfo),
    onSuccess: () => navigate("/"),
  });

  const handleChange = (name: keyof formDataType, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const userInfo = {
      id: formData.userId,
      password: formData.userPassword,
      nickname: formData.nickName,
    };
    Validator.signup.form(formData);
    signup(userInfo);
  };

  return (
    <div className="w-[480px] min-h-[700px] mx-auto flex flex-col items-center justify-center ">
      <h2 className="w-full pt-8 text-3xl font-bold text-center">ID 생성</h2>
      <form
        className="flex flex-col w-full pt-8 gap-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Input
          label="아이디"
          name="userId"
          type="text"
          inputValue={formData.userId}
          setInputValue={(value) => handleChange("userId", value)}
          formType="signup"
          validator={Validator.signup.userId}
          required
        />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          inputValue={formData.userPassword}
          setInputValue={(value) => handleChange("userPassword", value)}
          validator={Validator.signup.userPassword}
          formType="signup"
          required
        />
        <Input
          label="비밀번호 확인"
          name="verifyPassword"
          type="password"
          inputValue={formData.verifyPassword}
          setInputValue={(value) => handleChange("verifyPassword", value)}
          validator={() =>
            Validator.signup.verifyPassword(
              formData.userPassword,
              formData.verifyPassword
            )
          }
          formType="signup"
          required
        />
        <Input
          label="닉네임"
          name="닉네임"
          type="text"
          inputValue={formData.nickName}
          setInputValue={(value) => handleChange("nickName", value)}
          validator={Validator.signup.nickName}
          formType="signup"
          required
        />

        <Button type="submit" size={"lg"}>
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default SignupForm;
