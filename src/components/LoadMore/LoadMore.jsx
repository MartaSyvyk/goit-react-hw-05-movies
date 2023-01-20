import css from '../LoadMore/LoadMore.module.css'

export const LoadMore = ({onClick}) => {


   return <button type='button' onClick={onClick} className={css.button}>Load more</button>

}