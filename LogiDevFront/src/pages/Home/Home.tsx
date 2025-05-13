import Style from './Home.module.css'
import graficoLogistica from '../../assets/img/graphic-logistic.png'
import armazenamento from '../../assets/img/armazenamento.png'
import nuvemPasta from '../../assets/img/nuvem-pasta.png'
import { CarrosselHome } from '../../components/CarrosselHome/Carrosselhome'

export function Home() {
    return (
        <>
            <div className={Style.TopHome}>
                <CarrosselHome />
            </div>
            <div className={Style.beneficios}>
                <h1>Benefícios em Destaque</h1>
                <h3 className={Style.subTitulo}>Descubra nossas soluções.</h3>
            </div>

            <div className={Style.container}>
                <div className={Style.card1}>
                    <div className={Style.userPicture}>
                        <img src={graficoLogistica} />
                    </div>
                    <h5>Oferecemos soluções de gerenciamento de estoque que facilitam o controle de mercadorias, permitindo monitorar entradas, saídas e níveis de estoque em tempo real. Isso evita desperdícios e garante a disponibilidade dos produtos.
                    </h5>
                </div>

                <div className={Style.card2}>
                    <div className={Style.userPicture}>
                        <img src={armazenamento} />
                    </div>
                    <h5>Possuímos estrutura moderna e estratégica para armazenar seus produtos com segurança e eficiência.
                        Nossa rede de distribuição garante entregas rápidas e precisas em qualquer região.
                    </h5>
                </div>

                <div className={Style.card3}>
                    <div className={Style.userPicture}>
                        <img src={nuvemPasta} />
                    </div>
                    <h5>Priorizamos a segurança da informação na logística, protegendo dados dos clientes e operações com sistemas criptografados e protocolos robustos, garantindo confidencialidade e integridade.
                    </h5>
                </div>
            </div>

            <a href={"/controle"}>Página de controle</a>
        </>
    )
}