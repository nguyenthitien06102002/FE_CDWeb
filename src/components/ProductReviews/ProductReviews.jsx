import { useState } from "react";
import { Container } from "react-bootstrap";
import "./product-review.css";
import ReactStars from "react-rating-stars-component";

const ProductReviews = ({ selectedProduct, reviews }) => {
  const [listSelected, setListSelected] = useState("desc");
  return (
    <section className="product-reviews">
      <Container>
        <ul>
          <li
            style={{ color: listSelected === "desc" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("detail")}
          >
            Chi tiết sản phẩm
          </li>
          <li
            style={{ color: listSelected === "rev" ? "black" : "#9c9b9b" }}
            onClick={() => setListSelected("rev")}
          >
            Đánh giá ({reviews.length})
          </li>
        </ul>
        {listSelected === "detail" ? (
         
           <div dangerouslySetInnerHTML={{ __html: selectedProduct?.detail }} />
        ) : (
          <div className="rates">
            
              {reviews !== null && reviews.length > 0 ? (
                <>
                  {reviews
                    .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
                    .map((review) => (
                      <>

                        <div className="align-items-center mt-3" style={{ width: '100%' }}>
                          <div className="d-flex" style={{ width: '100%' }}>

                            <div style={{ width: '100%' }}>
                              <h6 className='product-name pt-2 flex-grow-1'>{review.userId.userName}</h6>
                              <ReactStars
                                count={review.rating}
                              
                                size={27}
                                color="#ffd700"
                              />
                              <p style={{ fontSize: '12px', color: 'gray' }}>{review?.createDate?.slice(0, 10)}</p>
                              <p className='product-price'>{review?.content}</p>

                            </div>
                          </div>
                        </div>





                        <hr class="hr" />
                      </>
                    ))}
                </>
              ) : (
                <p>Chưa có đánh giá nào</p>
              )}
          </div>
        )}
      </Container>
    </section>
  );
};

export default ProductReviews;
