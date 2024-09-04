import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef, useState } from "react";
import api from "../api/api";
import EditIcon from "../assets/edit.svg?react";
import Button from "../components/atom/Button";
import Input from "../components/atom/Input";
import { User } from "../stores/auth.store";
import { Validator } from "../utils/validateSignup";

function UserPage() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: user } = useQuery<User>({
    queryKey: ["userInfo"],
    queryFn: async (): Promise<User> => {
      const info = await api.auth.getUserInfo();
      setNickname(info.nickname);
      setAvatar(info.avatar ? (info.avatar as File) : null);
      return info;
    },
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: (data: { avatar: File; nickname: string }) =>
      api.auth.updateProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["userInfo"] }),
  });

  const handleImageClick = () => {
    if (isEdit && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);

      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);
    }
  };

  const handleSave = () => {
    const data: { avatar: File; nickname: string } = {
      avatar: avatar as File,
      nickname,
    };

    updateProfile(data);
    setIsEdit(!isEdit);
  };

  return (
    <div className="relative w-full max-w-[400px] h-[200px] mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center w-full h-full p-6">
        <img
          className="object-cover w-20 h-20 rounded-full hover:cursor-pointer hover:brightness-90 active:brightness-75"
          onClick={handleImageClick}
          src={previewAvatar ? previewAvatar : user?.avatar ?? "/"}
          alt="User avatar"
        />
        <div className="flex flex-col justify-center w-full h-full ml-4 gap-y-2">
          {isEdit ? (
            <>
              <Input
                label="닉네임"
                name="닉네임"
                type="text"
                inputValue={nickname}
                setInputValue={setNickname}
                validator={Validator.signup.nickName}
                formType="signup"
                required
              />

              <Button onClick={handleSave} size={"sm"}>
                확인
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-gray-900">
                {user ? user.nickname : ""}
              </h2>
              <p className="text-sm text-gray-600">{user ? user.id : ""}</p>
            </>
          )}
        </div>
      </div>
      <EditIcon
        className="absolute cursor-pointer top-3 right-3"
        onClick={() => setIsEdit(!isEdit)}
      />
    </div>
  );
}

export default UserPage;
