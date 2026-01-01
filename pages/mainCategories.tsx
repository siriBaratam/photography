"use client"

import PhotographyPromo from "@/components/userform"
import { useState, useRef } from "react"

type Service = {
  name: string
  price: number
  image: string
  category: string
}

type EventType = {
  name: string
  description: string
  image: string
}

const EVENTS: EventType[] = [
  {
    name: "Wedding",
    description: "Timeless photography for your most meaningful day",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop",
  },
  {
    name: "Birthday",
    description: "Joyful moments, candid emotions, lifelong memories",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop",
  },
  {
    name: "1-Day Event",
    description: "Professional coverage for events that matter",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=800&fit=crop",
  },
  {
    name: "Albums & Add-ons",
    description: "Crafted keepsakes to preserve your story",
    image:
      "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=1200&h=800&fit=crop",
  },
]

const SERVICES: Record<string, Service[]> = {
  Wedding: [
    {
      name: "Traditional Photography",
      price: 25000,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Candid Photography",
      price: 30000,
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Traditional Videography",
      price: 35000,
      image:
        "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Drone Videography",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Pre-Wedding Shoot",
      price: 20000,
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Premium Album",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      category: "Wedding",
    },
  ],
  Birthday: [
    {
      name: "Candid Photography",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&h=400&fit=crop",
      category: "Birthday",
    },
    {
      name: "Videography",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=600&h=400&fit=crop",
      category: "Birthday",
    },
    {
      name: "Photo Album",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      category: "Birthday",
    },
  ],
  "1-Day Event": [
    {
      name: "Event Photography",
      price: 10000,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
      category: "1-Day Event",
    },
    {
      name: "Event Videography",
      price: 18000,
      image:
        "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=600&h=400&fit=crop",
      category: "1-Day Event",
    },
    {
      name: "Drone Coverage",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=600&h=400&fit=crop",
      category: "1-Day Event",
    },
  ],
  "Albums & Add-ons": [
    {
      name: "Premium Leather Album",
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      category: "Albums & Add-ons",
    },
    {
      name: "Cinematic Edit",
      price: 10000,
      image:
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
      category: "Albums & Add-ons",
    },
  ],
}

