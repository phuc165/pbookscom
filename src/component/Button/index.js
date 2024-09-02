import clsx from 'clsx';
import styles from '~/component/Button/Button.module.css';

function Button({ primary, warning, danger }) {
    const classes = clsx(styles.btn, {
        [styles.primary]: primary,
        [styles.warning]: warning,
        [styles.danger]: danger,
    });
    return <button className={classes}>Bam tao!</button>;
}

export default Button;
