import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State, Watch } from '@stencil/core';
import compact from 'lodash/compact';
import throttle from 'lodash/throttle';
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
  @Prop() alt: string;
  @Prop() size: string = "w_auto";
  @Prop() filters: string;
  @Prop() progressive: boolean = true;
  @Prop({ context: 'filesquashConfig' }) private filesquashConfig: any;

  @State() image: string = BLANK_PIXEL;

  @Watch('src')
  validateName(newSrc: string,) {
    const isBlank = typeof newSrc == null;
    if (isBlank) { throw new Error('src: required') }
    else {
      this.fetchImage(newSrc).then(resultImage => (this.image = resultImage));
    }
  }

  @Watch('filters')
  watchForFilterChanges(newFilters) {
    const processedImage = this.getImage(this.src, this.filesquashConfig.projectId, this.size, newFilters)
    this.fetchImage(processedImage).then(image => (this.image = image))
  }

  @Listen('window:orientationchange')
  handleOrientationChange() {
    if (this.size === 'w_auto' || this.size === 'h_auto') {
      this.throttledFetchImage()
    }
  }

  @Listen('window:resize')
  handleResize() {
    if (this.size === 'w_auto' || this.size === 'h_auto') {
      this.throttledFetchImage()
    }
  }

  @Method()
  reload() {
    const processedImage = this.getImage(this.src, this.filesquashConfig.projectId, this.size, this.filters)
    this.fetchImage(processedImage).then(image => (this.image = image))
  }

  throttledFetchImage = throttle(() => {
    this.reload()
  }, 1000)

  componentDidLoad() {
    (this.progressive ? this.getPlaceholderImage(this.src) : Promise.resolve(null))
      .then(placeholderImage => {
        if (placeholderImage) this.image = placeholderImage;

        const processedImage = this.getImage(this.src, this.filesquashConfig.projectId, this.size, this.filters)
        return this.fetchImage(processedImage)
      })
      .then(image => (this.image = image))
  }

  getImageSize(size) {
    switch (size) {
      case 'w_auto':
      return `${(this.hostElement.parentNode as HTMLElement).clientWidth}x`
      case 'h_auto':
      return `${(this.hostElement.parentNode as HTMLElement).clientHeight}x`
      case 'default':
      return null
      default:
      return size
    }
  }

  getFilters(filters, size) {
    const blacklistedValues = ['grayscale'];
    const defaultFilters = ['quality=keep'];
    const userFilters = compact(filters.split(';'));
    const sizeToApply = this.getImageSize(size)
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

    return `${sizeToApply ? (crop + mirror + sizeToApply) + '/': ''}${processedFilters}`;
  }

  processExternalImage(src, projectId, size, filters) {
    return `https://filesquash.io/v1/${projectId}/process/${this.getFilters(filters, size)}/${encodeURIComponent(src)}`;
  }

  processHostedImage(src, projectId, size, filters, onlyUuid) {
    return onlyUuid
      ? `https://filesquash.io/v1/${projectId}/assets/${src}/${this.getFilters(filters, size)}`
      : `${src}/${this.getFilters(filters, size)}/${encodeURIComponent(src)}`;
  }

  fetchImage(src) : Promise<string> {
    return new Promise((resolve, reject) => {
      let img = new Image();

      img.onload = () => {
        this.imageLoad.emit(src)
        resolve(src)
      }
      img.onerror = (error) => {
        this.imageError.emit(error)
        reject()
      }

      img.src = src;
    })
  }

  getPlaceholderImage(src) : Promise<string> {
    return new Promise((resolve, reject) => {
      const userFilters = compact(this.filters.split(';'));
      const placeholderFilters = ['quality=50', 'blur=40'];
      const uniqFilters = uniqBy([...placeholderFilters, ...userFilters], (key) => key.replace(/=.*$/, ''));
      const processedImage = this.getImage(src, this.filesquashConfig.projectId, this.size, uniqFilters.join(';'));

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
