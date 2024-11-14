import mongoose, {
  connect,
  disconnect,
  ClientSession,
} from "mongoose";

export const session = {
  startTransaction: jest.fn(),
  commitTransaction: jest.fn(),
  abortTransaction: jest.fn(),
  endSession: jest.fn(),
  inTransaction: jest.fn().mockReturnValue(false),
} as unknown as ClientSession;

beforeAll(async () => {
  console.log("Testing.........");

  await connect(process.env.MONGO_URI);
  console.log("connected test db");
});

beforeEach(() => {
  jest.spyOn(mongoose, "startSession").mockResolvedValue(session);
});

afterEach(async () => {
  let collections = mongoose.connection.collections;
  for (let collection in collections) {
    await collections[collection].drop();
  }

  jest.clearAllMocks();
});

afterAll(async () => {
  await disconnect();
});


