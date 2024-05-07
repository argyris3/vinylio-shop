import { Link } from "react-router-dom";
import { formatPrice } from "../../components/FormatPrice";
// import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="flex pb-1 pl-9">
      <div className="relative ">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full rounded-lg object-contain h-[300px] pb-1 "
        />
        {/* <HeartIcon product={product} /> */}
        <div className="pb-1">
          <Link to={`/product/${product._id}`}>
            <div className="flex items-center justify-between ">
              <h2 className="capitalize text-xl">{product.name}</h2>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 mt-1 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 ">
                {formatPrice(product.price)}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SmallProduct;
