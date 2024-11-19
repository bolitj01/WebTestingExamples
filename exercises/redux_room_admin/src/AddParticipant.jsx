import { useRef } from "react";
import styles from "./styles/AddParticipant.module.css";
import { useDispatch } from "react-redux";
import { addParticipant } from "./participantsReducer";

const AddParticipant = () => {
  const nameTxt = useRef();
  const dispatch = useDispatch();

  const createParticipant = async (name) => {
    const response = await fetch("/api/create-participant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();    
    console.log(`Participant data: ${data}`);
    return data;
  };

  return (
    <form
      className={styles.addParticipant}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="name">Name</label>
      <input
        data-testid="name-text"
        required
        type="text"
        name="name"
        id=""
        placeholder="Name"
        ref={nameTxt}
      />
      <button
        data-testid="add-button"
        onClick={async () => {
          const participant = await createParticipant(nameTxt.current.value);
          dispatch(addParticipant(participant));
          nameTxt.current.value = "";
        }}
      >
        Add Participant
      </button>
    </form>
  );
};

export default AddParticipant;
