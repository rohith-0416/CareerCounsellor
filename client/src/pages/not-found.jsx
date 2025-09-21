export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Page not found</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
        The page you're looking for doesn't exist.
      </p>
    </div>
  );
}