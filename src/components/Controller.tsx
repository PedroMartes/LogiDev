import Style from './Controller.module.css'

export function Controller() {
    return (
        <>
            <section className={Style.mainTitle}>
                <h1>Controle de estoque</h1>
            </section>
            <section className={Style.tableMain}>
                <div className={Style.table}>

                    <div className={Style.tableItemsMain}>
                        <div className={Style.tableItem} id='itemName'><p>Lorem Ipsun</p></div>
                        <div className={Style.tableItem} id='itemCategoria'><p>Lorem Lorem</p></div>
                        <div className={Style.tableItem} id='itemQuantidade'><p>10</p></div>
                        <div className={Style.tableItem} id='itemStatusEstoque'><p><p>No limite</p></p></div>
                        <div className={Style.tableItem} id='itemDescription'><p>Lorem ipsum dolor sit amet consectetur.</p></div>
                    </div>

                </div>
            </section>


            <div className={Style.enterExitTitle}>
                <h2>Entradas e saidas dos produtos</h2>
            </div>

            <section className={Style.enterExitTableMain}>

                <div className={Style.enterExitTopMonths}>
                    <div className={Style.enterExitMonths}><p>Janeiro</p></div>
                    <div className={Style.enterExitMonths}><p>Fevereiro</p></div>
                    <div className={Style.enterExitMonths}><p>Março</p></div>
                    <div className={Style.enterExitMonths}><p>Abril</p></div>
                    <div className={Style.enterExitMonths}><p>Maio</p></div>
                    <div className={Style.enterExitMonths}><p>Junho</p></div>
                    <div className={Style.enterExitMonths}><p>Julho</p></div>
                    <div className={Style.enterExitMonths}><p>Agosto</p></div>
                    <div className={Style.enterExitMonths}><p>Setembro</p></div>
                    <div className={Style.enterExitMonths}><p>Outubro</p></div>
                    <div className={Style.enterExitMonths}><p>Novembro</p></div>
                    <div className={Style.enterExitMonths}><p>Desembro</p></div>
                </div>


                <div className={Style.enterExitTable}>

                    <div className={Style.enterExitLeft}>

                        <div className={Style.enterExitLeftTop}>
                            <div className={Style.enterExitLeftItem}><p>Entrada</p></div>
                        </div>
                        <div className={Style.enterExitLeftBotton}>
                            <div className={Style.enterExitLeftItem}><p>Saida</p></div>
                        </div>
                    </div>

                    <div className={Style.enterExitTableInformations}>
                        <div className={Style.enterExitTableInformationsTop}>
                            <div className={Style.enterExitInformation}><p>Janeiro</p></div>
                            <div className={Style.enterExitInformation}><p>Fevereiro</p></div>
                            <div className={Style.enterExitInformation}><p>Março</p></div>
                            <div className={Style.enterExitInformation}><p>Abril</p></div>
                            <div className={Style.enterExitInformation}><p>Maio</p></div>
                            <div className={Style.enterExitInformation}><p>Junho</p></div>
                            <div className={Style.enterExitInformation}><p>Julho</p></div>
                            <div className={Style.enterExitInformation}><p>Agosto</p></div>
                            <div className={Style.enterExitInformation}><p>Setembro</p></div>
                            <div className={Style.enterExitInformation}><p>Outubro</p></div>
                            <div className={Style.enterExitInformation}><p>Novembro</p></div>
                            <div className={Style.enterExitInformation}><p>Desembro</p></div>
                        </div>

                        <div className={Style.enterExitTableInformationsBotton}>
                            <div className={Style.enterExitInformation}><p>Janeiro</p></div>
                            <div className={Style.enterExitInformation}><p>Fevereiro</p></div>
                            <div className={Style.enterExitInformation}><p>Março</p></div>
                            <div className={Style.enterExitInformation}><p>Abril</p></div>
                            <div className={Style.enterExitInformation}><p>Maio</p></div>
                            <div className={Style.enterExitInformation}><p>Junho</p></div>
                            <div className={Style.enterExitInformation}><p>Julho</p></div>
                            <div className={Style.enterExitInformation}><p>Agosto</p></div>
                            <div className={Style.enterExitInformation}><p>Setembro</p></div>
                            <div className={Style.enterExitInformation}><p>Outubro</p></div>
                            <div className={Style.enterExitInformation}><p>Novembro</p></div>
                            <div className={Style.enterExitInformation}><p>Desembro</p></div>
                        </div>

                    </div>

                </div>


            </section>
        </>
    )
}