import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import { motion } from "framer-motion";

export default function ProductTile({ product }) {
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <motion.div
          className="group product-card flex flex-col items-center gap-3 p-4 h-[360px] mt-10 ml-5 rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="h-[180px]">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-cover h-full w-full"
            />
          </div>
          <div>
            <h1 className="w-40 text-center mt-3 font-bold text-lg ">
              {product.title}
            </h1>
            <StarRating rating={product.rating} />
            {product.rating.rate}
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
