import { useState } from "react";

type formDataType = {
  userId: string;
  userPassword: string;
  verifyPassword: string;
  nickName: string;
  avatar: string;
};

function SignupForm() {
  const [formData, setFormData] = useState<formDataType>({
    userId: "",
    userPassword: "",
    verifyPassword: "",
    nickName: "",
    avatar: "",
  });
  return <div>SignupForm</div>;
}

export default SignupForm;
