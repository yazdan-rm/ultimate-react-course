import Button from "@mui/material/Button";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {motion} from "framer-motion";
import {useFormContext} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  useCreateECommerceProductMutation,
  useDeleteECommerceProductMutation,
  useUpdateECommerceProductMutation,
} from "../ECommerceApi";

/**
 * The product header.
 */
function ProductHeader() {
  const routeParams = useParams();
  const { productId } = routeParams;
  const [createProduct] = useCreateECommerceProductMutation();
  const [saveProduct] = useUpdateECommerceProductMutation();
  const [removeProduct] = useDeleteECommerceProductMutation();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const theme = useTheme();
  const navigate = useNavigate();
  const { name, images, featuredImageId } = watch();

  function handleSaveProduct() {
    console.log(getValues());
    saveProduct(getValues());
  }

  function handleCreateProduct() {
    createProduct(getValues())
      .unwrap()
      .then((data) => {
        navigate(`/apps/e-commerce/prodcts/${data.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRemoveProduct() {
    removeProduct(productId);
    navigate("/apps/e-commerce/products");
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-24 sm:py-32 px-24 md:px-32">
      <div className="flex flex-col items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/products"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Products</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            {images && images.length > 0 && featuredImageId ? (
              <img
                className="w-32 sm:w-48 rounded"
                src={_.find(images, { id: featuredImageId })?.url}
                alt={name}
              />
            ) : (
              <img
                className="w-32 sm:w-48 rounded"
                src="assets/images/apps/ecommerce/product-image-placeholder.png"
                alt={name}
              />
            )}
          </motion.div>
          <motion.div
            className="flex flex-col min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {name || "New Product"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Product Detail
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex flex-1 w-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        {productId !== "new" ? (
          <>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              onClick={handleRemoveProduct}
              startIcon={
                <FuseSvgIcon className="hidden sm:flex">
                  heroicons-outline:trash
                </FuseSvgIcon>
              }
            >
              Remove
            </Button>
            <Button
              className="whitespace-nowrap mx-4"
              variant="contained"
              color="secondary"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              onClick={handleSaveProduct}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleCreateProduct}
          >
            Add
          </Button>
        )}
      </motion.div>
    </div>
  );
}

export default ProductHeader;
