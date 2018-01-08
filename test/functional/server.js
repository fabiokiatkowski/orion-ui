import { createServer } from 'service-mocker/server'; // eslint-disable-line
import { clientesInfo, singleCliente } from '../js/fixtures/clientes';
import productsMock from '../js/fixtures/products';
import condicoesPagamento from '../js/fixtures/cond-pgto';
import tiposVenda from '../js/fixtures/tipos-venda';

const { router } = createServer();

router.get('/static/britania/produtos/:cnpj', (req, res) => {
  res.send(productsMock);
});

router.get('/static/britania/clientes/1-2-17', (req, res) => {
  res.send(singleCliente);
});

router.get('/static/britania/clientes', (req, res) => {
  res.send(clientesInfo);
});

router.get('/static/britania/tiposVenda', (req, res) => {
  res.send(tiposVenda);
});

router.get('/static/britania/condpgto', (req, res) => {
  res.send(condicoesPagamento);
});

router.post('/static/britania/pedidos/', (req, res) => {
  res.status(204).send();
});