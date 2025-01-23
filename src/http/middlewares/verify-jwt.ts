import { FastifyReply, FastifyRequest } from "fastify";

export const verifyJWT = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await req.jwtVerify();
  } catch (error) {
    return res.status(409).send({ message: "Unauthorized! ❌" });
  }
};
