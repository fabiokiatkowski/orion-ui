import { createServer } from 'service-mocker/server'; // eslint-disable-line
import representantes from '../fixtures/representantes';

const { router } = createServer();

router.get('http://192.168.1.120:8080/orion-server/api/representantes/mysql/totalPedidosRecebidos', (req, res) => {
  res.send(representantes);
});

router.get('http://192.168.1.120:8080/orion-server/api/representantes/mysql/totalPedidosRecebidos?dataFiltro=09-01-2018&mostrarPedidos=false&agrupar=true', (req, res) => {
  res.send(representantes);
});
