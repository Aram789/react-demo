import React from "react"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const Footer = () => (
    <footer className="bg-light text-center text-white">
        <div className="container p-4 pb-0">
            <section className="mb-4">
                <Link
                    className="btn text-dark btn-floating m-1"
                    to="#!"
                    role="button"
                ><FontAwesomeIcon icon={faTrashAlt} /></Link>


            </section>
        </div>

        <div className="text-center p-3 text-dark">
            © 2020 Copyright:
            <Link className="text-dark" to="https://mdbootstrap.com/">MDBootstrap.com</Link>
        </div>
    </footer>
)


export default Footer