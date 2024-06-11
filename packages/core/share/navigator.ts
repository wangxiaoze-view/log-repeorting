function support(key: string) {
  return key in navigator ? navigator[key as keyof typeof navigator] : '该浏览器不支持!';
}

export function getNavigator() {
  return {
    platform: support('platform'),
    appName: support('appName'),
    appVersion: support('appVersion'),
    appCodeName: support('appCodeName'),
    vendor: support('vendor'),
    userAgent: support('userAgent'),
    onLine: support('onLine'),
    language: support('language'),
    product: support('product'),
    productSub: support('productSub'),
    windowWidth: window.screen.width,
    windowHeight: window.screen.height,
    colorDepth: window.screen.colorDepth,
  };
}
