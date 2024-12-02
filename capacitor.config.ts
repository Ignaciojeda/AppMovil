import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AppMovil',
  webDir: 'www',
  bundledWebRuntime: false, // Normalmente es false para la mayoría de los proyectos
  plugins: {
    Camera: {
      quality: 90,
      allowEditing: false,
      resultType: 'Uri', // O 'Base64' si prefieres la imagen como base64
    },
  },
};

export default config;
