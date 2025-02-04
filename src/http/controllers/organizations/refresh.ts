import { FastifyReply, FastifyRequest } from "fastify";

export const refreshToken = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await req.jwtVerify({ onlyCookie: true });
    const token = await res.jwtSign({}, { sign: { sub: req.user.sub } });
    const refreshToken = await res.jwtSign(
      {},
      { sign: { sub: req.user.sub, expiresIn: "7d" } }
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({ token });
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};
