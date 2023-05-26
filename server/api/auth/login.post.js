import { sendError } from "h3";
import { getUserByUsername } from "../../db/users";
import bcrypt from "bcrypt";
import { generateTokens, sendRefreshToken } from "../../utils/jwt";
import { userTransformer } from "../../transformers/user";
import { createRefreshToken } from "../../db/refreshTokens";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    const { username, password } = body

    if (!username || !password) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "invalid params"
        }))
    }

    const user = await getUserByUsername(username)

    if (!user) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "username or password is invalid"
        }))
    }

    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if (!doesThePasswordMatch) {
        return sendError(event, createError({
            statusCode: 400,
            statusMessage: "username or password is invalid"
        }))
    }

    const { accessToken, refreshToken } = generateTokens(user)

    await createRefreshToken({
       token: refreshToken,
       userId: user.id 
    })

    sendRefreshToken(event, refreshToken)

    return {
        accessToken,
        user: userTransformer(user)
    }
})