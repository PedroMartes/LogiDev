import { useState } from 'react';
import style from './Login.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Icon from 'react-bootstrap-icons'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Login({ onClose, onOpenCadastro, onOpenEsqueciSenha }: { onClose: () => void; onOpenCadastro: () => void; onOpenEsqueciSenha?: () => void; }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const [erro, setErro] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    onClose(); // Chama a função de fechamento passada como prop
  };

  if (!isOpen) {
    return null; // Isso faz com que o componente não seja renderizado
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/usuarios/login', {
        email: email,
        senha: senha
      });
      // Salva o token e o email do usuário logado
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email); // <-- Aqui você salva o email
      localStorage.setItem('nome', response.data.nome);
      localStorage.setItem('userId', String(response.data.id));
      navigate("/controle/produtos");
    } catch (error) {
      setErro('Email ou senha estão incorretos');
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.cadastro}>

          <form onSubmit={handleSubmit}>
            <h1>Login</h1><Icon.XLg className={style.iconX} onClick={handleClose} />
            <hr />
            <p>
              Entre na sua conta e tenha uma experiência
              feita especialmente para você.
            </p>
            {erro && (
              <div style={{ color: '#cd2727', textAlign: 'center', marginTop: '2vh' }}>
                {erro}
              </div>
            )}
            <input
              type='email'
              className={style.input}
              placeholder="E-mail:"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            {/* Campo de senha com ícone para mostrar/ocultar */}
            <div className={style.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={style.input}
                placeholder="Senha:"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required
              />
              <span
                className={style.toggleIcon}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit" className={style.botaoEnviar} >Enviar</button>
          </form>

          <div className={style.abrirEsqueciSenha}>
            <a onClick={onOpenEsqueciSenha} style={{ cursor: "pointer" }}>Esqueceu sua senha?</a>
          </div>

          <div className={style.abrirCadastro}>
            <p>Não tem uma conta?

              <a onClick={onOpenCadastro} style={{ cursor: "pointer" }}>Faça seu cadastro</a>
            </p>
          </div>


          <ul className={style.example2}>
            <li className={style.iconContent2}>
              <a data-social="facebook" target="_blank" aria-label="Facebook" href="https://www.facebook.com/">
                <div className={style.filled}></div>
                <svg viewBox="0 0 24 24" fill="currentColor" height="24"
                  width="24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                    d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z">
                  </path>
                </svg>
              </a>
            </li>
            <li className={style.iconContent3}>
              <a data-social="instagram" target="_blank" aria-label="Instagram" href="https://www.instagram.com/">
                <div className={style.filled}></div>
                <svg viewBox="0 0 16 16" fill="currentColor" height="16"
                  width="16" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor"
                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334">
                  </path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}