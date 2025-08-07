import JWT from "jsonwebtoken";

export const generateToken = (payload: string): string => {
  const userToken = JWT.sign(
    { userId: payload },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: "15h",
    }
  );
  return userToken;
};
