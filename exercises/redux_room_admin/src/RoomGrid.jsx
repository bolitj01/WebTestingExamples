import styles from "./styles/RoomGrid.module.css"; // Import the CSS module
import Room from "./Room";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRooms } from "./participantsReducer";

const RoomGrid = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);
  
  const roomCount = useSelector((state) => {
    return state.participants.roomCount;
  });

  return (
    <div className={styles.gridContainer}>
      {[...Array(roomCount)].map((_, i) => (
        <Room key={i} roomIndex={i} />
      ))}
    </div>
  );
};

export default RoomGrid;
