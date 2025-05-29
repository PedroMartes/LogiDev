import { useState } from 'react';
import style from './Falaconosco.module.css'
import * as Icon from 'react-bootstrap-icons'

export function Faleconosco({ onClose }: { onClose: () => void }) {

     const [isOpen, setIsOpen] = useState(true);
    const [cpf, setCpf] = useState('');

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    if (!isOpen) {
        return null; // Isso faz com que o componente não seja renderizado
    }



    return (
        <>
                <div className={style.container}>

                    <div className={style.faleConosco}>
                        <form>
                            <h1>Fale conosco</h1> <Icon.XLg className={style.iconX} onClick={handleClose}/>
                            <hr/>
                            <p>Tire suas dúvidas, envie a sua mensagem e nós responderemos o mais breve possível. Obrigado!</p>
                            <input className={style.input}
                            required                            
                            placeholder=" Nome da Empresa:" />
                            <input className={style.input} 
                            required type='tel' onChange={e => setCpf(e.target.value.replace(/\D/g, ""))}
                            value={cpf}
                            placeholder="CNPJ/CPF:" />
                            <input className={style.input}
                            required type='email'
                            placeholder=" E-mail:" />
                            <textarea className={style.inputMensagem}
                            required
                            placeholder=" Sua Mensagem:"></textarea>
                            <button type="submit" className={style.botaoEnviar}>Enviar</button>
                        </form>
                    </div >
                </div >
        </>
    )
}

