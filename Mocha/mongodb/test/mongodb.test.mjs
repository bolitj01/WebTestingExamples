//Simple MongoDB test with Mocha + Chai
import {expect} from "chai"
import {MongoClient} from 'mongodb';
import {config} from "dotenv";

describe('insert', function() {
  let connection;
  let db;
  let users;

  before(async function() {
    config();
    connection = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db(process.env.MOCHA_DB);
    users = db.collection("users");
    users.deleteMany({});
  });

  after(async function() {
    await users.deleteMany({});
    connection.close();
  });

  it('should insert a new user', async function() {
    this.retries(5);
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).to.deep.equal(mockUser);
    //.deep.equal is equivalent to .eql
  });
});