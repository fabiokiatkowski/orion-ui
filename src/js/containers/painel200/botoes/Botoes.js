import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CancelarOP from '../totaisOP/cancelarOp/CancelarOp';

const botoes = (props) => {
  const handleNotImplemented = () => {
    alert('Funcionalidade não disponível.');
  };
  const classes = ['btn', 'btn-default', 'btn-margin-top', 'left'];
  if (props.disabled) {
    classes.push('disabled');
  }
  return (
    <div className="Botoes">
      <button
        className="btn btn-margin-top"
        disabled={!props.onMarcarUTI || props.disabled}
        onClick={props.onMarcarUTI}
      >Marcar UTI
      </button>
      <button
        disabled={!props.onDesmarcarUTI || props.disabled}
        onClick={props.onDesmarcarUTI}
        className="btn btn-margin-top left"
      >Desmarcar UTI
      </button>
      <button
        disabled={!props.onDesmarcarTodosUTI || props.disabled}
        onClick={props.onDesmarcarTodosUTI}
        className="btn btn-margin-top left"
      >Desmarcar Todos UTI
      </button>
      <CancelarOP
        ordemProducao={props.ordemProducao}
        ordemPrincipal={props.ordemPrincipal}
      />
      <NavLink
        className={classes.join(' ')}
        target="_blank"
        to={{ pathname: '/sus', search: `?ordemProducao=${props.ordemProducao}` }}
      >SUS Almoxarifado
      </NavLink>
      <button
        disabled={props.disabled}
        onClick={handleNotImplemented}
        className="btn btn-margin-top left"
      >Ordem Serv. Manual
      </button>
      <NavLink
        className={classes.join(' ')}
        target="_blank"
        to={{ pathname: '/visualizador', search: `?nivel=${props.nivel}&grupo=${props.grupo}` }}
      >Visualizador
      </NavLink>
      {/* <button
        disabled={props.disabled}
        onClick={handleNotImplemented}
        className="btn btn-margin-top left"
      >SUS Almoxarifado
      </button> */}
      <button
        disabled={props.disabled}
        onClick={handleNotImplemented}
        className="btn btn-margin-top left"
      >Imprimir
      </button>
      <button
        disabled={props.disabled}
        onClick={handleNotImplemented}
        className="btn btn-margin-top left"
      >Prorrogar
      </button>
      <button
        disabled={props.disabled}
        onClick={handleNotImplemented}
        className="btn btn-margin-top left"
      >Consulta Avance
      </button>
      <button
        disabled={props.disabled}
        onClick={handleNotImplemented}
        className="btn btn-margin-top left"
      >Exportar Excel
      </button>
      <button
        disabled={props.disabled}
        onClick={handleNotImplemented}
        className="btn btn-margin-top left"
      >Estrutura
      </button>
    </div>
  );
};

botoes.propTypes = {
  nivel: PropTypes.string,
  grupo: PropTypes.string,
  ordemProducao: PropTypes.number,
  ordemPrincipal: PropTypes.number,
  disabled: PropTypes.bool.isRequired,
  onMarcarUTI: PropTypes.func,
  onDesmarcarUTI: PropTypes.func,
  onDesmarcarTodosUTI: PropTypes.func
};

botoes.defaultProps = {
  nivel: '',
  grupo: '',
  ordemProducao: 0,
  ordemPrincipal: 0,
  onMarcarUTI: () => {},
  onDesmarcarUTI: () => {},
  onDesmarcarTodosUTI: () => {}
};

export default botoes;
