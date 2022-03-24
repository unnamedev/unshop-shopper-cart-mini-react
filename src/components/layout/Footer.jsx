/**
 * @description 👋🏻 Footer
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => <footer className="py-[20px] px-[15px] border-t-2 text-center border-t-2 bg-white transition-all dark:bg-gray-900 dark:border-t-gray-700 dark:text-white">
    <p>Copyright &copy; {new Date().getFullYear()} by {" "}
        <a
        className="font-bold text-purple-500 hover:text-purple-800 transition-all sm:text-base dark:text-purple-500 dark:hover:text-purple-300"
        target="_blank"
        href="https://github.com/unnamedev/">
        unnamed
    </a></p>
</footer>

export default Footer
