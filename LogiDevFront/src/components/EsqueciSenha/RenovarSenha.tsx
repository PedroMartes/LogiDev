import { useState } from 'react';
import style from './RenovarSenha.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Icon from 'react-bootstrap-icons'


export function RenovarSenha({ onClose }: { onClose: () => void;}) {
    const [showPassword, setShowPassword] = useState(false);
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
                            Foi enviado um código de recuperação para o seu e-mail.
                        </p>

                        <input
                            className={style.input}
                            placeholder="Código:"
                        />

                        {/* Campo de senha com ícone para mostrar/ocultar */}
                        <div className={style.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={style.input}
                                placeholder="Senha Nova:"
                            />
                            <span
                                className={style.toggleIcon}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {/* Campo de senha com ícone para mostrar/ocultar */}
                        <div className={style.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={style.input}
                                placeholder="Confirmar senha:"
                            />
                            <span
                                className={style.toggleIcon}
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button type="submit" className={style.botaoEnviar} onClick={onClose} >Redefinir</button>
                    </form>


                    <div className={style.abrirEsqueciSenha}>
                        <a onClick={onClose} style={{ cursor: "pointer" }}>Voltar ao login</a>
                    </div>

                </div>
            </div>
        </>
    )
}