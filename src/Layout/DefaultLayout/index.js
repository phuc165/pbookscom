import './DefaultLayout.css';

import Header from '~/Layout/components/Header';
import Footer from '~/Layout/components/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
