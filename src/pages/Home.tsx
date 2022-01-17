import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Content,
  Footer,
  Input,
  VirtuosoContainer,
} from "./Home.style";
import { useQuery } from "urql";
import { Virtuoso } from "react-virtuoso";
import { MessageContainer, MessageBubble } from "./Home.style";

const INITIAL_INDEX = 100000;
const limit = 10;

const query = `
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

const Home: React.FC = () => {
  const ref = useRef<HTMLIonContentElement>(null);
  const inputRef = useRef<HTMLIonTextareaElement>(null);
  const [offset, setOffset] = useState(0);
  const [firstItemIndex, setFirstItemIndex] = useState(INITIAL_INDEX - limit);

  const onStartReached = useCallback(() => {
    setOffset(() => limit + offset);
  }, [offset]);

  const [{ data }] = useQuery({
    query,
    variables: {
      offset,
      limit,
    },
  });

  const messages =
    useMemo(() => data?.launchesPast, [data?.launchesPast]) || [];

  useEffect(() => {
    setFirstItemIndex(INITIAL_INDEX - messages.length - 1);
  }, [messages.length]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Content ref={ref} scrollY={false}>
        <Container>
          {!!data?.launchesPast.length && (
            <VirtuosoContainer>
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
            </VirtuosoContainer>
          )}
        </Container>
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
