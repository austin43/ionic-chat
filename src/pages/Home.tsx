import {
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useKeyboardState } from "@ionic/react-hooks/keyboard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { Content, Footer, Input } from "./Home.style";
import { v4 } from "uuid";
import { gql, useQuery } from "urql";
import { Virtuoso } from "react-virtuoso";
import { MessageContainer, MessageBubble } from "./Home.style";

const INITIAL_INDEX = 100000;

//TODO Fix ios scroll bounce which causes infinite scroll problems
//TODO optimize performance of variable height items
//TODO implement a variable height container based on keyboardHeight

const heights = Array(1000)
  .fill(1000)
  .map(() => `${Math.random() * (300 - 100) + 100}`);

const query = gql`
  query ($limit: Int!, $offset: Int!) {
    launchesPast(
      limit: $limit
      offset: $offset
      order: "desc"
      sort: "mission_name"
    ) {
      __typename
      id
      mission_name
      launch_date_local
      details
    }
  }
`;

const limit = 10;

const Home: React.FC = () => {
  const ref = useRef<HTMLIonContentElement>(null);
  const inputRef = useRef<HTMLIonTextareaElement>(null);
  const [items, setItems] = useState<string[]>([]);
  const { keyboardHeight } = useKeyboardState();
  const [offset, setOffset] = useState(0);
  const [firstItemIndex, setFirstItemIndex] = useState(INITIAL_INDEX - limit);

  const onStartReached = useCallback(() => {
    // console.log("start reached");
    setOffset(() => limit + offset);
  }, [offset]);

  const [{ data }] = useQuery({
    query,
    variables: {
      offset,
      limit,
    },
  });

  // console.log("data", data, error);

  // useEffect(() => {
  //   setOffset(limit + offset)
  // }, [limit, offset]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const loadedItems = Array(50)
  //       .fill(50)
  //       .map(() => v4());

  //     console.log(loadedItems);
  //     setItems(loadedItems);
  //   }, 2000);
  // }, []);

  // useEffect(() => {
  //   if (items.length) {
  //     ref.current?.scrollToBottom(200);
  //   }
  // }, [items.length]);

  // console.log(firstItemIndex);

  // useEffect(() => {
  //   console.log(firstItemIndex);
  // }, [firstItemIndex]);

  const messages =
    useMemo(() => data?.launchesPast, [data?.launchesPast]) || [];

  useEffect(() => {
    // setFirstItemIndex((state) => firstItemIndex - limit);
    //decrement the firstItem index by the delta which will always be firstItemIndex - limit
    // setFirstItemIndex(firstItemIndex - limit)
    // console.log(messages.length);
    setFirstItemIndex(INITIAL_INDEX - messages.length);
  }, [messages.length]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Content ref={ref} scrollY={false}>
        {!!data?.launchesPast.length && (
          <Virtuoso
            initialTopMostItemIndex={INITIAL_INDEX - 1}
            data={messages}
            startReached={onStartReached}
            firstItemIndex={firstItemIndex}
            itemContent={(_, item) => {
              return (
                <MessageContainer>
                  <MessageBubble>{item.details}</MessageBubble>
                </MessageContainer>
              );
            }}
          />
        )}
      </Content>
      <Footer>
        <Input
          autoGrow
          keyboardHeight={0}
          ref={inputRef}
          placeholder="Type Here"
        />
      </Footer>
    </IonPage>
  );
};

export default Home;
