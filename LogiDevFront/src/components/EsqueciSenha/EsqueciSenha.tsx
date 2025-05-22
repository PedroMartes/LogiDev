import { useState } from 'react';
import style from './EsqueciSenha.module.css';
import * as Icon from 'react-bootstrap-icons'



export function EsqueciSenha({ onClose, onEnviar }: { onClose: () => void; onEnviar: () => void;}) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Chama a função de fechamento passada como prop
  };

  if (!isOpen) {
    return null; // Isso faz com que o componente não seja renderizado
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.cadastro}>

          <form>
            <h1>Esqueci a senha</h1><Icon.XLg className={style.iconX} onClick={handleClose} />
            <hr />
            <p>
              Informe seu e-mail cadastrado e enviaremos um código para recuperação de senha.
            </p>
            <input
              className={style.input}
              placeholder="E-mail:"
            />
            <button type="submit" onClick={onEnviar} className={style.botaoEnviar} >Enviar</button>
          </form>

          <div className={style.abrirEsqueciSenha}>
            <a  onClick={onClose} style={{cursor: "pointer"}}>Voltar ao login</a>
          </div>
        </div>
      </div>
    </>
  )
}