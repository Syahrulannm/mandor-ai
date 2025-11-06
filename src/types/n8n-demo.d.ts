declare namespace JSX {
  interface IntrinsicElements {
    "n8n-demo": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      // Pakai salah satu:
      src?: string; // URL yang mengembalikan JSON workflow n8n
      workflow?: string; // stringified JSON workflow n8n

      // Opsi tampilan/interaksi:
      frame?: boolean | "true" | "false";
      clicktointeract?: boolean | "true" | "false";
      disableinteractivity?: boolean | "true" | "false";
      collapseformobile?: boolean | "true" | "false";
      theme?: "light" | "dark";
      hidecanvaserrors?: boolean | "true" | "false";
    };
  }
}
