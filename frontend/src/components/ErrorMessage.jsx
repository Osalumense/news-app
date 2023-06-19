const ErrorMessage = ({ message }) => {
  return (
    <div className="w-full rounded-md text-gray-700 bg-red-800 mx-auto px-4 py-2 max-w-lg">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
