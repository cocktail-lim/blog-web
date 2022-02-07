export const markdownFilter = (content: string): string => {
  return content
    .replace(/<\/?[^>]*>/g, '')
    .replace(/[|]*\n/, '')
    .replace(/&npsp;/gi, '');
};

export const checkVisible = (node: HTMLAnchorElement | null): boolean => {
  if (node) {
    const { top, left, right, bottom } = node.getBoundingClientRect();
    return bottom > 0 && top < window.innerHeight && left < window.innerWidth && right > 0;
  }
  return false;
};