export default function MainCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleCategoryClick = (categoryName: string, index: number) => {
    // 1. Set Active Category
    setActiveCategory(categoryName === activeCategory ? null : categoryName)
    
    // 2. Scroll to Center Logic
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const card = container.children[index] as HTMLElement
      
      // Calculate position to center the card
      const scrollLeft =
        card.offsetLeft -
        container.clientWidth / 2 +
        card.clientWidth / 2

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }

  const toggleService = (service: Service) => {
    setSelectedServices((prev) => {
      const exists = prev.find(
        (s) => s.name === service.name && s.category === service.category
      )
      if (exists) {
        return prev.filter(
          (s) => !(s.name === service.name && s.category === service.category)
        )
      } else {
        return [...prev, service]
      }
    })
  }

  const removeService = (service: Service) => {
    setSelectedServices((prev) =>
      prev.filter(
        (s) => !(s.name === service.name && s.category === service.category)
      )
    )
  }

  const isServiceSelected = (service: Service) => {
    return selectedServices.some(
      (s) => s.name === service.name && s.category === service.category
    )
  }

  const total = selectedServices.reduce((sum, s) => sum + s.price, 0)

  const price = (n: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <>
      <PhotographyPromo />
      <div
        style={{
          minHeight: "100vh",
          background: "#fafafa",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
          overflowX: "hidden",
        }}
      >
        <main style={{ maxWidth: "100%", margin: "0 auto", padding: "80px 0" }}>
          
          {/* HERO */}
          <section style={{ padding: "0 24px", marginBottom: 40, textAlign: "center" }}>
            <h1
              style={{
                fontSize: 52,
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Photography that feels real.
            </h1>
            <p style={{ fontSize: 18, color: "#666", maxWidth: 600, margin: "0 auto" }}>
              Select a category below to view packages.
            </p>
          </section>

          {/* HORIZONTAL SCROLLING CARDS */}
          <section
            ref={scrollContainerRef}
            style={{
              display: "flex",
              gap: 40,
              overflowX: "auto",
              // PADDING TRICK: 
              // We use 50vw - (CardWidth / 2) to ensure the first and last items 
              // can be scrolled exactly to the center of the screen.
              padding: "60px calc(50vw - 160px)", 
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              alignItems: "center",
            }}
          >
            {EVENTS.map((e, index) => {
              const isActive = activeCategory === e.name
              return (
                <div
                  key={e.name}
                  onClick={() => handleCategoryClick(e.name, index)}
                  style={{
                    flex: "0 0 320px", // Fixed width
                    height: 400,
                    background: "#fff",
                    borderRadius: 24,
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    scrollSnapAlign: "center",
                    // Improved Shadows
                    boxShadow: isActive
                      ? "0 25px 50px -12px rgba(124, 58, 237, 0.25)" // Purple glow
                      : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    // Animation
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                    zIndex: isActive ? 10 : 1,
                    transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    border: isActive ? "2px solid #7c3aed" : "2px solid transparent",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                      background: `url(${e.image}) center/cover`,
                      position: "absolute",
                      inset: 0,
                      transition: "transform 0.5s ease",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 24,
                      background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      color: "#fff",
                    }}
                  >
                    <h3 style={{ fontSize: 24, marginBottom: 8, fontWeight: 700 }}>
                      {e.name}
                    </h3>
                    <p style={{ fontSize: 14, opacity: 0.9 }}>
                      {e.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </section>

          {/* SERVICES SECTION */}
          {activeCategory && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 360px",
                gap: 48,
                alignItems: "start",
                padding: "40px 24px",
                maxWidth: 1200,
                margin: "0 auto",
                animation: "fadeIn 0.6s ease-out"
              }}
            >
              {/* Service List */}
              <div>
                <h2 style={{ fontSize: 34, marginBottom: 8 }}>
                  {activeCategory} Packages
                </h2>
                <p style={{ color: "#666", marginBottom: 32 }}>
                  Customize your {activeCategory} experience
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: 24,
                  }}
                >
                  {SERVICES[activeCategory].map((s) => {
                    const active = isServiceSelected(s)
                    return (
                      <div
                        key={s.name}
                        onClick={() => toggleService(s)}
                        style={{
                          background: "#fff",
                          borderRadius: 18,
                          overflow: "hidden",
                          border: active
                            ? "2px solid #7c3aed"
                            : "1px solid #e5e5e5",
                          boxShadow: active
                            ? "0 10px 25px -5px rgba(124,58,237,0.3)"
                            : "0 4px 6px -1px rgba(0,0,0,0.05)",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          transform: active ? "translateY(-4px)" : "none",
                        }}
                      >
                        <div
                          style={{
                            height: 140,
                            background: `url(${s.image}) center/cover`,
                          }}
                        />
                        <div style={{ padding: 18 }}>
                          <strong style={{ fontSize: 15 }}>
                            {s.name}
                          </strong>
                          <div
                            style={{
                              marginTop: 6,
                              fontWeight: 600,
                              color: "#7c3aed",
                            }}
                          >
                            {price(s.price)}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Quote Summary Bill */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 22,
                  padding: 28,
                  boxShadow: "0 20px 40px -4px rgba(0,0,0,0.1)",
                  position: "sticky",
                  top: 40,
                  transition: "all 0.3s ease"
                }}
              >
                <h3 style={{ fontSize: 20, marginBottom: 16 }}>
                  Quote Summary
                </h3>

                {selectedServices.length === 0 ? (
                  <p style={{ color: "#999" }}>
                    Select services to see summary
                  </p>
                ) : (
                  <ul style={{ padding: 0, listStyle: "none" }}>
                    {selectedServices.map((s, idx) => (
                      <li
                        key={`${s.category}-${s.name}-${idx}`}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 12,
                          gap: 8,
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14 }}>{s.name}</div>
                          <div style={{ fontSize: 12, color: "#999" }}>{s.category}</div>
                        </div>
                        <strong style={{ marginRight: 8 }}>{price(s.price)}</strong>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeService(s)
                          }}
                          style={{
                            background: "#fee",
                            color: "#c33",
                            border: "none",
                            borderRadius: 6,
                            width: 24,
                            height: 24,
                            cursor: "pointer",
                            fontSize: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                          title="Remove"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <hr style={{ margin: "20px 0", borderTop: "1px solid #eee" }} />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  <span>Total</span>
                  <span>{price(total)}</span>
                </div>

                <button
                  disabled={selectedServices.length === 0}
                  style={{
                    marginTop: 24,
                    width: "100%",
                    padding: "14px",
                    background:
                      selectedServices.length === 0
                        ? "#e5e5e5"
                        : "#7c3aed",
                    color: selectedServices.length === 0 ? "#999" : "#fff",
                    border: "none",
                    borderRadius: 12,
                    fontWeight: 600,
                    cursor:
                      selectedServices.length === 0
                        ? "not-allowed"
                        : "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  Send Quote Request
                </button>
              </div>
            </div>
          )}
        </main>
        
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  )
}
