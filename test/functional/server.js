import { createServer } from 'service-mocker/server'; // eslint-disable-line
import * as currentColumns from '../fixtures/columns';
import * as profiles from '../fixtures/profiles';
import estagiosAbertos from '../fixtures/tela200/estagiosAbertos';

const { router } = createServer();

router.get('/api/user/currentUser', (req, res) => {
  res.send({
    apelido: 'Darth Vader', cod_usuario: '3106', cracha: '41941', ip: '192.168.0.96'
  });
});

router.get('/api/grid/tela200periodos/current-columns', (req, res) => {
  res.send(currentColumns.tela200periodos);
});

router.get('/api/grid/tela200estagiosAbertos/current-columns', (req, res) => {
  res.send(currentColumns.tela200estagiosAbertos);
});

router.get('/api/grid/tela200ordens/current-columns', (req, res) => {
  res.send(currentColumns.tela200ordens);
});

router.get('/api/grid/tela200periodos/get-profiles', (req, res) => {
  res.send(profiles.tela200periodos);
});

router.get('/api/grid/tela200estagiosAbertos/get-profiles', (req, res) => {
  res.send(profiles.tela200estagiosAbertos);
});

router.get('/api/grid/tela200ordens/get-profiles', (req, res) => {
  res.send(profiles.tela200ordens);
});

router.get('/api/pendente-aproduzir/estagios-abertos/200', (req, res) => {
  res.send(estagiosAbertos);
});
