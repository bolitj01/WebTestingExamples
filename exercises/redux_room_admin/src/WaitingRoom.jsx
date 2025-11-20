import ParticipantCard from "./ParticipantCard";
import styles from "./styles/WaitingRoom.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchWaitingRoom } from "./participantsReducer";
import { useEffect } from "react";

// ParticipantList component to display all participants not in any room
const WaitingRoom = () => {
  // Get all participants in the waiting room
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaitingRoom());
  }, [dispatch]);

  const participants = useSelector((state) => state.participants.waitingRoom);

  return (
    <div className={styles.container}>
      <h3>Waiting Room</h3>
      <div data-testid="waiting-room" className={styles.waitingRoom}>
        {participants.map((p) => (
          <ParticipantCard key={p.id} participant={p} />
        ))}
      </div>
    </div>
  );
};

export default WaitingRoom;
