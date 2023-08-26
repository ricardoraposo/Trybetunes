import './Loading.css';

function Loading() {
  return (
    <div className="flex center-all column">
      <h2>Carregando...</h2>
      <div className="spinner" />
    </div>
  );
}

export default Loading;
