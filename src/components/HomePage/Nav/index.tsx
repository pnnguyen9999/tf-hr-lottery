import { ConnectButton } from '@components/common/ConnectButton';
import { HeroButton } from '@components/common/HeroButton';
import { Avatar, Drawer, Popover, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainMenu, SubMenu } from './MenuItems';
import { MenuOutlined } from '@ant-design/icons';
import { sliceAddressString } from '@utils';
type Props = {};

export default function Nav({}: Props) {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.web3.address);
  const [isOpenPopoverInfo, setOpenPopoverInfo] = useState<boolean>(false);
  const [isOpenDrawerMobile, setOpenDrawerMobile] = useState<boolean>(false);
  const handleLogOut = () => {
    localStorage.setItem('disconnected', 'true');
    window.location.reload();
  };
  const popoverInfoContent = () => {
    return (
      <Space direction="vertical" size={10} className="d-flex flex-column align-items-center p-1">
        <div className="fnt-s1">
          {' '}
          Address: <span className="cl-yl fnt-b">{sliceAddressString(address)}</span>
        </div>
        <HeroButton text="Log out" action={() => handleLogOut()} />
      </Space>
    );
  };
  return (
    <div className="nav d-flex justify-content-between align-items-center">
      <div>
        <img className="logo" src="/img/logo.png" />
      </div>
      <div className="d-flex align-items-center">
        {MainMenu.map((item: MainMenu) =>
          item.sub ? (
            <Popover
              content={item.sub.map((sub: SubMenu) => (
                <a
                  className="nav-item d-none d-md-block"
                  key={sub.name}
                  href={sub.url}
                  target={`${sub.isNewTab ? '_blank' : ''}`}
                >
                  {sub.name}
                </a>
              ))}
              title={false}
            >
              <div className="nav-item d-none d-md-block">{item.title}</div>
            </Popover>
          ) : (
            <a
              className="nav-item d-none d-md-block"
              key={item.title}
              href={item.link}
              target={`${item.isNewTab ? '_blank' : ''}`}
            >
              {item.title}
            </a>
          )
        )}
        <Drawer
          title="Navigation"
          placement="right"
          onClose={() => setOpenDrawerMobile(false)}
          open={isOpenDrawerMobile}
        >
          <Space direction="vertical" size={10}>
            {MainMenu.map((item: MainMenu) =>
              item.sub ? (
                <Popover
                  content={item.sub.map((sub: SubMenu) => (
                    <a
                      className="nav-item"
                      key={sub.name}
                      href={sub.url}
                      target={`${sub.isNewTab ? '_blank' : ''}`}
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
                  target={`${item.isNewTab ? '_blank' : ''}`}
                >
                  {item.title}
                </a>
              )
            )}
          </Space>
        </Drawer>

        {!address ? (
          <ConnectButton text="Connect" type="green" />
        ) : (
          <Popover
            content={popoverInfoContent}
            title={
              <div className="fnt-s1 fnt-b mt-2" style={{ color: '#DB5745' }}>
                User info
              </div>
            }
            trigger="click"
            open={isOpenPopoverInfo}
            onOpenChange={() => setOpenPopoverInfo(!isOpenPopoverInfo)}
            // onVisibleChange={() => setOpenPopoverInfo(!isOpenPopoverInfo)}
          >
            <Avatar
              className="avatar cursor-pointer"
              src={`https://avatars.dicebear.com/v2/jdenticon/${address}.svg`}
              size={42}
            />
          </Popover>
        )}
        <div className="fnt-s2 mx-2 d-block d-md-none">
          <MenuOutlined onClick={() => setOpenDrawerMobile(true)} />
        </div>
      </div>
    </div>
  );
}
