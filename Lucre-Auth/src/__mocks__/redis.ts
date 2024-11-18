export const connectRedis = {
    Client: jest.fn().mockReturnValue({
        setEx: jest.fn()
    })
}