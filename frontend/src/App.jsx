import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; 
import { ConfigProvider } from "antd";
import AppBar from "./components/AppBar/AppBar";
import Router from "./pages/router";
import FooterComponents from "./components/AppBar/Footer";
import { store } from "./redux/store";

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4caf50",
          borderRadius: 5,
          boxShadow: "none",
          colorBgSpotlight: "#1b5e20",
        },
        components: {
          Modal: {
            titleFontSize: 18,
            padding: 10,
            paddingLG: 10,
            fontWeightStrong: 700,
          },
          Button: {
            fontWeight: 700,
            defaultShadow: "none",
            primaryShadow: "none",
          },
          Input: {
            cursor: "pointer",
          },
          Table: {
            headerBorderRadius: 10,
            headerBg: "#eaeaea",
            headerSortHoverBg: "#f0ffef",
            headerFilterHoverBg: "#f0ffef",
            headerSortActiveBg: "#f0ffef",
            stickyScrollBarBg: "#2C6E50",
            cellPaddingBlock: 10,
            cellPaddingInline: 10,
          },
          Collapse: {
            contentBg: "rgba(0, 0, 0, 0.00)",
          },
        },
      }}
    >
      <Provider store={store}>
        <BrowserRouter>
          <AppBar />
          <Router />
          <FooterComponents />
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  );
};

export default App;
