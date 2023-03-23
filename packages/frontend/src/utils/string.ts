export const trimString = (
  text: string,
  length: number,
  withEllipsis?: boolean,
) => {
  let subString = text.substring(0, length);

  if (withEllipsis) subString += '...';

  return subString;
};

export default trimString;
