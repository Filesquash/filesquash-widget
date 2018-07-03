export class MyComponent {
    validateName(newSrc) {
        const isBlank = typeof newSrc == null;
        if (isBlank) {
            throw new Error('src: required');
        }
        ;
    }
    validateProjectId(newProjectId) {
        const isBlank = typeof newProjectId == null;
        const has8chars = typeof newProjectId === 'string' && newProjectId.length === 8;
        if (isBlank) {
            throw new Error('projectId: required');
        }
        ;
        if (!has8chars) {
            throw new Error('projectId: invalid');
        }
        ;
    }
    getFilters(filters, size) {
        const blacklistedValues = ['grayscale'];
        let processedFilters = `filters:quality(100)`;
        let crop = '';
        let mirror = '';
        filters.split(";").forEach(filter => {
            const [property, value] = filter.split('=');
            if (property === 'mirror') {
                mirror = value ? '-' : '';
            }
            else if (property === 'crop') {
                crop = !!value ? value : '';
            }
            else {
                processedFilters += `:${property}(${blacklistedValues.indexOf(property) === -1 ? value : ''})`;
            }
        });
        return `${size ? (crop + mirror + size) + '/' : ''}${processedFilters}`;
    }
    processExternalImage(src, projectId, size, filters) {
        return `https://filesquash.io/v1/${projectId}/process/${this.getFilters(filters, size)}/${encodeURIComponent(src)}`;
    }
    processHostedImage(src, projectId, size, filters, onlyUuid) {
        return onlyUuid
            ? `https://filesquash.io/v1/${projectId}/assets/${src}/${this.getFilters(filters, size)}`
            : `${src}/${this.getFilters(filters, size)}/${encodeURIComponent(src)}`;
    }
    getImage(src, projectId, size, filters) {
        const uuidV4Checker = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i);
        const hostedAssetChecker = new RegExp(/^(http|https):\/\/filesquash\.io\/[0-9A-Z]{8}\/assets\//i);
        const onlyUuid = uuidV4Checker.test(src);
        const hostedAsset = hostedAssetChecker.test(src);
        return hostedAsset || onlyUuid
            ? this.processHostedImage(src, projectId, size, filters, onlyUuid)
            : this.processExternalImage(src, projectId, size, filters);
    }
    render() {
        return (h("img", { src: this.getImage(this.src, this.projectId, this.size, this.filters), alt: this.alt }));
    }
    static get is() { return "filesquash-img"; }
    static get properties() { return {
        "alt": {
            "type": String,
            "attr": "alt"
        },
        "el": {
            "elementRef": true
        },
        "filters": {
            "type": String,
            "attr": "filters"
        },
        "projectId": {
            "type": String,
            "attr": "project-id",
            "watchCallbacks": ["validateProjectId"]
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "src": {
            "type": String,
            "attr": "src",
            "watchCallbacks": ["validateName"]
        }
    }; }
    static get style() { return "/**style-placeholder:filesquash-img:**/"; }
}
