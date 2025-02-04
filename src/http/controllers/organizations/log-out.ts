import { FastifyReply, FastifyRequest } from "fastify";

export const logOut = async (req: FastifyRequest, res: FastifyReply) => {
  return res
    .clearCookie("refreshToken", {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: true,
    })
    .status(200)
    .send();
};
