import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCoffee, FaInstagram, FaLeaf, FaMapMarkerAlt, FaMugHot, FaPhoneAlt, FaRegEnvelope } from "react-icons/fa";
import { FiArrowRight, FiCheckCircle, FiClock, FiSend } from "react-icons/fi";
import api from "../services/api";

export const blogPosts = [
  {
    slug: "home-cafe-corner",
    title: "How to Build a Home Cafe Corner",
    tag: "Brewing",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85",
    excerpt: "Small rituals, warm lighting, and the right mug can turn your kitchen counter into a calm coffee bar.",
    body: [
      "A home cafe corner starts with comfort before equipment. Choose one small area near natural light or a quiet counter, then keep only the tools you actually use every day: your favorite beans, a reliable brewer, cups, filters, and a clean tray.",
      "Warm lighting changes the mood immediately. Add a small lamp, wooden tray, ceramic mug, or woven basket to make the setup feel intentional without becoming crowded.",
      "Keep your coffee station easy to reset. Store beans in an airtight jar, wipe the counter after each brew, and rotate seasonal touches like cinnamon, cocoa, or a new mug when you want the ritual to feel fresh.",
    ],
  },
  {
    slug: "arabica-vs-dark-roast",
    title: "Arabica vs Dark Roast: What Should You Pick?",
    tag: "Coffee Guide",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=900&q=85",
    excerpt: "A quick flavor-first guide to choosing beans for espresso, filter coffee, and cold brew.",
    body: [
      "Arabica describes the coffee plant variety, while dark roast describes how long the beans were roasted. That means you can have Arabica beans roasted lightly, medium, or dark.",
      "Pick Arabica when you want a smoother cup with more aroma and gentle acidity. It works beautifully for pour-over, French press, and daily milk coffee.",
      "Choose dark roast when you like bold flavor, deeper bitterness, and a heavier cup. It is especially friendly for espresso, moka pot, and strong iced coffee.",
    ],
  },
  {
    slug: "personal-coffee-gift-boxes",
    title: "Gift Boxes That Feel Personal",
    tag: "Gifting",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=85",
    excerpt: "Pair beans, mugs, tumblers, and sweet add-ons to create a custom coffee gift people remember.",
    body: [
      "A thoughtful coffee gift box should feel useful, beautiful, and personal. Start with the recipient's coffee style: espresso, filter coffee, cold brew, or cozy milk drinks.",
      "Then add one hero item such as premium beans, a ceramic mug, or a travel tumbler. Build around it with small extras like cookies, brew cards, chocolate, or a handwritten note.",
      "The finishing touch is packaging. Warm paper, ribbon, and a simple label make the box feel curated instead of assembled at the last minute.",
    ],
  },
];

export default function StaticPage({ title }) {
  if (title.includes("About")) return <AboutPage />;
  if (title.includes("Contact")) return <ContactPage />;
  return <BlogPage />;
}

function PageHero({ eyebrow, title, text, image }) {
  return (
    <section className="relative overflow-hidden bg-[#2B160D] text-white">
      <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2B160D] via-[#2B160D]/80 to-transparent" />
      <div className="container relative grid min-h-[360px] content-center py-16">
        <p className="font-bold uppercase tracking-[.25em] text-[#D4A25A]">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl brand-font text-5xl md:text-7xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f2dfc9]">{text}</p>
      </div>
    </section>
  );
}

