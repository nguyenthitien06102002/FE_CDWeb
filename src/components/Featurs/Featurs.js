import React from 'react'
import "./featurs.css";

const Featurs = () => {
  return (
    <div>
          <div className="container-fluid service py-5">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <a href="#" style={{textDecoration: 'none'}}>
              <div className="service-item bg-secondary rounded border">
                <img src="https://i.pinimg.com/564x/ea/3d/ea/ea3dea32af68a39c220e2b998cd7f45d.jpg" className="img-fluid rounded-top w-100" alt="" />
                <div className="px-4 rounded-bottom">
                  <div className="service-content text-center p-4 rounded">
                    <h3 className="textColor">Sen Đá</h3>
                    <h5 className="textColor mb-0">giảm 30%</h5>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-md-6 col-lg-4">
            <a href="#" style={{textDecoration: 'none'}}>
              <div className="service-item  rounded border">
                <img src="https://i.pinimg.com/564x/a5/63/3c/a5633c924bb9b8882c6b19b3e32bd22f.jpg" className="img-fluid rounded-top w-100" alt="" />
                <div className="px-4 rounded-bottom">
                  <div className="service-content  text-center p-4 rounded">
                    <h3 className="textColor">Xương Rồng</h3>
                    <h5 className=" textColor mb-0">Giảm giá</h5>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-md-6 col-lg-4">
            <a href="#" style={{textDecoration: 'none'}}>
              <div className="service-item  rounded border">
                <img src="https://i.pinimg.com/564x/5b/c8/c9/5bc8c9d65d1b5a65ca295a205214b357.jpg" className="img-fluid rounded-top w-100" alt="" />
                <div className="px-4 rounded-bottom">
                  <div className="service-content  text-center p-4 rounded">
                    <h3 className="textColor">Kiểng Lá</h3>
                    <h5 className="textColor mb-0">Miễn phí vận chuyển</h5>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Featurs