import { Component, Element, Event, EventEmitter, Listen, Prop, State, Watch } from '@stencil/core';
import compact from 'lodash/compact';
import debounce from 'lodash/debounce';
import uniqBy from 'lodash/uniqBy';

const BLANK_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8+f9vPQAJZAN2rlRQVAAAAABJRU5ErkJggg=='

@Component({
  tag: 'filesquash-img',
  styleUrl: 'img.scss'
})
export class MyComponent {
  @Element() hostElement: HTMLElement;

  @Event() imageLoad: EventEmitter;
  @Event() imageError: EventEmitter;

  @Prop() src: string;
  @Prop() projectId: string;
  @Prop() alt: string;
  @Prop() size: string;
  @Prop() filters: string;
  @Prop() progressive: boolean = true;

  @State() image: string = BLANK_PIXEL;

  debouncedloadBackgroundImage = debounce(() => {
    this.loadBackgroundImage(this.src).then(resultImage => (this.image = resultImage))
  }, 1000)

  @Watch('src')
  validateName(newSrc: string,) {
    const isBlank = typeof newSrc == null;
    if (isBlank) { throw new Error('src: required') }
    else {
      this.loadBackgroundImage(newSrc).then(resultImage => (this.image = resultImage));
    }
  }

  @Watch('projectId')
  validateProjectId(newProjectId: string,) {
    const isBlank = typeof newProjectId == null;
    const has8chars = typeof newProjectId === 'string' && newProjectId.length === 8;
    if (isBlank) { throw new Error('projectId: required') };
    if (!has8chars) { throw new Error('projectId: invalid') };
  }

  @Listen('window:orientationchange')
  handleOrientationChange() {
    this.debouncedloadBackgroundImage()
  }

  @Listen('window:resize')
  handleResize() {
    this.debouncedloadBackgroundImage()
  }

  componentDidLoad() {
    if (this.progressive) {
      this.getBlurryImage(this.src)
        .then((resultImage) => {
          this.image = resultImage;
          return this.loadBackgroundImage(this.src)
        })
        .then(resultImage => (this.image = resultImage));
    } else {
      this.loadBackgroundImage(this.src)
        .then(resultImage => (this.image = resultImage));
    }
  }

  getImageSize(size) {
    switch (size) {
      case 'w_auto':
      return `${(this.hostElement.parentNode as HTMLElement).clientWidth}x`
      case 'h_auto':
      return `${(this.hostElement.parentNode as HTMLElement).clientHeight}x`
      default:
      return size
    }
  }

  getFilters(filters, size) {
    const blacklistedValues = ['grayscale'];
    const defaultFilters = ['quality=keep'];
    const userFilters = compact(filters.split(';'));
    let processedFilters = `filters`;
    let crop = '';
    let mirror = '';

    const uniqFilters = uniqBy([...userFilters, ...defaultFilters], (key) => key.replace(/=.*$/, ''));

    uniqFilters.forEach(filter => {
      const [ property, value ] = filter.split('=');

      if (property === 'mirror') {
        mirror = value ? '-' : '';
      }
      else if (property === 'crop') {
        crop = !!value ? value + '/' : '';
      }
      else {
        processedFilters += `:${property}(${blacklistedValues.indexOf(property) === -1 ? value : ''})`;
      }
    })

    return `${size ? (crop + mirror + this.getImageSize(size)) + '/': ''}${processedFilters}`;
  }

  processExternalImage(src, projectId, size, filters) {
    return `https://filesquash.io/v1/${projectId}/process/${this.getFilters(filters, size)}/${encodeURIComponent(src)}`;
  }

  processHostedImage(src, projectId, size, filters, onlyUuid) {
    return onlyUuid
      ? `https://filesquash.io/v1/${projectId}/assets/${src}/${this.getFilters(filters, size)}`
      : `${src}/${this.getFilters(filters, size)}/${encodeURIComponent(src)}`;
  }

  loadBackgroundImage(src) : Promise<string> {
    return new Promise((resolve, reject) => {
      const processedImage = this.getImage(src, this.projectId, this.size, this.filters)
      let img = new Image();

      img.onload = () => {
        this.imageLoad.emit(processedImage)
        resolve(processedImage)
      }
      img.onerror = (error) => {
        this.imageError.emit(error)
        reject()
      }

      img.src = processedImage;
    })
  }

  getBlurryImage(src) : Promise<string> {
    return new Promise((resolve, reject) => {
      const userFilters = compact(this.filters.split(';'));
      const blurryFilters = ['quality=50', 'blur=40'];
      const uniqFilters = uniqBy([...blurryFilters, ...userFilters], (key) => key.replace(/=.*$/, ''));
      const processedImage = this.getImage(src, this.projectId, this.size, uniqFilters.join(';'));

      let img = new Image();

      img.onload = () => resolve(processedImage)
      img.onerror = () => reject()

      img.src = processedImage;
    })
  }

  getImage(src, projectId, size, filters) : string {
    const uuidV4Checker = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i);
    const hostedAssetChecker = new RegExp(/^(http|https):\/\/filesquash\.io\/[0-9A-Z]{8}\/assets\//i);

    const onlyUuid = uuidV4Checker.test(src);
    const hostedAsset = hostedAssetChecker.test(src);

    return hostedAsset || onlyUuid
      ? this.processHostedImage(src, projectId, size, filters, onlyUuid)
      : this.processExternalImage(src, projectId, size, filters);
  }

  render() {
    return (
      <img
        src={this.image}
        alt={this.alt}
      />
    );
  }
}
