export interface SubMenu {
  name: string;
  url: string;
  isNewTab: boolean;
}
export interface MainMenu {
  title: string;
  link?: string;
  sub?: SubMenu[];
  isNewTab?: boolean;
}
export const MainMenu: MainMenu[] = [
  {
    title: "DAPP",
    sub: [
      {
        name: "NFT MARKETPLACE",
        url: "https://heroarena.app/gamefi/nft",
        isNewTab: true,
      },
      {
        name: "NFT STAKING",
        url: "https://heroarena.app/gamefi/defi",
        isNewTab: true,
      },
      {
        name: "NFT FUSION",
        url: "https://heroarena.app/gamefi/fusion",
        isNewTab: true,
      },
      {
        name: "LOTTERY",
        url: "/",
        isNewTab: false,
      },
      {
        name: "PAYMENT GATEWAY",
        url: "https://heroarena.app/gamefi/payment",
        isNewTab: false,
      },
    ],
  },
  {
    title: "FARMING",
    sub: [
      {
        name: "BUNICORN",
        url: "https://bunicorn.exchange/#/hero-arena-farms",
        isNewTab: true,
      },
      {
        name: "TOKENPLAY DEFI",
        url: "#",
        isNewTab: false,
      },
    ],
  },
  {
    title: "TRADE",
    sub: [
      {
        name: "PANCAKESWAP",
        url: "https://pancakeswap.finance/swap?outputCurrency=0x49c7295ff86eabf5bf58c6ebc858db4805738c01",
        isNewTab: true,
      },
      {
        name: "GATE.IO",
        url: "https://www.gate.io/trade/HERA_USDT",
        isNewTab: true,
      },
      {
        name: "MEXC GLOBAL",
        url: "https://www.mexc.com/vi-VN/exchange/HERA_USDT",
        isNewTab: true,
      },
      {
        name: "ZT GLOBAL",
        url: "https://www.ztb.im/exchange?coin=HERA_USDT",
        isNewTab: true,
      },
    ],
  },
  {
    title: "BLOG",
    link: "https://blog.heroarena.app/",
    isNewTab: true,
  },
  {
    title: "SCHOLARSHIP",
    link: "https://heroarena.app/gamefi/scholarship",
    isNewTab: true,
  },
  { title: "PLAYNOW", link: "https://play.heroarena.app/", isNewTab: true },
];
