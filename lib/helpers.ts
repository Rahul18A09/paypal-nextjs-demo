export function formatDate(
  date: string
) {
  return new Date(date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
}

export function formatPrice(
  price: number
) {
  return `$${price.toFixed(2)}`;
}