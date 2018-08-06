import compact from "lodash/compact";
import uniqBy from "lodash/uniqBy";

import "./intersection-observer.js";
import filesquashConfig from "./filesquashConfig";

interface CustomHTMLElement extends HTMLElement {
  filesquashData: {
    newNode: boolean;
  };
}

async function supportsWebp() {
  if (!self.createImageBitmap) return false;

  const blob = await fetch(
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
  ).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}

function fetchImage(src: string): Promise<string> {
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
    case "auto":
      return `${
        target.clientWidth <= 1 ? window.innerWidth : target.clientWidth
      }x`;
    case "default":
      return null;
    default:
      return size;
  }
}

async function getFilters(target, filters, size, preferWebp) {
  const defaultFilters = ["quality=keep"];
  const userFilters = compact(filters.split(";"));
  const sizeToApply = getImageSize(target, size);
  let processedFilters = `filters`;
  let crop = "";
  let mirror = "";

  if (preferWebp) {
    defaultFilters.push("format=webp");
  }

  if (userFilters.indexOf("upscale=true") === -1) {
    defaultFilters.push("no_upscale=true");
  }

  // Unique Filters
  uniqBy([...defaultFilters, ...userFilters], key =>
    key.replace(/=.*$/, "")
  ).forEach(filter => {
    const [property, value] = filter.split("=");

    if (property === "mirror") {
      mirror = value ? "-" : "";
    } else if (property === "crop") {
      crop = value ? value + "/" : "";
    } else {
      processedFilters += `:${property}(${
        ["grayscale", "no_upscale", "upscale"] // Blacklisted values
          .indexOf(property) === -1
          ? value
          : ""
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
  preferWebp
) {
  const imageURL = target.dataset[datasetKey];
  return `https://api.filesquash.io/v1/${projectId}/process/${await getFilters(
    target,
    filters,
    size,
    preferWebp
  )}/${encodeURIComponent(
    /^\/\//i.test(imageURL) // No protocol test
      ? `${document.location.protocol}${imageURL}`
      : imageURL
  )}`;
}

async function processHostedImage(
  target,
  datasetKey,
  projectId,
  size,
  filters,
  preferWebp,
  onlyUuid
) {
  return onlyUuid
    ? `https://api.filesquash.io/v1/${projectId}/assets/${
        target.dataset[datasetKey]
      }/${await getFilters(target, filters, size, preferWebp)}`
    : `${target.dataset[datasetKey]}/${getFilters(
        target,
        filters,
        size,
        preferWebp
      )}/${encodeURIComponent(target.dataset[datasetKey])}`;
}

async function mapImageURL({
  target,
  datasetKey,
  projectId,
  size,
  filters,
  preferWebp
}): Promise<string> {
  const onlyUuid = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i.test(
    target.dataset[datasetKey]
  );
  const targetedAsset = /^(http|https):\/\/filesquash\.io\/[0-9A-Z]{8}\/assets\//i.test(
    target.dataset[datasetKey]
  );

  return targetedAsset || onlyUuid
    ? await processHostedImage(
        target,
        datasetKey,
        projectId,
        size,
        filters,
        preferWebp,
        onlyUuid
      )
    : await processExternalImage(
        target,
        datasetKey,
        projectId,
        size,
        filters,
        preferWebp
      );
}

async function getPlaceholderImage(opts): Promise<string> {
  const uniqFilters = uniqBy(
    ["quality=50", "blur=40", ...compact(opts.filters.split(";"))],
    key => key.replace(/=.*$/, "")
  );

  const processedImage: string = await mapImageURL({
    ...opts,
    filters: uniqFilters.join(";")
  });

  const loadedImage = await fetchImage(processedImage);

  if (opts.datasetKey === "fsSrc") {
    opts.target.setAttribute("src", loadedImage);
  } else if (opts.datasetKey === "fsBg") {
    opts.target.style.backgroundImage = `url("${loadedImage}")`;
  }

  return loadedImage;
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
  if (datasetKey === "fsSrc") {
    target.src = processedImage;
  } else if (datasetKey === "fsBg") {
    target.style.backgroundImage = `url("${processedImage}")`;
  }
}

async function transformImage(target, datasetKey, hasWebSupport, onLoad) {
  const imageOpts = {
    target,
    projectId: filesquashConfig.projectId,
    size: target.dataset.fsSize || "auto",
    filters: target.dataset.fsFilters || "",
    progressive: target.dataset.fsProgressive || "true",
    datasetKey,
    preferWebp: hasWebSupport && target.dataset.fsAutoWebp === "true"
  };

  try {
    if (imageOpts.progressive === "true") {
      await getPlaceholderImage(imageOpts);
    }
  } catch (error) {
    console.log(error);
  }

  mapImageURL(imageOpts)
    .then(onLoad)
    .catch(console.log);
}

function fetchImages(itemsToLoad, hasWebSupport) {
  itemsToLoad.forEach(imageElement => {
    const observer = new IntersectionObserver(
      images => {
        images.forEach(image => {
          if (image.intersectionRatio > 0) {
            const datasetKey =
              image.target.nodeName === "IMG" ? "fsSrc" : "fsBg";

            transformImage(
              image.target,
              datasetKey,
              hasWebSupport,
              async processedImage => {
                observer.unobserve(image.target);

                let loadedImage;
                try {
                  loadedImage = await fetchImage(processedImage);

                  image.target.dispatchEvent(
                    new CustomEvent("filesquash:imageLoaded", {
                      bubbles: true,
                      cancelable: true,
                      detail: { image: loadedImage }
                    })
                  );
                } catch (error) {
                  loadedImage = (image.target as HTMLElement).dataset[
                    datasetKey
                  ];

                  image.target.dispatchEvent(
                    new CustomEvent("filesquash:imageLoadError", {
                      bubbles: true,
                      cancelable: true,
                      detail: {
                        error:
                          "Failed to process image on Filesquash. As fallback, we loaded the original image. Contact us for more infos."
                      }
                    })
                  );
                }

                applyProcessedImage(image.target, datasetKey, loadedImage);
              }
            );
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1
      }
    );

    observer.observe(imageElement);
  });
}

(function ready() {
  supportsWebp()
    .then(hasWebSupport => {
      fetchImages(document.querySelectorAll("[data-fs-src]"), hasWebSupport);
      fetchImages(document.querySelectorAll("[data-fs-bg]"), hasWebSupport);

      new MutationObserver(mutations => {
        const itemsToLoad = [];

        mutations.forEach(mutation => {
          const target = mutation.target as CustomHTMLElement;
          if (
            "attributes" !== mutation.type ||
            [
              "data-fs-src",
              "data-fs-bg",
              "data-fs-size",
              "data-fs-filters"
            ].indexOf(mutation.attributeName) === -1
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
              (target.dataset.fsSrc || target.dataset.fsBg) &&
                itemsToLoad.push(target);
            }
          }
        });
        itemsToLoad.length > 0 && fetchImages(itemsToLoad, hasWebSupport);
      }).observe(document.getElementsByTagName("body")[0], {
        childList: true,
        subtree: true,
        attributes: true
      });
    })
    .catch(console.log);
})();
