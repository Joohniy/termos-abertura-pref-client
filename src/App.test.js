import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import Abertura from './pages/assets/js/abertura';
import AberturaSemLetras from './pages/assets/js/semLetras';
import { renderWithReactRouter } from './test-utils/customRenderRouter';

test('renders app page', () => {
  render(<App />);
  const optionsAberturaComLetra = screen.getByText(/abertura com letras/i);
  const optionAberturaSemLetra = screen.getByText(/abertura sem letras/i);
  expect(optionsAberturaComLetra).toBeInTheDocument();
  expect(optionAberturaSemLetra).toBeInTheDocument();
});

test("redirect to page encerramento e abertura com letras", async () => {
  const user = userEvent.setup();
  render(<App />);
  const anchorAberturaComLetra = screen.getByText(/abertura com letras/i);
  await user.click(anchorAberturaComLetra);
  renderWithReactRouter(<Abertura />);
  const encerramentoComLetras = screen.getByText(/termo de encerramento/i);
  expect(encerramentoComLetras).toBeInTheDocument();
});

test("redirect to page encerramento e abertura sem letras", async () => {
  const user = userEvent.setup();
  render(<App />);
  const anchorAberturaSemLetra = screen.getByText(/abertura sem letras/i);
  await user.click(anchorAberturaSemLetra);
  renderWithReactRouter(<AberturaSemLetras />);
  const encerramentoSemLetras = screen.getByText(/termo de encerramento/i);
  expect(encerramentoSemLetras).toBeInTheDocument();
});
