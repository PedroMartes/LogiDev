import Style from './Pagina404.module.css'
import lupa from '../../assets/img/notFound.png'

export function Page404() {
    return (
        <>
        <main className={Style.page404main}>
            <img src={lupa} className={Style.page404img} />
            <div className={Style.text}>
                <p>404, Page not found</p>
            </div>
        </main>
        </>
    )
}