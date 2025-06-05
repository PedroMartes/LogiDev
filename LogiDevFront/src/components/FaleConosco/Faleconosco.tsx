import { useState } from 'react';
import style from './FaleConosco.module.css'
import * as Icon from 'react-bootstrap-icons'

export function Faleconosco({ onClose }: { onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(true);
    const [cpf, setCpf] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('Erro ao enviar mensagem!');

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
            setShowSuccess(true);
            // setIsOpen(false); // Remova o fechamento automático
            // onClose();
        } catch (error) {
            setErrorMsg('Erro ao enviar mensagem!');
            setShowError(true);
            setTimeout(() => setShowError(false), 4000);
        }
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.faleConosco}>
                    <form onSubmit={handleSubmit}>
                        <h1>Fale conosco</h1>
                        <Icon.XLg className={style.iconX} onClick={handleClose}/>

                        {/* ALERTA DE SUCESSO */}
                        {showSuccess && (
                            <div className={style.perfilPopupSucesso}>
                                <i className="fas fa-check-circle"></i>
                                Mensagem enviada com sucesso!
                                <span
                                    className={style.fecharSucesso}
                                    title="Fechar"
                                    onClick={() => setShowSuccess(false)}
                                >
                                    &times;
                                </span>
                            </div>
                        )}

                        {/* ALERTA DE ERRO */}
                        {showError && (
                            <div className={style.perfilPopupErro}>
                                <i className="fas fa-times-circle"></i>
                                {errorMsg}
                                <span
                                    className={style.fecharSucesso}
                                    title="Fechar"
                                    onClick={() => setShowError(false)}
                                >
                                    &times;
                                </span>
                            </div>
                        )}

                        <hr/>
                        <p>Tire suas dúvidas, envie a sua mensagem e nós responderemos o mais breve possível. Obrigado!</p>
                        <input className={style.input}
                        required                            
                        placeholder=" Nome da Empresa:" />
                        <input className={style.input} 
                        required 
                        type='tel' 
                        onChange={handleCpfChange}
                        value={cpf}
                        minLength={11}
                        maxLength={14}
                        placeholder="CNPJ/CPF:" />
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
        </>
    )
}