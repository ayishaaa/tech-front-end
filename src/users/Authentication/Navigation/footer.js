import React, { useEffect, useState } from 'react';
import "../../assets/css/style.css";

function Footer() {
    return (
        <div>
            <title>Footer</title>
            <section className="login">
                <div className="row copyright-row">
                    <div className="col-md-6 col-sm-12 copy-div">
                        <p>©Copyright 2024 Techoriz Digital Academy All Rights Reserved</p>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <ul>
                            <li className='text-dark'><a className='text-dark text-decoration-none' href='/plain/student/privacy-policy'>Privacy Policy</a></li>
                            <li><a className='text-dark text-decoration-none' href='/plain/student/terms-of-use'>Terms of Use</a></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer;
