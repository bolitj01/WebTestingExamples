import ParticipantCard from "./ParticipantCard";
import styles from "./styles/Room.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToRoom } from "./participantsReducer";

// Room component that handles drag and drop of participants into the room
const Room = ({ roomIndex }) => {
  const dispatch = useDispatch();

  const roomState = useSelector((state) => state.participants.rooms[roomIndex]);

  const handleDrop = async (e) => {
    e.preventDefault();
    const participantId = e.dataTransfer.getData("participantId");
    const response = await fetch("/api/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: participantId, roomNumber: roomState.number }),
    });
    const message = await response.text();
    console.log(`API: ${message}`);
    dispatch(addToRoom({ participantId, roomIndex }));
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow the drop action
  };

  if (!roomState) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={styles.roomContainer}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3>Room {roomState.number}</h3>
      {roomState.participants.map((participant) => (
        <ParticipantCard key={participant.id} participant={participant} />
      ))}
    </div>
  );
};

export default Room;
