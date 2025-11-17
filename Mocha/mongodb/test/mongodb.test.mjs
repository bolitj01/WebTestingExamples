//Simple MongoDB test with Mocha + Chai
import { expect } from "chai";
import mongoose from "mongoose";
import { config } from "dotenv";
import { describe, it, before, after } from "mocha";

config();

describe("User model CRUD", function () {
  let User;

  before(async function () {
    // connect
    const uri = "mongodb+srv://chester_the_tester:pfwcs537@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // define schema + model
    const userSchema = new mongoose.Schema({
      name: String,
    });
    User = mongoose.models.User || mongoose.model("User", userSchema);
    // clean collection
    await User.deleteMany({});
  });

  after(async function () {
    await User.deleteMany({});
    await mongoose.disconnect();
  });

  it("should insert a new user", async function () {
    this.retries(5);
    const mockUser = { name: "John" };
    const created = await User.create(mockUser);

    const found = await User.findById(created._id).lean();
    expect(found).to.include({ name: mockUser.name });
  });

  it("should insert and delete a user", async function () {
    const mockUser = { name: "Tom" };
    const created = await User.create(mockUser);

    const found = await User.findById(created._id).lean();
    expect(found).to.include({ name: mockUser.name });

    await User.findByIdAndDelete(created._id);
    const deleted = await User.findById(created._id);
    expect(deleted).to.be.null;
  });

  it("should insert and update a user", async function () {
    const mockUser = { name: "Tim" };
    const created = await User.create(mockUser);

    const found = await User.findById(created._id).lean();
    expect(found).to.include({ name: mockUser.name });

    await User.findByIdAndUpdate(created._id, { name: "Timmy" });
    const updated = await User.findById(created._id).lean();
    expect(updated.name).to.equal("Timmy");
  });
});