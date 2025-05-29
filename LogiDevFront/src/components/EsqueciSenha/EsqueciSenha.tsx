import { useState } from 'react';
import style from './EsqueciSenha.module.css';
import * as Icon from 'react-bootstrap-icons';

export function EsqueciSenha({
  onClose,
  onEnviar
}: {
  onClose: () => void;
  onEnviar: (email: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onEnviar(email); // Vai para o modal de renovar senha
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