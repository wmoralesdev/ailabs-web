import { Component, type ErrorInfo, type ReactNode } from "react"

type ErrorBoundaryFallbackProps = {
  error: Error
  reset: () => void
}

type ErrorBoundaryProps = {
  children: ReactNode
  fallback: (props: ErrorBoundaryFallbackProps) => ReactNode
  /** When any value changes, clear the error state and remount children. */
  resetKeys?: ReadonlyArray<unknown>
  onError?: (error: Error, info: ErrorInfo) => void
}

type ErrorBoundaryState = {
  error: Error | null
}

function resetKeysChanged(
  prev: ReadonlyArray<unknown> | undefined,
  next: ReadonlyArray<unknown> | undefined
) {
  if (prev === next) {
    return false
  }
  if (!prev || !next || prev.length !== next.length) {
    return true
  }
  return prev.some((value, index) => !Object.is(value, next[index]))
}

/**
 * Catches render-time errors in the child tree so a single bad control
 * does not blank the whole page. Event-handler throws still need local
 * try/catch; React does not route those here.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (
      this.state.error &&
      resetKeysChanged(prevProps.resetKeys, this.props.resetKeys)
    ) {
      this.setState({ error: null })
    }
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    if (error) {
      return this.props.fallback({ error, reset: this.reset })
    }
    return this.props.children
  }
}

export { ErrorBoundary }
export type { ErrorBoundaryFallbackProps }
