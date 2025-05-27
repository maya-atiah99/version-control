import { useMediaQuery } from 'react-responsive';

const breakpoints = {
  xs: 30, // 30em = 480px
  sm: 48, // 48em = 768px
  md: 64, // 64em = 1024px
  lg: 75, // 75em = 1200px
  xl: 90, // 90em = 1440px
};

const useResponsive = () => {
  const isTablet = useMediaQuery({ query: `(max-width: ${breakpoints.md}em)` });
  const isMobile = useMediaQuery({ query: `(max-width: ${breakpoints.sm}em)` });

  return { isTablet, isMobile };
};

export { breakpoints, useResponsive };
