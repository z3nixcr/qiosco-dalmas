export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function getImagePath(imagePath: string) {
  const baseUrl = "https://res.cloudinary.com";
  return imagePath.startsWith(baseUrl)
    ? imagePath
    : `/products/${imagePath}.jpg`;
}
