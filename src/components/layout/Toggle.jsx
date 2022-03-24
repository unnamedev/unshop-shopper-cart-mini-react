import useDarkMode from "../../hooks/userDarkMode"
import {MdDarkMode, MdLightMode} from "react-icons/md"

/**
 * @description 👋🏻 Toggle
 * @returns {JSX.Element}
 * @constructor
 */
const Toggle = () => {
    // This is a hook that returns a boolean value and a function.
    const [isDark, setIsDark] = useDarkMode()

    return <label className="block cursor-pointer p-2">
        <input
            className="visually-hidden"
            type="checkbox"
            checked={isDark}
            onChange={e => setIsDark(e.target.checked)}
        />
        {isDark ? <MdDarkMode size={24}/> : <MdLightMode size={24}/>}
    </label>
}

export default Toggle
