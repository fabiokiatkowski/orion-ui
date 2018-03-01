import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Popover, OverlayTrigger, ButtonToolbar, Button } from 'react-bootstrap';
import CancelarOP from '../totaisOP/cancelarOp/CancelarOp';

const botoes = (props) => {
  const classes = ['btn', 'btn-default', 'btn-margin-top', 'left'];
  if (props.disabled) {
    classes.push('disabled');
  }
  const popoverHoverFocus = (
    <Popover id="popover-positioned-bottom" title="Mensagem de aviso">
      Funcionalidade não disponível.
    </Popover>
  );
  return (
    <div className="Botoes">
      <ButtonToolbar>
        <Button
          bsClass="btn btn-margin-top"
          disabled={!props.onMarcarUTI || props.disabled}
          onClick={props.onMarcarUTI}
        >Marcar UTI
        </Button>
        <Button
          disabled={!props.onDesmarcarUTI || props.disabled}
          onClick={props.onDesmarcarUTI}
          bsClass="btn btn-margin-top left"
        >Desmarcar UTI
        </Button>
        <Button
          disabled={!props.onDesmarcarTodosUTI || props.disabled}
          onClick={props.onDesmarcarTodosUTI}
          bsClass="btn btn-margin-top left"
        >Desmarcar Todos UTI
        </Button>
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
        <OverlayTrigger
          trigger={!props.disabled ? ['focus'] : null}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <Button
            disabled={props.disabled}
            bsClass="btn btn-margin-top left"
          >Ordem Serv. Manual
          </Button>
        </OverlayTrigger>
        <NavLink
          className={classes.join(' ')}
          target="_blank"
          to={{ pathname: '/visualizador', search: `?nivel=${props.nivel}&grupo=${props.grupo}` }}
        >Visualizador
        </NavLink>
        <OverlayTrigger
          trigger={!props.disabled ? ['focus'] : null}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <Button
            disabled={props.disabled}
            bsClass="btn btn-margin-top left"
          >Imprimir
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={!props.disabled ? ['focus'] : null}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <Button
            disabled={props.disabled}
            bsClass="btn btn-margin-top left"
          >Prorrogar
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={!props.disabled ? ['focus'] : null}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <Button
            disabled={props.disabled}
            bsClass="btn btn-margin-top left"
          >Consultar Avance
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={!props.disabled ? ['focus'] : null}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <Button
            disabled={props.disabled}
            bsClass="btn btn-margin-top left"
          >Exportar Excel
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger={!props.disabled ? ['focus'] : null}
          placement="bottom"
          overlay={popoverHoverFocus}
        >
          <Button
            disabled={props.disabled}
            bsClass="btn btn-margin-top left"
          >Estrutura
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>
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
