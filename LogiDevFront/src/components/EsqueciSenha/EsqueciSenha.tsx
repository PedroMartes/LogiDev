import { useState } from 'react';
import style from './EsqueciSenha.module.css';
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios';



export function EsqueciSenha({ onClose, onEnviar }: { onClose: () => void; onEnviar: () => void;}) {
    const [isOpen, setIsOpen] = useState(true);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Chama a função de fechamento passada como prop
  };

  if (!isOpen) {
    return null; // Isso faz com que o componente não seja renderizado
  }

   const handleSendCode = async () => {
    if (!email) {
      setMessage('Por favor, insira um e-mail válido.');
      return;
    }
    const res = await axios.post('/api/auth/esqueciSenha', { email });
    setMessage(res.data.message);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.cadastro}>

          <form onSubmit={handleSendCode}>
            <h1>Esqueci a senha</h1><Icon.XLg className={style.iconX} onClick={handleClose} />
            <hr />
            <p>
              Informe seu e-mail cadastrado e enviaremos um código para recuperação de senha.
            </p>
            <input
            required
              className={style.input}
              placeholder="Seu e-mail cadastrado:"
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" onClick={onEnviar} className={style.botaoEnviar} >Enviar</button>
            {message && <p>{message}</p>}
          </form>

          <div className={style.abrirEsqueciSenha}>
            <a  onClick={onClose} style={{cursor: "pointer"}}>Voltar ao login</a>
          </div>
        </div>
      </div>
    </>
  )
}