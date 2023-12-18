import Header from "../../Layout/Header";
import sider1 from "../../Assets/img/slide-1.jpeg"
import sider2 from "../../Assets/img/slider-2.jpg"
import sider3 from "../../Assets/img/slider-3.jpg"
import author_1 from "../../Assets/img/testimonial-author-1.png"
import author_2 from "../../Assets/img/testimonial-author-2.png"
import right_arrow from "../../Assets/img/right-arrow.png"
import car_1 from "../../Assets/img/car-1.png"
const Home = () => {
    return (
        <>
            <Header />
            <div id="slider" class="carousel slide mb-5" data-bs-ride="carousel">

                <div className="container">
                    <div class="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#slider"
                            data-bs-slide-to="0"
                            class="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        >
                            01
                        </button>
                        <button
                            type="button"
                            data-bs-target="#slider"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        >
                            02
                        </button>
                        <button
                            type="button"
                            data-bs-target="#slider"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        >
                            03
                        </button>
                    </div>
                    <div class="carousel-inner">
                        {/* <div class=""> */}


                        <div className="container carousel-item active">
                            <div className="row">

                                <div className="col-12 col-md-6">
                                    <div class="carousel-caption">
                                        <h5>Chuẩn bị cho bài kiểm tra lái xe trên đường? </h5>
                                        <p>
                                            Chúng tôi đã đảm bảo bạn sẽ được hỗ trợ. Khám phá những dịch vụ kiểm tra đường của chúng tôi ngay.
                                        </p>
                                        <div class="wrap-btn-slider">
                                            <button class="btn-slider">
                                                <svg
                                                    width="180px"
                                                    height="60px"
                                                    viewBox="0 0 180 60"
                                                    class="border"
                                                >
                                                    <polyline
                                                        points="179,1 179,59 1,59 1,1 179,1"
                                                        class="bg-line"
                                                    />
                                                    <polyline
                                                        points="179,1 179,59 1,59 1,1 179,1"
                                                        class="hl-line"
                                                    />
                                                </svg>
                                                <span>Đọc thêm</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <img src={sider1} class="d-block" alt="..." />
                                </div>
                            </div>

                        </div>
                        {/* </div> */}
                        <div class="carousel-item container">

                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div class="carousel-caption">
                                        <h5>Trải nghiệm sự lái xe thực sự</h5>
                                        <p>
                                            Học những mục tiêu quan trọng sẽ giúp bạn biến việc lái xe trở thành một phần tự nhiên.
                                        </p>
                                        <div class="wrap-btn-slider">
                                            <button class="btn-slider">
                                                <svg
                                                    width="180px"
                                                    height="60px"
                                                    viewBox="0 0 180 60"
                                                    class="border"
                                                >
                                                    <polyline
                                                        points="179,1 179,59 1,59 1,1 179,1"
                                                        class="bg-line"
                                                    />
                                                    <polyline
                                                        points="179,1 179,59 1,59 1,1 179,1"
                                                        class="hl-line"
                                                    />
                                                </svg>
                                                <span>Đọc thêm</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <img src={sider2} class="d-block" alt="..." />
                                </div>
                            </div>
                        </div>
                        <div class="carousel-item container">
                            <div className="row">

                                <div className="col-12 col-md-6">
                                    <div class="carousel-caption col-12 col-md-6">
                                        <h5>Học lái xe đơn giản hóa</h5>
                                        <p>
                                            Các bài học của trường lái xe sẽ dẫn bạn trên con đường với sự tự tin.
                                        </p>
                                        <div class="wrap-btn-slider">
                                            <button class="btn-slider">
                                                <svg
                                                    width="180px"
                                                    height="60px"
                                                    viewBox="0 0 180 60"
                                                    class="border"
                                                >
                                                    <polyline
                                                        points="179,1 179,59 1,59 1,1 179,1"
                                                        class="bg-line"
                                                    />
                                                    <polyline
                                                        points="179,1 179,59 1,59 1,1 179,1"
                                                        class="hl-line"
                                                    />
                                                </svg>
                                                <span>Đọc thêm</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-6">
                                    <img src={sider3} class="d-block" alt="..." />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <main id="main">
                <section class="highlight-section">
                    <div className="container">  <div class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />
                                    <h5>Học lái xe - Khám phá tự do</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Tận hưởng hành trình, không sợ hãi</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Học lái xe, mở ra cánh cửa tương lai</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Khám phá khả năng lái xe của bạn</h5>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Lái xe thông minh, an toàn mọi lúc</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Xây dựng nền tảng lái xe vững chắc</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Hướng dẫn bạn trở thành tài xế tự tin</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>An toàn đứng đầu, mỗi dặm đường đi</h5>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Dạy lái xe để thay đổi cuộc sống</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Lái xe thông thạo, thể hiện sự tự tin</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Dạy bạn cách chiến thắng con đường</h5>
                                </div>
                                <div class="carousel-caption">
                                    <img src={right_arrow} alt="" />

                                    <h5>Sẵn sàng cho mọi thách thức trên đường</h5>
                                </div>
                            </div>
                        </div>
                    </div></div>
                </section>


                <section class="advance-section">
                    <div class="container">
                        <div class="row">
                            <div class="col col-12 col-md-4">
                                <h2 class="advance-title">
                                    "An toàn và tự tin trên đường, chương trình dạy lái xe riêng cho bạn."
                                </h2>



                                <div class="advance-download">
                                    <div class="advance-download-icon">
                                        <i class="fa-solid fa-down-long"></i>
                                    </div>
                                    <div class="advance-download-content">
                                        <a href="#">Download course content</a>
                                        <span>PDF.4MB</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col col-12 col-md-4">
                                <div class="advance-img">
                                    <img src={car_1} alt="car 1" />
                                </div>
                            </div>
                            <div class="col col-12 col-md-4">
                                <p class="advance-text">
                                    Trước hết và quan trọng nhất, đảm bảo lái xe an toàn luôn được đặt lên hàng đầu ưu tiên của chúng tôi.Trung tâm Hưng Thịnh tự hào là trường lái xe hàng đầu tại
                                    Sóc Trăng, cung cấp các khóa học lái xe chất lượng, tiện lợi và phải chăng để giúp bạn đạt được bằng lái xe một cách suôn sẻ nhất. Hơn nữa, các hướng dẫn viên có kinh nghiệm và kiên nhẫn của chúng tôi sẽ truyền đạt cho bạn mọi kiến thức cần thiết để bạn có thể lái xe an toàn và tự tin trên đường. Hãy khám phá cùng chúng tôi cách chúng ta có thể cùng nhau lái xe an toàn hơn và hướng tới tương lai!
                                </p>

                                <ul class="advance-list-group">
                                    <li class="list-item">
                                        <i><img src={right_arrow} alt="" /></i>
                                        <span>Lái xe cẩn thận, bảo vệ mọi người</span>
                                    </li>
                                    <li class="list-item">
                                        <i><img src={right_arrow} alt="" /></i>
                                        <span>Không chỉ là việc lái, đó là trách nhiệm</span>
                                    </li>
                                    <li class="list-item">
                                        <i><img src={right_arrow} alt="" /></i>
                                        <span>Lái xe tử tế, sống đạo đức</span>
                                    </li>
                                    <li class="list-item">
                                        <i><img src={right_arrow} alt="" /></i>
                                        <span>Sáng suốt và tự trọng trên con đường</span>
                                    </li>
                                    <li class="list-item">
                                        <i><img src={right_arrow} alt="" /></i>
                                        <span>Nắm vững tay lái, nâng cao trách nhiệm</span>
                                    </li>

                                    <li class="list-item">
                                        <i><img src={right_arrow} alt="" /></i>
                                        <span>Tự tin trên đường, trách nhiệm trong tay bạn</span>
                                    </li>
                                    <li class="list-item">
                                        <i><img src={right_arrow} alt="" /></i>
                                        <span>Lái xe an toàn, thay đổi cuộc sống</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>


                <section class="testimonials-section">
                    <div class="bg-layer"></div>
                    <div class="container">
                        <div class="row">
                            <div class="col col-12 col-md-4">
                                <div class="testimonials-section-first">
                                    <div class="testimonials-header">
                                        <h2>Reviews & Testimonials</h2>
                                        <p>
                                            Don't just take our word for it. In fact, find out what
                                            others are saying about US Driving School!
                                        </p>
                                    </div>

                                    <div class="testimonials-body">
                                        <h4>Excellent</h4>
                                        <ul class="star-list">
                                            <li class="star-item"><i class="fa-solid fa-star"></i></li>
                                            <li class="star-item"><i class="fa-solid fa-star"></i></li>
                                            <li class="star-item"><i class="fa-solid fa-star"></i></li>
                                            <li class="star-item"><i class="fa-solid fa-star"></i></li>
                                            <li class="star-item"><i class="fa-solid fa-star"></i></li>
                                        </ul>

                                        <p class="start-desc">
                                            Trust Score 5.0 (Average Based on 250+ reviews)
                                        </p>

                                        <button class="btn btn-contact">All reviews</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col col-12 col-md-4">
                                <div class="testimonials-block">
                                    <div class="border-box"></div>
                                    <ul class="rating">
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                    <h4>Great Experience with US Driving School</h4>
                                    <p>
                                        hello everyone I want to thank you for all your time and
                                        professionalism thanks to each one I am from union city Nj and
                                        I contacted your very professional and responsible school I
                                        contacted them by email and they were very kind and
                                        professional as well as responsible (Abdel) gave ...
                                    </p>
                                    <div class="testimonials-author">
                                        <div class="testimonials-author-img">
                                            <img
                                                src={author_1}
                                                alt="author 1"
                                            />
                                        </div>
                                        <h4 class="testimonial-author-name">Carlos Gonzales</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col col-12 col-md-4">
                                <div class="testimonials-block">
                                    <div class="border-box"></div>
                                    <ul class="rating">
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                        <li><i class="fa-solid fa-star"></i></li>
                                    </ul>
                                    <h4>I Loved US Driving School</h4>
                                    <p>
                                        Excellent! Very professional and amazing instructors! Highly
                                        recommend! We did the 6 hours with (Hazem) and did the
                                        refresher class before the road test & they took her for her
                                        road test (while i watched from the sidelines) Incredible
                                        experience! I had a great experience with US Driving School
                                        and ...
                                    </p>
                                    <div class="testimonials-author">
                                        <div class="testimonials-author-img">
                                            <img
                                                src={author_2}
                                                alt="author 2"
                                            />
                                        </div>
                                        <h4 class="testimonial-author-name">Girish Pandit</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};
export default Home;
