import { useEffect, useState } from "react";

export function useN8NDemo() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (document.querySelector('script[data-n8n-demo-bundled="1"]')) {
      setReady(true);
      return;
    }

    const s1 = document.createElement("script");
    s1.src = "https://cdn.jsdelivr.net/npm/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js";

    const s2 = document.createElement("script");
    s2.src = "https://www.unpkg.com/lit@2.0.0-rc.2/polyfill-support.js";

    const s3 = document.createElement("script");
    s3.type = "module";
    s3.src = "https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js";
    s3.setAttribute("data-n8n-demo-bundled", "1");

    let loaded = 0;
    const onload = () => {
      loaded += 1;
      if (loaded === 3 && !cancelled) setReady(true);
    };
    [s1, s2, s3].forEach((s) => (s.onload = onload));
    document.head.append(s1, s2, s3);

    return () => {
      cancelled = true;
    };
  }, []);

  return ready;
}
