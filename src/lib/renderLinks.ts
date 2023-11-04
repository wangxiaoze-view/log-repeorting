export function renderLinks() {
  const head = document.head;
  const links = document.querySelectorAll('head link[rel=stylesheet]');

  for (let i = 0; i < links.length; i++) {
    const link: any = links[i];
    link.setAttribute('cross-origin', 'anonymous');
    const copyLink: Node = link.cloneNode();
    (copyLink as HTMLLinkElement).setAttribute('cross-origin', 'anonymous');
    head.removeChild(link);
    head.appendChild(copyLink);
  }
}

export function renderScripts() {
  const head = document.body;
  const scripts = document.querySelectorAll('body script[src]');
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];

    const el = document.createElement('script');
    el.setAttribute('type', 'text/javascript');
    el.setAttribute('src', (script as HTMLScriptElement).src);

    el.onload = function (e) {
      console.log(e, 1111, el);
    };

    head.removeChild(script);
    head.appendChild(el);
  }
}

export function eachLoadResource(e: ErrorEvent | Event) {
  requestIdleCallback(() => {
    renderLinks();
    renderScripts();
  });
}
