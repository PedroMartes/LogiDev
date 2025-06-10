import { useState } from 'react';
import style from './RenovarSenha.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios';


export function RenovarSenha({ onClose, email }: { onClose: () => void; email: string }) {
    // const [showPassword, setShowPassword] = useState(false);
    const [showNovaSenha, setShowNovaSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

    const [isOpen, setIsOpen] = useState(true);
    const [error, setError] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');


    const handleClose = () => {
        setIsOpen(false);
        onClose(); // Chama a função de fechamento passada como prop
    };

    if (!isOpen) {
        return null; // Isso faz com que o componente não seja renderizado
    }

    const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!novaSenha || !confirmarSenha) {
        setError('Preencha ambos os campos de senha.');
        return;
    }
    if (novaSenha !== confirmarSenha) {
        setError('As senhas não coincidem.');
        return;
    }
    try {
        await axios.post('http://localhost:8080/usuarios/redefinir-senha', { email, novaSenha });
        alert('Senha redefinida com sucesso!');
        setIsOpen(false);
        onClose();
    } catch (err) {
        setError('Código inválido ou erro ao redefinir senha.');
    }
};

    return (
        <>
            <div className={style.container}>
                <div className={style.cadastro}>

                    <form onSubmit={handleValidate}>
                        <h1>Esqueci a senha</h1><Icon.XLg className={style.iconX} onClick={handleClose} />
                        <hr />
                        <p>
                            Foi enviado um código de recuperação para o seu e-mail.
                        </p>

                        <input
                            className={style.input}
                            placeholder="Código:"
                            type='tel'
                            required
                            minLength={6}
                            maxLength={6}
                            // onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
                        />

                        {/* Campo de senha com ícone para mostrar/ocultar */}
                        <div className={style.passwordWrapper}>
                            <input
                                type={showNovaSenha? 'text' : 'password'}
                                className={style.input}
                                placeholder="Senha Nova:"
                                value={novaSenha}
                                onChange={e => setNovaSenha(e.target.value)}
                            />
                            <span
                                className={style.toggleIcon}
                                onClick={() => setShowNovaSenha(!showNovaSenha)}
                                aria-label={showNovaSenha? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {showNovaSenha ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Campo de senha com ícone para mostrar/ocultar */}
                        <div className={style.passwordWrapper}>
                            <input
                                type={showConfirmarSenha ? 'text' : 'password'}
                                className={style.input}
                                placeholder="Confirmar senha:"
                                value={confirmarSenha}
                                onChange={e => setConfirmarSenha(e.target.value)}
                            />
                            <span
                                className={style.toggleIcon}
                                onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                                aria-label={showConfirmarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {showConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button type="submit" className={style.botaoEnviar}>Redefinir</button>
                    </form>


                    <div className={style.abrirEsqueciSenha}>
                        <a onClick={onClose} style={{ cursor: "pointer" }}>Voltar ao login</a>
                    </div>

                </div>
            </div>
        </>
    )
}