function AboutPage() {
  const values = [
    ["Premium Beans", "Handpicked roasts for espresso, filter, and cold brew.", FaCoffee],
    ["Cafe Aesthetic", "Mugs, tumblers, totes, and tools that look good daily.", FaMugHot],
    ["Thoughtful Gifting", "Custom boxes for birthdays, teams, clients, and coffee lovers.", FaLeaf],
  ];

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Coffee rituals, made warmer."
        text="BrewNest curates premium beans, cafe merchandise, and custom coffee boxes for people who love slow mornings and thoughtful gifts."
        image="https://images.unsplash.com/photo-1511081692775-05d0f180a065?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="container py-14">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_420px]">
          <div className="bg-white p-8 coffee-shadow">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-[#8B5A2B]">BrewNest philosophy</p>
            <h2 className="mt-2 brand-font text-4xl">BrewNest began with one simple idea</h2>
            <p className="mt-4 leading-8 text-[#6f5644]">
              Coffee should feel personal. Every product in our store is selected for the little details that make a daily brew better: rich aroma, comfortable mugs, practical tumblers, beautiful packaging, and gifting that feels intentional.
            </p>
            <p className="mt-4 leading-8 text-[#6f5644]">
              From espresso beans to cafe aprons and custom coffee boxes, BrewNest blends premium quality with a cozy, modern cafe aesthetic.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Fresh picks", "Gift ready", "Cafe quality"].map((item) => (
                <div key={item} className="border-l-4 border-[#D4A25A] bg-[#FFF8EC] p-4 font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden coffee-shadow">
            <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=85" alt="Cafe coffee" className="h-full min-h-80 w-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-[#2B160D]/88 p-5 text-white">
              <p className="text-sm font-bold uppercase tracking-[.2em] text-[#D4A25A]">Since 2026</p>
              <p className="mt-1 text-lg font-black">Small batch selections, packed with care.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map(([head, text, Icon]) => (
            <div key={head} className="bg-[#FFF8EC] p-6 coffee-shadow">
              <Icon className="text-4xl text-[#C99854]" />
              <h3 className="mt-4 text-xl font-black">{head}</h3>
              <p className="mt-2 text-[#6f5644]">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [isSending, setIsSending] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    setStatus({ type: "", text: "" });
    setIsSending(true);

    try {
      await api.post("/contact", form);
      setForm({ name: "", email: "", subject: "", message: "" });
      setStatus({ type: "success", text: "Message sent. We will get back to you soon." });
    } catch (error) {
      setStatus({
        type: "error",
        text: error.response?.data?.message || "Could not send the message right now. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk coffee."
        text="Need help with an order, a custom gift box, or bulk cafe merchandise? Send us a note and we'll help you brew the right plan."
        image="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="container py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <form onSubmit={submitContact} className="bg-white p-8 coffee-shadow">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-[#8B5A2B]">Quick reply desk</p>
            <h2 className="mt-2 brand-font text-4xl">Send a Message</h2>
            <p className="mt-3 max-w-2xl text-[#6f5644]">Tell us what you need and our team will receive it directly by email.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-[#4d2f1d]">
                Your name
                <input name="name" value={form.name} onChange={updateField} className="border border-[#D8B884] bg-[#FFFCF7] px-4 py-3 font-medium outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#E9C98D]" placeholder="Krisha Darji" required />
              </label>
              <label className="grid gap-2 text-sm font-bold text-[#4d2f1d]">
                Email address
                <input name="email" value={form.email} onChange={updateField} type="email" className="border border-[#D8B884] bg-[#FFFCF7] px-4 py-3 font-medium outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#E9C98D]" placeholder="you@example.com" required />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-bold text-[#4d2f1d]">
              Subject
              <input name="subject" value={form.subject} onChange={updateField} className="border border-[#D8B884] bg-[#FFFCF7] px-4 py-3 font-medium outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#E9C98D]" placeholder="Custom coffee box" required />
            </label>
            <label className="mt-4 grid gap-2 text-sm font-bold text-[#4d2f1d]">
              Message
              <textarea name="message" value={form.message} onChange={updateField} className="min-h-40 border border-[#D8B884] bg-[#FFFCF7] px-4 py-3 font-medium outline-none focus:border-[#8B5A2B] focus:ring-2 focus:ring-[#E9C98D]" placeholder="Tell us what you need" required />
            </label>
            {status.text && (
              <p className={`mt-4 flex items-center gap-2 p-3 text-sm font-bold ${status.type === "success" ? "bg-[#E7F5EA] text-[#236532]" : "bg-[#FDECEC] text-[#9A2D2D]"}`}>
                {status.type === "success" && <FiCheckCircle />}
                {status.text}
              </p>
            )}
            <button disabled={isSending} className="mt-5 flex items-center gap-2 bg-[#2B160D] px-7 py-4 font-bold text-white hover:bg-[#8B5A2B] disabled:cursor-not-allowed disabled:opacity-65">
              {isSending ? "Sending..." : "Send Message"} <FiSend />
            </button>
          </form>
          <div className="space-y-4">
            <ContactCard icon={FaMapMarkerAlt} title="Visit" text="BrewNest Studio, Varodara, India" />
            <ContactCard icon={FaPhoneAlt} title="Call" text="+91 98765 43210" />
            <ContactCard icon={FaRegEnvelope} title="Email" text="kishudarji2612@gmail.com" />
            <ContactCard icon={FiClock} title="Hours" text="Mon - Sat, 9:00 AM - 7:00 PM" />
            <div className="bg-[#2B160D] p-6 text-white coffee-shadow">
              <FaInstagram className="text-3xl text-[#D4A25A]" />
              <h3 className="mt-3 text-xl font-black">Follow the brew</h3>
              <p className="mt-2 text-[#eadccf]">@brewnest.cafe for new launches, box ideas, and coffee moments.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4 bg-white p-5 coffee-shadow">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#F1DEC0] text-[#2B160D]"><Icon /></span>
      <span><strong className="block">{title}</strong><small className="text-[#6f5644]">{text}</small></span>
    </div>
  );
}

function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Brew Journal"
        title="Stories for better coffee days."
        text="Guides, gifting ideas, roast notes, and simple ways to make your coffee corner feel more premium."
        image="https://images.unsplash.com/photo-1459755486867-b55449bb39ff?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="container py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.title} className="overflow-hidden bg-white coffee-shadow">
              <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <span className="rounded-full bg-[#F4E7D3] px-3 py-1 text-xs font-bold uppercase tracking-[.15em] text-[#8B5A2B]">{post.tag}</span>
                <h2 className="mt-4 brand-font text-3xl">{post.title}</h2>
                <p className="mt-3 text-[#6f5644]">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="mt-5 flex items-center gap-2 font-bold text-[#8B5A2B] hover:text-[#C99854]">Read article <FiArrowRight /></Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 bg-[#F4E7D3] p-8 coffee-shadow md:flex md:items-center md:justify-between">
          <div>
            <h2 className="brand-font text-4xl">Never miss a roast note</h2>
            <p className="mt-2 text-[#6f5644]">Get brewing tips, launches, and gift ideas in your inbox.</p>
          </div>
          <Link to="/shop" className="mt-5 inline-block bg-[#2B160D] px-7 py-4 font-bold text-white md:mt-0">
            Shop Coffee
          </Link>
        </div>
      </section>
    </>
  );
}
