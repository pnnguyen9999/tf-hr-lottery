import React from "react";
import { IMG_URL } from "src/config";
/**
 * this is base button
 */
export interface HeroButton {
  text: string;
  action?: React.MouseEventHandler<HTMLDivElement>;
}

export function HeroButton({ text, action }: HeroButton) {
  return (
    <div className="herobutton" onClick={action}>
      <div className={`herobutton--text`}>{text}</div>
      <img
        src={`${IMG_URL}/img/buttons/button-ry.png`}
        className="herobutton-btn"
        // style={{ height: "46px", width: "120px" }}
      />
    </div>
  );
}
