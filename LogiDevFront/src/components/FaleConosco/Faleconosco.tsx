import { useState } from 'react';
<<<<<<< HEAD
import style from './falaconosco.module.css'
=======
import style from './FaleConosco.module.css'
>>>>>>> dev
import * as Icon from 'react-bootstrap-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Faleconosco({ onClose }: { onClose: () => void }) {
    const [isOpen, setIsOpen] = useState(true);
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [mensagem, setMensagem] = useState('');

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
            setCpf(''); // Limpa o campo de CPF após o envio
            setEmail(''); // Limpa o campo de email após o envio
            setNome(''); // Limpa o campo de nome após o envio
            setMensagem(''); // Limpa o campo de mensagem após o envio


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
                        <Icon.XLg className={style.iconX} onClick={handleClose} />
                        <hr />
                        <p>Tire suas dúvidas, envie a sua mensagem e nós responderemos o mais breve possível. Obrigado!</p>
                        <input
                            className={style.input}
                            required
                            placeholder=" Nome:"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />

                        <input
                            className={style.input}
                            required
                            type='tel'
                            onChange={handleCpfChange}
                            value={cpf}
                            minLength={11}
                            maxLength={11}
                            placeholder="CPF:"
                        />

                        <input
                            className={style.input}
                            required
                            type='email'
                            placeholder=" E-mail:"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <textarea
                            className={style.inputMensagem}
                            required
                            placeholder=" Sua Mensagem:"
                            value={mensagem}
                            onChange={e => setMensagem(e.target.value)}
                        />

                        <button type="submit" className={style.botaoEnviar}>Enviar</button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-left" />
        </>
    )
}