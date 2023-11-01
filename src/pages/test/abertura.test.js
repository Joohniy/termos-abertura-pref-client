import { screen } from '@testing-library/react';
import { renderWithReactRouter } from '../../test-utils/customRenderRouter';
//import { UserEvent } from '@testing-library/user-event';
import Abertura from "../assets/js/abertura";

test("render component", () => {
    renderWithReactRouter(<Abertura />)
    const header = screen.getByText(/termo de encerramento/i);
    expect(header).toBeInTheDocument();
});

test("render encerramento inputs", () => {
    renderWithReactRouter(<Abertura />);
    const nfolhaInput = screen.getByLabelText(/nº da folha:/i);
    expect(nfolhaInput).toBeInTheDocument();
    const nprocessoInput = screen.getByLabelText(/nº processo:/i);
    expect(nprocessoInput).toBeInTheDocument();
    const anoprocessoInput = screen.getByLabelText(/ano processo:/i);
    expect(anoprocessoInput).toBeInTheDocument();
    const dataAbertura = screen.getByLabelText(/data de abertura:/i);
    expect(dataAbertura).toBeInTheDocument();
    const nome = screen.getByLabelText(/nome:/i);
    expect(nome).toBeInTheDocument();
    const nprimeiraFolha = screen.getByLabelText(/nº primeira folha:/i);
    expect(nprimeiraFolha).toBeInTheDocument();
    const nultimaFolha = screen.getByLabelText(/nº última folha:/i);
    expect(nultimaFolha).toBeInTheDocument();
    const nvolEncerrado = screen.getByLabelText(/volume encerrado:/i);
    expect(nvolEncerrado).toBeInTheDocument();
    const volAberto = screen.getByLabelText(/volume que vai ser aberto:/i);
    expect(volAberto).toBeInTheDocument();
});

test("button enabled or disabled if all values are not filled in", () => {
   renderWithReactRouter(<Abertura />);
})