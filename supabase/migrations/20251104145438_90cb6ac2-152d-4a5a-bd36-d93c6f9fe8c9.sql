-- Create blog_posts table for storing articles
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  published_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN NOT NULL DEFAULT true,
  author_name TEXT DEFAULT 'Admin',
  views INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can read published posts)
CREATE POLICY "Blog posts are publicly readable"
ON public.blog_posts
FOR SELECT
USING (is_published = true);

-- Create policy for authenticated users to create posts
CREATE POLICY "Authenticated users can create blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update posts
CREATE POLICY "Authenticated users can update blog posts"
ON public.blog_posts
FOR UPDATE
USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete posts
CREATE POLICY "Authenticated users can delete blog posts"
ON public.blog_posts
FOR DELETE
USING (auth.role() = 'authenticated');

-- Create index for faster queries
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, thumbnail_url, read_time, author_name) VALUES
(
  'Membangun AI Agent dengan n8n dan ChatGPT',
  'membangun-ai-agent-dengan-n8n-chatgpt',
  'Pelajari cara membuat AI Agent otomatis menggunakan n8n workflow automation dan integrasi ChatGPT untuk berbagai use case.',
  '# Membangun AI Agent dengan n8n dan ChatGPT

## Pendahuluan

AI Agent adalah sistem otomatis yang dapat melakukan tugas-tugas kompleks dengan menggunakan kecerdasan buatan. Dalam artikel ini, kita akan membahas cara membuat AI Agent menggunakan n8n dan ChatGPT.

## Apa itu n8n?

n8n adalah platform workflow automation open-source yang memungkinkan Anda menghubungkan berbagai aplikasi dan layanan. Dengan n8n, Anda dapat membuat workflow otomatis tanpa perlu coding yang kompleks.

## Integrasi dengan ChatGPT

ChatGPT dari OpenAI memberikan kemampuan natural language processing yang powerful. Dengan mengintegrasikan ChatGPT ke dalam workflow n8n, kita bisa membuat AI Agent yang dapat:

- Menjawab pertanyaan pelanggan
- Menganalisis data
- Menghasilkan konten
- Melakukan automasi tugas

## Langkah-langkah Implementasi

1. **Setup n8n**: Install dan konfigurasi n8n di server Anda
2. **API Key OpenAI**: Dapatkan API key dari OpenAI
3. **Buat Workflow**: Design workflow sesuai kebutuhan
4. **Testing**: Uji coba workflow dengan berbagai skenario
5. **Deploy**: Deploy ke production

## Kesimpulan

Dengan kombinasi n8n dan ChatGPT, Anda bisa membuat AI Agent yang powerful untuk berbagai keperluan bisnis dan personal.',
  'AI & Automation',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  '8 min read',
  'John Doe'
),
(
  'Tutorial Lengkap React dan TypeScript',
  'tutorial-lengkap-react-typescript',
  'Panduan lengkap untuk memulai pengembangan aplikasi web modern dengan React dan TypeScript.',
  '# Tutorial Lengkap React dan TypeScript

## Mengapa React + TypeScript?

React adalah library JavaScript yang populer untuk membangun user interface, sementara TypeScript menambahkan type safety yang membuat code lebih reliable dan maintainable.

## Setup Project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

## Konsep Dasar

### Components

Component adalah building block dari aplikasi React. Dengan TypeScript, kita bisa mendefinisikan props dengan type yang jelas.

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### Hooks

React Hooks memungkinkan kita menggunakan state dan lifecycle dalam functional components.

```typescript
const [count, setCount] = useState<number>(0);
```

## Best Practices

1. Gunakan TypeScript untuk type safety
2. Ikuti naming conventions
3. Pisahkan logic dari UI
4. Gunakan custom hooks untuk reusable logic

## Kesimpulan

React dan TypeScript adalah kombinasi yang powerful untuk membangun aplikasi web modern.',
  'Development',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
  '10 min read',
  'Jane Smith'
),
(
  'Optimasi Performance Website dengan Tailwind CSS',
  'optimasi-performance-website-tailwind',
  'Tips dan trik untuk mengoptimalkan performa website menggunakan Tailwind CSS dan best practices modern.',
  '# Optimasi Performance Website dengan Tailwind CSS

## Pengenalan Tailwind CSS

Tailwind CSS adalah utility-first CSS framework yang memudahkan pembuatan UI yang responsive dan customizable.

## Keuntungan Tailwind

- **Utility-first**: Class yang dapat dikomposisi
- **Responsive design**: Built-in responsive modifiers
- **Dark mode**: Support dark mode out of the box
- **Tree-shaking**: Hanya CSS yang digunakan yang di-bundle

## Optimasi Performance

### 1. PurgeCSS

Tailwind sudah include PurgeCSS yang otomatis menghapus CSS yang tidak digunakan.

```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 2. JIT Mode

Just-In-Time mode menghasilkan CSS on-demand, mengurangi ukuran file CSS significantly.

### 3. Component Extraction

Extract component yang sering digunakan untuk mengurangi duplikasi class.

## Kesimpulan

Tailwind CSS memberikan cara modern untuk styling dengan performance yang optimal.',
  'Design',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  '6 min read',
  'Alex Johnson'
);