interface EmptyStateProps {
  message: string;
  description?: string;
}

export default function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="text-gray-400 text-6xl mb-4">📝</div>
      <h3 className="text-xl font-bold mb-2">{message}</h3>
      {description && (
        <p className="text-gray-600 text-center">{description}</p>
      )}
    </div>
  );
}