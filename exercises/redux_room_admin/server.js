import mongoose from "mongoose";
import express from "express";

const app = express();

const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Participant = mongoose.model("Participant", participantSchema);

const roomSchema = new mongoose.Schema({
  number: Number,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
      required: false,
    },
  ],
});

const Room = mongoose.model("Room", roomSchema);

const remoteurl =
  "mongodb+srv://chester_the_tester:pfwcs537@pfw-cs.ctovaum.mongodb.net/?retryWrites=true&w=majority&appName=pfw-cs";
await mongoose.connect(remoteurl);

const port = 8080;

app.use(express.json());

app.post("/clear-database", async (req, res) => {
  await Participant.deleteMany({});
  await Room.deleteMany({});
  res.send("Cleared database");
});

app.post("/create-rooms", async (req, res) => {
  const { roomCount } = req.body;
  for (let i = 0; i < roomCount; i++) {
    if (!(await Room.findOne({ number: i + 1 }))) {
      const room = new Room({ number: i + 1, participants: [] });
      await room.save();
    }
  }
  res.send(`Created ${roomCount} rooms`);
});

app.post("/create-participant", async (req, res) => {
  const { name } = req.body;
  if (!(await Participant.findOne({ name }))) {
    const participant = new Participant({ name });
    await participant.save();
    res.json(participant);
  } else {
    res.send(`Participant ${name} already exists`);
  }
});

app.get("/waitingroom", async (req, res) => {
  try {
    // Find all participants who are not in the participants array of any room
    const participantIdsInRooms = await Room.distinct("participants");
    const waitingRoom = await Participant.find({
      _id: { $nin: participantIdsInRooms },
    });
    res.json(waitingRoom);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/rooms", async (req, res) => {
  //Get all rooms and participant names
  const rooms = await Room.find({}).populate("participants");
  //Send back the rooms as JSON
  //Populate participants
  res.json(rooms);
});

app.post("/join", async (req, res) => {
  const { id, roomNumber } = req.body;
  //Find the room
  let newRoom = await Room.findOne({ number: roomNumber });
  if (!newRoom) {
    newRoom = new Room({ number: roomNumber, participants: [] });
  }
  //Find the participant
  let participant = await Participant.findOne({ _id: id });
  if (!participant) {
    res.status(404).send("Participant not found");
  }
  //If participant is already in a room, take them out
  const oldRoom = await Room.findOne({ participants: participant._id });
  if (oldRoom) {
    oldRoom.participants = oldRoom.participants.filter((p) => {
      return !p._id.equals(participant._id);
    });
    await oldRoom.save();
    console.log(`Participant ${participant.name} left room ${oldRoom.number}`);
  }
  //Add the participant to the room
  if (!newRoom.participants.includes(participant._id)) {
    newRoom.participants.push(participant._id);
    await newRoom.save();
    const message = `Participant ${participant.name} joined room ${roomNumber}`;
    console.log(message);
    res.send(message);
  }
});

//Delete all participants from rooms
app.delete("/delete-participants", async (req, res) => {
  await Participant.deleteMany({});
  await Room.updateMany({}, { $set: { participants: [] } });
  res.send("Deleted all participants");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
