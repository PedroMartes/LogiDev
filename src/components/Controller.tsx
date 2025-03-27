

export function Controller() {
    return (
        <>
            <main>
                <section className={Style.formsMain}>
                    <form>
                        <div className={Style.formControl}>
                            <label for="name">Nome do produto </label>
                            <input type="text" name="name" id="name" required />
                        </div>

                        <div className={Style.formControl}>
                            <label for="descricao">Descrição do produto </label>
                            <input type="text" name="descricao" id="descricao" required />
                        </div>

                        <div className={Style.formControl}>
                            <label for="img">Adicione a url da imagem </label>
                            <input type="text" name="img" id="img" required />
                        </div>

                        <div className={Style.formControlButton}>
                            <button onclick="elemento(event)">Adicionar produto</button>
                        </div>
                    </form>

                </section>

                <section className={Style.itemsMain} id="items-main">

                    <div className={Style.items-main-title}>
                        <p>Estoque</p>
                    </div>

                    <div className={Style.item-card}>

                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKIrf6lY5Y3Mi5ACQw3TkM-P3c2OTnT-WOkg&s">

                            <div className={Style.item-card-text}>

                                <h1>Nome do item</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem tenetur fuga rerum dolores assumenda
                                    exercitationem debitis sapiente odit.</p>

                            </div>

                            <div className={Style.delete-button}>
                                <button onclick=""><img src="../public/img/trash-can.png" alt=""></button>
                            </div>

                    </div>

                </section>
            </main>
        </>
    )
}