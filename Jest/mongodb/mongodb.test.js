//Simple MongoDB test with Jest
import {MongoClient} from 'mongodb';
import {config} from "dotenv";

describe('insert', () => {
  let connection;
  let db;
  let users;

  beforeAll(async () => {
    config(); //Expose .env to process object
    connection = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(process.env.JEST_DB);
    users = db.collection("users");
    users.deleteMany({});
  });

  afterAll(async () => {
    await users.deleteMany({});
    connection.close();
  });

  it('should insert a doc into collection', async () => {

    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});