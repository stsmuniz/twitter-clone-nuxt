import { sendError } from "h3";
import { getRefreshTokenByToken } from "../../db/refreshTokens";
import { decodeRefreshToken, generateTokens } from "../../utils/jwt";
import { getUserById } from "../../db/users"

export default defineEventHandler(async (event) => {

    const cookies = parseCookies(event)

    const refreshToken = cookies.refreshToken

    if (!refreshToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken)

    
    if (!rToken) {
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh token is invalid'
        }))
    }

    const token = decodeRefreshToken(refreshToken)

    try {
        const user = await getUserById(token.userId)

        const { accessToken } = generateTokens(user)

        return {
            accessToken
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))
    }
})