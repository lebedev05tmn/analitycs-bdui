import type { ServerError } from "../../types"
import type { FC } from "react"

type ErrorOverlayProps = {
  error: ServerError
}

const ErrorOverlay: FC<ErrorOverlayProps> = ({ error }) => (
  <div className="flex h-screen w-full flex-col items-center justify-center">
    <img className="h-1/4 w-1/4" src="/placeholder-500.svg" />

    <div className="flex flex-col items-center justify-center">
      <p className="mt-8 text-5xl font-bold tracking-wider text-gray-600 md:text-6xl lg:text-7xl">
        {error.response!.status}
      </p>
      <p className="mt-4 text-gray-500 md:text-lg xl:text-xl">
        {error.response!.data.error}
      </p>
    </div>
  </div>
)

export default ErrorOverlay
