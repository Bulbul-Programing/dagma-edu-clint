
const Footer = () => {
    return (
        <footer className="footer p-10 bg-blue-100 text-base-content">
            <aside>
                <img className="w-[100px]" src="https://i.ibb.co/31ZV2WH/416200583-777597704382658-5573574209946949939-n-removebg-preview-1.png" alt="" />
                <h1 className="text-xl font-bold">Duaria A.G Model Academy</h1>
            </aside>
            <nav>
                <header className="footer-title"></header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <header className="footer-title">Legal</header>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    );
};

export default Footer;