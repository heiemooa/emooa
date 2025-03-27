export const getRectDiff = (node: HTMLElement, parentNode: HTMLElement) => {
  const nodeRect = node.getBoundingClientRect();
  const parentRect = parentNode.getBoundingClientRect();
  const scaleX = parentNode.offsetWidth / parentRect.width;
  const scaleY = parentNode.offsetHeight / parentRect.height;

  return {
    left: (nodeRect.left - parentRect.left) * scaleX,
    top: (nodeRect.top - parentRect.top) * scaleY,
    right: (nodeRect.right - parentRect.right) * scaleX,
    bottom: (nodeRect.bottom - parentRect.bottom) * scaleY,
  };
};

export const updateScrollOffset = (parentNode: HTMLElement, direction: 'horizontal' | 'vertical') => {
  const scrollLeft = parentNode.scrollLeft;
  const scrollTop = parentNode.scrollTop;

  if (direction === 'horizontal' && scrollLeft) {
    parentNode.scrollTo({ left: -1 * scrollLeft });
  }
  if (direction === 'vertical' && scrollTop) {
    parentNode.scrollTo({ top: -1 * scrollTop });
  }
};
