import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const client = createClient({
  url: "https://api.spacex.land/graphql/",
  exchanges: [
    dedupExchange,
    cacheExchange<any>({
      resolvers: {
        Query: {
          launchesPast: (parent, args, cache, info) => {
            // console.log(parent.launchesPast, "launchesPast");
            // const reversed = parent.launchesPast?.reverse();
            const paginationResult = simplePagination({
              offsetArgument: "offset",
              limitArgument: "limit",
            })(parent, args, cache, info);

            // console.log(paginationResult);
            if (!!paginationResult?.length) {
              const myVars = [...paginationResult].reverse();
              // console.log("reversed", myVars);
              return [...paginationResult].reverse();
            } else {
              return parent.paginationResult;
            }
          },
        },
      },
    }),
    fetchExchange,
  ],
});

setupIonicReact({
  scrollAssist: false,
  scrollPadding: false,
});

const App: React.FC = () => (
  <IonApp>
    <Provider value={client}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </Provider>
  </IonApp>
);

export default App;
