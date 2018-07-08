import compact from "lodash/compact";
import uniqBy from "lodash/uniqBy";

import filesquashConfig from "./filesquashConfig";

interface CustomHTMLElement extends HTMLElement {
  filesquashData: {
    newNode: boolean;
  };
}

async function supportsWebp() {
  if (!self.createImageBitmap) return false;

  const webpData =
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}

function fetchImage(src): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(src);
    };
    img.onerror = error => {
      reject(error);
    };

    img.src = src;
  });
}

function getImageSize(target, size) {
  switch (size) {
    case "w_auto":
      return `${(target.parentNode as HTMLElement).clientWidth}x`;
    case "h_auto":
      return `${(target.parentNode as HTMLElement).clientHeight}x`;
    case "default":
      return null;
    default:
      return size;
  }
}

async function getFilters(target, filters, size, hasWebSupport) {
  const blacklistedValues = ["grayscale"];
  const defaultFilters = ["quality=keep"];
  const userFilters = compact(filters.split(";"));
  const sizeToApply = getImageSize(target, size);
  let processedFilters = `filters`;
  let crop = "";
  let mirror = "";

  if (hasWebSupport) {
    defaultFilters.push("format=webp");
  }

  const uniqFilters = uniqBy([...userFilters, ...defaultFilters], key =>
    key.replace(/=.*$/, "")
  );

  uniqFilters.forEach(filter => {
    const [property, value] = filter.split("=");

    if (property === "mirror") {
      mirror = value ? "-" : "";
    } else if (property === "crop") {
      crop = value ? value + "/" : "";
    } else {
      processedFilters += `:${property}(${
        blacklistedValues.indexOf(property) === -1 ? value : ""
      })`;
    }
  });

  return `${sizeToApply ? crop + mirror + sizeToApply + "/" : ""}${
    processedFilters
  }`;
}

async function processExternalImage(
  target,
  datasetKey,
  projectId,
  size,
  filters,
  hasWebSupport
) {
  return `https://filesquash.io/v1/${projectId}/process/${await getFilters(
    target,
    filters,
    size,
    hasWebSupport
  )}/${encodeURIComponent(target.dataset[datasetKey])}`;
}

async function processHostedImage(
  target,
  datasetKey,
  projectId,
  size,
  filters,
  hasWebSupport,
  onlyUuid
) {
  return onlyUuid
    ? `https://filesquash.io/v1/${projectId}/assets/${
        target.dataset[datasetKey]
      }/${await getFilters(target, filters, size, hasWebSupport)}`
    : `${target.dataset[datasetKey]}/${getFilters(
        target,
        filters,
        size,
        hasWebSupport
      )}/${encodeURIComponent(target.dataset[datasetKey])}`;
}

async function getImage(
  target,
  datasetKey,
  projectId,
  size,
  filters,
  hasWebSupport
): Promise<string> {
  const uuidV4Checker = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i
  );
  const targetedAssetChecker = new RegExp(
    /^(http|https):\/\/filesquash\.io\/[0-9A-Z]{8}\/assets\//i
  );

  const onlyUuid = uuidV4Checker.test(target.dataset[datasetKey]);
  const targetedAsset = targetedAssetChecker.test(target.dataset[datasetKey]);

  return targetedAsset || onlyUuid
    ? await processHostedImage(
        target,
        datasetKey,
        projectId,
        size,
        filters,
        hasWebSupport,
        onlyUuid
      )
    : await processExternalImage(
        target,
        datasetKey,
        projectId,
        size,
        filters,
        hasWebSupport
      );
}

async function getPlaceholderImage(
  target,
  datasetKey,
  projectId,
  size,
  filters,
  hasWebSupport
): Promise<string> {
  const userFilters = compact(filters.split(";"));
  const placeholderFilters = ["quality=50", "blur=40"];

  const uniqFilters = uniqBy([...placeholderFilters, ...userFilters], key =>
    key.replace(/=.*$/, "")
  );
  const processedImage: string = await getImage(
    target,
    datasetKey,
    projectId,
    size,
    uniqFilters.join(";"),
    hasWebSupport
  );

  return fetchImage(processedImage).then(loadedImage => {
    if (datasetKey === "fsSrc") {
      target.src = loadedImage;
    } else if (datasetKey === "fsBg") {
      target.style.backgroundImage = `url("${loadedImage}")`;
    }

    return loadedImage;
  });
}

