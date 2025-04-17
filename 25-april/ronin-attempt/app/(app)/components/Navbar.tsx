"use client"

import { ChevronDown } from "lucide-react"
import React, { useState } from "react"
import { navItems, navItemProps } from "../constants/navigation"

const DropdownMenu = ({
  isOpen,
  content,
  dropdownTitle,
  dropdownDescription,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean
  content?: Array<{
    label: string
    href: string
    icon?: React.ReactNode
  }>
  dropdownTitle?: string
  dropdownDescription?: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => {
  return (
    <div
      className={`fixed left-1/2 -translate-x-1/2 top-[50px] w-screen rounded-lg shadow-lg transition-all duration-300 ${
        isOpen
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible translate-y-2"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <div className="bg-[#0b0b0b] w-full py-6">
          <div className="max-w-screen-xl w-[60%] mx-auto grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-white">
                {dropdownTitle}
              </h3>
              <p className="text-white/70 text-xs font-medium">
                {dropdownDescription}
              </p>
            </div>

            <div className="grid grid-cols-2">
              {content?.map((item) => (
                <a key={item.label} href={item.href} className="block">
                  <span className="text-white/70 text-sm p-2 px-4 hover:bg-neutral-400/10 rounded-lg font-medium hover:text-white transition-all duration-600 flex items-center gap-2">
                    {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NavigationItem = ({
  item,
  activeItem,
  onHover,
}: {
  item: navItemProps
  activeItem: navItemProps | null
  onHover: (item: navItemProps | null) => void
}) => {
  if (item.hasDropdown) {
    return (
      <button
        className={`flex items-center justify-center gap-1 text-sm font-bold p-2 px-4 text-white hover:text-white/80 hover:rounded-xl hover:bg-neutral-400/10 transition-all duration-600`}
        onMouseEnter={() => onHover(item)}
      >
        {item.label}
        <ChevronDown className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button className="flex items-center justify-center gap-1 text-sm font-bold p-2 px-4 text-white hover:rounded-xl hover:bg-neutral-400/10 transition-all duration-600">
      <a href={item.href}>{item.label}</a>
    </button>
  )
}

export default function Navbar() {
  const [activeItem, setActiveItem] = useState<navItemProps | null>(null)

  const closeTimeout = React.useRef<NodeJS.Timeout | undefined>(undefined)

  const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
    }
    setActiveItem(activeItem)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setActiveItem(null)
    }, 100)
  }

  return (
    <header className="sticky desktop-only border-b border-white/10 bg-[#0b0b0b]/60 backdrop-blur-sm top-0 z-50 px-4 transition-colors duration-500 shadow-none">
      <div className="mx-auto flex py-2 w-full max-w-full items-center justify-between">
        <a href="/" className="flex items-center font-extrabold text-xl gap-2">
          gen new
        </a>
        <div className="flex-1 flex items-center justify-center gap-2">
          {navItems.map((item) => (
            <NavigationItem
              key={item.label}
              item={item}
              activeItem={activeItem}
              onHover={setActiveItem}
            />
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <a
            href="/auth"
            className="flex items-center justify-center text-xs font-semibold p-1.5 px-3 text-white hover:text-white/80 rounded-[6px] bg-white/10 hover:bg-white/15 transition-all duration-600"
          >
            Sign In
          </a>
          <a
            href="/auth"
            className="flex items-center justify-center text-xs font-semibold p-1.5 px-3 text-white bg-blue-500 rounded-[6px] hover:bg-blue-600 transition-all duration-600"
          >
            Get Started
          </a>
        </div>
      </div>

      <DropdownMenu
        isOpen={activeItem !== null}
        content={activeItem?.dropdownItems}
        dropdownTitle={activeItem?.dropdownTitle}
        dropdownDescription={activeItem?.dropdownDescription}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </header>
  )
}
