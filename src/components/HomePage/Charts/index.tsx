import { Space } from "antd";
import HeraPie from "./Pie/HeraPie";

export default function Charts({}) {
  return (
    <div className="row my-5">
      <div className="col-md-4 d-flex justify-content-center">
        <div className="digits-matched-cont p-4 d-flex justify-content-center justify-content-md-start">
          <Space direction="vertical" size={20}>
            <div className="fnt-b cl-w fnt-s2">DIGITS MATCHED</div>
            <div className="d-flex align-items-center justify-content-around">
              <div className="circle" class-type="4" />
              <div className="cl-w fnt-s1 mt-1">Matches First 4</div>
            </div>
            <div className="d-flex align-items-center justify-content-around">
              <div className="circle" class-type="3" />
              <div className="cl-w fnt-s1 mt-1">Matches First 3</div>
            </div>
            <div className="d-flex align-items-center justify-content-around">
              <div className="circle" class-type="2" />
              <div className="cl-w fnt-s1 mt-1">Matches First 2</div>
            </div>
            <div className="d-flex align-items-center justify-content-around">
              <div className="circle" class-type="1" />
              <div className="cl-w fnt-s1 mt-1">Matches First 1</div>
            </div>
          </Space>
        </div>
      </div>
      {/* <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
              <HegemPie />
              <div className="fnt-b cl-w fnt-s2">HEGEM</div>
            </div>
          </div> */}
      <div className="col">
        <div className="d-flex flex-column align-items-center">
          <HeraPie />
          <div className="fnt-b cl-w fnt-s2">HERA</div>
        </div>
      </div>
    </div>
  );
}
