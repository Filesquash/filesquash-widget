# Componentes do Filesquash
Este é um conjunto de web componentes criados para interagir com a API do [Filesquash](https://filesquash.io). 

## Instalação

### Via tag <script>

- Adicione a tag  `<script src='https://unpkg.com/filesquash-widget@0.2.4/dist/filesquash.js'></script>` no <head> do seu index.html
- Pronto. Agora você já pode usar os componentes em qualquer lugar no seu template, jsx, html, etc.

### NPM

- Rode `npm install filesquash-widget --save`
- Adicione uma tag script similar a `<script src='node_modules/filesquash-widget/dist/filesquash.js'></script>` o <head> do seu index.html
- Pronto. Agora você já pode usar os componentes em qualquer lugar no seu template, jsx, html, etc.

---

## Widget de imagens
O widget de imagens do Filesquash permite que você tenha imagens automaticamente responsiveis em seu site com o mínimo de esforço possível. Além disso, também é possível aplicar uma grande quantidade de efeitos efeitos, como blur, grayscale, watermark, etc..

### Exemplo:

```html
  <filesquash-img
    src="https://mysite.com/images/image.jpg"
    project-id="YOUR_PROJECT_ID"
  ></filesquash-img>
```

### Opções

| Atributo | Valor padrão | Valores possíveis | Descrição |
|---|:-:|:-:|---|
| **project-id**  | | | Este atributo define o identificador único do seu projeto no Filesquash. <br /> **Atributo é obrigatório**. |
| **src**  | | | Este atributo define o endereço URL da imagem ou identificador único de imagem no Filesquash. <br /> **Esse atributo é obrigatório**. |
| **alt**  | | |  Este atributo define um texto alternativo que descreve a imagem. <br /> **Atributo é obrigatório**. |
| **size** | `"w_auto"` | `"default"`, `"h_auto"`, `"w_auto"` e [mais](https://filesquash.gitbook.io/docs/) |  Este atributo define especifica o tamanho desejado da imagem. |
| **filters** | | [Mais informações](https://filesquash.gitbook.io/docs/) | Este atributo define os filtros que serão aplicados a imagem. |
| **progressive** | `true` | `true` ou `false` | Este atributo define se a imagem será carregada de forma progressiva usando placeholder de baixa resolução (LQIP). |

---

## Widget de Upload

### Javascript (vanilla):

```html
  <filesquash-widget token="SEU_TOKEN" id="widget"></filesquash-widget>
```

Para receber a URL de seu arquivo após o upload você deverá criar um listener para o evento `uploadCompleted`:

```js
  const widget = document.querySelector('widget');
  widget.addEventListener(
    'uploadCompleted',
    data => console.log(data)
  )
```

Alternativamente você também pode escutar pelo evento `filesquash:uploadStarted` no `document`

```js
document.addEventListener('filesquash:uploadCompleted', () => {
	console.log('filesquash:uploadStarted')
});
```

Caso queira acionar programaticamente o widget de upload do Filesquash, utilize o `<filesquash-modal>` e chame o método `toggleModal()` para exibir ou esconder o widget.

```html
<button onclick="showModal()">Exibir modal</button>
<filesquash-modal token="YOUR_TOKEN" id="modal"></filesquash-modal>

<script>
  const modalElm = document.querySelector('#modal');

  function showModal() {
    modalElm.componentOnReady()
      .then(() => {
        modalElm.toggleModal();
      });
  }
</script>
```

### Opções

| Atributo | Valor padrão | Descrição |
|---|:-:|---|
| **token**  | | Este atributo define o token do seu projeto no Filesquash. <br /> **Atributo é obrigatório**. |
| **multiple**  | `false` | Este atributo define se o usuário pode selecionar mais de um arquivo de forma simultânea. |
| **button-text**  | `"Selecionar arquivos"` | Este atributo define o texto do botão de abertura do modal do widget. |
| **label-text**  | `"Arraste/solte seu arquivo aqui."` | Este atributo define o texto da caixa de seleção de arquivos do widget. |
| **upload-button-text**  | `"Enviar"` | Este atributo define o texto do botão que realiza o upload dos arquivos do widget. |

### Utilizando o widget de upload com o React:

Para usar o widget de upload no React você precisará criar um wrapper como o apresenta a seguir.

```js
import React, { Component } from 'react'
import kebabCase from 'lodash/kebabCase'

export class UploadWidget extends Component {
  constructor(props) {
    super(props)

    this.onUploadComplete = this.onUploadComplete.bind(this)
  }

  componentDidMount () {
    this.component.addEventListener('uploadCompleted', this.onUploadComplete)
  }

  componentWillUnmount () {
    this.component.removeEventListener('uploadCompleted', this.onUploadComplete)
  }

  onUploadComplete (data) {
    this.props.onComplete(data)
  }

  _handleRef = (component) => {
    this.component = component
  };

  render () {
    const newProps = {
      ...Object.keys(this.props).reduce((accumulator, key) => ({
        ...accumulator,
        [kebabCase(key)]: this.props[key]
      }), {})
    }
    return (
      <filesquash-widget
        {...newProps}
        ref={this._handleRef}
        token={this.props.token}
        id='widget' />
    )
  }
}
```

Usando o wrapper:

```jsx
  <UploadWidget
    token={this.state.info.api_token}
    onComplete={(data) => console.log(data)}
    buttonText='Upload new files'
  />
```

ps.:  Em breve disponibilizaremos esse wrapper como um pacote no NPM.