import { useState } from 'react';
import productsColors from './../../../utils/data/products-colors';
import productsSizes from './../../../utils/data/products-sizes';
import CheckboxColor from './../../products-filter/form-builder/checkbox-color';
import { useDispatch, useSelector } from 'react-redux';
import { some } from 'lodash';
import { addProduct } from 'store/reducers/cart';
import { toggleFavProduct } from 'store/reducers/user';
import { ProductType, ProductStoreType } from 'types';
import { RootState } from 'store';
import namer from "color-namer";


type ProductContent = {
  product: ProductType;
}

const Content = ({ product }: ProductContent) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState<number>(1);
  const [color, setColor] = useState<string>('');
  const [itemSize, setItemSize] = useState<string>('');

  const onColorSet = (e: string) => setColor(e);
  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => setItemSize(e.target.value);

  const { favProducts } = useSelector((state: RootState) => state.user);
  const isFavourite = some(favProducts, productId => productId === product.productId);

  const toggleFav = () => {
    dispatch(toggleFavProduct(
      { 
        id: product.productId,
      }
    ))
  }

  console.log( `add to cart${product}`);

  const addToCart = () => {
    const productToSave: ProductStoreType = { 
      productId: product.productId,
      productName: product.productName,
      thumb: product.imageData ? product.imageData[0] : '',
      price: product.currentPrice,
      count: count,
      color: (product.color),
      size: itemSize
    }

    const productStore = {
      count,
      product: productToSave
    }

    dispatch(addProduct(productStore));
  }

  const getColorName = (hexColor: string) => {
    const colorNames = namer(hexColor);
    return colorNames.ntc[0].name; // ntc is the name that color theory
  };

  return (
    <section className="product-content">
      <div className="product-content__intro">
        <h5 className="product__id">Product ID:<br></br>{product.productId}</h5>
        <span className="product-on-sale">Sale</span>
        <h2 className="product__name">{product.productName}</h2>

        <div className="product__prices">
          <h4>${ product.currentPrice }</h4>
          {product.discount &&
            <span>${ product.price }</span>
          }
        </div>
      </div>

      <div className="product-content__filters">
        <div className="product-filter-item">
          <h5>Color:</h5>
          <div className="checkbox-color-wrapper">
           
              <CheckboxColor 
                key={product.productId} 
                type={'radio'} 
                name="product-color" 
                color= {product.color}
                valueName={product.color}
                onChange={onColorSet} 
              />
            
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Size: <strong>See size table</strong></h5>
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
              <select onChange={onSelectChange}>
                <option>Choose size</option>
                {productsSizes.map(type => (
                  <option value={type.label}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="product-filter-item">
          <h5>Quantity:</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button type="button" onClick={() =>   setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1))} className="quantity-button__btn">
                -
              </button>
              <span>{count}</span>
              <button type="button" onClick={() => setCount(count + 1)} className="quantity-button__btn">
                +
              </button>
            </div>
            
            <button type="submit" onClick={() => addToCart()} className="btn btn--rounded btn--yellow">Add to cart</button>
            <button type="button" onClick={toggleFav} className={`btn-heart ${isFavourite ? 'btn-heart--active' : ''}`}><i className="icon-heart"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
};
  
export default Content;
    