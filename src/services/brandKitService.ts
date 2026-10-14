import { BrandKit, BrandLogo, BrandColor, BrandGuideline } from '../types/brandKit';

const initialMockState: BrandKit = {
  logos: [
    { id: 'logo1', name: 'Primary Logo.png', uri: 'https://via.placeholder.com/150/080808/FFFFFF?text=Logo', isDefault: true }
  ],
  colors: [
    { id: 'c1', hex: '#8B5CF6', name: 'Primary Purple' },
    { id: 'c2', hex: '#EC4899', name: 'Accent Pink' }
  ],
  fonts: {
    primary: 'Plus Jakarta Sans',
    secondary: 'Inter'
  },
  voice: 'We\'re a friendly, innovative tech company that believes in making complex things simple. Our tone is professional yet approachable, and we love using real-world examples to explain concepts. We avoid jargon and always put our customers first.',
  guidelines: [
    { id: 'g1', name: 'Brand Guidelines 2026.pdf', size: '2.4 MB', uploadedAt: 'Oct 10, 2026', uri: '#' }
  ],
  training: {
    logo: true,
    colors: true,
    voice: true,
    typography: true
  }
};

let currentKitState = { ...initialMockState };

export class BrandKitService {
  static async getBrandKit(): Promise<BrandKit> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 500));
    return currentKitState;
  }

  static async updateBrandKit(newKit: BrandKit): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 300));
    currentKitState = { ...newKit };
  }

  static async addLogo(logo: BrandLogo): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 500));
    currentKitState.logos.push(logo);
    this.updateTrainingProgress();
  }

  static async removeLogo(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 300));
    currentKitState.logos = currentKitState.logos.filter(l => l.id !== id);
    this.updateTrainingProgress();
  }

  static async addColor(color: BrandColor): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 300));
    currentKitState.colors.push(color);
    this.updateTrainingProgress();
  }

  static async removeColor(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 300));
    currentKitState.colors = currentKitState.colors.filter(c => c.id !== id);
    this.updateTrainingProgress();
  }

  static async addGuideline(guideline: BrandGuideline): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 800));
    currentKitState.guidelines.push(guideline);
  }

  static async removeGuideline(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 300));
    currentKitState.guidelines = currentKitState.guidelines.filter(g => g.id !== id);
  }

  static async trainAI(): Promise<boolean> {
    await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
    return true;
  }

  private static updateTrainingProgress() {
    currentKitState.training = {
      logo: currentKitState.logos.length > 0,
      colors: currentKitState.colors.length > 0,
      voice: currentKitState.voice.length > 10,
      typography: !!(currentKitState.fonts.primary && currentKitState.fonts.secondary)
    };
  }
}
