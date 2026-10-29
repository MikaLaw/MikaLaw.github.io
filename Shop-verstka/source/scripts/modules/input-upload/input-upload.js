import { bytesToSize } from '../../utils/utils';

export default class Upload {
  #uploadBlock;
  #uploadType;
  #dropZoneBlock;
  #input;
  #uploadStatus;
  #previewBlock;
  #message = null;
  #abortController;
  #blobUrls = new Map();

  constructor(uploadBlock, customOptions = {}) {
    if (!uploadBlock) return;

    this.#uploadBlock = uploadBlock;
    this.#input = this.#uploadBlock.querySelector('input');
    if (!this.#input) return;

    this.#uploadType = this.#uploadBlock.dataset.upload;
    this.#dropZoneBlock = this.#uploadBlock.querySelector('[data-drop-zone]');
    this.#uploadStatus = this.#uploadBlock.querySelector('.input-upload__status');
    
    this.files = [];
    this.#previewBlock = this.#uploadBlock.querySelector('[data-upload-preview]');

    this.options = {
      maxFullSize: false,
      uploadLength: Number(this.#uploadBlock.dataset.amount) || 4,
      maxFileSize: Number(this.#input.dataset.maxSize),
      preview: true,
      fileInfo: { fileName: true, fileSize: true },
      emptyMessage: 'Добавление файла обязательно',
      ...this.getTypeOptions(this.#uploadType),
      ...customOptions
    };

    this.#abortController = new AbortController();
    this.init();
  }

  init() {
    const { signal } = this.#abortController;

    if (this.options.uploadLength > 1) this.#input.setAttribute('multiple', '');
    if (this.options.accept) this.#input.setAttribute('accept', this.options.accept.join(','));

    this.#input.addEventListener('change', (e) => this.onInputChange(e), { signal });

    if (this.options.preview) {
      if (!this.#previewBlock) {
        this.#previewBlock = this.createElement(this.createPreviewContainerMarkup());
        const renderTarget = this.#dropZoneBlock || this.#uploadBlock;
        this.renderElement(renderTarget, this.#previewBlock);
      }
      this.#previewBlock.addEventListener('click', (e) => this.onPreviewBlockClick(e), { signal });
    }

    if (this.#dropZoneBlock) {
      this.#dropZoneBlock.addEventListener('dragenter', this.onDropZoneBlockDragenter, { signal });
      this.#dropZoneBlock.addEventListener('dragover', this.onDropZoneBlockDragover, { signal });
      this.#dropZoneBlock.addEventListener('dragleave', this.onDropZoneBlockDragleave, { signal });
      this.#dropZoneBlock.addEventListener('drop', this.onDropZoneBlockDrop, { signal });
      this.#dropZoneBlock.addEventListener('click', this.onDropZoneBlockClick, { signal });
    }
  }

  getTypeOptions(type) {
    const baseFormats = {
      img: {
        accept: ['.png', '.jpg', '.jpeg', '.webp'],
        previewImg: true,
        iconFormat: {
          png: './img/file/icon-file-png.png',
          jpg: './img/file/icon-file-jpg.png',
          jpeg: './img/file/icon-file-jpg.png',
          webp: './img/file/icon-file-webp.png',
          default: './img/file/icon-file-docs.png',
        },
        errorMessage: 'Выделенные файлы превышают максимальный размер',
      },
      file: {
        accept: ['.pdf', '.docx', '.xlsx'],
        previewImg: false,
        iconFormat: {
          xlsx: './img/file/icon-file-xlsx.png',
          docx: './img/file/icon-file-docx.png',
          pdf: './img/file/icon-file-pdf.png',
          default: './img/file/icon-file-docx.png',
        },
        errorMessage: 'Общий размер файлов слишком большой',
      }
    };

    if (type === 'img' || type === 'img-drop') return baseFormats.img;
    if (type === 'file' || type === 'file-drop') return baseFormats.file;
    return {};
  }

  // ИСПРАВЛЕНО: Безопасное экранирование строк от XSS без синтаксических ошибок кавычек
  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  onInputChange(e) {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;

    this.files = [...this.files, ...selectedFiles].slice(0, this.options.uploadLength);
    this.renderFiles();
  }

  renderFiles() {
    if (this.options.accept) {
      this.files = this.files.filter((file) => this.checkAccept(file));
    }

    this.overwriteFileList();

    const isFullSizeExceeded = this.options.maxFullSize && this.checkFullSize(this.files) > this.options.maxFullSize;
    let hasFileSizeError = false;

    this.#revokeExistingUrls();

    if (this.#previewBlock) this.#previewBlock.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this.files.forEach((file) => {
      const isCurrentFileTooBig = this.options.maxFileSize && file.size > this.options.maxFileSize;
      if (isCurrentFileTooBig) hasFileSizeError = true;

      let previewUrl = '';
      if (this.options.previewImg) {
        previewUrl = URL.createObjectURL(file);
        // Сохраняем ссылку в Map, привязывая к композитному ключу файла
        const fileKey = `${file.name}-${file.size}-${file.lastModified}`;
        this.#blobUrls.set(fileKey, previewUrl);
      }

      const html = this.createPreviewMarkup(file, previewUrl, this.options, isFullSizeExceeded || hasFileSizeError);
      const element = this.createElement(html);
      fragment.append(element);
    });

    if (this.#previewBlock) {
      this.#previewBlock.append(fragment);
    }

    this.toggleErrorState(isFullSizeExceeded || hasFileSizeError);
  }

  #revokeExistingUrls() {
    this.#blobUrls.forEach(url => URL.revokeObjectURL(url));
    this.#blobUrls.clear();
  }

  checkAccept(file) {
    const fileNameLower = file.name.toLowerCase();
    return this.options.accept.some((item) => fileNameLower.endsWith(item.toLowerCase()));
  }

  overwriteFileList() {
    const dataTransfer = new DataTransfer();
    this.files.forEach((file) => dataTransfer.items.add(file));
    this.#input.files = dataTransfer.files;
  }

  checkFullSize(array) {
    return array.reduce((acc, item) => acc + item.size, 0);
  }

  createPreviewMarkup(file, previewUrl, options, error) {
    const expansion = file.name.split('.').pop().toLowerCase();
    const hasErrorClass = error ? ' is-invalid' : '';
    const safeName = this.escapeHTML(file.name);

    const fileUid = `${safeName}|${file.size}|${file.lastModified}`;

    return `<div class="input-upload__preview-item${hasErrorClass}">
      <button class="input-upload__preview-item-remove" type="button" data-file-uid="${fileUid}" aria-label="Удалить">&times;</button>
      ${options.previewImg ? `<img class="input-upload__preview-img" src="${previewUrl}" alt="${safeName}" />` : ''}
      ${options.iconFormat && options.iconFormat[expansion] ? `<img class="input-upload__preview-icon" src="${options.iconFormat[expansion]}" alt="" />` : ''}
      ${options.fileInfo ? `<div class="input-upload__preview-file-info">
        ${options.fileInfo.fileName ? `<span class="input-upload__preview-file-name">${safeName}</span>` : ''}
        ${options.fileInfo.fileSize ? `<span class="input-upload__preview-file-size">${bytesToSize(file.size)}</span>` : ''}
      </div>` : ''}
    </div>`.replace(/\s+/g, ' ');
  }

  createElement(template) {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = template.trim();
    return templateElement.content.firstChild;
  }

  toggleErrorState(hasError) {
    this.#uploadBlock.classList.toggle('is-invalid', hasError);
    if (hasError && this.options.errorMessage) {
      this.renderMessage(this.options.errorMessage);
    } else if (!hasError && this.#message) {
      this.#message.remove();
      this.#message = null;
    }
  }

  renderMessage(message) {
    this.#message?.remove();
    this.#message = this.createElement(this.createMessageMarkup(this.escapeHTML(message)));
    this.renderElement(this.#uploadBlock, this.#message);
  }

  createMessageMarkup(message) {
    return `<div class="input-upload__message">${message}</div>`;
  }

  renderElement(container, component, place = 'beforeend') {
    container.insertAdjacentElement(place, component);
  }

  createPreviewContainerMarkup() {
    return '<div class="input-upload__preview" data-upload-preview></div>';
  }

  onPreviewBlockClick(evt) {
    const removeBtn = evt.target.closest('.input-upload__preview-item-remove');
    if (!removeBtn) return;

    const uid = removeBtn.dataset.fileUid;
    const [name, size, lastModified] = uid.split('|');

    this.files = this.files.filter((file) => {
      return !(file.name === name && String(file.size) === size && String(file.lastModified) === lastModified);
    });

    this.overwriteFileList();
    
    const fileKey = `${name}-${size}-${lastModified}`;
    if (this.#blobUrls.has(fileKey)) {
      URL.revokeObjectURL(this.#blobUrls.get(fileKey));
      this.#blobUrls.delete(fileKey);
    }

    removeBtn.parentElement?.remove();

    if (this.#uploadStatus) this.#uploadStatus.textContent = `Файл ${name} удален`;

    const fullSizeError = this.options.maxFullSize ? this.checkFullSize(this.files) > this.options.maxFullSize : false;
    this.toggleErrorState(fullSizeError);

    this.#input.dispatchEvent(new CustomEvent('file:reset', { bubbles: true }));
  }
  
  onDropZoneBlockDragenter = (evt) => {
    evt.preventDefault();
    this.#dropZoneBlock.classList.remove('is-drag');
  }
  
  onDropZoneBlockDragover = (evt) => {
    evt.preventDefault();
    this.#dropZoneBlock.setAttribute('data-drag', 'true');
    this.#dropZoneBlock.classList.add('is-drag');
  }
  
  onDropZoneBlockDragleave = (evt) => {
    evt.preventDefault();
    this.#dropZoneBlock.removeAttribute('data-drag');
    this.#dropZoneBlock.classList.remove('is-drag');
  }
  
  onDropZoneBlockDrop = (evt) => {
    evt.preventDefault();
    this.#dropZoneBlock.removeAttribute('data-drag');
    this.#dropZoneBlock.classList.remove('is-drag');
    if (!evt.dataTransfer.files.length) return;
    this.files = [...this.files, ...evt.dataTransfer.files].slice(0, this.options.uploadLength);
    this.renderFiles();
  }
  
  onDropZoneBlockClick = (evt) => {
    if (evt.target.closest('[data-upload-preview]') || evt.target.closest('.input-upload__preview-item')) return;
    this.#input.click();
  }
  
  destroy() {
    this.#abortController.abort();
    this.#revokeExistingUrls();
    if (this.#previewBlock) this.#previewBlock.innerHTML = '';
    this.files = [];
    this.#uploadBlock = null;
    this.#input = null;
    this.#dropZoneBlock = null;
    this.#previewBlock = null;
  }
}