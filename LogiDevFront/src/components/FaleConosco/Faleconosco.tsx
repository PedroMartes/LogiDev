import { useState } from 'react';
import style from './FaleConosco.module.css'
import * as Icon from 'react-bootstrap-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Faleconosco({ onClose }: { onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(true);
    const [cpf, setCpf] = useState('');

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };
    
    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 14) {
            setCpf(value);
        }
    };
    
    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Aqui você pode colocar sua lógica de envio (ex: axios)
            toast.success('Mensagem enviada com sucesso!', {
                autoClose: 4000,
                position: "top-left"
            });
            // Limpe os campos se quiser
            // setCpf('');
            // ...outros campos
        } catch (error) {
            toast.error('Erro ao enviar mensagem!', {
                autoClose: 4000,
                position: "top-left"
            });
        }
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.faleConosco}>
                    <form onSubmit={handleSubmit}>
                        <h1>Fale conosco</h1>
                        <Icon.XLg className={style.iconX} onClick={handleClose}/>
                        <hr/>
                        <p>Tire suas dúvidas, envie a sua mensagem e nós responderemos o mais breve possível. Obrigado!</p>
                        <input className={style.input}
                        required                            
                        placeholder=" Nome:" />
                        <input className={style.input} 
                        required 
                        type='tel' 
                        onChange={handleCpfChange}
                        value={cpf}
                        minLength={11}
                        maxLength={14}
                        placeholder="CPF:" />
                        <input className={style.input}
                        required type='email'
                        placeholder=" E-mail:" />
                        <textarea className={style.inputMensagem}
                        required
                        placeholder=" Sua Mensagem:"></textarea>
                        <button type="submit" className={style.botaoEnviar}>Enviar</button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-left" />
        </>
    )
}