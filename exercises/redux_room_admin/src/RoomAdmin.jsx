import AddParticipant from "./AddParticipant";
import WaitingRoom from "./WaitingRoom";
import RoomGrid from "./RoomGrid";

import styles from './styles/RoomAdmin.module.css';

const RoomAdmin = () => {
  return (
    <div className={styles.container}>
      <h1>Room Admin</h1>
      <AddParticipant />
      <div className={styles.participantListWrapper}>
        <WaitingRoom />
      </div>
      <RoomGrid />
    </div>
  );
};

export default RoomAdmin;
