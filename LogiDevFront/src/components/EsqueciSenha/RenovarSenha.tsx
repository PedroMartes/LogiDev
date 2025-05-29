import { useState } from 'react';
import style from './RenovarSenha.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Icon from 'react-bootstrap-icons'
import axios from 'axios';


export function RenovarSenha({ email, onClose }: { email: string; onClose: () => void;}) {
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');


    const handleClose = () => {
        setIsOpen(false);
        onClose(); // Chama a função de fechamento passada como prop
    };

    if (!isOpen) {
        return null; // Isso faz com que o componente não seja renderizado
    }

     const handleValidate = async () => {
    if (!code) {
      setError('Por favor, insira o código enviado para o seu e-mail.');
      return;
    }
    try {
      await axios.post('/api/auth/renovarSenha', { email, code });
      // Se válido, redirecione para a página de nova senha
    } catch (err) {
      setError('Código inválido');
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
                            value={code}
                            onChange={(e) => setCode(e.target.value)}

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
                        {error && <p style={{ color: 'red' }}>{error}</p>}
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