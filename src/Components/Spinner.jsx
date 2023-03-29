import { FaSpinner } from 'react-icons/fa';
import styles from'../Styles/Spinner.module.css';

export const Spinner = () => {
  return (
    <div className = {styles.spinner}>
        <FaSpinner className = {styles.spinning} size = {60} />
    </div>
  )
}
