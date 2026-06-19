import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { blogPosts } from "./StaticPage";

export default function BlogArticle() {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="bg-[#FFF8EC]">
      <section className="relative overflow-hidden bg-[#2B160D] text-white">
        <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B160D] via-[#2B160D]/80 to-black/25" />
        <div className="container relative grid min-h-[420px] content-center py-16">
          <Link to="/blog" className="mb-8 flex w-fit items-center gap-2 font-bold text-[#D4A25A] hover:text-white">
            <FiArrowLeft /> Back to blog
          </Link>
          <p className="font-bold uppercase tracking-[.25em] text-[#D4A25A]">{post.tag}</p>
          <h1 className="mt-4 max-w-4xl brand-font text-5xl md:text-7xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f2dfc9]">{post.excerpt}</p>
        </div>
      </section>

      <section className="container py-14">
        <div className="mx-auto max-w-3xl bg-white p-8 coffee-shadow md:p-12">
          {post.body.map((paragraph) => (
            <p key={paragraph} className="mb-6 text-lg leading-9 text-[#5e4634]">{paragraph}</p>
          ))}
          <div className="mt-10 border-t border-[#E6D1B3] pt-8">
            <h2 className="brand-font text-3xl">Ready for your next coffee ritual?</h2>
            <p className="mt-3 text-[#6f5644]">Explore BrewNest products chosen for slow mornings, gifting, and everyday cafe comfort.</p>
            <Link to="/shop" className="mt-6 inline-block rounded-lg bg-[#2B160D] px-7 py-4 font-black text-white hover:bg-[#8B5A2B]">Shop Coffee</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
