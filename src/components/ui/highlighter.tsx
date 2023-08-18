const Highlighter = ({ children: text }: { children: string }) => {
  // Define the range of Unicode characters.
  const startMarker = "\uE000"
  const endMarker = "\uE001"

  // Create a function to break the string into parts.
  const getHighlightedParts = (str: string) => {
    let parts = []
    let currentIndex = 0
    while (currentIndex < str.length) {
      const startIndex = str.indexOf(startMarker, currentIndex)
      if (startIndex === -1) {
        parts.push({ text: str.substring(currentIndex), isHighlighted: false })
        break
      } else {
        if (startIndex > currentIndex) {
          parts.push({
            text: str.substring(currentIndex, startIndex),
            isHighlighted: false,
          })
        }
        const endIndex = str.indexOf(endMarker, startIndex)
        if (endIndex === -1) {
          throw new Error("Mismatched markers")
        }
        parts.push({
          text: str.substring(startIndex + startMarker.length, endIndex),
          isHighlighted: true,
        })
        currentIndex = endIndex + endMarker.length
      }
    }
    return parts
  }

  // Render the parts.
  const parts = getHighlightedParts(text)
  return (
    <>
      {parts.map((part, index) =>
        part.isHighlighted ? (
          <span key={index} style={{ backgroundColor: "yellow" }}>
            {part.text}
          </span>
        ) : (
          part.text
        )
      )}
    </>
  )
}

export { Highlighter }
