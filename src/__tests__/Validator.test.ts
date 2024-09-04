import MESSAGE from "../constants/message";
import { Validator } from "../utils/validateSignup";

describe("Validator.signup", () => {
  describe("유저 아이디 유효성 검사", () => {
    const userIdTestCases = [
      { userId: "validUser123", expected: null, 설명: "유효한 유저 아이디" },
      {
        userId: "invalid!User",
        expected: MESSAGE.ERROR_MESSAGE.userId,
        설명: "특수 문자가 포함된 유저 아이디",
      },
      { userId: "", expected: null, 설명: "빈 유저 아이디" },
    ];

    userIdTestCases.forEach(({ userId, expected, 설명 }) => {
      test(`${설명}의 경우 ${
        expected === null ? "null" : "에러 메시지"
      }를 반환해야 함`, () => {
        expect(Validator.signup.userId(userId)).toBe(expected);
      });
    });
  });

  describe("유저 비밀번호 유효성 검사", () => {
    const passwordTestCases = [
      {
        password: "Password123",
        expected: null,
        설명: "유효한 비밀번호",
      },
      {
        password: "Password",
        expected: MESSAGE.ERROR_MESSAGE.password,
        설명: "숫자가 없는 비밀번호",
      },
      {
        password: "12345678",
        expected: MESSAGE.ERROR_MESSAGE.password,
        설명: "문자가 없는 비밀번호",
      },
      {
        password: "Pass12",
        expected: MESSAGE.ERROR_MESSAGE.password,
        설명: "8자 미만의 비밀번호",
      },
    ];

    passwordTestCases.forEach(({ password, expected, 설명 }) => {
      test(`${설명}의 경우 ${
        expected === null ? "null" : "에러 메시지"
      }를 반환해야 함`, () => {
        expect(Validator.signup.userPassword(password)).toBe(expected);
      });
    });
  });

  describe("비밀번호 확인 유효성 검사", () => {
    const verifyPasswordTestCases = [
      {
        userPassword: "Password123",
        verifyPassword: "Password123",
        expected: null,
        설명: "비밀번호가 일치하는 경우",
      },
      {
        userPassword: "Password123",
        verifyPassword: "Password456",
        expected: MESSAGE.ERROR_MESSAGE.verifyPassword,
        설명: "비밀번호가 일치하지 않는 경우",
      },
      {
        userPassword: "Password123",
        verifyPassword: undefined,
        expected: MESSAGE.ERROR_MESSAGE.verifyPassword,
        설명: "비밀번호 확인이 없는 경우",
      },
    ];

    verifyPasswordTestCases.forEach(
      ({ userPassword, verifyPassword, expected, 설명 }) => {
        test(`${설명}의 경우 ${
          expected === null ? "null" : "에러 메시지"
        }를 반환해야 함`, () => {
          expect(
            Validator.signup.verifyPassword(userPassword, verifyPassword)
          ).toBe(expected);
        });
      }
    );
  });

  describe("닉네임 유효성 검사", () => {
    const nickNameTestCases = [
      {
        nickName: "ValidNickName",
        expected: null,
        설명: "유효한 닉네임",
      },
      {
        nickName: "Invalid NickName",
        expected: MESSAGE.ERROR_MESSAGE.nickName,
        설명: "공백이 포함된 닉네임",
      },
      { nickName: "", expected: null, 설명: "빈 닉네임" },
    ];

    nickNameTestCases.forEach(({ nickName, expected, 설명 }) => {
      test(`${설명}의 경우 ${
        expected === null ? "null" : "에러 메시지"
      }를 반환해야 함`, () => {
        expect(Validator.signup.nickName(nickName)).toBe(expected);
      });
    });
  });

  describe("폼 유효성 검사", () => {
    const formTestCases = [
      {
        data: {
          userId: "validUser123",
          userPassword: "Password123",
          verifyPassword: "Password123",
        },
        expectedError: null,
        설명: "유효한 폼 데이터",
      },
      {
        data: {
          userId: "invalid!User",
          userPassword: "Password123",
          verifyPassword: "Password123",
        },
        expectedError: MESSAGE.ERROR_MESSAGE.userId,
        설명: "유효하지 않은 유저 아이디",
      },
      {
        data: {
          userId: "validUser123",
          userPassword: "Password",
          verifyPassword: "Password",
        },
        expectedError: MESSAGE.ERROR_MESSAGE.password,
        설명: "숫자가 없는 비밀번호",
      },
      {
        data: {
          userId: "validUser123",
          userPassword: "Password123",
          verifyPassword: "Password456",
        },
        expectedError: MESSAGE.ERROR_MESSAGE.verifyPassword,
        설명: "비밀번호가 일치하지 않는 경우",
      },
    ];

    formTestCases.forEach(({ data, expectedError, 설명 }) => {
      test(`${설명}의 경우 ${
        expectedError ? "에러가 발생해야" : "에러가 발생하지 않아야"
      } 함`, () => {
        if (expectedError) {
          expect(() => Validator.signup.form(data)).toThrow(expectedError);
        } else {
          expect(() => Validator.signup.form(data)).not.toThrow();
        }
      });
    });
  });
});
