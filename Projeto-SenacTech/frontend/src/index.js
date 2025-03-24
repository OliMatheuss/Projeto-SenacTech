import React from 'react'; // Importa a biblioteca React
import ReactDOM from 'react-dom'; // Importa o ReactDOM para manipular a árvore de elementos do React no DOM
import App from './App'; // Importa o componente principal da aplicação
import './index.css'; // Importa o arquivo de estilos CSS global

// Renderiza o componente App dentro do elemento com o ID 'root' no HTML
ReactDOM.render(
  <React.StrictMode> {/* Habilita verificações adicionais e avisos no modo de desenvolvimento */}
    <App /> {/* Renderiza o componente principal da aplicação */}
  </React.StrictMode>,
  document.getElementById('root') // Seleciona o elemento no DOM onde a aplicação será carregada
);
