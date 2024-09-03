import {Link} from "react-router-dom";
import cls from './autoparkButton.module.css'


function MyButton() {

    return (
     <div className={cls.last}>
         <Link to={"/autoPark"}>
             <button className={cls.allPark}>
                 <p> Весь Автопарк  </p>
                 <p className={cls.next}> > </p>
             </button>
         </Link>
     </div>
    );
}

export default MyButton;