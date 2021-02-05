import Routes from "./routes";
import GlobalStyle from "./styles/global";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import "./services/font-awesome";
import ErrorBoundary from "./errors/errorHandler";

const store = configureStore();
function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
