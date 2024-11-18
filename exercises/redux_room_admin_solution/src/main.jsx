import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import RoomAdmin from "./RoomAdmin";
import store from "./store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RoomAdmin />
    </Provider>
  </StrictMode>
);
