interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-bold mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-4 text-center">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}