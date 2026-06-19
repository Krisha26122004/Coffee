import { useMemo, useState } from "react";
import { FiCheck, FiGift, FiChevronRight, FiChevronLeft, FiHeart } from "react-icons/fi";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const boxOptions = [
  {
    name: "Classic Wooden Crate",
    price: 199,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    desc: "Rustic pine-wood crate hand-stamped with the BrewNest insignia. Elegant, reusable, and sturdy."
  },
  {
    name: "Luxury Gold & Crimson Box",
    price: 299,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=600&q=80",
    desc: "Rigid magnetic keepsake box decorated with gold foil accents. Perfect for festive and premium gifts."
  },
  {
    name: "Eco-Friendly Kraft Box",
    price: 149,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    desc: "Minimalist, biodegradable kraft card box tied with natural jute twine. Clean, organic, and simple."
  }
];

const coffeeOptions = [
  {
    name: "Dark Roast",
    price: 549,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    desc: "Rich, bold, and smoky flavor profile with deep dark chocolate undertones and low acidity."
  },
  {
    name: "Arabica Premium",
    price: 699,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&q=80",
    desc: "Smooth body, highly aromatic, featuring bright floral notes and a clean, citrusy finish."
  },
  {
    name: "Cold Brew Blend",
    price: 499,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    desc: "Coarsely ground beans curated specifically for smooth, low-acid cold water extraction."
  }
];

const mugOptions = [
  {
    name: "Ceramic Craft Mug",
    price: 399,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
    desc: "Artisanal clay mug with a textured matte glaze, cozy to hold during winter mornings."
  },
  {
    name: "Travel Tumbler",
    price: 799,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80",
    desc: "Double-walled vacuum insulated stainless steel tumbler to keep drinks hot or cold for hours."
  },
  {
    name: "Glass Coffee Cup",
    price: 349,
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
    desc: "Sleek double-walled borosilicate glass cup that keeps coffee hot while staying cool to touch."
  }
];

const addonOptions = [
  {
    name: "Gourmet Butter Cookies",
    price: 149,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80",
    desc: "Crispy, rich butter cookies packed in a retro-style tin."
  },
  {
    name: "Artisanal Dark Chocolate",
    price: 199,
    image: "/assets/dark_chocolate.png",
    desc: "70% Single-Origin cocoa bar with sea salt and roasted almond bits."
  },
  {
    name: "Vintage Brass Spoon",
    price: 129,
    image: "/assets/vintage_spoon.png",
    desc: "Beautifully engraved brass stirring spoon for a classic touch."
  },
  {
    name: "Mini Coffee Frother",
    price: 249,
    image: "/assets/coffee_frother.png",
    desc: "Battery-operated hand frother for creamy cappuccinos and lattes."
  },
  {
    name: "Cocoa Scented Candle",
    price: 199,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    desc: "Cozy soy wax candle smelling of rich hot cocoa and roasted hazelnut."
  },
  {
    name: "Espresso Shot Candle",
    price: 199,
    image: "/assets/espresso_candle.png",
    desc: "Energizing candle scented with warm espresso beans and brown sugar."
  },
  {
    name: "French Vanilla Candle",
    price: 199,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    desc: "Warm vanilla orchid scent to create a calming home cafe mood."
  },
  {
    name: "Strawberry Shortcake Candle",
    price: 199,
    image: "/assets/strawberry_candle.png",
    desc: "Sweet scent of fresh strawberries and baked cake for celebratory moods."
  }
];