function recursivelyTraverseAddedNodes(itemsToLoad, element) {
  if (element.children && element.children.length) {
    for (let i = 0, l = element.children.length; i < l; i++) {
      recursivelyTraverseAddedNodes(itemsToLoad, element.children[i]);
    }
  }

  if (
    element.dataset &&
    (element.dataset.fsSrc ||
      element.dataset.fsBg ||
      element.dataset.fsSize ||
      element.dataset.fsFilters)
  ) {
    element.filesquashData = {
      newNode: !0
    };
    itemsToLoad.push(element);
  }
}

function applyProcessedImage(target, datasetKey, processedImage) {
  return fetchImage(processedImage).then(() => {
    const event = new CustomEvent("filesquash:imageLoaded", {
      bubbles: true,
      cancelable: true,
      detail: { image: processedImage }
    });
    target.dispatchEvent(event);

    if (datasetKey === "fsSrc") {
      target.src = processedImage;
    } else if (datasetKey === "fsBg") {
      target.style.backgroundImage = `url("${processedImage}")`;
    }
  });
}

function fetchImages(itemsToLoad, hasWebSupport) {
  itemsToLoad.forEach(target => {
    const {
      fsSize = "w_auto",
      fsFilters = "",
      fsProgressive = "true"
    } = target.dataset;

    const datasetKey = target.nodeName === "IMG" ? "fsSrc" : "fsBg";

    (fsProgressive === "true"
      ? getPlaceholderImage(
          target,
          datasetKey,
          filesquashConfig.projectId,
          fsSize,
          fsFilters,
          hasWebSupport
        )
      : Promise.resolve("")
    )
      .then(() => {
        getImage(
          target,
          datasetKey,
          filesquashConfig.projectId,
          fsSize,
          fsFilters,
          hasWebSupport
        )
          .then(processedImage =>
            applyProcessedImage(target, datasetKey, processedImage)
          )
          .catch(console.log);
      })
      .catch(console.log);
  });
}

async function ready() {
  const hasWebSupport = await supportsWebp();
  const imgsToLoad = document.querySelectorAll("[data-fs-src]");
  fetchImages(imgsToLoad, hasWebSupport);

  const backgroundsToLoad = document.querySelectorAll("[data-fs-bg]");
  fetchImages(backgroundsToLoad, hasWebSupport);

  const mutationObserver = new MutationObserver(mutations => {
    const itemsToLoad = [];
    const fsAttributes = [
      "data-fs-src",
      "data-fs-bg",
      "data-fs-size",
      "data-fs-filters"
    ];

    mutations.forEach(mutation => {
      const target = mutation.target as CustomHTMLElement;
      if (
        "attributes" !== mutation.type ||
        fsAttributes.indexOf(mutation.attributeName) === -1
      ) {
        if ("childList" === mutation.type) {
          Array.from(mutation.addedNodes).forEach(node => {
            recursivelyTraverseAddedNodes(itemsToLoad, node);
          });
        }
      } else {
        if (target.filesquashData && target.filesquashData.newNode) {
          target.filesquashData.newNode = false;
        } else {
          (target.dataset.fsSrc ||
            target.dataset.fsBg ||
            target.dataset.fsSize ||
            target.dataset.fsFilters) &&
            itemsToLoad.push(target);
        }
      }
    });
    itemsToLoad.length > 0 && fetchImages(itemsToLoad, hasWebSupport);
  });

  mutationObserver.observe(document.getElementsByTagName("body")[0], {
    childList: true,
    subtree: true,
    attributes: true
  });
}

if (document.readyState !== "loading") {
  ready().catch(console.log);
} else {
  document.addEventListener("DOMContentLoaded", ready);
}
