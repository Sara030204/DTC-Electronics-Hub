function Contact() {
    return (
        <>
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__content">
                                <div className="contact__address">
                                    <h5>Contact info</h5>
                                    <ul>
                                        <li>
                                            <h6><i className="fa fa-map-marker"></i> Address</h6>
                                            <p>SRM college kudal, pin code - 416520 Dist -Sindhudurg </p>
                                        </li>
                                        <li>
                                            <h6><i className="fa fa-phone"></i> Phone</h6>
                                            <p><span>+91 973874788734</span><span>125-668-886</span></p>
                                        </li>
                                        <li>
                                            {/* <h6><i className="fa fa-headphones"></i> Support</h6>
                                            <p>Support.photography@gmail.com</p> */}
                                        </li>
                                    </ul>
                                </div>
                                <div className="contact__form">
                                    <h5>SEND MESSAGE</h5>
                                    <form action="#">
                                        <input type="text" placeholder="Name" />
                                        <input type="text" placeholder="Email" />
                                        <input type="text" placeholder="Website" />
                                        <textarea placeholder="Message"></textarea>
                                        <button type="submit" className="site-btn">Send Message</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="contact__map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.2048239549467!2d73.68696127417823!3d16.002849641213427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc00f36aaaaaaab%3A0x1f945ffd4bc2391e!2sS.R.M.%20College!5e0!3m2!1sen!2sin!4v1712994163810!5m2!1sen!2sin" height="780" style={{ border: 1 }} allowFullScreen=""></iframe>
                                {/* <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.558582667596!2d73.8100187098015!3d15.932180084663893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc00a94763c9393%3A0x2e001b2a4042d9bf!2sGrampanchayat%20Karyalay%2C%20Kolgaon!5e0!3m2!1sen!2sin!4v1698333312689!5m2!1sen!2sin"
                                    height="780" style={{ border: 0 }} allowFullScreen=""
                                ></iframe> */}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
