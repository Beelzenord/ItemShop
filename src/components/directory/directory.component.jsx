import CategoryItem from "../category-item/category-item.component"
import './directory.component.styles.scss'
const Directory = ({categories}) => {
    return(
        <div className='directory-container'>
            {categories.map((category)=>(
              //  console.log('current cat: ', category);
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    )
};
export default Directory;