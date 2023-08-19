"use client"

import { AppProgressBar } from "next-nprogress-bar"

export function ProgressBar() {
  return (
    <AppProgressBar
      height="4px"
      color="#eab308"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}