const cardThemes = [
  { id: "love", name: "With Love", bg: "from-rose-50 to-rose-100 border-rose-200 text-rose-800 shadow-rose-100", emoji: "❤️" },
  { id: "birthday", name: "Happy Birthday", bg: "from-amber-50 to-amber-100 border-amber-200 text-amber-800 shadow-amber-100", emoji: "🎂" },
  { id: "anniversary", name: "Happy Anniversary", bg: "from-purple-50 to-purple-100 border-purple-200 text-purple-800 shadow-purple-100", emoji: "✨" },
  { id: "thankyou", name: "Thank You", bg: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800 shadow-emerald-100", emoji: "🙏" }
];

const STEPS = [
  { id: 1, name: "Gift Box Packaging" },
  { id: 2, name: "Premium Coffee" },
  { id: 3, name: "Mug or Tumbler" },
  { id: 4, name: "Snacks & Tools" },
  { id: 5, name: "Greeting Card" }
];

export default function CoffeeBoxBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBox, setSelectedBox] = useState(boxOptions[0]);
  const [selectedCoffee, setSelectedCoffee] = useState(coffeeOptions[0]);
  const [selectedMug, setSelectedMug] = useState(mugOptions[0]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Greeting card state
  const [cardTheme, setCardTheme] = useState(cardThemes[0]);
  const [cardTo, setCardTo] = useState("");
  const [cardFrom, setCardFrom] = useState("");
  const [cardMessage, setCardMessage] = useState("");

  const { addToCart } = useCart();
  const { user } = useAuth();

  const total = useMemo(() => {
    return (
      selectedBox.price +
      selectedCoffee.price +
      selectedMug.price +
      selectedAddons.reduce((sum, item) => sum + item.price, 0)
    );
  }, [selectedBox, selectedCoffee, selectedMug, selectedAddons]);

  const toggleAddon = (addon) => {
    setSelectedAddons((list) =>
      list.some((a) => a.name === addon.name)
        ? list.filter((a) => a.name !== addon.name)
        : [...list, addon]
    );
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const addBoxToCart = async () => {
    const boxDetails = {
      boxType: selectedBox.name,
      coffeeType: selectedCoffee.name,
      mugType: selectedMug.name,
      addons: selectedAddons.map((a) => a.name),
      totalPrice: total,
      greetingCard: {
        theme: cardTheme.name,
        to: cardTo || "Someone Special",
        from: cardFrom || "A Friend",
        message: cardMessage || "Hope this brings a smile to your face!"
      }
    };

    if (user) {
      // Backend expects coffeeType, mugType, addons, totalPrice
      const postPayload = {
        coffeeType: selectedCoffee.name,
        mugType: selectedMug.name,
        addons: [...selectedAddons.map((a) => a.name), `Box: ${selectedBox.name}`],
        totalPrice: total
      };
      await api.post("/coffeebox/create", postPayload).catch(() => null);
    }

    addToCart(
      {
        cartKey: `box-${Date.now()}`,
        id: `box-${Date.now()}`,
        name: `Custom ${selectedBox.name} Gift Hamper`,
        category: "Build Your Coffee Box",
        price: total,
        image: selectedBox.image,
        box: boxDetails
      },
      1
    );
  };

  const currentThemeClasses = useMemo(() => {
    return cardTheme.bg;
  }, [cardTheme]);

  return (
    <section className="container py-8 max-w-7xl px-4">
      {/* Header Block */}
      <div className="relative overflow-hidden rounded-2xl bg-[#2B160D] p-8 text-white coffee-shadow mb-8">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <FiGift className="text-[120px] text-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4A25A]/20 px-3 py-1 text-sm font-semibold text-[#EADCCF]">
            <FiHeart className="text-[#D4A25A]" /> Crafted for Special Ones
          </span>
          <h1 className="mt-4 brand-font text-4xl md:text-5xl font-bold leading-tight">
            Design Your Coffee Hamper
          </h1>
          <p className="mt-2 text-[#eadccf] text-sm md:text-base">
            Create a memorable, tailor-made experience. Pick your box style, choose premium gourmet beans, add mugs, treats, and include a personalized premium card.
          </p>
        </div>
      </div>

      {/* Progressive Step Progress Bar */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[650px] px-2">
          {STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold border transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-[#C99854] text-[#2B160D] border-[#C99854] scale-110 shadow-lg"
                    : currentStep > step.id
                    ? "bg-[#2B160D] text-white border-[#2B160D]"
                    : "bg-white text-[#2B160D]/40 border-gray-200"
                }`}
              >
                {currentStep > step.id ? <FiCheck className="text-lg" /> : step.id}
              </div>
              <div className="text-left">
                <span className="block text-xs text-[#7d6047] uppercase font-semibold">
                  Step 0{step.id}
                </span>
                <span
                  className={`text-sm font-bold ${
                    currentStep === step.id
                      ? "text-[#2B160D]"
                      : "text-[#2B160D]/60"
                  } group-hover:text-[#2B160D]`}
                >
                  {step.name}
                </span>
              </div>
              {step.id < 5 && (
                <div
                  className={`h-0.5 w-10 md:w-16 mx-2 ${
                    currentStep > step.id ? "bg-[#2B160D]" : "bg-gray-200"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left Side: Dynamic Step Configurator */}
        <div className="space-y-6">
          {/* STEP 1: Gift Box Packaging */}
          {currentStep === 1 && (
            <div className="rounded-2xl bg-white p-6 md:p-8 coffee-shadow border border-orange-50 animate-[fadeIn_0.3s_ease]">
              <div className="mb-6">
                <h2 className="brand-font text-3xl font-bold text-[#2B160D]">
                  Choose Gift Packaging
                </h2>
                <p className="text-[#7d6047] text-sm mt-1">
                  Select the perfect chest or gift box layout to hold your crafted selection.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {boxOptions.map((opt) => (
                  <div
                    key={opt.name}
                    onClick={() => setSelectedBox(opt)}
                    className={`group relative overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 cursor-pointer ${
                      selectedBox.name === opt.name
                        ? "border-[#C99854] ring-2 ring-[#C99854]/20 scale-[1.01]"
                        : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={opt.image}
                        alt={opt.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#2B160D] text-base leading-tight">
                          {opt.name}
                        </h3>
                        <span className="font-extrabold text-[#C99854]">
                          ₹{opt.price}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[#7d6047] leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                    {selectedBox.name === opt.name && (
                      <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C99854] text-white">
                        <FiCheck className="text-sm font-bold" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Premium Coffee Selection */}
          {currentStep === 2 && (
            <div className="rounded-2xl bg-white p-6 md:p-8 coffee-shadow border border-orange-50 animate-[fadeIn_0.3s_ease]">
              <div className="mb-6">
                <h2 className="brand-font text-3xl font-bold text-[#2B160D]">
                  Select Premium Coffee
                </h2>
                <p className="text-[#7d6047] text-sm mt-1">
                  Choose a rich artisanal blend or premium single-origin roast.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {coffeeOptions.map((opt) => (
                  <div
                    key={opt.name}
                    onClick={() => setSelectedCoffee(opt)}
                    className={`group relative overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 cursor-pointer ${
                      selectedCoffee.name === opt.name
                        ? "border-[#C99854] ring-2 ring-[#C99854]/20 scale-[1.01]"
                        : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={opt.image}
                        alt={opt.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#2B160D] text-base leading-tight">
                          {opt.name}
                        </h3>
                        <span className="font-extrabold text-[#C99854]">
                          ₹{opt.price}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[#7d6047] leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                    {selectedCoffee.name === opt.name && (
                      <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C99854] text-white">
                        <FiCheck className="text-sm font-bold" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Mug / Tumbler Selection */}
          {currentStep === 3 && (
            <div className="rounded-2xl bg-white p-6 md:p-8 coffee-shadow border border-orange-50 animate-[fadeIn_0.3s_ease]">
              <div className="mb-6">
                <h2 className="brand-font text-3xl font-bold text-[#2B160D]">
                  Pick a Mug or Tumbler
                </h2>
                <p className="text-[#7d6047] text-sm mt-1">
                  Every great roast deserves a custom container. Pick their favorite.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {mugOptions.map((opt) => (
                  <div
                    key={opt.name}
                    onClick={() => setSelectedMug(opt)}
                    className={`group relative overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 cursor-pointer ${
                      selectedMug.name === opt.name
                        ? "border-[#C99854] ring-2 ring-[#C99854]/20 scale-[1.01]"
                        : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={opt.image}
                        alt={opt.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-[#2B160D] text-base leading-tight">
                          {opt.name}
                        </h3>
                        <span className="font-extrabold text-[#C99854]">
                          ₹{opt.price}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[#7d6047] leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                    {selectedMug.name === opt.name && (
                      <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C99854] text-white">
                        <FiCheck className="text-sm font-bold" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Snacks & Add-ons */}
          {currentStep === 4 && (
            <div className="rounded-2xl bg-white p-6 md:p-8 coffee-shadow border border-orange-50 animate-[fadeIn_0.3s_ease]">
              <div className="mb-6">
                <h2 className="brand-font text-3xl font-bold text-[#2B160D]">
                  Gourmet Snacks & Tools
                </h2>
                <p className="text-[#7d6047] text-sm mt-1">
                  Elevate the box with handmade dark chocolate, fresh cookies, or brewing accessories.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
                {addonOptions.map((opt) => {
                  const isSelected = selectedAddons.some((a) => a.name === opt.name);
                  return (
                    <div
                      key={opt.name}
                      onClick={() => toggleAddon(opt)}
                      className={`group relative overflow-hidden rounded-xl border-2 bg-white transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "border-[#C99854] ring-2 ring-[#C99854]/20 scale-[1.01]"
                          : "border-gray-100 hover:border-gray-300 hover:shadow-md"
                      }`}
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img
                          src={opt.image}
                          alt={opt.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex flex-col">
                          <h3 className="font-bold text-[#2B160D] text-sm leading-tight">
                            {opt.name}
                          </h3>
                          <span className="font-extrabold text-[#C99854] text-sm mt-1">
                            ₹{opt.price}
                          </span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#7d6047] leading-tight line-clamp-2">
                          {opt.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C99854] text-white">
                          <FiCheck className="text-sm font-bold" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Customized Gift Card */}
          {currentStep === 5 && (
            <div className="rounded-2xl bg-white p-6 md:p-8 coffee-shadow border border-orange-50 animate-[fadeIn_0.3s_ease]">
              <div className="mb-6">
                <h2 className="brand-font text-3xl font-bold text-[#2B160D]">
                  Custom Greeting Card
                </h2>
                <p className="text-[#7d6047] text-sm mt-1">
                  Add a personal note on a beautiful themed card. We'll handwrite it and slip it inside the box!
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                {/* Form Setup */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7d6047] mb-2">
                      1. Select Card Theme
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {cardThemes.map((theme) => (
                        <button
                          type="button"
                          key={theme.id}
                          onClick={() => setCardTheme(theme)}
                          className={`flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all duration-200 ${
                            cardTheme.id === theme.id
                              ? "border-[#C99854] bg-[#fff5e8] font-bold"
                              : "border-gray-100 hover:border-gray-200"
                          }`}
                        >
                          <span className="text-lg">{theme.emoji}</span>
                          <span className="text-xs text-[#2B160D]">{theme.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7d6047] mb-1">
                        To (Recipient Name)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mom"
                        value={cardTo}
                        onChange={(e) => setCardTo(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#2B160D] placeholder-gray-400 focus:border-[#C99854] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7d6047] mb-1">
                        From (Your Name)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Krisha"
                        value={cardFrom}
                        onChange={(e) => setCardFrom(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#2B160D] placeholder-gray-400 focus:border-[#C99854] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7d6047] mb-1">
                      Your Heartfelt Message
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Write your special note here..."
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#2B160D] placeholder-gray-400 focus:border-[#C99854] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Card Live Preview */}
                <div className="flex flex-col justify-center items-center">
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#7d6047] mb-3 self-start">
                    Live Greeting Card Preview
                  </span>
                  <div
                    className={`w-full max-w-[320px] aspect-[1.58] rounded-xl border border-dashed p-5 flex flex-col justify-between shadow-lg transition-all duration-300 bg-gradient-to-br ${currentThemeClasses}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold tracking-widest uppercase opacity-75">
                        BrewNest Gift
                      </span>
                      <span className="text-xl">{cardTheme.emoji}</span>
                    </div>

                    <div className="my-2 text-center">
                      <p className="text-xs italic opacity-85">Dear {cardTo || "________,"}</p>
                      <p className="my-1.5 brand-font text-sm leading-relaxed font-bold">
                        {cardMessage || '"Wishing you moments of pure brew and joy!"'}
                      </p>
                      <p className="text-xs text-right italic opacity-85">
                        — Love, {cardFrom || "________"}
                      </p>
                    </div>

                    <div className="border-t border-[#2B160D]/10 pt-2 text-[10px] text-center opacity-60">
                      Handwritten with care
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-[#2B160D] border-2 border-gray-200 bg-white hover:border-[#2B160D]/20 ${
                currentStep === 1 ? "opacity-45 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <FiChevronLeft /> Previous Step
            </button>
            
            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-[#2B160D] px-6 py-3 font-bold text-white hover:bg-[#C99854] hover:text-[#2B160D] shadow-md cursor-pointer"
              >
                Next Step <FiChevronRight />
              </button>
            ) : (
              <button
                onClick={addBoxToCart}
                className="flex items-center gap-2 rounded-xl bg-[#C99854] px-6 py-3 font-extrabold text-[#2B160D] hover:bg-[#2B160D] hover:text-white shadow-lg cursor-pointer"
              >
                <FiGift /> Add Custom Hamper to Cart
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Live Hamper Summary Box */}
        <aside className="h-fit rounded-2xl bg-white p-6 coffee-shadow border border-orange-50 lg:sticky lg:top-24">
          <h2 className="brand-font text-2xl font-bold text-[#2B160D] border-b pb-3 mb-4">
            Hamper Summary
          </h2>

          <div className="space-y-4">
            {/* Box Style */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
                <img
                  src={selectedBox.image}
                  alt={selectedBox.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase font-bold text-[#7d6047]">Box Base</p>
                <p className="text-sm font-bold text-[#2B160D] truncate">{selectedBox.name}</p>
              </div>
              <span className="text-xs font-bold text-[#C99854]">₹{selectedBox.price}</span>
            </div>

            {/* Coffee selection */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
                <img
                  src={selectedCoffee.image}
                  alt={selectedCoffee.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase font-bold text-[#7d6047]">Coffee Roast</p>
                <p className="text-sm font-bold text-[#2B160D] truncate">{selectedCoffee.name}</p>
              </div>
              <span className="text-xs font-bold text-[#C99854]">₹{selectedCoffee.price}</span>
            </div>

            {/* Mug selection */}
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100">
                <img
                  src={selectedMug.image}
                  alt={selectedMug.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase font-bold text-[#7d6047]">Drinkware</p>
                <p className="text-sm font-bold text-[#2B160D] truncate">{selectedMug.name}</p>
              </div>
              <span className="text-xs font-bold text-[#C99854]">₹{selectedMug.price}</span>
            </div>

            {/* Snacks & Addons selection */}
            {selectedAddons.length > 0 && (
              <div className="border-t pt-3">
                <p className="text-[10px] uppercase font-bold text-[#7d6047] mb-2">Snacks & Tools</p>
                <div className="space-y-2">
                  {selectedAddons.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-xs">
                      <span className="text-[#2B160D] font-medium">• {item.name}</span>
                      <span className="text-[#C99854] font-bold">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Greeting card note */}
            {(cardTo || cardFrom || cardMessage) && (
              <div className="border-t pt-3">
                <p className="text-[10px] uppercase font-bold text-[#7d6047] mb-1">Custom Card Attached</p>
                <div className="rounded bg-gray-50 p-2 text-xs border border-gray-100 flex items-center gap-1.5 text-[#2B160D]">
                  <span className="text-base">{cardTheme.emoji}</span>
                  <span className="truncate">
                    For {cardTo || "________"} from {cardFrom || "________"}
                  </span>
                </div>
              </div>
            )}

            {/* Total Pricing info */}
            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs text-[#7d6047] block font-medium">Estimated Price</span>
                  <span className="text-3xl font-extrabold text-[#2B160D]">₹{total}</span>
                </div>
                <div className="text-[10px] text-right text-gray-400">
                  Includes premium box wrapping
                </div>
              </div>
            </div>

            <button
              onClick={addBoxToCart}
              className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#2B160D] py-3.5 font-bold text-white hover:bg-[#C99854] hover:text-[#2B160D] transition-colors shadow-lg cursor-pointer"
            >
              <FiGift /> Add Custom Hamper
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}
