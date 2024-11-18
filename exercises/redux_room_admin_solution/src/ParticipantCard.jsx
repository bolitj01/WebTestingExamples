import styles from "./styles/ParticipantCard.module.css";

// ParticipantCard component to represent the UI of a participant
const ParticipantCard = ({ participant, onDragStart }) => {
  return (
    <p
      key={participant.id}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("participantId", participant.id);
        if (onDragStart) onDragStart(participant);
      }}
      className={styles.participantCard}
    >
      {participant.name}
    </p>
  );
};

export default ParticipantCard;
