import React from 'react';
import PropTypes from 'prop-types';

const ItensAcao = (props) => {
  return (
    <div>
      <button
        className="btn btn-default btn-margin-top"
        disabled={!props.onMarcarUTI || props.disabled}
        onClick={props.onMarcarUTI}
      >Marcar UTI
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Desmarcar UTI
      </button>
      <button
        disabled={!props.onDesmarcarTodosUTI || props.disabled}
        onClick={props.onDesmarcarTodosUTI}
        className="btn btn-default btn-margin-top left"
      >Desmarcar Todos UTI
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >SUS Almoxarifado
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Ordem Serv. Manual
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Visualizador
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Imprimir
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Prorrogar
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Consulta Avance
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Exportar Excel
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-default btn-margin-top left"
      >Estrutura
      </button>
    </div>
  );
};

ItensAcao.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onMarcarUTI: PropTypes.func,
  onDesmarcarUTI: PropTypes.func,
  onDesmarcarTodosUTI: PropTypes.func
};

ItensAcao.defaultProps = {
  onMarcarUTI: () => {},
  onDesmarcarUTI: () => {},
  onDesmarcarTodosUTI: () => {}
};

export default ItensAcao;
