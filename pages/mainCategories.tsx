"use client"

import PhotographyPromo from "@/components/userform"
import { useState, useRef } from "react"

// --- TYPES ---
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

// --- DATA ---
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
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Candid Photography",
      price: 30000,
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Traditional Videography",
      price: 35000,
      image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Drone Videography",
      price: 15000,
      image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Pre-Wedding Shoot",
      price: 20000,
      image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&h=400&fit=crop",
      category: "Wedding",
    },
    {
      name: "Premium Album",
      price: 12000,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      category: "Wedding",
    },
  ],
  Birthday: [
    {
      name: "Candid Photography",
      price: 12000,
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600&h=400&fit=crop",
      category: "Birthday",
    },
    {
      name: "Videography",
      price: 15000,
      image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=600&h=400&fit=crop",
      category: "Birthday",
    },
    {
      name: "Photo Album",
      price: 5000,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      category: "Birthday",
    },
  ],
  "1-Day Event": [
    {
      name: "Event Photography",
      price: 10000,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
      category: "1-Day Event",
    },
    {
      name: "Event Videography",
      price: 18000,
      image: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?w=600&h=400&fit=crop",
      category: "1-Day Event",
    },
    {
      name: "Drone Coverage",
      price: 12000,
      image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?w=600&h=400&fit=crop",
      category: "1-Day Event",
    },
  ],
  "Albums & Add-ons": [
    {
      name: "Premium Leather Album",
      price: 15000,
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop",
      category: "Albums & Add-ons",
    },
    {
      name: "Cinematic Edit",
      price: 10000,
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
      category: "Albums & Add-ons",
    },
  ],
}

export default function MainCategories() {
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  
  // This ref is for the horizontal scrolling
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // -- HANDLERS --

  const toggleCategory = (categoryName: string) => {
    setActiveCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    )
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

  // -- RENDER --

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
        <main style={{ maxWidth: "100%", margin: "0 auto", padding: "40px 0" }}>
          
          {/* VIEW 1: Horizontal Scrolling Cards (Code 1 Style)
             Only visible when NO category is selected. 
          */}
          {activeCategories.length === 0 && (
            <div style={{ animation: "fadeIn 0.5s ease" }}>
              <section style={{ textAlign: "center", padding: "0 24px", marginBottom: 40 }}>
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
                <p
                  style={{
                    fontSize: 18,
                    color: "#666",
                    maxWidth: 600,
                    margin: "0 auto",
                  }}
                >
                  Swipe to explore our packages. Click a card to view services.
                </p>
              </section>

              <section
                ref={scrollContainerRef}
                style={{
                  display: "flex",
                  gap: 40,
                  overflowX: "auto",
                  padding: "60px calc(50vw - 160px)",
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                  alignItems: "center",
                }}
              >
                {EVENTS.map((e) => (
                  <div
                    key={e.name}
                    onClick={() => toggleCategory(e.name)}
                    style={{
                      flex: "0 0 320px",
                      height: 400,
                      background: "#fff",
                      borderRadius: 24,
                      overflow: "hidden",
                      cursor: "pointer",
                      position: "relative",
                      scrollSnapAlign: "center",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      transform: "scale(1)",
                      transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    }}
                    onMouseEnter={(el) => {
                       el.currentTarget.style.transform = "scale(1.05)";
                       el.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(el) => {
                       el.currentTarget.style.transform = "scale(1)";
                       el.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        background: `url(${e.image}) center/cover`,
                        position: "absolute",
                        inset: 0,
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
                ))}
              </section>
            </div>
          )}

          {/* VIEW 2: Service Grid Selection (Code 2 Style)
             Replaces the cards when a selection is active.
          */}
          {activeCategories.length > 0 && (
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", animation: "slideUp 0.4s ease-out" }}>
              
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 360px",
                  gap: 48,
                  alignItems: "start",
                }}
              >
                {/* Services List Column */}
                <div>
                  <button
                    onClick={() => setActiveCategories([])}
                    style={{
                      marginBottom: 24,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 16,
                      color: "#555",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 500
                    }}
                  >
                    <span>← Back to all events</span>
                  </button>

                  {/* Multi-select Tabs (Code 2 feature) */}
                  <div style={{ marginBottom: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {EVENTS.map((e) => (
                      <button
                        key={e.name}
                        onClick={() => toggleCategory(e.name)}
                        style={{
                          padding: "10px 20px",
                          background: activeCategories.includes(e.name) ? "#7c3aed" : "#fff",
                          color: activeCategories.includes(e.name) ? "#fff" : "#333",
                          border: "1px solid #e5e5e5",
                          borderRadius: 12,
                          cursor: "pointer",
                          fontWeight: 500,
                          transition: "0.2s",
                        }}
                      >
                        {e.name}
                      </button>
                    ))}
                  </div>

                  {/* Render active categories */}
                  {activeCategories.map((category) => (
                    <div key={category} style={{ marginBottom: 48 }}>
                      <h2 style={{ fontSize: 34, marginBottom: 8 }}>
                        {category}
                      </h2>
                      <p style={{ color: "#666", marginBottom: 32 }}>
                        Select services to build your custom quote
                      </p>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(240px, 1fr))",
                          gap: 24,
                        }}
                      >
                        {SERVICES[category].map((s) => {
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
                                  ? "0 8px 20px rgba(124,58,237,0.25)"
                                  : "0 4px 12px rgba(0,0,0,0.06)",
                                cursor: "pointer",
                                transition: "0.25s",
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
                  ))}
                </div>

                {/* Sticky Bill / Quote Summary */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 22,
                    padding: 28,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                    position: "sticky",
                    top: 40,
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
                          ? "#ddd"
                          : "#7c3aed",
                      color: "#fff",
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
            </div>
          )}

        </main>
        
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  )
}
