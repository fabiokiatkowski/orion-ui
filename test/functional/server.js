import { createServer } from 'service-mocker/server'; // eslint-disable-line
import representantes from '../fixtures/representantes';

const { router } = createServer();

router.get('/orion-server/api/representantes/mysql/totalPedidosRecebidos', (req, res) => {
  res.send(representantes);
});

router.get('/orion-server/api/representantes/mysql/totalPedidosRecebidos?dataFiltro=09-01-2018&mostrarPedidos=false&agrupar=true', (req, res) => {
  res.send(representantes);
});
