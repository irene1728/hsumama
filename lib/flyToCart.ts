export function flyToCart(
  imageSrc: string,
  sourceElement: HTMLElement
) {
  const cartTarget = document.querySelector(
    "[data-cart-target]"
  ) as HTMLElement | null;

  if (!cartTarget) return;

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = cartTarget.getBoundingClientRect();

  const img = document.createElement("img");

  img.src = imageSrc;

  Object.assign(img.style, {
    position: "fixed",
    left: `${sourceRect.left}px`,
    top: `${sourceRect.top}px`,
    width: `${sourceRect.width}px`,
    height: `${sourceRect.height}px`,
    objectFit: "contain",
    zIndex: "9999",
    pointerEvents: "none",
    transition:
      "left 650ms cubic-bezier(0.4, 0, 0.2, 1), top 650ms cubic-bezier(0.4, 0, 0.2, 1), width 650ms ease, height 650ms ease, opacity 650ms ease",
  });

  document.body.appendChild(img);

  requestAnimationFrame(() => {
    img.style.left = `${targetRect.left + targetRect.width / 2 - 15}px`;
    img.style.top = `${targetRect.top + targetRect.height / 2 - 15}px`;
    img.style.width = "30px";
    img.style.height = "30px";
    img.style.opacity = "0.3";
  });

  setTimeout(() => {
    img.remove();
  }, 700);
}