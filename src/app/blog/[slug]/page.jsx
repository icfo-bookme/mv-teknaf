import sanitizeHtml from "sanitize-html";
import Banner from "@/components/ui/Banner";
import blogPosts from "@/data/blogPosts";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return {};
  return { title: post.title + ' | MV Teknaf', description: post.subtitle, alternates: { canonical: '/blog/' + slug } };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return notFound();

  return (
    <>
    <Banner
        imageUrl="/SHIP/SHIP6.png"
        title="Blog Details"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">{post.title}</h1>
        <p className="text-center text-gray-600 text-lg mb-6">{post.subtitle}</p>
        <div className="relative w-full aspect-square mb-6">
          <Image
            src={post.image}
            alt={post.title}
            fill sizes="(min-width: 896px) 864px, calc(100vw - 32px)"
            className="object-cover rounded-md"
          />
        </div>
        <div className="text-gray-800 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.description.replaceAll("<Link ", "<a ").replaceAll("</Link>", "</a>")) }} />
      </section></>
  );
}
