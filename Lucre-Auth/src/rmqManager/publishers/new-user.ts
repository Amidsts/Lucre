import { logger } from "lucre-common"
import { rmq } from "../connection"

type Request = {}
type Response = {}
const config = {}

export async function newUser(params: Request) {
    try {
        (await rmq).publish<Request, Response>(params, config)
    } catch (error) {
        logger.error('Error getting new user', {error})
    }
}

/**
 * {
 *      firstName,
        lastName,
        fullName: `${firstName} ${lastName}`,
        phoneNo,
        email,
        password,
        address,
        dateOfBirth,
 * }
 */