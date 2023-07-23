import { getDetail, getDetailFromState, deleteRecipe, getRecipes } from "../actions/index.js";    //me traigo las actions    
import { useDispatch,useSelector } from "react-redux";// use dispatch para hacer el dispatch de esa action  con use selector me traigo la info del estado global
import { useEffect } from "react";
import { useParams, useHistory, Link} from "react-router-dom";
import styles from "../styles/Detail.module.css";


const RecipeDetail = () => {
    const dispatch = useDispatch();// Es una función que permite lanzar acciones (actions) al store, con la intención de afectar el estado
    const { id } = useParams(); //use params me retorna un objeto por eso podemos hacer distractoring
    const history = useHistory();
    const recipeDetail = useSelector((state) => state.detail); //es un Hook que nos permite extraer datos del store de Redux utilizando una función selectora
    const allRecipes = useSelector((state) => state.recipes);
    
    useEffect(() => {
    if (allRecipes.length) {
      dispatch(getDetailFromState(id));
    } else {
      dispatch(getDetail(id));
    }
  }, [dispatch, id, allRecipes.length]);

    const handlerDelete = () => {
        dispatch(deleteRecipe(id));
        alert("Recipe deleted");
        history.push("/home");
        dispatch(getRecipes());
    };

    return (
    <div>
        <div className={styles.container}>
            <Link to='/home' className={styles.button}>
                Return to Home
            </Link> 
            <div className={styles.imageContainer}>
                <img className={styles.image} src={recipeDetail[0]?.img} alt="Recipe" />
            </div>
            <div className={styles.details}>
                <h2 className={styles.property}>Name:</h2>
                <p className={styles.value}>{recipeDetail[0]?.name}</p>
                <h2 className={styles.property}>Diets:</h2>
                <p className={styles.value}>
                    {recipeDetail[0]?.diets.map((diet,index) => (
                        <span key={diet}>{index > 0 && ", "}{diet.charAt(0).toUpperCase() + diet.slice(1).toLowerCase()}</span>
                    ))}
                </p>
                <h2 className={styles.property}>ID:</h2>
                <p className={styles.value}>{recipeDetail[0]?.id}</p>
                <h2 className={styles.property}>Healthscore:</h2>
                <p className={styles.value}>{recipeDetail[0]?.healthScore}</p>
                <h2 className={styles.property}>Summary:</h2>
                <p className={styles.value} dangerouslySetInnerHTML={{ __html: recipeDetail[0]?.summary }}></p>
                <h2 className={styles.property}>Steps:</h2>
                <p className={styles.value}>{recipeDetail[0]?.stepbyStep}</p>
            </div>  
            {/* {recipeDetail[0]?.createdInDb && (
                <div className={styles.buttons}>
                    <Link to={`/home`}>
                        <button
                            onClick={(event) => handlerDelete(event)}
                            className={styles.deleteButton}
                        >
                            Delete Recipe
                        </button>
                    </Link>
                </div>
            )} */}
            <div className={styles.contButton}>
                {recipeDetail[0]?.createdInDb && (<button className={styles.button} onClick={(event) => handlerDelete(event)}>
                    Delete Recipe
                </button>)}
          </div>
        </div>          
    </div>  
    )
}

export default RecipeDetail;




