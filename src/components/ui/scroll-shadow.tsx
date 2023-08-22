"use client"

import React, { useEffect, useRef } from "react"

type Props = {
  orientation?: "vertical" | "horizontal"
  className?: string
  children: React.ReactNode
}
export function ScrollShadow({
  orientation = "vertical",
  className = "",
  children,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const shadowTopRef = useRef<HTMLDivElement>(null)
  const shadowBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const content = contentRef.current
    const wrapper = wrapperRef.current
    const shadowTop = shadowTopRef.current
    const shadowBottom = shadowBottomRef.current

    if (content && wrapper && shadowTop && shadowBottom) {
      const onScroll = function (this: HTMLDivElement) {
        if (orientation === "horizontal") {
          const contentScrollWidth = content.scrollWidth - wrapper.offsetWidth
          const currentScroll = this.scrollLeft / contentScrollWidth
          shadowTop.style.opacity = currentScroll.toString()
          shadowBottom.style.opacity = Math.min(1 - currentScroll).toString()
        } else {
          const contentScrollHeight =
            content.scrollHeight - wrapper.offsetHeight
          const currentScroll = this.scrollTop / contentScrollHeight
          shadowTop.style.opacity = currentScroll.toString()
          shadowBottom.style.opacity = Math.min(1 - currentScroll).toString()
        }
      }

      content.addEventListener("scroll", onScroll)

      return () => {
        content.removeEventListener("scroll", onScroll)
      }
    }
  }, [orientation])

  const radialGradientStyle =
    "radial-gradient(farthest-side at 50%, hsl(var(--foreground) / 0.5), rgba(0,0,0,0))"

  if (orientation === "horizontal") {
    return (
      <div
        ref={wrapperRef}
        className={className + " relative h-full overflow-hidden"}
      >
        <div
          ref={shadowTopRef}
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 -translate-x-1/2"
          style={{
            background: `${radialGradientStyle} 0% 50%, transparent 100%`,
          }}
        />
        <div
          ref={shadowBottomRef}
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 translate-x-1/2"
          style={{
            background: `${radialGradientStyle} 100% 50%, transparent 0%`,
          }}
        />
        <div ref={contentRef} className="overflow-x-auto">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={wrapperRef}
      className={className + " relative h-full overflow-hidden"}
    >
      <div
        ref={shadowTopRef}
        className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full -translate-y-1/2"
        style={{
          background: `${radialGradientStyle} 50% 0%, transparent 100%`,
        }}
      />
      <div
        ref={shadowBottomRef}
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-12 w-full translate-y-1/2"
        style={{
          background: `${radialGradientStyle} 50% 100%, transparent 0%`,
        }}
      />
      <div ref={contentRef} className="overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
