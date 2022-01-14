import {
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
const input = document.querySelector("ion-input");

const Home: React.FC = () => {
  useEffect(() => {
    window.addEventListener("ionKeyboardDidShow", (ev: any) => {
      console.log("shown");
      const { keyboardHeight } = ev.detail;

      input?.style.setProperty(
        "transform",
        `translate3d(0, ${keyboardHeight}px, 0)`
      );
    });

    window.addEventListener("ionKeyboardDidHide", () => {
      console.log("hidden");
      input?.style.removeProperty("transform");
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
      <IonFooter>
        <IonInput placeholder="Type Here" />
      </IonFooter>
    </IonPage>
  );
};

export default Home;
