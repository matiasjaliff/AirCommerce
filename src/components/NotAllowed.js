import notAllowedImg from "../utils/img/not_allowed.png"
import s from "../styles/Wallpaper.module.css"

const NotAllowed = () => {
    return(
        <img className = {s.notAllowed} src={notAllowedImg} alt='Not Allowed' />
    )
}

export default NotAllowed;