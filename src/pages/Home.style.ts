import { IonContent, IonFooter, IonTextarea } from "@ionic/react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const VirtuosoContainer = styled.div`
  flex: 1;
  height: "100%";
`;

export const Content = styled(IonContent)`
  -webkit-overflow-scrolling: auto;
`;

export const Footer = styled(IonFooter)`
  padding: 0.5rem;
  border-top: 1px solid var(--ion-color-light);
`;

export const Input = styled(IonTextarea)<{ keyboardHeight: number }>`
  transform: ${({ keyboardHeight }) =>
    `translate3d(0, -${keyboardHeight}px, 0)`};
  max-height: 300px;
  background: var(--ion-color-light);
  border-radius: 1rem;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 1px;
  width: 100%;
  padding: 1rem;
`;

export const MessageBubble = styled.div`
  border-radius: 2rem;
`;
