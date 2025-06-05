import { useState } from 'react';
import style from './EsqueciSenha.module.css';
import * as Icon from 'react-bootstrap-icons';
import axios from 'axios';

export function EsqueciSenha({
  onClose,
  onEnviar
}: {
  onClose: () => void;
  onEnviar: (email: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');


  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        // Troque a URL para o endpoint que verifica se o e-mail existe
        const response = await axios.post('http://localhost:8080/usuarios/verifica-email', { email });
        if (response.data.exists) {
          onEnviar(email); // E-mail existe, pode prosseguir
        } else {
           setErro('E-mail não cadastrado!');
        }
      } catch (error) {
         setErro('Erro ao verificar e-mail!');
      }
    }
  };

    return (
    <>
      <div className={style.container}>
        <div className={style.cadastro}>
          <form onSubmit={handleSubmit}>
            <h1>Esqueci a senha</h1>
            <Icon.XLg className={style.iconX} onClick={handleClose} />
            <hr />
            <p>
              Informe seu e-mail cadastrado e enviaremos um código para recuperação de senha.
            </p>
            {erro && (
              <div style={{ color: '#cd2727', textAlign: 'center', marginTop: '2vh' }}>
                {erro}
              </div>
            )}
            <input
              required
              className={style.input}
              placeholder="Seu e-mail cadastrado:"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" className={style.botaoEnviar}>Enviar</button>
          </form>
          <div className={style.abrirEsqueciSenha}>
            <a onClick={onClose} style={{ cursor: "pointer" }}>Voltar ao login</a>
          </div>
        </div>
      </div>
    </>
  );
}