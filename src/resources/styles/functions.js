const getLinearGradientProperty = ({
  angle = 0,
  baseColor1 = '',
  baseColor1Start = '',
  baseColor2 = '',
  baseColor2Start = '',
}) => `linear-gradient(${angle}deg, ${baseColor1} ${baseColor1Start}, ${baseColor2} ${baseColor2Start})`;

export {
  getLinearGradientProperty,
};
