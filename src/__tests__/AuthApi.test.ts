import axios from "axios";
import Cookies from "js-cookie";
import Auth from "../api/auth.api";

jest.mock("axios");
jest.mock("js-cookie");

describe("Auth API 테스트", () => {
  let auth: Auth;
  let mockAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    mockAxios = axios as jest.Mocked<typeof axios>;
    auth = new Auth(mockAxios);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("회원가입 테스트 (signUp)", () => {
    it("회원가입 요청 성공", async () => {
      const userData = {
        id: "testUser",
        password: "password123",
        nickname: "tester",
      };
      const mockResponse = { data: { message: "회원가입 성공" } };

      mockAxios.post.mockResolvedValue(mockResponse);

      const result = await auth.signUp(userData);

      expect(mockAxios.post).toHaveBeenCalledWith("/register", userData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("로그인 테스트 (logIn)", () => {
    it("로그인 요청 성공", async () => {
      const loginData = { id: "testUser", password: "password123" };
      const mockResponse = { data: { token: "mockToken" } };

      mockAxios.post.mockResolvedValue(mockResponse);

      const result = await auth.logIn(loginData);

      expect(mockAxios.post).toHaveBeenCalledWith("/login", loginData);
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("유저 정보 가져오기 테스트 (getUserInfo)", () => {
    it("유저 정보 가져오기 요청 성공", async () => {
      const mockResponse = { data: { id: "testUser", nickname: "tester" } };

      mockAxios.get.mockResolvedValue(mockResponse);

      const result = await auth.getUserInfo();

      expect(mockAxios.get).toHaveBeenCalledWith("/user");
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("프로필 업데이트 테스트 (updateProfile)", () => {
    it("프로필 업데이트 요청 성공", async () => {
      const file = new File(["avatar"], "avatar.png", { type: "image/png" });
      const updateData = { avatar: file, nickname: "updatedTester" };
      const mockResponse = { data: { message: "프로필 업데이트 성공" } };

      mockAxios.patch.mockResolvedValue(mockResponse);

      const result = await auth.updateProfile(updateData);

      expect(mockAxios.patch).toHaveBeenCalledWith("/profile", updateData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe("액세스 토큰 설정 테스트 (setAccessToken)", () => {
    it("액세스 토큰 설정 성공", () => {
      const token = "mockToken";

      auth.setAccessToken(token);

      expect(mockAxios.defaults.headers.common["Authorization"]).toBe(
        `Bearer ${token}`
      );
      expect(Cookies.set).toHaveBeenCalledWith("accessToken", token, {
        expires: 1 / 96,
      });
    });
  });
});
