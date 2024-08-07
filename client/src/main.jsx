import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { persisitor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persisitor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
