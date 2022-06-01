import React from "react";

export interface ConnectButton {
  /**
   * khai báo kiểu nút
   */
  type: "yellow" | "gray" | "green";
  /**
   * khai báo nội dung text hiển thị
   */
  text: string;
}

export interface HeroButton {
  text: string;
}

export function ConnectButton({ type, text }: ConnectButton) {
  const ReturnImgBg = () => {
    switch (type) {
      case "green": {
        return "/img/buttons/button-green.png";
      }
    }
  };
  return (
    <div className="connectbutton">
      <div className={`connectbutton--text-${type}`}>{text}</div>
      <img src={ReturnImgBg()} style={{ height: "46px", width: "120px" }} />
    </div>
  );
}

export function HeroButton({ text }: HeroButton) {
  return (
    <div className="herobutton">
      <div className={`herobutton--text`}>{text}</div>
      <img
        src="/img/buttons/button-ry.png"
        style={{ height: "46px", width: "120px" }}
      />
    </div>
  );
}
