import store from "@redux/store";
import "animate.css";
import "antd/dist/antd.css";

import "@styles/global.scss";

import "@styles/app.scss";
import Head from "next/head";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: any): JSX.Element {
  return (
    <Provider store={store}>
      <Head>
        <title>Hero Arena Lottery</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
