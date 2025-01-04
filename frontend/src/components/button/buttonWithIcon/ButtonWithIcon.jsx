import styles from "./ButtonWithIcon.module.css"

const ButtonWithIcon=(props)=>{
    return(
        <div onClick={props.mathode} className={styles.container}>
            <img alt="not Available" className={styles.image} src={props.src}></img>
            <div className={styles.text}>{props.name}</div>
        </div>
    )
}

export default ButtonWithIcon;