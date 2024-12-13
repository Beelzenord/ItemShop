import './category-items.styles.scss'

const CategoryItem = ({category}) => {
    const {id, imageUrl, title} = category;
    console.log('stuff here');
    return(
        <div key ={id} className ="category-container">
        <div className = 'background-image' style = {{
          backgroundImage:`url(${imageUrl})`
        }}/>
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
        </div>
    );
}

export default CategoryItem;