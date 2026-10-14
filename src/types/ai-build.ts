export type AIBuildConfig = {
  brandName: string;
  brandVoice: string;
  primaryColor: string;
  secondaryColor: string;

  designSystem: {
    referenceUrl?: string;
    headingFont: string;
    bodyFont: string;
    colorScheme: string;
    designStyle: string;
  };

  content: {
    targetPlatform: string;
    topic: string;
    tone: string;
  };
};
