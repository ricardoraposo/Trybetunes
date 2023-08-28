function Loading() {
  return (
    <div className="flex flex-col items-center">
      <h1>Carregando...</h1>
      <div
        className="h-8 w-8 border-2 border-x-cyan-500 border-y-white animate-spin
        rounded-full"
      />
    </div>
  );
}

export default Loading;
