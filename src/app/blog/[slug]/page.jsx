import Banner from "@/components/ui/Banner";
import blogPosts from "@/data/blogPosts";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogDetailPage({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) return notFound();

  return (
    <>
    <Banner
        imageUrl="/13.png"
        title="Blog Details"
        subtitle=""
        heightClass=" h-[50vh] lg:h-[70vh]"
      />
      <section className="py-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">{post.title}</h1>
        <p className="text-center text-gray-600 text-lg mb-6">{post.subtitle}</p>
        <div className="relative w-full h-96 mb-6">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-gray-800 text-lg leading-relaxed">{post.description}</p>
      </section></>
  );
}
