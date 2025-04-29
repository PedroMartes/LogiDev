import Style from './Sobre.module.css'
import sobre from '../../assets/img/sobre.png'
import MissaoIcon from '../../assets/img/missao-icon.png'
import VisaoIcon from '../../assets/img/visao-icon.png'
import ValoresIcon from '../../assets/img/valores-icon.png'

export function Sobre() {
    return (
        <>
            <div className={Style.inicial}>
                <h2>Sobre nós</h2> 
            </div>

            <div className={Style.containerSobrePage}>
                <div className={Style.cardMissao}>

                    <div className={Style.userPicture}>
                        <img src={MissaoIcon} />
                    </div>
                    <p className={Style.missao}> Missão
                        <span>Oferecer soluções inteligentes e integradas em logística e controle de estoque, utilizando
                            tecnologia de ponta para otimizar operações.</span>
                    </p>

                </div>

                <div className={Style.cardVisao}>

                    <div className={Style.userPicture}>
                        <img src={VisaoIcon} />
                    </div>

                    <p className={Style.visao}> Visão
                        <span>
                            Ser reconhecida como a principal parceira tecnológica para gestão de estoques, liderando a
                            transformação digital na logística.
                        </span>
                    </p>

                </div>

                <div className={Style.cardValores}>

                    <div className={Style.userPicture}>
                        <img src={ValoresIcon} />
                    </div>

                    <p className={Style.valores}> Valores
                        <span>
                            Inovação, Transparência, Sustentabilidade, Eficiência, Parceria e Qualidade.
                        </span>
                    </p>

                </div>
            </div>
        </>
    )
}