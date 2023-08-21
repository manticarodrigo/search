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

    console.log("content", content)
    if (content && wrapper && shadowTop && shadowBottom) {
      const onScroll = function (this: HTMLDivElement) {
        if (orientation === "horizontal") {
          console.log("horizontal")
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

  if (orientation === "horizontal") {
    return (
      <div ref={wrapperRef} className={className + " relative h-full"}>
        <div
          ref={shadowTopRef}
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-4 bg-gradient-to-r from-muted-foreground to-transparent opacity-0"
        />
        <div
          ref={shadowBottomRef}
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-4 bg-gradient-to-l from-muted-foreground to-transparent"
        />
        <div ref={contentRef} className="overflow-x-auto">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className={className + " relative h-full"}>
      <div
        ref={shadowTopRef}
        className="pointer-events-none absolute left-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-muted-foreground to-transparent opacity-0"
      />
      <div
        ref={shadowBottomRef}
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-4 w-full bg-gradient-to-t from-muted-foreground to-transparent"
      />
      <div ref={contentRef} className="overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
