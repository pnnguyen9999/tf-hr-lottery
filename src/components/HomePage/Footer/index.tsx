import React, { ReactElement } from "react";
import { SendOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined, MediumOutlined } from "@ant-design/icons";
import { Popover, Space } from "antd";
import { MainMenu, SubMenu } from "../Nav/MenuItems";
import { IMG_URL } from "src/config";

interface Props {}

export default function Footer({}: Props): ReactElement {
  return (
    <div className="footer">
      <div className="section section-footer">
        <div className="container p-3 p-md-5">
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex flex-column pr-2">
                <div className="py-3">
                  <img className="logo-footer" src={`${IMG_URL}/img/logo.png`} alt="HeroArena Logo" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Space direction="vertical" size={10}>
                {/* <h5 className="cl-yl">Navigation</h5> */}
                <br />
                {MainMenu.map((item: MainMenu, index) =>
                  item.sub ? (
                    <Popover
                      key={index}
                      content={item.sub.map((sub: SubMenu) => (
                        <a
                          className="nav-item"
                          key={sub.name}
                          href={sub.url}
                          target={`${sub.isNewTab ? "_blank" : ""}`}
                        >
                          {sub.name}
                        </a>
                      ))}
                      title={false}
                    >
                      <a className="nav-item">{item.title}</a>
                    </Popover>
                  ) : (
                    <a
                      className="nav-item"
                      key={item.title}
                      href={item.link}
                      target={`${item.isNewTab ? "_blank" : ""}`}
                    >
                      {item.title}
                    </a>
                  )
                )}
              </Space>
            </div>
            <div className="col-md-4">
              <h5 className="cl-yl">JOIN NEWSLETTER</h5>
              <br />
              <h6 className="py-2 cl-w">Subscribe our newsletter to get more free design course and resource</h6>
              <div className="d-flex ha-input justify-content-between">
                <input placeholder="Enter your email" />
                <div className="submit-email">
                  <SendOutlined />
                </div>
              </div>
              <div className="d-flex py-3 justify-content-around">
                <a href="https://twitter.com/HeroArena_Hera" target="_blank" rel="noreferrer">
                  <div className="icon-circle">
                    <TwitterOutlined />
                  </div>
                </a>
                <a href="https://www.facebook.com/HeroArena.Hera" target="_blank" rel="noreferrer">
                  <div className="icon-circle">
                    <FacebookOutlined />
                  </div>
                </a>
                <a href="https://t.me/heroarenagame" target="_blank" rel="noreferrer">
                  <div className="icon-circle">
                    <SendOutlined />
                  </div>
                </a>
                <a href="https://heroarena.medium.com/" target="_blank" rel="noreferrer">
                  <div className="icon-circle">
                    <MediumOutlined />
                  </div>
                </a>
                <a href="https://www.youtube.com/channel/UCkYvwWzFreokzowE8lO5f4A" target="_blank" rel="noreferrer">
                  <div className="icon-circle">
                    <YoutubeOutlined />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">Copyright © 2021 Hero Arena. All rights reserved</div>
    </div>
  );
}
