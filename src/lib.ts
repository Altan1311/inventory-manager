export const formatPrice = (num) => {
  return num.toFixed(2).replace(".", ",") + "€"
}