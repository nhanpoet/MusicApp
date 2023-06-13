import { ModalPortal } from "react-native-modals";
import Navigation from "./Navigation";
import { PlayerContext } from "./src/contexts/PlayerContext";

export default function App() {
  return (
    <>
      <PlayerContext>
        <Navigation />
        <ModalPortal />
      </PlayerContext>
    </>
  );
}
