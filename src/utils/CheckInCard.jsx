export function CheckInCard(card, product) {
  return card.find((c) => c.id === product.id);
}
