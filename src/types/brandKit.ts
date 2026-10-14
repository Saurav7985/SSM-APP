export type BrandLogo = {
  id: string;
  name: string;
  uri: string;
  isDefault?: boolean;
};

export type BrandColor = {
  id: string;
  hex: string;
  name?: string;
};

export type BrandGuideline = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  uri: string;
};

export type BrandKit = {
  logos: BrandLogo[];
  colors: BrandColor[];
  fonts: {
    primary: string;
    secondary: string;
  };
  voice: string;
  guidelines: BrandGuideline[];
  training: {
    logo: boolean;
    colors: boolean;
    voice: boolean;
    typography: boolean;
  };
};
