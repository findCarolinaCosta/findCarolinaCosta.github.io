interface IGetScreenSize {
  small: { size: number; default: number };
  medium: { size: number; default: number };
  medium2: { size: number; default: number };
  large: { size: number; default: number };
}

export function getScreenSize({
  small,
  medium,
  medium2,
  large,
}: IGetScreenSize): number {
  // const width = window.innerWidth;

  // if (small.size === width || width < small.size) return small.default;

  // if (width > small.size && width < medium2.size) return medium.default;

  // if (width > medium.size && width < large.size) return medium2.default;

  // if (width >= large.size) return large.default;

  return large.default;
}
