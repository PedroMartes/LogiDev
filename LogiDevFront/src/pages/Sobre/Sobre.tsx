import Style from './Sobre.module.css'
import MissaoIcon from '../../assets/img/missao-icon.png'
import VisaoIcon from '../../assets/img/visao-icon.png'
import ValoresIcon from '../../assets/img/valores-icon.png'
import SobreImg from '../../assets/img/sobre.png'
import { NavBar } from '../../components/NavBar/NavBar'
import { FooterGeral } from '../../components/Footer/Footer'

export function Sobre() {
    return (
        <>
        <NavBar />
            
            <div className={Style.inicial}>
                <img src={SobreImg} />
                <h2>Sobre nós</h2>
            </div>

            <div className={Style.containerSobrePage}>
                <div className={Style.cardMissao}>

                    <div className={Style.userPicture}>
                        <img src={MissaoIcon} />
                    </div>
                    <p className={Style.missao}> 
                        <p>Missão</p>
                        <span>Oferecer soluções inteligentes e integradas em logística e controle de estoque, utilizando
                            tecnologia de ponta para otimizar operações.</span>
                    </p>

                </div>

                <div className={Style.cardVisao}>

                    <div className={Style.userPicture}>
                        <img src={VisaoIcon} />
                    </div>

                    <p className={Style.visao}> 
                        <p>Visão</p>
                        <span>
                            Ser reconhecida como a principal parceira tecnológica para gestão de estoques, liderando a
                            transformação digital.
                        </span>
                    </p>

                </div>

                <div className={Style.cardValores}>

                    <div className={Style.userPicture}>
                        <img src={ValoresIcon} />
                    </div>

                    <p className={Style.valores}> 
                        <p>Valores</p>
                        <span>
                            Inovação, Transparência, Sustentabilidade, Eficiência, Parceria e Qualidade.
                        </span>
                    </p>

                </div>
            </div>
            <FooterGeral/>
        </>
    )
}