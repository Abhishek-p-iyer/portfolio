import { useState, useEffect, useRef } from 'react'

const TYPING_SPEED = 100
const ERASING_SPEED = 60
const PAUSE_AFTER_TYPE = 1800
const PAUSE_AFTER_ERASE = 400

export function useTypewriter(words: string[]) {
  const [displayedText, setDisplayedText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing' | 'waiting'>('typing')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    const clear = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }

    if (phase === 'typing') {
      if (displayedText.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1))
        }, TYPING_SPEED)
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), PAUSE_AFTER_TYPE)
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => setPhase('erasing'), 0)
    } else if (phase === 'erasing') {
      if (displayedText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1))
        }, ERASING_SPEED)
      } else {
        timeoutRef.current = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length)
          setPhase('waiting')
        }, PAUSE_AFTER_ERASE)
      }
    } else if (phase === 'waiting') {
      setPhase('typing')
    }

    return clear
  }, [displayedText, phase, wordIndex, words])

  return displayedText
}
