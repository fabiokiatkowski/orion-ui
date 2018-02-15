import React from 'react';
import PropTypes from 'prop-types';
import CancelarOP from '../totaisOP/cancelarOp/CancelarOp';

const botoes = (props) => {
  return (
    <div className="Botoes">
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
      <CancelarOP ordemProducao={props.ordemProducao} />
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

botoes.propTypes = {
  ordemProducao: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  onMarcarUTI: PropTypes.func,
  onDesmarcarUTI: PropTypes.func,
  onDesmarcarTodosUTI: PropTypes.func
};

botoes.defaultProps = {
  ordemProducao: 0,
  onMarcarUTI: () => {},
  onDesmarcarUTI: () => {},
  onDesmarcarTodosUTI: () => {}
};

export default botoes;
