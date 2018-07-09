# Componentes do Filesquash
Este é um conjunto de web componentes criados para interagir com a API do [Filesquash](https://filesquash.io). 

## Instalação

### Via tag <script>

- Adicione o seguinte código antes de fechar a tag `<body>` de seu site:
```html
<script type="application/javascript">
  var filesquashConfig = {
    projectId: '[seu projectId]',
    token: '[seu token]'
  }
</script>
<script src='https://unpkg.com/filesquash-widget@0.4.2/dist/filesquash.js'></script>
```
- Pronto. Agora você já pode usar os componentes em qualquer lugar no seu template, jsx, html, etc.

### NPM

- Rode `npm install filesquash-widget --save`
- Adicione um código similar ao a seguir antes de fechar a tag `<body>` de seu site:
```html
<script type="application/javascript">
  var filesquashConfig = {
    projectId: '[seu projectId]',
    token: '[seu token]'
  }
</script>
<script src='node_modules/filesquash-widget/dist/filesquash.js'></script>
```
- Pronto. Agora você já pode usar os componentes em qualquer lugar no seu template, jsx, html, etc.

---

## Widget de imagens
O widget de imagens do Filesquash permite que você tenha imagens automaticamente responsivas em seu site com o mínimo de esforço possível. Além disso, também é possível aplicar uma grande quantidade de efeitos efeitos, como blur, grayscale, watermark, etc..

### Exemplo:

```html
  <img
    data-fs-src="https://mysite.com/images/image.jpg"
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+f9vPQAJZAN2rlRQVAAAAABJRU5ErkJggg=="
  />
```

### Opções

| Atributo | Valor padrão | Valores possíveis | Descrição |
|---|:-:|:-:|---|
| **data-fs-src**  | | | Este atributo define o endereço URL da imagem ou identificador único de imagem no Filesquash. <br /> **Esse atributo é obrigatório**. |
| **data-fs-size** | `"w_auto"` | `"default"`, `"h_auto"`, `"w_auto"` e [mais](https://filesquash.gitbook.io/docs/) |  Este atributo especifica o tamanho desejado da imagem. |
| **data-fs-filters** | | [Mais informações](https://filesquash.gitbook.io/docs/) | Este atributo define os filtros que serão aplicados a imagem. |
| **data-fs-progressive** | `true` | `true` ou `false` | Este atributo define se a imagem será carregada de forma progressiva usando placeholder de baixa resolução (LQIP). |

---

## Widget de imagens em background
O widget de imagens do Filesquash também permite que você tenha imagens em background automaticamente responsivas.

### Exemplo:

```html
  <div
    data-fs-bg="https://mysite.com/images/image.jpg"
    style="width:100%; height: 500px;"
  ></div>
```

### Opções

| Atributo | Valor padrão | Valores possíveis | Descrição |
|---|:-:|:-:|---|
| **data-fs-bg**  | | | Este atributo define o endereço URL da imagem ou identificador único de imagem no Filesquash. <br /> **Esse atributo é obrigatório**. |
| **data-fs-size** | `"w_auto"` | `"default"`, `"h_auto"`, `"w_auto"` e [mais](https://filesquash.gitbook.io/docs/) |  Este atributo especifica o tamanho desejado da imagem. |
| **data-fs-filters** | | [Mais informações](https://filesquash.gitbook.io/docs/) | Este atributo define os filtros que serão aplicados a imagem. |
| **data-fs-progressive** | `true` | `true` ou `false` | Este atributo define se a imagem será carregada de forma progressiva usando placeholder de baixa resolução (LQIP). |

---

## Widget de Upload

### Javascript (vanilla):

```html
  <filesquash-widget id="widget"></filesquash-widget>
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
| **multiple**  | `false` | Este atributo define se o usuário pode selecionar mais de um arquivo de forma simultânea. |
| **button-text**  | `"Selecionar arquivos"` | Este atributo define o texto do botão de abertura do modal do widget. |
| **label-text**  | `"Arraste/solte seu arquivo aqui."` | Este atributo define o texto da caixa de seleção de arquivos do widget. |
| **upload-button-text**  | `"Enviar"` | Este atributo define o texto do botão que realiza o upload dos arquivos do widget. |

### Utilizando o widget de upload com o React:

Para usar o widget de upload no React você precisará criar um wrapper como o apresentado a seguir.

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
      />
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