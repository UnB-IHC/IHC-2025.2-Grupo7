// Em global.d.ts

declare global {
  interface Window {
    VLibras: any;
  }
}

// Isso é necessário para que o arquivo seja tratado como um módulo
export {};