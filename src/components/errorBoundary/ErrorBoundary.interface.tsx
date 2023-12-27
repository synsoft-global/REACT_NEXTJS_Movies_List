export interface ErrorBoundaryProps {
  children: React.ReactNode,
  isError?: boolean
}

export interface ErrorBoundaryState {
  hasError: boolean
}